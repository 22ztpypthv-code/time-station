#!/bin/bash
set -e
cd "$(dirname "$0")"
pnpm install
./node_modules/.bin/next build
