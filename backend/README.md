# TEAM-SHOPIFY

# TEAM-SHOPIFY API Documentation


## Installation & Setup
```
    git clone https://github.com/the-shopify-team/team-shopify.git
    python -m venv env
    source env/bin/activate             #For linux/Mac
    env/Scripts/activate                #For windows
    pip install -r requirements.txt
    python manage.py runserver
```

# My Collection API Documentation

### AUTH API DOCUMENTATION

## 1\. Signup(email)

- **Endpoint:** `POST /api/v1/auth/users/`
    
- **Description:** Endpoint to register a new user using email.
    
- **Method:** POST
    

### Request Parameters

- Typically, the request body will include user details such as:
    - `email` (string): User's email address
        
    - `password` (string): User's password
        
    - Other user profile fields as required by the API
        

### Example Request Body

``` json
{
    "username": "John",
    "email": "johndoe@gmail.com",
    "password": "thisismypassword"
}

 ```

### Example Responses

- Success (201 Created):
    
``` json
{
    "id": 4,
    "username": "John",
    "email": "johndoe@gmail.com",
    "phone": null
}
    
```
    
- Error (400 Bad Request):
    
``` json
{
    "You must provide either an email or phone number"
}
    
```
    

---

## 2\. Signup(phone)

- **Endpoint:** `POST /api/v1/auth/users/`
    
- **Description:** Endpoint to register a new user using phone number.
    
- **Method:** POST
    

### Request Parameters

- Typically, the request body will include user details such as:
    - `phone` (string): User's phone number
        
    - `password` (string): User's password
        
    - Other user profile fields as required by the API
        

### Example Request Body

``` json
{

    "username": "Jane",
    "phone": "+2341234567890",
    "password": "thisismypassword"

}

 ```

### Example Responses

- Success (201 Created):
    
``` json
{
    "id": 5,
    "username": "Jane",
    "email": null,
    "phone": "+2341234567890"
}
    
```
    
- Error (400 Bad Request):
    
``` json
{
    "You must provide either an email or phone number"
}
    
```
    

---

## 3\. Login(email)

- **Endpoint:** `POST /api/v1/auth/jwt/create`
    
- **Description:** Endpoint to authenticate a user using email and password, returning a JWT token.
    
- **Method:** POST
    

### Request Parameters

- Request body typically includes:
    - `email` (string): User's email address
        
    - `password` (string): User's password
        

### Example Request Body

``` json
{
  "email": "johndoe@gmail.com",
  "password": "thisismypassword"
}

```

### Example Responses

- Success (200 OK):
    
    ``` json
    {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
    }
    
     ```
    
- Error (401 Unauthorized):
    
    ``` json
    {
    "detail": "No active account found with the given credentials"
    }
    
     ```
    

---

## 4\. Login(phone)

- **Endpoint:** `POST /api/v1/auth/jwt/create`
    
- **Description:** Endpoint to authenticate a user using phone number and password, returning a JWT token.
    
- **Method:** POST
    

### Request Parameters

- Request body typically includes:
    - `email` (string): User's phone number
        
    - `password` (string): User's password
        

### Example Request Body

``` json
{
  "email": "+2341234567890",
  "password": "thisismypassword"
}

 ```

### Example Responses

- Success (200 OK):
    
    ``` json
    {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
    }
    
     ```
    
- Error (401 Unauthorized):
    
    ``` json
    {
    "detail": "No active account found with the given credentials"
    }
    
     ```
    

---


## 5\. Login(Guest)

- **Endpoint:** `POST /api/v1/auth/`
    
- **Description:** Endpoint to create a guest user.
    
- **Method:** POST
    

### Request Parameters

- Request body typically includes:
  **No Request Needed**
        

### Example Responses

- Success (200 OK):
    
    ``` json
    {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
    }
    
     ```

---

## 6\. Update User (both guest and normal user)

- **Endpoint:** `GET PUT /api/v1/auth/updateguest`
    
- **Description:** Endpoint to update user profile both guest and normal user.
    
- **Method:** GET
    

### Example Responses

- Success (200 OK):
    
``` json
{
    "username":"Username"
}
    
```


- **Method:** GET

### Request Parameters

- Request body typically includes:


        

### Example Responses

- Success (200 OK):
    
    ``` json
    {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
    }
    
     ```

---

# ADMIN PRODUCTS API DOCUMENTATION

These endpoints are accessible **only to superusers or admins**.

---

## 1. Create Car Product

* **Endpoint:** `POST /api/v1/admin-products/`
* **Description:** Adds a new car to the database. Only accessible to admin/superuser.
* **Method:** POST
* **Authentication:** Required (Superuser/Admin JWT)

### Request Body Example

