#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   export PROJECT_ID=...
#   export REGION=us-central1
#   export IMAGE=gcr.io/$PROJECT_ID/viize-vision-parking:latest
#   ./deploy/cloudrun/deploy.sh

: "${PROJECT_ID:?Need PROJECT_ID}"
: "${REGION:=us-central1}"
: "${SERVICE:=viize-vision-parking}"
: "${IMAGE:=gcr.io/$PROJECT_ID/viize-vision-parking:latest}"

echo "Building container..."
gcloud builds submit --project "$PROJECT_ID" --tag "$IMAGE" .

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --image "$IMAGE" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "NODE_ENV=production"

echo "Done."
