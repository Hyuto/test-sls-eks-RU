CREATE DATABASE [showroom]
GO

USE [showroom];
GO

CREATE TABLE c_users (
    id INT IDENTITY NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    is_admin INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [c_users] (username, password, is_admin, createdAt, updatedAt) 
VALUES 
('superadmin', 'superadmin1', 1, getdate(), getdate()),
('user1', 'user1', 0, getdate(), getdate()),
('user2', 'user2', 0, getdate(), getdate()); 
GO

CREATE TABLE vehicle_brand (
    id INT IDENTITY NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [vehicle_brand] (name, createdAt, updatedAt) 
VALUES
('Toyota', getdate(), getdate()),
('Honda', getdate(), getdate()),
('BMW', getdate(), getdate());
GO

CREATE TABLE vehicle_type (
    id INT IDENTITY NOT NULL,
    name VARCHAR(50) NOT NULL,
    brand_id INT FOREIGN KEY REFERENCES vehicle_brand(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [vehicle_type] (name, brand_id, createdAt, updatedAt) 
VALUES 
('Type 1', 1, getdate(), getdate()),
('Type 1', 2, getdate(), getdate()),
('Type 1', 3, getdate(), getdate()),
('Type 2', 3, getdate(), getdate());
GO

CREATE TABLE vehicle_model (
    id INT IDENTITY NOT NULL,
    name VARCHAR(50) NOT NULL,
    type_id INT FOREIGN KEY REFERENCES vehicle_type(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [vehicle_model] (name, type_id, createdAt, updatedAt) 
VALUES 
('Model 1', 1, getdate(), getdate()),
('Model 1', 2, getdate(), getdate()),
('Model 1', 3, getdate(), getdate()),
('Model 2', 3, getdate(), getdate()),
('Model 3', 3, getdate(), getdate()),
('Model 1', 4, getdate(), getdate());
GO

CREATE TABLE vehicle_year (
    id INT IDENTITY NOT NULL,
    year INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [vehicle_year] (year, createdAt, updatedAt) 
VALUES 
(2018, getdate(), getdate()),
(2019, getdate(), getdate()),
(2020, getdate(), getdate());
GO

CREATE TABLE pricelist (
    id INT IDENTITY NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    price BIGINT NOT NULL,
    year_id INT NOT NULL FOREIGN KEY REFERENCES vehicle_year(id),
    model_id INT NOT NULL FOREIGN KEY REFERENCES vehicle_model(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id)
);
GO

INSERT INTO [pricelist] (code, price, year_id, model_id, createdAt, updatedAt) 
VALUES 
('TYT-T1-M1', 254000000, 2, 1, getdate(), getdate()),
('H-T1-M1', 183000000, 1, 2, getdate(), getdate()),
('BMW-T1-M1', 203000000, 1, 3, getdate(), getdate()),
('BMW-T1-M2', 285000000, 3, 4, getdate(), getdate()),
('BMW-T1-M3', 272000000, 2, 5, getdate(), getdate()),
('BMW-T2-M1', 303000000, 3, 6, getdate(), getdate());
GO
