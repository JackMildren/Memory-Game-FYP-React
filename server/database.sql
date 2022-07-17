CREATE DATABASE memoryGame;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_jwt VARCHAR(2047)
);