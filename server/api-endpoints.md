# Auth Router - /auth

## POST /auth/signup (signup)
request.body
```json
{
  "user": "string",
  "password": "string"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

## POST /auth/login (login)
request.body
```json
{
  "user": "string",
  "password": "string"
}
```
response.json()
```json
{
  "token": "string",
  "msg": "string" // operation status report
}
```

## POST /auth/logout (verifyJWT, logout)
request.body
```json
{}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

# Cart Router - /cart

## POST /cart (verifyJWT, addToCart)
request.body
```json
{
  "product_code": "string",
  "count": "integer"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

## GET /cart (verifyJWT, showCart)
request.body
```json
{}
```
response.json()
```json
[
  {
    "product_code": "string",
    "display_name": "string",
    ..
    ..
    "count": "integer"
  }
]
```

## PUT /cart (verifyJWT, modifyItemCount)
request.body
```json
{
  "id": "string",
  "count": "integer"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

## DELETE /cart (verifyJWT, deleteItem)
request.body
```json
{
  "product_code": "string"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

## GET /cart/placeorder (verifyJWT, placeOrder)
request.body
```json
{}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

# Netmeds Router - /search

## GET /search/:query (searchProducts)
request.body
```json
{}
```
response.json()
```json
{
  "products": [
    {
      "product_code": "string",
      "display_name": "string",
      "price": "number"
    }
  ],
  "length": "integer",
  "msg": "string" // operation status report
}
```

## GET /search/id/:product_code (getProduct)
request.body
```json
{}
```
response.json()
```json
{
  "product_code": "string",
  "display_name": "string",
  "price": "number",
  "msg": "string" // operation status report
}
```

# Notification Router - /notifications

## GET /notifications (verifyJWT, getNotifications)
request.body
```json
{}
```
response.json()
```json
[
  "string"
]
```

# Wishlist Router - /wishlist

## POST /wishlist (verifyJWT, addToWishlist)
request.body
```json
{
  "product_code": "string"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```

## GET /wishlist (verifyJWT, fetchWishlist)
request.body
```json
{}
```
response.json()
```json
[
  {
    "product_code": "string",
    "display_name": "string",
    "price": "number"
  }
]
```

## DELETE /wishlist (verifyJWT, removeFromWishlist)
request.body
```json
{
  "item": "string"
}
```
response.json()
```json
{
  "msg": "string" // operation status report
}
```
