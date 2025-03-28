# Auth Router - /auth

## POST /auth/signup (signup)
input
```json
{
  "user": "string",
  "password": "string"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

## POST /auth/login (login)
input
```json
{
  "user": "string",
  "password": "string"
}
```
output
```json
{
  "token": "string",
  "msg": "string" // operation status report
}
```

## POST /auth/logout (verifyJWT, logout)
input
```json
{
  "token": "string"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

# Cart Router - /cart

## POST /cart (verifyJWT, addToCart)
input
```json
{
  "product_code": "string",
  "count": "integer"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

## GET /cart (verifyJWT, showCart)
input
None
output
```json
[
  {
    "product_code": "string",
    "display_name": "string",
    "count": "integer"
  }
]
```

## PUT /cart (verifyJWT, modifyItemCount)
input
```json
{
  "id": "string",
  "count": "integer"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

## DELETE /cart (verifyJWT, deleteItem)
input
```json
{
  "product_code": "string"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

## GET /cart/placeorder (verifyJWT, placeOrder)
input
None
output
```json
{
  "msg": "string" // operation status report
}
```

# Netmeds Router - /search

## GET /search/:query (searchProducts)
input
None
output
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
input
None
output
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
input
None
output
```json
[
  "string"
]
```

# Wishlist Router - /wishlist

## POST /wishlist (verifyJWT, addToWishlist)
input
```json
{
  "product_code": "string"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

## GET /wishlist (verifyJWT, fetchWishlist)
input
None
output
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
input
```json
{
  "item": "string"
}
```
output
```json
{
  "msg": "string" // operation status report
}
```

