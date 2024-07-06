-- CREATE DATABASE showroom;
USE showroom;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(username),
    PRIMARY KEY(id)
);

INSERT INTO users (username, password, is_admin, createdAt, updatedAt) VALUES ('superadmin', 'superadmin1', TRUE, NOW(), NOW());
INSERT INTO users (username, password, is_admin, createdAt, updatedAt) VALUES ('user1', 'user1', FALSE, NOW(), NOW());
INSERT INTO users (username, password, is_admin, createdAt, updatedAt) VALUES ('user2', 'user2', FALSE, NOW(), NOW());

CREATE TABLE vehicle_brand (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(name),
    UNIQUE(id),
    PRIMARY KEY(id)
);

INSERT INTO vehicle_brand (name, createdAt, updatedAt) VALUES ('Toyota', NOW(), NOW());
INSERT INTO vehicle_brand (name, createdAt, updatedAt) VALUES ('Honda', NOW(), NOW());
INSERT INTO vehicle_brand (name, createdAt, updatedAt) VALUES ('BMW', NOW(), NOW());

CREATE TABLE vehicle_type (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    brand_id INT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(id),
    PRIMARY KEY(id),
    FOREIGN KEY (brand_id) REFERENCES vehicle_brand(id)
);

INSERT INTO vehicle_type (name, brand_id, createdAt, updatedAt) VALUES ('Type 1', 1, NOW(), NOW());
INSERT INTO vehicle_type (name, brand_id, createdAt, updatedAt) VALUES ('Type 1', 2, NOW(), NOW());
INSERT INTO vehicle_type (name, brand_id, createdAt, updatedAt) VALUES ('Type 1', 3, NOW(), NOW());
INSERT INTO vehicle_type (name, brand_id, createdAt, updatedAt) VALUES ('Type 2', 3, NOW(), NOW());

CREATE TABLE vehicle_model (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    type_id INT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(id),
    PRIMARY KEY(id),
    FOREIGN KEY (type_id) REFERENCES vehicle_type(id)
);

INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 1', 1, NOW(), NOW());
INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 1', 2, NOW(), NOW());
INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 1', 3, NOW(), NOW());
INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 2', 3, NOW(), NOW());
INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 3', 3, NOW(), NOW());
INSERT INTO vehicle_model (name, type_id, createdAt, updatedAt) VALUES ('Model 1', 4, NOW(), NOW());

CREATE TABLE vehicle_year (
    id INT AUTO_INCREMENT NOT NULL,
    year INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(id),
    PRIMARY KEY(id)
);

INSERT INTO vehicle_year (year, createdAt, updatedAt) VALUES (2018, NOW(), NOW());
INSERT INTO vehicle_year (year, createdAt, updatedAt) VALUES (2019, NOW(), NOW());
INSERT INTO vehicle_year (year, createdAt, updatedAt) VALUES (2020, NOW(), NOW());

CREATE TABLE pricelist (
    id INT AUTO_INCREMENT NOT NULL,
    code VARCHAR(50) NOT NULL,
    price INT UNSIGNED NOT NULL,
    year_id INT NOT NULL,
    model_id INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE(id),
    UNIQUE(code),
    PRIMARY KEY(id),
    FOREIGN KEY (year_id) REFERENCES vehicle_year(id),
    FOREIGN KEY (model_id) REFERENCES vehicle_model(id)
);

INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('TYT-T1-M1', 254000000, 2, 1, NOW(), NOW());
INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('H-T1-M1', 183000000, 1, 2, NOW(), NOW());
INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('BMW-T1-M1', 203000000, 1, 3, NOW(), NOW());
INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('BMW-T1-M2', 285000000, 3, 4, NOW(), NOW());
INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('BMW-T1-M3', 272000000, 2, 5, NOW(), NOW());
INSERT INTO pricelist (code, price, year_id, model_id, createdAt, updatedAt) VALUES ('BMW-T2-M1', 303000000, 3, 6, NOW(), NOW());
