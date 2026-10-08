# Formula checks

The eight rows below were calculated with the default `SETTINGS` values: $0.20 listing fee per item, 6.5% transaction fee, 3% + $0.25 US payment processing, 15% Offsite Ads, 0% regulatory operating fee, and the $100 Offsite Ads cap. Percentage fees use `max(item price × quantity + shipping − refund, 0)`. Each fee component is rounded to cents before total fees and net profit are calculated.

| # | Date | Listing | Item price | Shipping | Qty | Offsite Ad? | Etsy Ads | Refund | Net sales after refund | Expected total fees | Expected net profit |
|---:|---|---|---:|---:|---:|---|---:|---:|---:|---:|---:|
| 1 | 2026-09-03 | Ceramic mug | $28.00 | $6.00 | 1 | No | $0.00 | $0.00 | $34.00 | $3.68 | **$30.32** |
| 2 | 2026-09-05 | Wedding template | $18.00 | $0.00 | 2 | Yes | $0.00 | $0.00 | $36.00 | $9.47 | **$26.53** |
| 3 | 2026-09-08 | Silver necklace | $65.00 | $5.00 | 1 | Yes | $4.50 | $0.00 | $70.00 | $22.10 | **$47.90** |
| 4 | 2026-09-12 | Printable planner | $12.00 | $0.00 | 1 | No | $3.00 | $0.00 | $12.00 | $4.59 | **$7.41** |
| 5 | 2026-09-15 | Candle set | $24.00 | $8.00 | 3 | No | $0.00 | $20.00 | $60.00 | $6.55 | **$53.45** |
| 6 | 2026-09-18 | Knit pattern | $7.50 | $0.00 | 4 | Yes | $0.00 | $0.00 | $30.00 | $8.40 | **$21.60** |
| 7 | 2026-09-21 | Wall art | $45.00 | $0.00 | 1 | No | $2.25 | $45.00 | $0.00 | $2.45 | **-$2.45** |
| 8 | 2026-09-24 | Leather journal | $38.00 | $7.00 | 2 | Yes | $1.50 | $10.00 | $73.00 | $20.04 | **$52.96** |

## Reconciliation

- Row 1: `$34.00 − ($0.20 + $2.21 + $1.27) = $30.32`.
- Row 2: `$36.00 − ($0.40 + $2.34 + $1.33 + $5.40) = $26.53`.
- Row 3: `$70.00 − ($0.20 + $4.55 + $2.35 + $10.50 + $4.50) = $47.90`.
- Row 4: `$12.00 − ($0.20 + $0.78 + $0.61 + $3.00) = $7.41`.
- Row 5: `$60.00 − ($0.60 + $3.90 + $2.05) = $53.45`.
- Row 6: `$30.00 − ($0.80 + $1.95 + $1.15 + $4.50) = $21.60`.
- Row 7: `$0.00 − ($0.20 + $2.25) = -$2.45`.
- Row 8: `$73.00 − ($0.40 + $4.75 + $2.44 + $10.95 + $1.50) = $52.96`.

All eight workbook results matched these expected values, and the final formula-error scan returned no matches.

