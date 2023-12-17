-- Create a new database
CREATE DATABASE IF NOT EXISTS schoolpen_bd;

-- Switch to the new database
USE schoolpen_bd;

-- Create the table within the selected database
CREATE TABLE stationery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(255),
    color VARCHAR(255),
    matherial VARCHAR(255),
    number_of_pencils INT,
    number_of_pens INT,
    number_of_erasers INT
);
