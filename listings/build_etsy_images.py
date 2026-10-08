"""Build six Etsy listing images from real workbook renders and branded backgrounds."""

from __future__ import annotations

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
IMAGES = ROOT / "images"
BG = IMAGES / "backgrounds"
SRC = IMAGES / "source"
OUT = IMAGES / "etsy"

SIZE = (2400, 1800)
NAVY = "#17324D"
BLUE = "#2777B5"
GREEN = "#257E5A"
AMBER = "#F4C95D"
INK = "#172433"
SLATE = "#53657A"
PALE = "#EAF3F8"
WHITE = "#FFFFFF"

ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def cover_resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    ratio = max(target_w / image.width, target_h / image.height)
    resized = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    ratio = min(size[0] / image.width, size[1] / image.height)
    return image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)


def canvas(background: str) -> Image.Image:
    return cover_resize(Image.open(BG / background).convert("RGB"), SIZE)


def rounded_card(base: Image.Image, box: tuple[int, int, int, int], radius: int = 34, fill: str = WHITE) -> None:
    x1, y1, x2, y2 = box
    shadow = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((x1 + 18, y1 + 22, x2 + 18, y2 + 22), radius=radius, fill=(15, 35, 55, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    base.paste(shadow, (0, 0), shadow)
    ImageDraw.Draw(base).rounded_rectangle(box, radius=radius, fill=fill, outline="#BFD0DC", width=3)


def label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, color: str = BLUE) -> None:
    draw.text(xy, text.upper(), font=font(ARIAL_BOLD, 30), fill=color, stroke_width=0)


def multiline(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, *, width: int, fnt: ImageFont.FreeTypeFont,
              fill: str, spacing: int = 16) -> int:
    avg = max(1, int(width / (fnt.size * 0.55)))
    lines: list[str] = []
    for paragraph in text.split("\n"):
        lines.extend(wrap(paragraph, width=avg) or [""])
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        box = draw.textbbox((xy[0], y), line, font=fnt)
        y = box[3] + spacing
    return y


def paste_sheet(base: Image.Image, image: Image.Image, box: tuple[int, int, int, int], *, crop=None) -> None:
    if crop:
        image = image.crop(crop)
    x1, y1, x2, y2 = box
    rounded_card(base, box, radius=28)
    inner = contain(image.convert("RGB"), (x2 - x1 - 38, y2 - y1 - 38))
    base.paste(inner, (x1 + (x2 - x1 - inner.width) // 2, y1 + (y2 - y1 - inner.height) // 2))


def save(base: Image.Image, filename: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / filename, quality=94, optimize=True)


def build_primary() -> None:
    """Create a clean first image without marketing text, per Etsy guidance."""
    base = canvas("00-primary-bg.png")
    screen = (622, 397, 1828, 1150)
    dashboard = Image.open(SRC / "dashboard.png").convert("RGB")
    fitted = contain(dashboard, (screen[2] - screen[0], screen[3] - screen[1]))
    white = Image.new("RGB", (screen[2] - screen[0], screen[3] - screen[1]), WHITE)
    white.paste(fitted, ((white.width - fitted.width) // 2, (white.height - fitted.height) // 2))
    base.paste(white, (screen[0], screen[1]))
    save(base, "00-primary.jpg")


def build_cover() -> None:
    base = canvas("01-cover-bg.png")
    panel = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    ImageDraw.Draw(panel).rounded_rectangle((95, 75, 1225, 1165), radius=42, fill=(255, 255, 255, 224))
    base.paste(panel, (0, 0), panel)
    d = ImageDraw.Draw(base)
    label(d, (150, 125), "Excel workbook for Etsy sellers")
    multiline(d, (150, 200), "Know what each order\nleaves after fees.", width=1030,
              fnt=font(GEORGIA_BOLD, 94), fill=NAVY, spacing=12)
    multiline(d, (155, 650), "Editable profit tracker with fee assumptions,\norder calculations, and a monthly dashboard.",
              width=960, fnt=font(ARIAL, 37), fill=SLATE, spacing=15)
    d.rounded_rectangle((155, 860, 560, 970), radius=24, fill=NAVY)
    d.text((210, 888), "EXCEL .XLSX", font=font(ARIAL_BOLD, 34), fill=WHITE)
    d.rounded_rectangle((590, 860, 825, 970), radius=24, fill=GREEN)
    d.text((650, 888), "$9.99", font=font(ARIAL_BOLD, 38), fill=WHITE)
    d.text((155, 1030), "Independent product. Not affiliated with or endorsed by Etsy.",
           font=font(ARIAL, 25), fill=SLATE)

    box = (1310, 245, 2210, 1515)
    rounded_card(base, box, radius=42)
    d = ImageDraw.Draw(base)
    d.text((1400, 330), "ORDER PROFIT", font=font(ARIAL_BOLD, 36), fill=INK)
    d.rounded_rectangle((1890, 315, 2110, 385), radius=35, fill="#FFF0C8")
    d.text((1932, 334), "EXAMPLE", font=font(ARIAL_BOLD, 25), fill="#805A10")
    d.text((1400, 470), "Order total", font=font(ARIAL, 35), fill=INK)
    d.text((1900, 458), "$70.00", font=font(ARIAL_BOLD, 48), fill=INK)
    d.line((1400, 555, 2110, 555), fill="#C8D6E0", width=3)
    rows = [
        ("Listing fee", "−$0.20"),
        ("Transaction fee", "−$4.55"),
        ("Payment processing", "−$2.35"),
        ("Offsite Ads", "−$10.50"),
        ("Etsy Ads spend", "−$4.50"),
    ]
    y = 625
    for name, value in rows:
        d.text((1400, y), name, font=font(ARIAL, 31), fill=SLATE)
        d.text((1910, y), value, font=font(ARIAL, 31), fill=INK)
        y += 84
    d.rounded_rectangle((1395, 1090, 2120, 1265), radius=24, fill=GREEN)
    d.text((1440, 1142), "Estimated net", font=font(ARIAL_BOLD, 34), fill=WHITE)
    d.text((1870, 1128), "$47.90", font=font(ARIAL_BOLD, 52), fill=WHITE)
    d.text((1400, 1345), "Example included in the workbook", font=font(ARIAL, 27), fill=SLATE)
    save(base, "01-cover.jpg")


def build_orders() -> None:
    base = canvas("02-orders-bg.png")
    d = ImageDraw.Draw(base)
    d.text((115, 190), "02", font=font(GEORGIA_BOLD, 105), fill=WHITE)
    d.text((90, 360), "ORDERS", font=font(ARIAL_BOLD, 32), fill=WHITE)
    label(d, (520, 120), "One row per order")
    multiline(d, (520, 190), "Enter the yellow cells.\nThe blue columns calculate automatically.", width=1650,
              fnt=font(GEORGIA_BOLD, 67), fill=NAVY, spacing=10)
    d.text((525, 405), "Price • shipping • quantity • ads • refunds", font=font(ARIAL, 32), fill=SLATE)
    orders = Image.open(SRC / "orders.png")
    paste_sheet(base, orders, (510, 520, 2220, 1620), crop=(0, 0, orders.width, 2450))
    d.text((535, 1652), "Includes 200 ready-to-use order rows.", font=font(ARIAL_BOLD, 29), fill=NAVY)
    save(base, "02-orders.jpg")


def build_fees() -> None:
    base = canvas("03-fees-bg.png")
    d = ImageDraw.Draw(base)
    label(d, (150, 95), "See every fee", color=AMBER)
    d.text((150, 155), "From sale to net profit", font=font(GEORGIA_BOLD, 76), fill=WHITE)
    d.text((150, 300), "A clear breakdown for each order.", font=font(ARIAL, 34), fill=SLATE)
    fees = ["Listing fee", "Transaction fee", "Payment processing", "Offsite Ads", "Etsy Ads spend", "Regulatory fee"]
    y = 530
    for item in fees:
        d.ellipse((155, y + 7, 191, y + 43), fill=GREEN)
        d.line((164, y + 27, 173, y + 36), fill=WHITE, width=4)
        d.line((173, y + 36, 185, y + 18), fill=WHITE, width=4)
        d.text((215, y), item, font=font(ARIAL_BOLD, 34), fill=INK)
        y += 100
    example = Image.open(SRC / "example.png")
    paste_sheet(base, example, (850, 520, 2240, 1410), crop=(3050, 0, example.width, example.height))
    d.rounded_rectangle((900, 1460, 2185, 1605), radius=28, fill=GREEN)
    d.text((960, 1502), "Included example: $70.00 order → $47.90 net", font=font(ARIAL_BOLD, 35), fill=WHITE)
    d.text((155, 1650), "Rates are editable and should be verified for your seller country.",
           font=font(ARIAL, 27), fill=SLATE)
    save(base, "03-fees.jpg")


def build_settings() -> None:
    base = canvas("04-settings-bg.png")
    d = ImageDraw.Draw(base)
    label(d, (760, 115), "Editable assumptions")
    multiline(d, (760, 185), "Update every fee in one\nSETTINGS sheet.", width=1450,
              fnt=font(GEORGIA_BOLD, 72), fill=NAVY, spacing=8)
    d.text((765, 410), "Yellow cells are editable • sources and checked dates included", font=font(ARIAL, 31), fill=SLATE)
    settings = Image.open(SRC / "settings.png")
    paste_sheet(base, settings, (520, 545, 2240, 1430), crop=(0, 0, settings.width, 1120))
    d.rounded_rectangle((760, 1490, 1120, 1580), radius=22, fill="#FFF0C8")
    d.text((820, 1518), "US defaults", font=font(ARIAL_BOLD, 27), fill="#805A10")
    d.rounded_rectangle((1150, 1490, 1765, 1580), radius=22, fill=PALE)
    d.text((1210, 1518), "Verify before use", font=font(ARIAL_BOLD, 27), fill=NAVY)
    d.text((760, 1650), "Fees vary by country and date.", font=font(ARIAL, 27), fill=WHITE)
    save(base, "04-settings.jpg")


def build_dashboard() -> None:
    base = canvas("05-dashboard-bg.png")
    panel = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    ImageDraw.Draw(panel).rounded_rectangle((105, 65, 1230, 395), radius=38, fill=(255, 255, 255, 225))
    base.paste(panel, (0, 0), panel)
    d = ImageDraw.Draw(base)
    label(d, (175, 125), "Monthly overview")
    d.text((175, 190), "Profit dashboard", font=font(GEORGIA_BOLD, 80), fill=NAVY)
    d.text((180, 315), "Choose a month to review results from the ORDERS sheet.", font=font(ARIAL, 33), fill=SLATE)
    dashboard = Image.open(SRC / "dashboard.png")
    paste_sheet(base, dashboard, (235, 500, 2150, 1350))
    stats = ["Net sales", "Total fees", "Net profit", "Margin", "Order count"]
    x = 270
    for stat in stats:
        d.rounded_rectangle((x, 1430, x + 335, 1535), radius=22, fill=WHITE, outline="#C4D4DF", width=3)
        tw = d.textbbox((0, 0), stat, font=font(ARIAL_BOLD, 25))[2]
        d.text((x + (335 - tw) // 2, 1465), stat, font=font(ARIAL_BOLD, 25), fill=NAVY)
        x += 365
    d.rounded_rectangle((250, 1590, 1325, 1685), radius=20, fill=WHITE, outline="#C4D4DF", width=3)
    d.text((300, 1620), "The dashboard populates after you enter your own orders.", font=font(ARIAL, 27), fill=SLATE)
    save(base, "05-dashboard.jpg")


def mini_card(base: Image.Image, box: tuple[int, int, int, int], title: str, image: Image.Image | None, subtitle: str) -> None:
    x1, y1, x2, y2 = box
    d = ImageDraw.Draw(base)
    if image is not None:
        thumb = contain(image.convert("RGB"), (x2 - x1 - 55, 315))
        base.paste(thumb, (x1 + (x2 - x1 - thumb.width) // 2, y1 + 35))
    else:
        d.rounded_rectangle((x1 + 210, y1 + 55, x1 + 390, y1 + 245), radius=25, fill=NAVY)
        d.text((x1 + 250, y1 + 92), ".XLSX", font=font(ARIAL_BOLD, 28), fill=WHITE)
    d.text((x1 + 32, y1 + 365), title, font=font(ARIAL_BOLD, 31), fill=NAVY)
    multiline(d, (x1 + 32, y1 + 415), subtitle, width=x2 - x1 - 64, fnt=font(ARIAL, 24), fill=SLATE, spacing=8)


def build_included() -> None:
    base = canvas("06-whats-included-bg.png")
    d = ImageDraw.Draw(base)
    d.rectangle((0, 0, 2400, 230), fill=NAVY)
    d.text((120, 55), "WHAT YOU RECEIVE", font=font(ARIAL_BOLD, 31), fill=AMBER)
    d.text((120, 102), "One editable workbook. Everything in one file.", font=font(GEORGIA_BOLD, 54), fill=WHITE)
    cards = [
        ((170, 255, 820, 800), "START HERE", Image.open(SRC / "start-here.png"), "Quick instructions and model scope."),
        ((875, 255, 1525, 800), "SETTINGS", Image.open(SRC / "settings.png"), "Editable rates with source links."),
        ((1580, 255, 2230, 800), "ORDERS", Image.open(SRC / "orders.png").crop((0, 0, 6200, 1550)), "200 rows with automatic formulas."),
        ((170, 965, 820, 1510), "DASHBOARD", Image.open(SRC / "dashboard.png"), "Monthly profit summary."),
        ((875, 965, 1525, 1510), "8 EXAMPLES", Image.open(SRC / "example.png"), "Checked orders to audit the logic."),
        ((1580, 965, 2230, 1510), "1 EXCEL FILE", None, "Instant digital download. No subscription."),
    ]
    for box, title, image, subtitle in cards:
        mini_card(base, box, title, image, subtitle)
    d.text((120, 1665), "Independent product. Not affiliated with or endorsed by Etsy.", font=font(ARIAL, 25), fill=SLATE)
    save(base, "06-whats-included.jpg")


def main() -> None:
    build_primary()
    build_cover()
    build_orders()
    build_fees()
    build_settings()
    build_dashboard()
    build_included()
    print(f"Built 7 Etsy images in {OUT}")


if __name__ == "__main__":
    main()
