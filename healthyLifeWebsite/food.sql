-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 24, 2025 at 12:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthyLife`
--

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `typeId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `kcal` float NOT NULL,
  `protein` float NOT NULL,
  `fats` float NOT NULL,
  `carbs` float NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `typeId`, `EnName`, `ArName`, `image`, `kcal`, `protein`, `fats`, `carbs`, `haveExplane`, `created_at`, `updated_at`) VALUES
(1, 1, 'Apple', 'تفاح', 'foods/foot1.jpg', 52, 0, 0, 14, 0, NULL, NULL),
(2, 1, 'Banana', 'موز', 'foods/food2.jpg', 89, 1, 0, 23, 0, NULL, NULL),
(3, 2, 'Potato', 'بطاطس', 'foods/food3.jpg', 77, 2, 0, 18, 0, NULL, NULL),
(4, 2, 'Tomato', 'طماطم', 'foods/food4.jpg', 18, 1, 0, 4, 0, NULL, NULL),
(5, 2, 'Onion', 'بصل', 'foods/food5.jpg', 40, 1, 0, 9, 0, NULL, NULL),
(6, 2, 'Garlic', 'ثوم', 'foods/food6.jpg', 149, 6, 1, 33, 0, NULL, NULL),
(7, 2, 'Pepper', 'فلفل', 'foods/food7.jpg', 20, 1, 0, 5, 0, NULL, NULL),
(8, 3, 'lentils', 'عدس', 'foods/food8.jpg', 353, 25, 1, 60, 0, NULL, NULL),
(9, 3, 'Chickpeas', 'حمص', 'foods/food9.jpg', 364, 19, 6, 61, 0, NULL, NULL),
(10, 3, 'Black Beans', 'فاصوليا سوداء', 'foods/food10.jpg', 339, 22, 1, 62, 0, NULL, NULL),
(12, 4, 'Rice', 'أرز', 'foods/food11.jpg', 365, 7, 1, 80, 0, NULL, NULL),
(13, 4, 'oats', 'شوفان', 'foods/food12.jpg', 368, 14, 6, 64, 0, NULL, NULL),
(14, 4, 'bulgur', 'برغل', 'foods/food13.jpg', 342, 12, 13, 75, 0, NULL, NULL),
(15, 5, 'Almonds', 'لوز', 'foods/food14.jpg', 579, 22, 50, 22, 0, NULL, NULL),
(16, 5, 'walnuts', 'جوز', 'foods/food15.jpg', 654, 15, 65, 14, 0, NULL, NULL),
(17, 5, 'cashews', 'كاجو', 'foods/food16.jpg', 553, 18, 44, 30, 0, NULL, NULL),
(18, 5, 'pistachios', 'فستق', 'foods/food17.jpg', 562, 21, 45, 28, 0, NULL, NULL),
(19, 6, 'Beef', 'لحم بقري', 'foods/food18.jpg', 165, 31, 4, 0, 0, NULL, NULL),
(20, 6, 'Lamb', 'لحم ضأن', 'foods/food19.jpg', 294, 25, 21, 0, 0, NULL, NULL),
(21, 6, 'Chicken Breast', 'صدر دجاج', 'foods/food20.jpg', 165, 31, 4, 0, 0, NULL, NULL),
(22, 6, 'turkey', 'ديك رومي', 'foods/food21.jpg', 135, 29, 1, 0, 0, NULL, NULL),
(23, 7, 'salmon', 'سلمون', 'foods/food22.jpg', 208, 20, 13, 0, 0, NULL, NULL),
(24, 7, 'tuna', 'تونة', 'foods/food23.jpg', 132, 28, 1, 0, 0, NULL, NULL),
(25, 7, 'trout', 'تروتة', 'foods/food24.jpg', 148, 19, 7, 0, 0, NULL, NULL),
(26, 7, 'mackerel', 'ماكريل', 'foods/food25.jpg', 305, 20, 25, 0, 0, NULL, NULL),
(27, 8, 'milk', 'حليب', 'foods/food26.jpg', 42, 3, 1, 5, 0, NULL, NULL),
(28, 8, 'yogurt', 'زبادي', 'foods/food27.jpg', 59, 10, 0, 4, 0, NULL, NULL),
(29, 8, 'cheddar cheese', 'جبنة شيدر', 'foods/food28.jpg', 402, 25, 33, 1, 0, NULL, NULL),
(30, 8, 'butter', 'زبدة', 'foods/food29.jpg', 717, 1, 81, 0, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_typeid_foreign` (`typeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `food_types` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
