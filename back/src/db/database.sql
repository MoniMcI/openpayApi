CREATE DATABASE IF NOT EXISTS openpaydb;

USE openpaydb;

CREATE TABLE IF NOT EXISTS `Clientes` (
    `id` CHAR(36) BINARY,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `phone_number` VARCHAR(255),
    `city` VARCHAR(255),
    `state` VARCHAR(255),
    `line1` VARCHAR(255),
    `postal_code` VARCHAR(255),
    `country_code` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Cargos` (
    `id` CHAR(36) BINARY,
    `amount` DECIMAL(10, 2) NOT NULL,
    `description` VARCHAR(255),
    `order_id` VARCHAR(255),
    `due_date` DATETIME,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `customer_id` CHAR(36) BINARY,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `Clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

