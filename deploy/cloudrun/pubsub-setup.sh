#!/usr/bin/env bash
set -euo pipefail

# Creates a Pub/Sub topic for edge events (optional).
# export PROJECT_ID=...
# export TOPIC=viize-edge-events
# ./deploy/cloudrun/pubsub-setup.sh

: "${PROJECT_ID:?Need PROJECT_ID}"
: "${TOPIC:=viize-edge-events}"

gcloud pubsub topics create "$TOPIC" --project "$PROJECT_ID" || true
echo "Topic ready: $TOPIC"
