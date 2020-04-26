

# Library API Using JSON Web Token Authentication
## Flowchart
![Flowchart library app](https://user-images.githubusercontent.com/64117390/80322212-bcd29c80-884d-11ea-9d45-37565f130d4b.jpg)

## POST /auth/register

Respon body

```sh
{
    "status": 200,
    "data": {
        "id": 30,
        "email": "admin@admin.com",
        "role": "1"
    }
}
```
If email already exist
```sh
{
    "status": 500,
    "data": {
        "message": "Email already exist!"
    }
}
```

## POST /auth/login
Respon body
```sh
{
    "status": 200,
    "data": {
        "id": 28,
        "email": "user@user.com",
        "role": 2,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjI4LCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoyfSwiaWF0IjoxNTg3OTQwODMwLCJleHAiOjE1ODc5NDA4NTB9.UWk6vgRHejy_EEPhPaQZxjMvsHpISZoFVNcDhUt-fck",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjI4LCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoyfSwiaWF0IjoxNTg3OTQwODMwfQ.63ScfXL_oVdfoZGeW_Q0U82TPcgt_lpuH7_TwJ1Y7LQ"
    }
}
```
If email or password are wrong

```sh
{
    "status": 500,
    "data": {
        "message": "Invalid email or password"
    }
}
```
## POST /auth/token
Fill the refresh token to body to get new token
## GET /books
 - If no page and limit specified, return result with default page=1 and limit=4
 - Fill the token to header authorization
 
 Respon body
```sh
{
    "status": 200,
    "data": [
        {
            "id": 5,
            "title": "Harry Potter #1: The Sorcerers Stone",
            "genre": "Fantasy",
            "author": "JK Rowling",
            "status": "Available",
            "image": "image-1587919121642.jpg",
            "updated_at": "2020-04-26T16:38:41.000Z",
            "created_at": "2020-04-26T16:38:41.000Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 4
    }
}
```
Respon body if header authorization not filled with token
```sh
{
    "status": 401,
    "data": {
        "message": "JsonWebTokenError"
    }
}
```
Respon body if token expired
```sh
{
    "status": 401,
    "data": {
        "message": "TokenExpiredError"
    }
}
```
# HTTP
| HTTP METHOD | POST | GET | UPDATE | DELETE
| ------ | ------ | ------ | ------ | ------ |
| CRUD | CREATE | READ | UPDATE | DELETE
| /books | Create new books | List book | Description Update | Delete books

# Packages
- express
- mysql
- body-parser
- nodemon
- morgan
- multer
- cors
- jsonwebtoken
- bcrypt
- dotenv

