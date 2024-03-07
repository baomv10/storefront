## Installation

 - Download/install Nodejs

 - Install package for Project using command: `npm install`

 - Create .env file to configure for project
   
 - Download/install PostgreSQL

    - Create database with name:
        - `storefront` for dev environment
        - `storefront_test` for testing environment

    - Create username/password to access database: `postgres/admin123`

    - Connect to PostgreSQL with port: `5432`

 - Here is a example of .env file:
    ```
        POSTGRES_HOST=127.0.0.1
        POSTGRES_DB=storefront
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=admin123
        POSTGRES_TEST_DB=storefront_test
        ENV=dev
        SALT_ROUNDS=10
        TOKEN_SECRET=abc
    ```

 - Update database.json file using for migrations
    ```
        {
            "dev": {
                "driver": "pg",
                "host": "127.0.0.1",
                "database": "storefront",
                "user": "postgres",
                "password": "admin123"
            },
            "test": {
                "driver": "pg",
                "host": "127.0.0.1",
                "database": "storefront_test",
                "user": "postgres",
                "password": "admin123"
            }
        }
    ```
 - Run migrations using command: `db-migrate up`

 - Start project using command: `npm start`

 - Run unit test using command: `npm test`

 - Base URL:  `http://localhost:3000`

 - Endpoints:

     - User
 
    ```
    -   GET         /users          Get all users
        Response: 
        {
            "success": true,
            "data": [
                {
                    "id": "3e73855d-c668-41f0-9f66-c35050b8fcdc",
                    "firstname": "John",
                    "lastname": "Doe",
                    "password": ""
                },
            ],
            "error": null
        }
    ```
    ```
    -   GET         /users/:id      Get a user by Id
        Request: /users/3e73855d-c668-41f0-9f66-c35050b8fcdc
        Response: 
        {
            "success": true,
            "data": {
                "id": "3e73855d-c668-41f0-9f66-c35050b8fcdc",
                "firstname": "John",
                "lastname": "Doe",
                "password": ""
            },
            "error": null
        }
    ```
    ```
    -   POST        /users          Create a new user

        Request: 
        {
            "password": "abc123",
            "firstName":"John",
            "lastName":"Doe"
        }

        Response: 
        {
            "success": true,
            "data": {
                "token": "",
                "userInfo": {
                    "id": "3e73855d-c668-41f0-9f66-c35050b8fcdc",
                    "firstname": "John",
                    "lastname": "Doe",
                    "password": ""
                }
            },
            "error": null
        }
    ```
    ```
    -   Delete      /users/:id      Delete a user by Id
        Request: /users/3e73855d-c668-41f0-9f66-c35050b8fcdc
        Response: 
        {
            "success": true,
            "data": {
                "id": "3e73855d-c668-41f0-9f66-c35050b8fcdc",
                "firstname": "John",
                "lastname": "Doe"
            },
            "error": null
        }
    ```

 - Product
 
    ```
    -   GET         /products           Get all products
        Response: 
        {
            "success": true,
            "data": [{
                "id": "da62c9ae-277f-4659-8fb5-e23c40d74cf6",
                "name": "iphone15",
                "price": "1000.99",
                "category": "phone"
            }],
            "error": null
        }
    ```
    ```
    -   GET         /products/:id       Get a product by Id
        Request: /products/da62c9ae-277f-4659-8fb5-e23c40d74cf6
        Response: 
        {
            "success": true,
            "data": {
                "id": "da62c9ae-277f-4659-8fb5-e23c40d74cf6",
                "name": "iphone15",
                "price": "1000.99",
                "category": "phone"
            },
            "error": null
        }
    ```
    ```
    -   GET         /products/topFivePopular        Get top 5 most popular products
        Response: 
        {
            "success": true,
            "data": [
                {
                    "id": "bfc95b64-cd06-4204-a701-75d21873c294",
                    "name": "iphone",
                    "price": "5000.23",
                    "category": "phone"
                },
            ],
            "error": null
        }
    ```
    ```
    -   GET     /products/getByCategory/:name       Get products by category name
        Request: /products/getByCategory/phone
        Response: 
        {
            "success": true,
            "data": {
                "id": "bfc95b64-cd06-4204-a701-75d21873c294",
                "name": "iphone",
                "price": "5000.23",
                "category": "phone"
            },
            "error": null
        }
    ```
    ```
    -   POST        /products               Create a new product
        Request:
        {
            "name":"iphone15",
            "price":1000.99,
            "category":"phone"
        }

        Response: 
        {
            "success": true,
            "data": {
                "id": "da62c9ae-277f-4659-8fb5-e23c40d74cf6",
                "name": "iphone15",
                "price": "1000.99",
                "category": "phone"
            },
            "error": null
        }
    ```
    ```
    -   DELETE      /products/:id           Delete a product by Id
        Request: /products/da62c9ae-277f-4659-8fb5-e23c40d74cf6 
        Response: 
        {
            "success": true,
            "data": {
                "id": "da62c9ae-277f-4659-8fb5-e23c40d74cf6",
                "name": "iphone15",
                "price": "1000.99",
                "category": "phone"
            },
            "error": null
        }
    ```

- Order
 
    ```
    -   GET         /orders/:userId         Get orders by user
        Request: /orders/3dcaa358-cc94-446b-9040-b9152cb60571
        Response: 
        {
            "success": true,
            "data": [
                {
                    "id": "f1d83aa3-7504-4fb9-917f-cb786514c7e2",
                    "productid": "02e8de4c-613d-4628-887d-19accc919386",
                    "quantity": 2,
                    "userid": "3dcaa358-cc94-446b-9040-b9152cb60571",
                    "status": "Active"
                }
            ],
            "error": null
        }
    ```
    ```
    -   POST        /orders             Create a new order
        Request: 
        {
            "userId":"3dcaa358-cc94-446b-9040-b9152cb60571",
            "status":"Active",
            "orderDetails":[
                {
                    "productId": "02e8de4c-613d-4628-887d-19accc919386",
                    "quantity":2
                }
            ]
        }

        Response: 
        {
            "success": true,
            "data": true,
            "error": null
        }
    ```
    ```
    -   PATCH       /orders/updateStatus/:userId        Complete order by user
        Request: /orders/updateStatus/3dcaa358-cc94-446b-9040-b9152cb60571
        Response: 
        {
            "success": true,
            "data": true,
            "error": null
        }
    ```