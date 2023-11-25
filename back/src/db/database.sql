CREATE DATABASE IF NOT EXISTS openpaydb;

USE openpaydb;

CREATE TABLE Cliente (
  id UUID PRIMARY KEY DEFAULT UUIDV4,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  line1 VARCHAR(255),
  postal_code VARCHAR(255),
  country_code VARCHAR(255),
);

CREATE TABLE cargos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    order_id VARCHAR(50),
    due_date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES clientes(id),
    INDEX idx_customer_id (customer_id)
);