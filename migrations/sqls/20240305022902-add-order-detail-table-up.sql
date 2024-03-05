CREATE TABLE
    order_details (
        id VARCHAR(50) PRIMARY KEY,
        quantity INTEGER NOT NULL,
        product_id VARCHAR(50) REFERENCES products (id),
        order_id VARCHAR(50) REFERENCES orders (id)
    );