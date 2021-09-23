DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    owner_id INT
);

DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255)
);