```json
{
  "make": "Tesla",
  "model": "Model S Plaid",
  "year": 2024,
  "color": "Black",
  "price": 129990.00,
  "transmission": "automatic",
  "fuel_type": "electric",
  "license_plate": "TES-PLAID-001",
  "category": "Sedan",
  "description": "High-performance electric sedan with cutting-edge technology.",
  "images_url": [
    "https://example.com/images/tesla_model_s_front.jpg",
    "https://example.com/images/tesla_model_s_rear.jpg"
  ],
  "available": true
}
```

### Example Success Response (201 Created)

```json
{
  "id": 1,
  "make": "Tesla",
  "model": "Model S Plaid",
  "year": 2024,
  "color": ["Red", "Black"],
  "price": "129990.00",
  "transmission": "automatic",
  "fuel_type": "electric",
  "license_plate": "TES-PLAID-001",
  "category": "Sedan",
  "description": "High-performance electric sedan with cutting-edge technology.",
  "images_url": [
    "https://example.com/images/tesla_model_s_front.jpg",
    "https://example.com/images/tesla_model_s_rear.jpg"
  ],
  "available": true,
  "added_at": "2025-10-08"
}
```

---

## 2. Get All Car Products

* **Endpoint:** `GET /api/v1/admin-products/`
* **Description:** Retrieves a list of all car products.
* **Method:** GET
* **Authentication:** Required (Admin/Superuser or Read-only if public)

### Example Success Response (200 OK)

```json
[
  {
    "make": "Porsche",
    "model": "911 Carrera Cabriolet",
    "price": "135000.00",
    "images_url": "https://dfansamuqoojcgujsyxd.supabase.co/storage/v1/object/public/TEAM-SHOPIFY/car_images/63e3d16b4d7e965ac8856be429ca8153.webp?",
    "available": true
  },
  {
    "make": "Tesla",
    "model": "Model S Plaid",
    "price": "129990.00",
    "images_url": "h",
    "available": true
  }
]
```

---

## 3. Get Car Detail

* **Endpoint:** `GET /api/v1/admin-products/<int:id>/`
* **Description:** Retrieves detailed information about a specific car product by its ID.
* **Method:** GET
* **Authentication:** Required (Admin/Superuser or Read-only if public)

### Example Success Response (200 OK)

```json
{
  "id": 1,
  "make": "Tesla",
  "model": "Model S Plaid",
  "year": 2024,
  "color": "Red",
  "price": "129990.00",
  "transmission": "automatic",
  "fuel_type": "electric",
  "license_plate": "TES-PLAID-001",
  "category": "Sedan",
  "description": "High-performance electric sedan with cutting-edge technology.",
  "images_url": "https://dfansamuqoojcgujsyxd.supabase.co/storage/v1/object/public/TEAM-SHOPIFY/car_images/Tesla Model S Plaid new.jpg?",
  "added_at": "2025-10-08",
  "available": true
}
```

- Error (404 NOT FOUND):
    
``` json
{
    "message":"Car not found"
}
    
```


---


## 4. Update Car Product (Partial or Full)

* **Endpoint:** `PUT /api/v1/admin-products/<int:id>/`
* **Description:** Updates details of a specific car. Can be a **partial** update.
* **Method:** PUT
* **Authentication:** Required (Superuser/Admin)

### Request Body Example (Partial Update)

```json
{
  "price": 125000.00,
  "available": false
}
```

### Request Body Example (Full Update)

Use the same format as the **POST request body**, as shown above.

### Example Success Response (200 OK)

```json
{
  "id": 1,
  "make": "Tesla",
  "model": "Model S Plaid",
  "year": 2024,
  "color": ["Red", "Black"],
  "price": "125000.00",
  "transmission": "automatic",
  "fuel_type": "electric",
  "license_plate": "TES-PLAID-001",
  "category": "Sedan",
  "description": "Updated Tesla Plaid with price adjustment.",
  "images_url": [
    "https://example.com/images/tesla_model_s_front.jpg",
    "https://example.com/images/tesla_model_s_front.jpg",
    "https://example.com/images/tesla_model_s_front.jpg"
  ],
  "available": false,
  "added_at": "2025-10-08"
}
```


- Error (404 NOT FOUND):
    
``` json
{
    "message":"Car not found"
}
    
```

---

## 5. Delete Car Product

* **Endpoint:** `DELETE /api/v1/admin-products/<int:id>/`
* **Description:** Deletes a specific car product by ID.
* **Method:** DELETE
* **Authentication:** Required (Superuser/Admin)

### Example Success Response (204 No Content)

```json
{
  "detail": "Car removed successfully"
}
```

---

- Error (404 NOT FOUND):
    
``` json
{
    "message":"Car not found"
}
    
```

Would you like me to format it into a **Markdown README file** version (so you can copy it directly into your GitHub docs)? I can also include syntax highlighting and sections collapsible for readability.
