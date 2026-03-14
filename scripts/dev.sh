#!/bin/bash
cd $(dirname $0)/..
exec npx next dev --port 5000
