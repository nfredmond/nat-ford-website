"""Build the Nat Ford Planning & Analysis logo set as outlined vector SVG.

The mark is a guide-sign panel: a green rounded square with a white inset
border and "NF" in Overpass, beside "Nat Ford" and "Planning & Analysis".
Every glyph is converted to a path, so the SVGs render identically
everywhere with no font dependency.

Setup (once):
    python3 -m venv /tmp/logo-venv && /tmp/logo-venv/bin/pip install fonttools uharfbuzz
    curl -L -o /tmp/Overpass.ttf "https://github.com/google/fonts/raw/main/ofl/overpass/Overpass%5Bwght%5D.ttf"

Run:
    /tmp/logo-venv/bin/python scripts/build_logo.py /tmp/Overpass.ttf /tmp/logo-out

Then render PNGs and favicons from the SVGs with rsvg-convert and
ImageMagick (see README "Brand assets").
"""
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

import tempfile
from fontTools.varLib.instancer import instantiateVariableFont

VARIABLE_FONT = Path(sys.argv[1])
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("logo-out")
OUT.mkdir(parents=True, exist_ok=True)

_tmp = Path(tempfile.mkdtemp())
FONTS = {}
for key, weight in (("black", 900), ("xbold", 800), ("semi", 600)):
    instance = TTFont(VARIABLE_FONT)
    instantiateVariableFont(instance, {"wght": weight}, inplace=True)
    FONTS[key] = _tmp / f"Overpass-{weight}.ttf"
    instance.save(FONTS[key])
_cache = {}


def font(key):
    if key not in _cache:
        path = FONTS[key]
        blob = hb.Blob.from_file_path(str(path))
        face = hb.Face(blob)
        hbfont = hb.Font(face)
        tt = TTFont(path)
        _cache[key] = (hbfont, tt, tt["head"].unitsPerEm, tt.getGlyphSet())
    return _cache[key]


def cap_height(key):
    _, tt, upem, _ = font(key)
    return tt["OS/2"].sCapHeight / upem


def text_path(key, text, size, x, y, tracking=0.0):
    """Return (svg path d, advance width) for text set at `size` with its
    baseline at (x, y). `tracking` is extra space per glyph in em."""
    hbfont, tt, upem, glyphset = font(key)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": False})
    scale = size / upem
    pen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    cursor = 0.0
    order = tt.getGlyphOrder()
    n = len(buf.glyph_infos)
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        gx = x + (cursor + pos.x_offset) * scale
        gy = y - pos.y_offset * scale
        glyphset[name].draw(TransformPen(pen, (scale, 0, 0, -scale, gx, gy)))
        cursor += pos.x_advance
        if i < n - 1:
            cursor += tracking * upem
    return pen.getCommands(), cursor * scale


def ink_bounds(key, text, size, tracking=0.0):
    """Horizontal ink extent of the text, ignoring side bearings."""
    from fontTools.pens.boundsPen import BoundsPen
    hbfont, tt, upem, glyphset = font(key)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True})
    scale = size / upem
    order = tt.getGlyphOrder()
    cursor, xmin, xmax = 0.0, None, None
    n = len(buf.glyph_infos)
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        bp = BoundsPen(glyphset)
        glyphset[order[info.codepoint]].draw(bp)
        if bp.bounds:
            a = (cursor + pos.x_offset + bp.bounds[0]) * scale
            b = (cursor + pos.x_offset + bp.bounds[2]) * scale
            xmin = a if xmin is None else min(xmin, a)
            xmax = b if xmax is None else max(xmax, b)
        cursor += pos.x_advance + (tracking * upem if i < n - 1 else 0)
    return xmin, xmax


SIGN = "#0B5E3E"      # guide-sign green, same as the site's --sign
WHITE = "#FFFFFF"
PALETTES = {
    # "light" = for light backgrounds, "dark" = for dark backgrounds
    "light": {"name": "#17231E", "sub": "#0B5E3E"},
    "dark": {"name": "#F4F6F5", "sub": "#A9D8BE"},
}


def monogram(ox, oy, s, border=True):
    """NF on a guide-sign panel: green rounded square with a white inset
    border, top-left at (ox, oy), side s."""
    r_out = s * 0.14
    inset = s * 0.065
    stroke = s * 0.05
    parts = [f'<rect x="{ox}" y="{oy}" width="{s}" height="{s}" rx="{r_out:.2f}" fill="{SIGN}"/>']
    if border:
        b = inset + stroke / 2
        parts.append(
            f'<rect x="{ox + b:.2f}" y="{oy + b:.2f}" width="{s - 2*b:.2f}" height="{s - 2*b:.2f}" '
            f'rx="{r_out - b*0.75:.2f}" fill="none" stroke="{WHITE}" stroke-width="{stroke:.2f}"/>'
        )
    ch = cap_height("black")
    size = s * (0.33 if border else 0.44) / ch
    track = 0.01
    xmin, xmax = ink_bounds("black", "NF", size, track)
    x = ox + s / 2 - (xmin + xmax) / 2
    base = oy + s / 2 + ch * size / 2
    d, _ = text_path("black", "NF", size, x, base, track)
    parts.append(f'<path d="{d}" fill="{WHITE}"/>')
    return "\n  ".join(parts)


def wordmark(c):
    S = 200
    gap = 40
    text_x = S + gap
    name_size = 104
    name_track = -0.015
    name_base = 100
    nmin, nmax = ink_bounds("xbold", "Nat Ford", name_size, name_track)
    name_d, _ = text_path("xbold", "Nat Ford", name_size, text_x - nmin, name_base, name_track)
    sub_size = 52
    smin, smax = ink_bounds("semi", "Planning & Analysis", sub_size)
    sub_base = 172
    sub_d, _ = text_path("semi", "Planning & Analysis", sub_size, text_x - smin, sub_base)
    W = text_x + max(nmax - nmin, smax - smin) + 4
    body = "\n  ".join([
        monogram(0, 0, S),
        f'<path d="{name_d}" fill="{c["name"]}"/>',
        f'<path d="{sub_d}" fill="{c["sub"]}"/>',
    ])
    return W, S, body


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}" role="img">\n'
        f"  <title>{title}</title>\n  {body}\n</svg>\n"
    )


TITLE = "Nat Ford Planning &amp; Analysis"
for variant, c in PALETTES.items():
    w, h, body = wordmark(c)
    (OUT / f"nf-wordmark-{variant}.svg").write_text(svg(w, h, body, TITLE))
# The monogram is a self-contained green panel, so one file serves both
# backgrounds; the light/dark names are kept for existing references.
for variant in PALETTES:
    (OUT / f"nf-monogram-square-{variant}.svg").write_text(svg(200, 200, monogram(0, 0, 200), TITLE))
def apple_icon(s=180):
    m = monogram(0, 0, s)
    return m.replace(f'rx="{s*0.14:.2f}" ', '', 1)


(OUT / "apple-icon.svg").write_text(svg(180, 180, apple_icon(180), TITLE))
# Small sizes drop the inset border, which would blur below about 32 px.
(OUT / "nf-monogram-small.svg").write_text(svg(200, 200, monogram(0, 0, 200, border=False), TITLE))
print("wrote", sorted(p.name for p in OUT.iterdir()))
