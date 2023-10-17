DROP DATABASE IF EXISTS finance_app;
CREATE DATABASE finance_app;

USE finance_app;

CREATE TABLE users (
	id VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    federated VARCHAR(20),
    activated BOOLEAN default 0,
    
    CONSTRAINT pk_users
    PRIMARY KEY (id)
);

CREATE TABLE keyTokens (
    token VARCHAR(255) NOT NULL,
    userId VARCHAR(10) NOT NULL,
    
    CONSTRAINT pk_keytoken
    PRIMARY KEY (token)
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
    type VARCHAR(255) NOT NULL,
    
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

ALTER TABLE keyTokens 
ADD CONSTRAINT fk_userId
FOREIGN KEY (userId)
REFERENCES users(id);

INSERT INTO users (id, email, password, federated)
VALUES
    ('1', 'user1@example.com', 'password1', 'Facebook'),
    ('2', 'user2@example.com', 'password2', 'Google'),
    ('3', 'user3@example.com', 'password3', NULL);
    
INSERT INTO categories (name, type)
VALUES
    ('food & beverage', 'required expense'),
	('transportation', 'required expense'),
	('rentals', 'required expense'),
	('water bill', 'required expense'),
	('phone bill', 'required expense'),
	('electric bill', 'required expense'),
	('gas bill', 'required expense'),
	('television bill', 'required expense'),
	('internet bill', 'required expense'),
	('other utility bills', 'required expense'),
    ('home maintenance', 'up & comers'),
    ('vehicle maintenance', 'up & comers'),
    ('medical check-up', 'up & comers'),
    ('insurances', 'up & comers'),
    ('education', 'up & comers'),
    ('houseware', 'up & comers'),
    ('personal items', 'up & comers'),
    ('pets', 'up & comers'),
    ('home services', 'up & comers'),
    ('other expense', 'up & comers'),
    ('fitness', 'fun & relax'),
    ('makeup', 'fun & relax'),
    ('gifts & donations', 'fun & relax'),
    ('streaming service', 'fun & relax'),
    ('fun money', 'fun & relax'),
    ('investment', 'investing & debt payments'),
    ('debt collection', 'investing & debt payments'),
    ('debt', 'investing & debt payments'),
    ('loan', 'investing & debt payments'),
    ('repayment', 'investing & debt payments'),
    ('pay interest', 'investing & debt payments'),
    ('collect interest', 'investing & debt payments'),
    ('salary', 'income'),
    ('other income', 'income'),
    ('outgoing transfer', 'other'),
    ('incoming transfer', 'other');
    
INSERT INTO transactions (id, time, wallet, note, price, category, userId)
VALUES
('101', '2023-07-01', 'Wallet 1', 'Groceries', 50, 'food & beverage', '1'),
 ('103', '2023-07-10', 'Wallet 3', 'Gasoline', 30, 'transportation', '1'),
('104', '2023-07-15', 'Wallet 1', 'Dinner with friends', 40, 'food & beverage', '2');



SELECT * FROM users;
SELECT * FROM keyTokens;
SELECT * FROM transactions;
SELECT * FROM categories;

