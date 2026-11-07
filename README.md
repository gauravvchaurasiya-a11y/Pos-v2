# POS v2 test shop

A separate redesign of the POS interface. This repository does not replace or modify the original POS.

## Current status

Cloud-connected separate test shop at https://gauravvchaurasiya-a11y.github.io/Pos-v2/. Uses original product names/photos, test stock of 1,000 per product and dummy customers. Visitors can create and view test bills without a visible login screen. Owner administration uses a POS-only Firebase password or the owner's Google sign-in. It does not connect to the original shop inventory. No backup, real customer history, passwords or private keys are included.

Two cancelled setup-verification invoices remain for audit. Neither was an actual sale/payment. Test stock was restored after verification.

The interface has a dark list-based product view, mobile cart sheet, product details, and a gallery with a main image and up to six extra photos. Extra photos are resized to at most 600px and compressed to fit a conservative document budget. Product fields and photos save in one guarded transaction.

The cloud implementation uses Firebase Authentication and Firestore rules, rather than a local password hash. Visitors sign in anonymously without a visible login screen. Owner permissions are checked on the server. Final invoices require a successful online transaction.

## Files

- index.html: existing POS screens plus dark-theme styles and atomic product-gallery form.
- ui-v2.js: list checkout, cart sheet, product details and gallery. It does not replace cloud authentication or save logic.
- cloud-v2.js: guarded cloud reads/writes and final invoice transactions.
- demo-data.json: approved product catalog with test stock and dummy customer only.
- config.js: separate test-cloud connection. Never store a password or private key in this public file.
- firestore.rules: candidate rules template for a separate test namespace. Do not paste over a production ruleset without preserving its existing private paths.
- setup.html: owner-only create-once test-data setup and POS-password linking. It cannot initialize an existing test shop again.
- prepare-migration.cjs: local-only backup transformer. Do not commit its input or output.
- sw.js and manifest.json: static-only caching and app metadata. The worker does not cache authentication or database requests.

## Before connecting any shop

Choose a separate test dataset and namespace/project. For another installation, replace all SET_* placeholders, check the namespace in both the client and rules, and verify rules against synthetic data before enabling the connection. This test shop is connected after completion of those checks. Enabling a public repository does not make a database public. Billing must stay on the agreed free plan unless separately approved.

Do not connect this experimental copy to active inventory. A real-shop migration needs a billing pause on every old device, a fresh full backup, reconciliation of unsynced records, new POS-only admin credentials, and verified update of all billing devices. Keep the old backup and private archive.

## Candidate limits and differences

- The tested transaction shape supports 32 distinct products per invoice. The owner accepted this bound.
- Final bills cannot be issued offline. The cart is kept for retry.
- Visitors can view products, bills and customers and create final bills and zero-discount customers; product edits, existing-customer edits and old-payment amendments require owner authentication.
- Bulk import, restore and reset are disabled in the shared-authority path.
- The current complete-history refresh has not been optimized for large histories or heavy traffic. Firebase free quotas still apply.
- POS-only email/password sign-in is linked to the existing owner and has been verified after signing out. No password is included here.

## Validation

The candidate has passed emulator checkout/admin regression tests and bounded real-Firebase synthetic checkout tests. The latest UI passed actual Chrome checks at 320, 390, 768 and 1280px, including gallery save/remove visible on a second client and safe behavior on browser-cache quota failure. The separate test dataset and a real cloud 32-product invoice with fractional discounts and 32 photos have been verified. A real-shop migration remains separate work.
