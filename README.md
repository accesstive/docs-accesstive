# Accesstive Docs

Source for the Accesstive documentation at **https://docs.accesstive.com**, built with [Mintlify](https://mintlify.com).

Accesstive is an accessibility compliance platform: find accessibility issues, fix them, and document your work.

## Structure

- `docs.json`: site settings and navigation
- `*.mdx`: one file per page (Getting started, FIND, FIX, PROVE, Account)
- `images/`: screenshots (sensitive data masked)
- `logo/`, `favicon.*`: branding

## Work locally

```bash
npm i -g mint
mint dev          # preview at http://localhost:3000
mint validate     # check the build
mint broken-links # check links
```

## Publish

Changes pushed to `main` are deployed automatically by Mintlify.

## Writing rules

- Plain, simple language. Second person ("you"), active voice.
- Bold for UI labels, for example **Save Settings**.
- No legal compliance guarantees.
- Prices come from https://accesstive.com/pricing/.
- Never include tokens, passwords, customer names, or customer URLs in text or screenshots.

## Contact

support@accesstive.com · info@accesstive.com
