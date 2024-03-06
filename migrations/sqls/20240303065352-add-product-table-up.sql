CREATE TABLE
    products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC (10,2) NOT NULL,
        category VARCHAR(100)
    );