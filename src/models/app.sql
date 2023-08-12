DROP DATABASE IF EXISTS finance_app;
CREATE DATABASE finance_app;

USE finance_app;

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    federated VARCHAR(20),
    CONSTRAINT pk_users
    PRIMARY KEY (id)
);

