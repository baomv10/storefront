CREATE TABLE
    order_details (
        id VARCHAR(50) PRIMARY KEY,
        quantity INTEGER NOT NULL,
        productId VARCHAR(50) REFERENCES products (id),
        orderId VARCHAR(50) REFERENCES orders (id)
    );