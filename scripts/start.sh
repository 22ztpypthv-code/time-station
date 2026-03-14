#!/bin/bash
cd $(dirname $0)/..
exec npx next start --port 5000 --host 0.0.0.0
