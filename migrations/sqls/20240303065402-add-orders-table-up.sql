CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(15) NOT NULL,
        quantity INTEGER NOT NULL,
        product_id INTEGER REFERENCES products (id),
        user_id INTEGER REFERENCES users (id)
    );