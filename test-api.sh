#!/bin/bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login -H 'Content-Type: application/json' -d @/tmp/test-login.json | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Token: ${TOKEN:0:20}..."
echo "--- recipes ---"
curl -s http://localhost:3001/api/recipes -H "Authorization: Bearer $TOKEN" | head -c 500
echo
echo "--- products ---"
curl -s http://localhost:3001/api/products -H "Authorization: Bearer $TOKEN" | head -c 500
echo
echo "--- cannings ---"
curl -s http://localhost:3001/api/cannings -H "Authorization: Bearer $TOKEN" | head -c 500
echo
echo "--- inventory ---"
curl -s http://localhost:3001/api/inventory -H "Authorization: Bearer $TOKEN" | head -c 500
echo
