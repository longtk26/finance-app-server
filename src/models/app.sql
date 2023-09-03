DROP DATABASE IF EXISTS finance_app;
CREATE DATABASE finance_app;

USE finance_app;

CREATE TABLE users (
	id VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    federated VARCHAR(20),
    idProvider VARCHAR(255),
    
    CONSTRAINT pk_users
    PRIMARY KEY (id)
);

-- INSERT INTO users VALUES(1, "longtk26@gmail.com", null, "google");

SELECT * FROM users;

-- DELETE FROM users WHERE id = 5 ;
-- DELETE FROM users WHERE id = '123' ;
-- DELETE FROM users WHERE id = 7 ;
-- DELETE FROM users WHERE id = 8 ;
-- DELETE FROM users WHERE id = 9 ;



