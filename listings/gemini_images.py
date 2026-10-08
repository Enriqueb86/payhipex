"""Generate the six listing images from environment-only credentials.

Install the Google Gen AI SDK separately, then set GEMINI_API_KEY in the
environment. The key is never logged or written to disk. This script makes at
most eight generation calls and writes only image files under listings/images.
"""

from __future__ import annotations

import os
from pathlib import Path

from google import genai
from google.genai import types


ROOT = Path(__file__).resolve().parent
OUTPUT_DIR = ROOT / "images"
PRIMARY_MODEL = "gemini-nano-banana-2.1"
FALLBACK_MODEL = "gemini-3.1-flash-image"
MAX_CALLS = 8

PROMPTS = [
    ("01-cover-4x5.png", "Clean premium digital-product cover, 4:5 portrait composition, showing a polished laptop with an Excel-style profit tracker workbook open, navy and soft-blue spreadsheet interface with warm amber input cells, a few large readable labels only: Seller Profit Tracker, After Fees, and Excel Workbook, crisp studio lighting, white background, subtle paper ledger accents, no faces, no Etsy logo, no brand logos, no ratings, no sales claims, no tiny text, realistic product photography, high legibility."),
    ("02-orders-sheet-4x5.png", "Close product screenshot mockup in a 4:5 portrait layout, laptop display showing the ORDERS sheet of a seller profit tracker, clearly visible columns for Date, Listing, Item Price, Shipping, Quantity, Offsite Ad, Etsy Ads, Refund, Total Fees, and Net Profit, yellow editable cells and pale-blue calculated cells, navy table header, clean realistic spreadsheet, readable large text, minimal white background, no faces, no Etsy logo, no other brands, no illegible microcopy."),
    ("03-dashboard-4x5.png", "Premium spreadsheet dashboard product image, 4:5 portrait, clean desktop monitor showing a monthly seller profit dashboard with four readable metrics: Net Sales, Total Fees, Net Profit, and Margin, plus Orders with Offsite Ads, navy and soft-blue design with one warm amber month selector, realistic Excel-style workbook, generous whitespace, crisp type, no faces, no Etsy logo, no third-party logos, no false sales claims, no unreadable text."),
    ("04-net-detail-4x5.png", "Macro product image focused on one spreadsheet order row, 4:5 portrait, visually trace a $70.00 order through listing fee, transaction fee, payment processing, Offsite Ads, Etsy Ads spend, total fees, and a clearly readable $47.90 net profit, subtle highlight around the final net cell, clean navy-blue and amber workbook style, realistic screen texture, no faces, no Etsy logo, no brand logos, no tiny text, no guarantee language."),
    ("05-desk-mockup-4x5.png", "Clean home-office product mockup, 4:5 portrait, modern desk with laptop showing a seller profit tracker spreadsheet, small notebook and calculator nearby, soft daylight, neutral white and navy color story with amber accents, organized and credible rather than luxurious, screen content readable at a glance, no people, no hands, no Etsy logo, no other brand logos, no reviews, no revenue claims, no illegible text."),
    ("06-square-thumbnail.png", "High-contrast square marketplace thumbnail, 1:1, laptop with a clear spreadsheet dashboard centered, bold readable title limited to Seller Profit Tracker and small secondary line After Fees, navy background block, soft-blue table cells, warm amber highlight on net profit, clean premium digital download presentation, strong composition that remains legible when small, no faces, no Etsy logo, no third-party logos, no ratings, no tiny text."),
]


def image_bytes(response: object) -> bytes:
    for candidate in getattr(response, "candidates", []) or []:
        content = getattr(candidate, "content", None)
        for part in getattr(content, "parts", []) or []:
            inline = getattr(part, "inline_data", None)
            data = getattr(inline, "data", None)
            if data:
                return data
    raise RuntimeError("The model response did not contain image data.")


def main() -> None:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY is not set. No API calls were made.")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    client = genai.Client(api_key=api_key)
    model = PRIMARY_MODEL
    calls = 0

    for filename, prompt in PROMPTS:
        if calls >= MAX_CALLS:
            raise RuntimeError("Stopped at the eight-call safety limit.")
        try:
            calls += 1
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(image_size="1K"),
                ),
            )
        except Exception:
            if model != PRIMARY_MODEL or calls >= MAX_CALLS:
                raise
            model = FALLBACK_MODEL
            calls += 1
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(image_size="1K"),
                ),
            )
        (OUTPUT_DIR / filename).write_bytes(image_bytes(response))

    print(f"Generated {len(PROMPTS)} images in {OUTPUT_DIR} using {calls} calls.")


if __name__ == "__main__":
    main()

