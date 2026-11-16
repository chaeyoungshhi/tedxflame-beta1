#!/usr/bin/env bash
# Deploy the site to Cloudflare Pages.
# First time only: run `npx wrangler login` and approve in the browser.
set -euo pipefail
cd "$(dirname "$0")"
npx --yes wrangler@3.80.0 pages project create tedxflame-beta1 --production-branch main 2>/dev/null || true
npx --yes wrangler@3.80.0 pages deploy . --project-name tedxflame-beta1 --branch main --commit-dirty=true
