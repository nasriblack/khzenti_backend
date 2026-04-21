# 📝 Khzenti API - Example Requests

This file contains example API requests for testing all endpoints using tools like Postman, Thunder Client, or cURL.

## Base URL
```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication

### 1. Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "amina@example.com",
  "password": "Amina123!",
  "name": "Amina Ben Ali"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "amina@example.com",
      "name": "Amina Ben Ali",
      "createdAt": "2026-04-12T10:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "amina@example.com",
  "password": "Amina123!"
}
```

### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

---

## 👤 User Profile

### 1. Get Profile
```http
GET /users/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 2. Update Profile
```http
PUT /users/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "Amina Ben Ali Updated",
  "preferences": {
    "favoriteColors": ["blue", "white", "beige"],
    "stylePreferences": ["modest", "modern", "elegant"],
    "sizes": {
      "top": "M",
      "bottom": "38",
      "dress": "M"
    }
  }
}
```

### 3. Get User Stats
```http
GET /users/stats
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 👗 Wardrobe Items

### 1. Add Item with Image
```http
POST /wardrobe
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

# Form Data:
name: Blue Kaftan
category: dress
color: blue
brand: Tunisian Traditional
size: M
season: ["summer", "spring"]
tags: ["traditional", "elegant", "modest"]
notes: Beautiful traditional kaftan for special occasions
image: [Select file]
```

### 2. Add Item without Image
```http
POST /wardrobe
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "White Blouse",
  "category": "top",
  "subcategory": "blouse",
  "color": "white",
  "brand": "Zara",
  "size": "M",
  "season": ["spring", "summer", "fall"],
  "tags": ["casual", "work", "versatile"],
  "notes": "Goes well with everything"
}
```

### 3. Get All Wardrobe Items
```http
GET /wardrobe
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Get Items with Filters
```http
GET /wardrobe?category=top&color=blue&season=summer
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 5. Get Single Item
```http
GET /wardrobe/:itemId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 6. Update Item
```http
PUT /wardrobe/:itemId
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "Blue Kaftan - Updated",
  "tags": ["traditional", "elegant", "modest", "favorite"]
}
```

### 7. Delete Item
```http
DELETE /wardrobe/:itemId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 👔 Outfits

### 1. Create Outfit
```http
POST /outfits
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "Summer Work Outfit",
  "occasion": "work",
  "season": "summer",
  "itemIds": ["item-id-1", "item-id-2", "item-id-3"],
  "notes": "Professional and comfortable for hot days"
}
```

### 2. Get All Outfits
```http
GET /outfits
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 3. Get Outfits with Filters
```http
GET /outfits?occasion=work&isFavorite=true
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Get Single Outfit
```http
GET /outfits/:outfitId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 5. Update Outfit
```http
PUT /outfits/:outfitId
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "Summer Work Outfit - Updated",
  "isFavorite": true,
  "itemIds": ["item-id-1", "item-id-2", "item-id-4"]
}
```

### 6. Delete Outfit
```http
DELETE /outfits/:outfitId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🤖 AI Recommendations

### 1. Get Outfit Recommendations
```http
POST /ai/recommendations
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "occasion": "work",
  "weather": "hot and sunny",
  "season": "summer",
  "preferences": {
    "colors": ["blue", "white", "beige"],
    "styles": ["professional", "modest"]
  }
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Recommendations generated successfully",
  "data": {
    "recommendations": [
      {
        "name": "Professional Summer Look",
        "itemIds": ["id1", "id2", "id3"],
        "reason": "This combination balances professionalism with comfort...",
        "stylingTips": "Pair with minimal jewelry..."
      }
    ],
    "context": {
      "occasion": "work",
      "weather": "hot and sunny",
      "season": "summer"
    }
  }
}
```

### 2. Analyze Outfit Combination
```http
POST /ai/analyze
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "itemIds": ["item-id-1", "item-id-2", "item-id-3"]
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Outfit analyzed successfully",
  "data": {
    "score": 8,
    "colorHarmony": "The colors complement each other well...",
    "styleCoherence": "The items create a cohesive professional look...",
    "culturalFit": "This outfit is appropriate for Tunisian workplace culture...",
    "suggestions": [
      "Consider adding a scarf for a more traditional touch",
      "Swap the shoes for closed-toe options for formal settings"
    ]
  }
}
```

---

## 🧪 Testing Workflow

### Step-by-Step Test Flow:

1. **Register a new user**
   ```
   POST /auth/register
   ```

2. **Save the access token** from the response

3. **Add some wardrobe items**
   ```
   POST /wardrobe (repeat 5-10 times with different items)
   ```

4. **Get all items to verify**
   ```
   GET /wardrobe
   ```

5. **Create an outfit**
   ```
   POST /outfits (use item IDs from step 3)
   ```

6. **Get AI recommendations**
   ```
   POST /ai/recommendations
   ```

7. **Analyze an outfit**
   ```
   POST /ai/analyze
   ```

---

## 📌 Common Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "error": "Item not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

---

## API Endpoints Overview

### Auth
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `GET /api/v1/users/stats` - Get user statistics

### Wardrobe
- `POST /api/v1/wardrobe` - Add wardrobe item (with image)
- `GET /api/v1/wardrobe` - Get all items
- `GET /api/v1/wardrobe/:id` - Get single item
- `PUT /api/v1/wardrobe/:id` - Update item
- `DELETE /api/v1/wardrobe/:id` - Delete item

### Outfits
- `POST /api/v1/outfits` - Create outfit
- `GET /api/v1/outfits` - Get all outfits
- `GET /api/v1/outfits/:id` - Get single outfit
- `PUT /api/v1/outfits/:id` - Update outfit
- `DELETE /api/v1/outfits/:id` - Delete outfit

### AI Recommendations
- `POST /api/v1/ai/recommendations` - Get AI outfit recommendations
- `POST /api/v1/ai/analyze` - Analyze outfit combination


---


## 🔗 Postman Collection

You can import these examples into Postman:
1. Create a new collection named "Khzenti API"
2. Create environment variables:
   - `baseUrl`: `http://localhost:5000/api/v1`
   - `accessToken`: `YOUR_TOKEN` (will be set automatically after login)
3. Add requests from this file
4. Use `{{baseUrl}}` and `{{accessToken}}` in your requests

---

## 💡 Tips

- Always include `Content-Type: application/json` header for JSON requests
- Use `multipart/form-data` for image uploads
- Store the access token after login/register for subsequent requests
- Test endpoints in order (register → login → other endpoints)
- Check response status codes and messages for debugging

---

