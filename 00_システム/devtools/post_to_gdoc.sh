#!/bin/bash

# Google Docs Integration Config
GAS_WEB_APP_URL="https://script.google.com/macros/s/AKfycbxMt0TZGnEXU0tQjb9xbQn9NRtdIOZ875AnhVyBKoCLKMKcbJ2I6XTp3ZwCRvEO-UVK/exec"

# Function to post content to Google Doc
post_to_google_doc() {
    local title="$1"
    local body="$2"
    local date=$(date +%Y-%m-%d)
    
    # Escape json content
    local json_payload=$(jq -n \
                  --arg title "$title" \
                  --arg body "$body" \
                  --arg date "$date" \
                  '{title: $title, body: $body, date: $date}')

    # Send request
    curl -L -X POST -H "Content-Type: application/json" -d "$json_payload" "$GAS_WEB_APP_URL"
}

# Check if run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    if [[ $# -lt 2 ]]; then
        echo "Usage: $0 <title> <body>"
        exit 1
    fi
    post_to_google_doc "$1" "$2"
fi
