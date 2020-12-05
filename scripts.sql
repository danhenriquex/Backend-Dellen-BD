DROP TABLE IF EXISTS
    client,
    seller,
    category,
    product,
    sale,
    line_item
CASCADE;

CREATE TABLE client (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT, 
  email TEXT UNIQUE, 
  password TEXT NOT NULL,
  whatsapp TEXT,
  CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE seller (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT, 
    email TEXT UNIQUE, 
    password TEXT NOT NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT UNIQUE,
    CONSTRAINT name_unique UNIQUE (name)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY NOT NULL,
    id_category INTEGER,
    name TEXT,
    price REAL,
    quantity INTEGER,
    brand TEXT,
    genre TEXT,
    age_range TEXT,
    image_adress TEXT,
    FOREIGN KEY (id_category) REFERENCES category (id)
);

CREATE TABLE sale (
    id SERIAL PRIMARY KEY NOT NULL,
    date TEXT,
    status TEXT,
    id_client INTEGER,
    FOREIGN KEY (id_client) REFERENCES client (id)
);

CREATE TABLE line_item (
    id SERIAL PRIMARY KEY NOT NULL,
    id_sale INTEGER,
    id_product INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (id_sale) REFERENCES sale (id),
    FOREIGN KEY (id_product) REFERENCES product (id)
);

INSERT INTO client (name, email, password, whatsapp) VALUES (
	'client',
	'client@test.com',
	'client321',
	'99-0000-0000'
);

INSERT INTO seller (name, email, password) VALUES (
    'vendendor',
    'vendendor@test.com',
    'vendendor321'
);
INSERT INTO category (name) VALUES ('Sapatos');
INSERT INTO category (name) VALUES ('Camisas');

INSERT INTO product (id_category,name,price,quantity,brand,genre,age_range,image_adress) VALUES (
    '1',
    'Tênis Nike',
    200,
    20,
    'marca',
    'gênero',
    '12-15',
    'image_adress'
);
