CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        last_name VARCHAR(100) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );