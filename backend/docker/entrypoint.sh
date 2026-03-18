#!/bin/sh
set -e

echo "Running migrations..."
node build/ace.js migration:run --force

echo "Starting server..."
node build/bin/server.js

