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
