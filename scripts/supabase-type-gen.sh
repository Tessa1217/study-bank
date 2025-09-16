#!/bin/bash

OUTPUT_PATH="./src/types/supabase.types.ts"

PROJECT_REF=$(grep VITE_APP_PROJECT_ID .env | cut -d '=' -f2-)

if ! command -v npx &> /dev/null
then
    echo "❌ npx not found. Please install Node.js/npm first."
    exit 1
fi

echo "🔄 Generating Supabase types from project $PROJECT_REF..."
npx supabase gen types typescript --project-id $PROJECT_REF > "$OUTPUT_PATH"

if [ $? -eq 0 ]; then
  echo "✅ Types generated at $OUTPUT_PATH"
else
  echo "❌ Failed to generate types"
fi