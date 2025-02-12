# Overview
A RESTful API built with TypeScript, Express.js, MongoDB, and Zod for schema validation.

# Features
- TypeScript: Provides static typing for enhanced code quality and developer experience.
- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- MongoDB with Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
- Zod: TypeScript-first schema declaration and validation library.
- JWT Authentication: Secure authentication using JSON Web Tokens.
- User and Product Management: Endpoints to manage users and products.

# Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Postman

# Installation
1. Clone the repository:
```
git clone https://github.com/kikani-parth/ts-zod-rest-api.git
cd ts-zod-rest-api
```
2. Install dependencies:
```
npm install
```
3. Set up environment variables:

Create a .env file in the root directory and add the following variables:
```
PRIVATE_KEY=your_private_key_here
```
Generate a 2048 bit RSA Private key and base64 encode it. Then, replace your_private_key_here with your base64 encoded key.
- Generate new keys: https://travistidwell.com/jsencrypt/demo/
- Base64 encode the keys: https://www.base64encode.org/

4. Start the server:
```
npm run dev
```

# API Endpoints
- Health Check: GET /healthcheck
- User Registration: POST /api/users
- User Login: POST /api/sessions
- Get User Sessions: GET /api/sessions
- Delete Session: DELETE /api/sessions
- Create Product: POST /api/products
- Update Product: PUT /api/products/:productId
- Get Product: GET /api/products/:productId
- Delete Product: DELETE /api/products/:productId

# Schema Validation
This project utilizes Zod for schema validation, ensuring that the data structures are correct and preventing potential runtime errors.

# Error Handling
Comprehensive error handling is implemented to provide meaningful error messages and appropriate HTTP status codes for various failure scenarios.

# References
- <a href="https://www.youtube.com/watch?v=BWUi6BS9T5Y" target="_blank">YouTube Tutorial</a>
- More info and help can be found here: https://github.com/TomDoesTech/REST-API-Tutorial-Updated
