# Thabot website refresh — implementation draft

Arabic-first and English static design for Thabot Technologies. This branch is a reviewable design foundation for the requested move to a ChatGPT-managed WordPress site and a Saudi payment gateway. It does not activate payments or migrate DNS.

## Included
- Crawlable Arabic and English pages; responsive navigation and service details.
- Clear separation of company services, the AI Employee #3 product under development, and the Al Hayathem development vision.
- Illustrative meeting, task and knowledge scenarios, with explicit demo labels.
- Project-brief preparation in the browser. No request is sent or stored; the visitor may open an email draft or copy it.
- Factual privacy explanation, canonical/hreflang tags, favicon, robots and sitemap.
- Existing public contact details retained from the previous site's config.

## Recommended operating setup
- WordPress.com hosting and WordPress content management, connected through the official WordPress.com ChatGPT plugin with site-scoped permissions.
- WooCommerce for approved service offers, orders and checkout.
- ClickPay as the first payment provider to assess: official WooCommerce integration and affiliation with Alinma Bank. Merchant approval, fees, supported payment methods and settlement to the company's bank account must be confirmed by the provider.
- Jetpack is a connection/services layer, particularly useful if WordPress is hosted by another provider. Sahabah is a separate hosting option, not a replacement for WordPress.
- Begin with clearly scoped paid discovery/consulting and fixed-scope implementation offers after prices, deliverables, fulfillment and refund terms are approved. Recurring support can follow; AI Employee subscriptions require a tested sellable product and verified recurring-payment compatibility.
- Customer service assistant, lead qualification and Odoo integration are later application work, not implemented in this static prototype.

## Readiness before live commerce
1. Select the WordPress target and enable its MCP access. The existing THABOT WordPress site was listed with site-level MCP access disabled.
2. Confirm a suitable hosting plan and its actual checkout price; no paid subscription has been purchased.
3. Port the reviewed content/design to editable WordPress blocks; configure WooCommerce and test-mode payment credentials securely on the server.
4. Approve product/service scope, prices, fulfillment, contact/legal company details and customer policies before accepting orders.
5. Test successful/failed/cancelled payments and authenticated callbacks; mark paid orders only after server-side verification. Reconcile amounts and currency, handle duplicate events, and test refunds in the sandbox where supported.
6. Complete merchant verification with ClickPay/Alinma and confirm the settlement account. No bank login or live payment secrets belong in source or chat.
7. Move the custom domain only when the new site is ready; preserve email DNS records and verify HTTPS on both apex and www.

## Domain observations
On the inspection performed for this task, the GitHub Pages project URL served the old site, but the custom domain did not. The apex A records point to GitHub Pages; www points to an older GitHub owner hostname. Current Pages custom-domain settings and HTTPS must be verified before changing DNS. Do not assume editing CNAME fixes the association.

## Validation
- JavaScript syntax checks passed.
- Static HTML checks: local links/assets, anchors, unique IDs and label/ARIA references passed; Arabic/English IDs match.
- Browser: Arabic demo tab switching and local email-draft preparation passed; no email was sent.
- Browser layout and English/mobile checks are recorded in the PR.
- No live payment, bank connection, WordPress import, DNS migration or production merge is included.

## Preview
Run `python scripts/prepare-preview.py` to assemble the static preview. The site itself needs no build or package installation. Keep local preview output ignored.

## Primary references
- https://wordpress.com/support/mcp/connect-chatgpt/
- https://wordpress.com/support/introduction-to-woocommerce/
- https://jetpack.com/
- https://sahabah.sa/services/shared-hosting/
- https://support.clickpay.com.sa/en/support/solutions/articles/73000560801-woocommerce-plugin
- https://support.clickpay.com.sa/en/support/solutions/articles/73000632868-going-live-from-scratch-guideline
- https://www.alinma.com/ar/corporate/cash-management/e-payment-gateway
