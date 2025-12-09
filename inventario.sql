-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-12-2025 a las 01:58:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `descripcion`, `nombre`) VALUES
(1, 'electronicos de informatica', 'electronico'),
(2, 'Tegnologia y gadgets', 'Electronica'),
(5, 'sabritas varias', 'papas sabritas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `categoria_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `precio` double NOT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`categoria_id`, `id`, `precio`, `stock_actual`, `descripcion`, `nombre`) VALUES
(5, 2, 15000, 1, 'iphone 16', 'celular'),
(2, 6, 4000, 5, 'es una lap asus', 'laptop gamer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_movement`
--

CREATE TABLE `stock_movement` (
  `cantidad` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stock_movement`
--

INSERT INTO `stock_movement` (`cantidad`, `id`, `producto_id`, `fecha`, `tipo`) VALUES
(1, 1, 2, '2025-12-08 02:18:16.000000', 'ENTRADA'),
(1, 2, 2, '2025-12-08 02:18:30.000000', 'ENTRADA'),
(1, 3, 2, '2025-12-08 02:26:15.000000', 'ENTRADA'),
(1, 6, 2, '2025-12-08 04:33:19.000000', 'ENTRADA'),
(1, 7, 2, '2025-12-08 04:33:23.000000', 'ENTRADA'),
(14, 10, 2, '2025-12-08 23:23:55.000000', 'SALIDA');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKodqr7965ok9rwquj1utiamt0m` (`categoria_id`);

--
-- Indices de la tabla `stock_movement`
--
ALTER TABLE `stock_movement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6aqb3afgphiaap8e8blswd1cn` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `stock_movement`
--
ALTER TABLE `stock_movement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FKodqr7965ok9rwquj1utiamt0m` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `stock_movement`
--
ALTER TABLE `stock_movement`
  ADD CONSTRAINT `FK6aqb3afgphiaap8e8blswd1cn` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
