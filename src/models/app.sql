DROP DATABASE IF EXISTS finance_app;
CREATE DATABASE finance_app;

USE finance_app;

CREATE TABLE users (
	id VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    federated VARCHAR(20),
    
    CONSTRAINT pk_users
    PRIMARY KEY (id)
);

CREATE TABLE transactions (
	id VARCHAR(10) NOT NULL,
    time DATE NOT NULL,
    wallet VARCHAR(255) NOT NULL,
    note TEXT,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    userId VARCHAR(10) NOT NULL,
    
    CONSTRAINT pk_transactions
    PRIMARY KEY(id, userId)
);

CREATE TABLE categories (
    name VARCHAR(255) NOT NULL,
    type VARCHAR(10) NOT NULL,
    
    CONSTRAINT pk_categories
    PRIMARY KEY (name)
);



ALTER TABLE transactions 
ADD CONSTRAINT fk_user
FOREIGN KEY (userId)
REFERENCES users(id);

ALTER TABLE transactions 
ADD CONSTRAINT fk_category
FOREIGN KEY (category)
REFERENCES categories(name);

INSERT INTO users (id, email, password, federated)
VALUES
    ('1', 'user1@example.com', 'password1', 'Facebook'),
    ('2', 'user2@example.com', 'password2', 'Google'),
    ('3', 'user3@example.com', 'password3', NULL);
    
INSERT INTO categories (name, type)
VALUES
    ('Food', 'Expense'),
    ('Entertainment', 'Expense'),
    ('Transportation', 'Expense'),
    ('Salary', 'Income'),
    ('Investments', 'Income');
    
INSERT INTO transactions (id, time, wallet, note, price, category, userId)
VALUES
('101', '2023-07-01', 'Wallet 1', 'Groceries', 50, 'Food', '1'),
('102', '2023-07-05', 'Wallet 2', 'Movie night', 20, 'Entertainment', '2'),
 ('103', '2023-07-10', 'Wallet 3', 'Gasoline', 30, 'Transportation', '1'),
('104', '2023-07-15', 'Wallet 1', 'Dinner with friends', 40, 'Food', '2');



SELECT * FROM users;
SELECT * FROM transactions;


