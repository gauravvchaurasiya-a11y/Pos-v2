# POS v2 candidate

A separate redesign of the POS interface. This repository does not replace or modify the original POS.

## Current status

Separate preview candidate. Cloud connection is disabled in config.js. The preview uses the approved product names and original photos with test stock of 1,000 per product, one dummy customer and no past sales. It supports browsing/cart/checkout preview, but refuses final bills and all saved changes. No shop backup, real customer details, past bill history, password, or private key is included. GitHub Pages is enabled for this separate preview while protected test-cloud setup is in progress. Browser-storage keys, cache cleanup and Firebase app identity are isolated from the original POS.

The interface has a dark list-based product view, mobile cart sheet, product details, and a gallery with a main image and up to six extra photos. Extra photos are resized to at most 600px and compressed to fit a conservative document budget. Product fields and photos save in one guarded transaction.

The cloud implementation uses Firebase Authentication and Firestore rules, rather than a local password hash. Visitors sign in anonymously without a visible login screen. Owner permissions are checked on the server. Final invoices require a successful online transaction.

## Files

- index.html: existing POS screens plus dark-theme styles and atomic product-gallery form.
- ui-v2.js: list checkout, cart sheet, product details and gallery. It does not replace cloud authentication or save logic.
- cloud-v2.js: guarded cloud reads/writes and final invoice transactions.
- demo-data.json: approved product catalog with test stock and dummy customer only.
- config.js: disabled connection template. Never store a password or private key in this public file.
- firestore.rules: candidate rules template for a separate test namespace. Do not paste over a production ruleset without preserving its existing private paths.
- setup.html: owner-only create-once test-data setup and POS-password linking. It cannot initialize an existing test shop again.
- prepare-migration.cjs: local-only backup transformer. Do not commit its input or output.
- sw.js and manifest.json: static-only caching and app metadata. The worker does not cache authentication or database requests.

## Before connecting any shop

Choose a separate test dataset and namespace/project. Replace all SET_* placeholders, check the namespace in both the client and rules, and verify rules against synthetic data before enabling the connection. Change mode from preview only when the test backend is ready and the remaining limit/password decisions are settled. Enabling a public repository does not make a database public. Billing must stay on the agreed free plan unless separately approved.

Do not connect this experimental copy to active inventory. A real-shop migration needs a billing pause on every old device, a fresh full backup, reconciliation of unsynced records, new POS-only admin credentials, and verified update of all billing devices. Keep the old backup and private archive.

## Candidate limits and differences

- The tested transaction shape supports 32 distinct products per invoice. This bound is not an accepted business limit until confirmed.
- Final bills cannot be issued offline. The cart is kept for retry.
- Visitors can view products, bills and customers and create final bills and zero-discount customers; product edits, existing-customer edits and old-payment amendments require owner authentication.
- Bulk import, restore and reset are disabled in the shared-authority path.
- The current complete-history refresh has not been optimized for large histories or heavy traffic. Firebase free quotas still apply.
- A POS-only email/password credential must be linked and tested before claiming password-admin setup complete. No password is included here.

## Validation

The candidate has passed emulator checkout/admin regression tests and bounded real-Firebase synthetic checkout tests. The latest UI passed actual Chrome checks at 320, 390, 768 and 1280px, including gallery save/remove visible on a second client and safe behavior on browser-cache quota failure. Final test-data setup, latest-rule real-service smoke test and any live migration remain separate work.
