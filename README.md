## Installation

 - Download/install Nodejs

 - Install package for Project using command: `npm install`

 - Create .env file to configure for project
   
 - Download/install PostgreSQL

    - Create database with name:
        - `storefront` for dev environment
        - `storefront_test` for testing environment

    - Create username/password to access database: `postgres/admin123`

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

 - Some endpoints in the project:
    - User
        ```
            - GET	    /users          Get all users
            - GET       /users/:id      Get a user by Id
            - POST      /users          Create a new user
            - POST      /users/login    Authenticate user
            - DELETE    /users/:id      Delete a user by Id
        ```


    - Product
        ```
            - GET	    /products                           Get all products
            - GET	    /products/:id                       Get a product by Id
            - GET	    /products/topFivePopular            Get top 5 most popular products
            - GET	    /products/getByCategory/:name       Get products by category name
            - POST	    /products                           Create a new product
            - DELETE    /products/:id                       Delete a product by Id
        ```

    - Orders
        ```
            - GET       /orders/:userId                     Get orders by user
            - POST	    /orders                             Create a new order
            - PATCH	    /orders/updateStatus/:userId        Complete order by user
        ```