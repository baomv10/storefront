CREATE TABLE
    orders (
        id VARCHAR(50) PRIMARY KEY,
        status VARCHAR(15) NOT NULL,
        user_id VARCHAR(50) REFERENCES users (id)
    );