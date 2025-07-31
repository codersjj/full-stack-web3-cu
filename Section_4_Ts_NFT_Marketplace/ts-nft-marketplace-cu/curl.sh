curl --request POST \
  --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer YOUR_CIRCLE_API_KEY' \
  --data '
{
  "idempotencyKey": "e8d7b92c-156e-4e18-ac58-42b0e14a1ff4",
  "address": "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "chain": "ETH-SEPOLIA"
}
'