#!/bin/bash

echo "Testing tRPC endpoints..."

# Test train.checkQueueEmpty
echo "1. Testing train.checkQueueEmpty..."
curl -X POST http://localhost:3000/api/trpc/train.checkQueueEmpty \
  -H "Content-Type: application/json" \
  -d '{}' 2>/dev/null | jq .

echo ""

# Test train.start
echo "2. Testing train.start..."
curl -X POST http://localhost:3000/api/trpc/train.start \
  -H "Content-Type: application/json" \
  -d '{"epochs": 5, "learningRate": 0.001, "batchSize": 32}' 2>/dev/null | jq .

echo ""

# Test train.stop
echo "3. Testing train.stop..."
curl -X POST http://localhost:3000/api/trpc/train.stop \
  -H "Content-Type: application/json" \
  -d '{}' 2>/dev/null | jq .

echo ""
echo "tRPC tests completed!"
