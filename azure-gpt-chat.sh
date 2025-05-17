#!/bin/bash
# Usage: ./azure-gpt-chat.sh "your prompt here"

API_KEY="cb1424123c75471992769d92fed55a0f"
DEPLOYMENT_NAME="gpt-4-1-deployment"
ENDPOINT="https://swedencentral.api.cognitive.microsoft.com/openai"
API_VERSION="2024-12-01-preview"

PROMPT="$1"

curl -s \
  -H "api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"${PROMPT}\"}],\"max_tokens\":150}" \
  "$ENDPOINT/deployments/$DEPLOYMENT_NAME/chat/completions?api-version=$API_VERSION" | jq .
