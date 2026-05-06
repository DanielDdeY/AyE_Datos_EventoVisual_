-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(60) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password        VARCHAR(100) NOT NULL,
    telefono        VARCHAR(12),
    direccion       TEXT,
    fecha_registro  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Categorías
CREATE TABLE categorias (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(20) NOT NULL
);

-- 3. Tabla de Productos (Catálogo general)
CREATE TABLE eventos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id    INT,
    nombre          VARCHAR(40) NOT NULL,
    imagen_url       VARCHAR(255) NOT NULL, 
    disponibilidad  BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);