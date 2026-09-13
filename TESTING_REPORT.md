# Testing Report, Healing Tracker V2

Date: 2026-09-13. Scope: the version deployed to https://poliinternational.com/healing-tracker/.

This report lists what was actually run. It is not a certification of medical accuracy, accessibility conformance or legal compliance.

## Automated browser checks (headless Chromium, Playwright)

A script served the tool locally, then:

1. Chose piercing, helix, procedure date 20 days ago, and started tracking.
2. Logged three entries on consecutive days with rising redness and swelling (1, 2, 3), tension ratings, and a photo on the last one.
3. Clicked Generate Health Report, Generate Infographic, answered one allergy screener question and assessed, and ran the ingredient scanner.
4. Screenshotted every results section, the side panel and the photo lightbox.

Checked after each run:

| Check | English 1280px | French 390px | German 1280px | Spanish 1280px | Portuguese 390px |
|---|---|---|---|---|---|
| JavaScript errors and console errors | none | none | none | none | none |
| Untranslated raw keys on screen | none | none | none | none | none |
| Horizontal overflow | none | none | none | none | none |
| Current stage marked and shown in side panel | yes | yes | yes | yes | yes |
| Trend alert shown with values filled in | yes | yes | yes | yes | yes |
| Tension gauge visible and reading the log | yes | yes | yes | yes | yes |
| Health report built from the log | yes | yes | yes | yes | yes |

Also run:

- Overflow scan of the page at 360, 390, 768, 1024 and 1280px: no element wider than the viewport.
- All four tabs open; language selector offers seven languages and switches the page.
- Touch-Up Timeline calculator in French: submitted, results and reminder card rendered, all sub-tabs opened, no errors.
- Translation audit in browser load order (`<lang>.js` then `<lang>-timeline.js`): no missing keys in any language; remaining values identical to English are proper names (Helix, Tragus, Prince Albert and similar) and tattoo style names.

## Unit tests

`tests/tools/healing-tracker.test.js` in the website repository: module loads with the translation engine; checklist and both timeline generators run without throwing. The full site suite (279 tests) passed.

## Not tested

- Real devices and screen readers.
- Printing and PDF output beyond opening the print view.
- Clipboard copy in browsers that deny permission (the code falls back to a text selection copy).
- Behaviour when browser storage is full, beyond reading the storage meter.
- Clinical content of the timelines and tips; it is guidance written for studio clients, not medical advice.

## Known limitations

- All seven language dictionaries load with the page (about 1.1 MB before compression).
- The translated user guides and technical documents in other languages were not updated with this release; the English documents in `docs/` are current.
