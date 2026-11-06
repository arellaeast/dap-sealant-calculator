# DAP Sealant Calculator (Concept Demo)

A caulk and sealant coverage calculator styled to fit the DAP brand: black header, slanted logo plaque, orange call-to-action buttons, and the Pro / DIY experience toggle from dap.com.

**Live demo:** https://arellaeast.github.io/dap-sealant-calculator/

## What it does

- Enter project length, number of identical joints, joint width, joint depth, tube size and a waste factor
- Get exact tube counts for the 10.1 oz cartridge and the 5.5 oz squeeze tube, total ounces needed, linear feet per tube at your joint size, and case counts (12 per case) for pros
- Fraction chips (1/8", 3/16", 1/4", 3/8", 1/2") for fast width and depth entry
- Pro / DIY toggle like dap.com's "Choose your experience" bar: Pro defaults to cartridges and case math, DIY defaults to squeeze tubes and homeowner hints
- Warnings when a joint is over the 1/2" x 1/2" maximum most DAP latex sealants allow, or when depth breaks the ideal 1:2 depth-to-width ratio, with a backer rod recommendation
- Quick coverage table and a "How to Measure Your Joint" guide

## The math

Joint volume = total length (in) x width (in) x depth (in), converted at 1 fl oz = 1.80469 cubic inches, plus the waste factor, divided by tube size, rounded up.

Cross-check against published data: a 3/16" round bead works out to about 55 linear feet per 10.1 oz cartridge, which matches the coverage DAP publishes for Alex Plus. Rectangular joints use slightly more product than a round bead, so the calculator runs a touch conservative on purpose.

## Why this exists

Built by Jacob East as a demo for a Website Manager application at DAP Global Inc. in Baltimore. The research behind it found that no major sealant brand (DAP, GE Sealants, Gorilla) offers a coverage calculator on its own site, while third-party calculator sites collect that search traffic. This is the fix, in DAP's own brand language.

## Run it locally

No build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Disclaimer

Independent concept prototype. Not an official DAP product, and not affiliated with or endorsed by DAP Products Inc. or RPM International. Coverage figures are estimates based on DAP published technical data. Always check the technical data sheet for your specific product.
