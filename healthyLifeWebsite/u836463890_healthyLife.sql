-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 24, 2025 at 03:13 AM
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
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_beraaceze@gmail.com|192.168.1.108', 'i:1;', 1747306510),
('laravel_cache_beraaceze@gmail.com|192.168.1.108:timer', 'i:1747306510;', 1747306510);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `typeId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `met` int(11) NOT NULL,
  `haveExplane` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `typeId`, `EnName`, `ArName`, `image`, `met`, `haveExplane`, `created_at`, `updated_at`) VALUES
(1, 2, 'Brisk Walking at 5 km/h', 'المشي السريع بسرعة 5 كم/ساعة', 'exercises/exercise1.jpg', 4, '0', NULL, NULL),
(2, 2, 'Brisk Walking at 6 km/h', 'المشي السريع بسرعة 6 كم/ساعة', 'exercises/exercise2.jpg', 5, '0', NULL, NULL),
(3, 7, 'Hatha Yoga', 'هاثا يوغا', 'exercises/exercise3.jpg', 3, '0', NULL, NULL),
(4, 1, 'Moderate Jump Rope', 'نط الحبل متوسط الكثافة', 'exercises/exercise4.jpg', 10, '0', NULL, NULL),
(5, 1, 'Freestyle Swimming', 'السباحة الحرة', 'exercises/exercise5.jpg', 8, '0', NULL, NULL),
(6, 1, 'Backstroke Swimming', 'سباحة الظهر', 'exercises/exercise6.jpg', 7, '0', NULL, NULL),
(7, 1, 'Heavy Bag Boxing', 'الملاكمة بالكيس الثقيل', 'exercises/exercise7.jpg', 8, '0', NULL, NULL),
(8, 1, 'Kickboxing', 'الكيك بوكسينغ', 'exercises/exercise8.jpg', 8, '0', NULL, NULL),
(9, 2, 'Cycling at 20-25 km/h', 'ركوب الدراجة 20-25 كم/ساعة', 'exercises/exercise9.jpg', 8, '0', NULL, NULL),
(10, 2, 'Spinning', 'السبينينغ', 'exercises/exercise10.jpg', 9, '0', NULL, NULL),
(11, 3, 'Jump Squats', 'قرفصاء القفز', 'exercises/exercise11.jpg', 8, '0', NULL, NULL),
(12, 3, 'Push-ups to Jumps', 'ضغط مع قفز', 'exercises/exercise12.jpg', 9, '0', NULL, NULL),
(13, 2, 'Inclined Walking', 'المشي المنحدر', 'exercises/exercise13.jpg', 6, '0', NULL, NULL),
(14, 1, 'Running at 12 km/h', 'الجري بسرعة 12 كم/ساعة', 'exercises/exercise14.jpg', 13, '0', NULL, NULL),
(15, 2, 'Running at 10 km/h', 'الجري بسرعة 10 كم/ساعة', 'exercises/exercise15.jpg', 10, '0', NULL, NULL),
(16, 1, 'Sprint Intervals', 'فترات العدو السريع', 'exercises/exercise16.jpg', 12, '0', NULL, NULL),
(17, 1, 'Fast Jump Rope', 'نط الحبل السريع', 'exercises/exercise17.jpg', 12, '0', NULL, NULL),
(18, 1, 'Single-Leg Jump Rope', 'نط الحبل بقدم واحدة', 'exercises/exercise18.jpg', 11, '0', NULL, NULL),
(19, 1, 'Butterfly Stroke Swimming', 'سباحة الفراشة', 'exercises/exercise19.jpg', 11, '0', NULL, NULL),
(20, 4, 'Barbell Squats', 'قرفصاء بالبار', 'exercises/exercise20.jpg', 6, '0', NULL, NULL),
(21, 5, 'Resistance Band Rows', 'سحب باستخدام شريط مقاومة', 'exercises/exercise21.jpg', 5, '0', NULL, NULL),
(22, 6, 'Deadlifts', 'الرفعة الميتة', 'exercises/exercise22.jpg', 7, '0', NULL, NULL),
(23, 8, 'Pilates Leg Circles', 'دوائر الساقين في بيلاتس', 'exercises/exercise23.jpg', 3, '0', NULL, NULL),
(24, 9, 'Hamstring Stretch', 'تمديد أوتار الركبة', 'exercises/exercise24.jpg', 2, '0', NULL, NULL),
(25, 10, 'Arm Circles Mobility', 'تمارين دوران الذراع', 'exercises/exercise25.jpg', 3, '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exercise_catagories`
--

CREATE TABLE `exercise_catagories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(20) NOT NULL,
  `ArName` varchar(20) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercise_catagories`
--

INSERT INTO `exercise_catagories` (`id`, `EnName`, `ArName`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Cardio Training', 'تمارين الكارديو', 'catagories/exercise1.jpg', NULL, NULL),
(2, 'Strength Training', 'تمارين القوة', 'catagories/exercise2.jpg', NULL, NULL),
(3, 'Flexibility Training', 'تمارين المرونة', 'catagories/exercise3.jpg', NULL, NULL),
(4, 'asdasd', 'asdasdas', 'catagories/exercise2.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exercise_types`
--

CREATE TABLE `exercise_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `catagoryId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(20) NOT NULL,
  `ArName` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercise_types`
--

INSERT INTO `exercise_types` (`id`, `catagoryId`, `EnName`, `ArName`, `created_at`, `updated_at`) VALUES
(1, 1, 'High Cardio', 'كارديو عالي الكثافة', NULL, NULL),
(2, 1, 'Moderate Cardio', 'كارديو متوسط الكثافة', NULL, NULL),
(3, 2, 'Bodyweight Training', 'تمارين وزن الجسم', NULL, NULL),
(4, 2, 'Weightlifting', 'رفع الأثقال', NULL, NULL),
(5, 2, 'Resistance Bands', 'تمارين الأربطة', NULL, NULL),
(6, 2, 'Powerlifting', 'رفع الأثقال القوي', NULL, NULL),
(7, 3, 'Yoga', 'تمارين اليوغا', NULL, NULL),
(8, 3, 'Pilates', 'البيلاتس', NULL, NULL),
(9, 3, 'Stretching', 'تمارين التمدد', NULL, NULL),
(10, 3, 'Mobility Drills', 'تمارين حركية', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `explanes`
--

CREATE TABLE `explanes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `explaneFor` varchar(20) DEFAULT NULL,
  `activeId` int(11) NOT NULL,
  `activeType` enum('food','exercise','normal') NOT NULL,
  `EnTextFile` varchar(255) NOT NULL,
  `ArTextFile` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(222, 1, 'أفوكادو', 'أفوكادو', 'foods/1.jpg', 160, 2, 14.7, 8.6, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(223, 1, 'أناناس', 'أناناس', 'foods/2.jpg', 50, 0.5, 0.1, 13.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(224, 1, 'البابايا', 'البابايا', 'foods/3.jpg', 39, 0.6, 0.1, 9.8, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(225, 1, 'البرتقال', 'البرتقال', 'foods/4.jpg', 47, 0.9, 0.2, 11.8, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(226, 1, 'التفاح', 'التفاح', 'foods/5.jpg', 52, 0.3, 0.1, 13.8, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(227, 1, 'التفاح المجفف', 'التفاح المجفف', 'foods/6.jpg', 243, 0.9, 0.3, 65.9, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(228, 1, 'التمر', 'التمر', 'foods/7.jpg', 281.9, 2.5, 0.3, 75, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(229, 1, 'التمر الهندي', 'التمر الهندي', 'foods/8.jpg', 239, 2.8, 0.6, 62.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(230, 1, 'التوت', 'التوت', 'foods/9.jpg', 52, 1.2, 0.7, 12, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(231, 1, 'التوت الأزرق', 'التوت الأزرق', 'foods/10.jpg', 57, 0.8, 0.3, 14.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(232, 1, 'التوت الأسود', 'التوت الأسود', 'foods/11.jpg', 43, 1.4, 0.5, 9.6, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(233, 1, 'التوت البري', 'التوت البري', 'foods/12.jpg', 46, 0.4, 0.1, 12.2, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(234, 1, 'التين', 'التين', 'foods/13.jpg', 74, 0.8, 0.4, 19.2, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(235, 1, 'الجريب فروت', 'الجريب فروت', 'foods/14.jpg', 32, 0.6, 0.1, 8.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(236, 1, 'الجوافة', 'الجوافة', 'foods/15.jpg', 68, 2.6, 1, 14.3, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(237, 1, 'الخوخ', 'الخوخ', 'foods/16.jpg', 39, 0.9, 0.3, 9.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(238, 1, 'الخوخ المجفف', 'الخوخ المجفف', 'foods/17.jpg', 239, 3.6, 0.8, 61.3, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(239, 1, 'الدراق', 'الدراق', 'foods/18.jpg', 39, 0.9, 0.3, 9.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(240, 1, 'الرمان', 'الرمان', 'foods/19.jpg', 82.8, 1.7, 0.6, 18.7, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(241, 1, 'الشمام', 'الشمام', 'foods/20.jpg', 34, 0.8, 0.2, 8.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(242, 1, 'العنب', 'العنب', 'foods/21.jpg', 68.9, 0.7, 0.2, 18.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(243, 1, 'الغوج', 'الغوج', 'foods/22.jpg', 46.1, 0.8, 0.3, 11.4, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(244, 1, 'الفراولة', 'الفراولة', 'foods/23.jpg', 32, 0.7, 0.3, 7.7, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(245, 1, 'الكاكا', 'الكاكا', 'foods/24.jpg', 70.2, 0.4, 0.1, 18.6, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(246, 1, 'الكرز الحامض', 'الكرز الحامض', 'foods/25.jpg', 50, 1, 0.3, 12.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(247, 1, 'الكرز الحلو', 'الكرز الحلو', 'foods/26.jpg', 63, 1, 0.2, 16, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(248, 1, 'الكمثرى', 'الكمثرى', 'foods/27.jpg', 58, 0.4, 0.1, 15.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(249, 1, 'الكمثرى المجفف', 'الكمثرى المجفف', 'foods/28.jpg', 262, 1.9, 0.6, 69.7, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(250, 1, 'الكيوي', 'الكيوي', 'foods/29.jpg', 61.1, 1.2, 0.5, 14.6, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(251, 1, 'الليمون', 'الليمون', 'foods/30.jpg', 29, 1, 0.3, 9.3, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(252, 1, 'المانجو', 'المانجو', 'foods/32.jpg', 65, 0.5, 0.3, 17, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(253, 1, 'المشمش', 'المشمش', 'foods/33.jpg', 48, 1.4, 0.4, 11.1, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(254, 1, 'المشمش المجفف', 'المشمش المجفف', 'foods/34.jpg', 240.9, 3.4, 0.5, 62.6, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(255, 1, 'الموز', 'الموز', 'foods/35.jpg', 89, 1.1, 0.3, 22.9, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43'),
(256, 1, 'النكتارين', 'النكتارين', 'foods/36.jpg', 44, 1, 0.3, 10.5, 0, '2025-05-23 21:37:43', '2025-05-23 21:37:43');

-- --------------------------------------------------------

--
-- Table structure for table `food_catagories`
--

CREATE TABLE `food_catagories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(20) NOT NULL,
  `ArName` varchar(20) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food_catagories`
--

INSERT INTO `food_catagories` (`id`, `EnName`, `ArName`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Planet Foods', 'اطعمة نباتية', 'catagories/food1.jpg', NULL, NULL),
(2, 'Animal Foods', 'اطعمة حيوانيه', 'catagories/food2.jpg', NULL, NULL),
(3, 'Sweets', 'حلويات', 'catagories/food3.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `food_types`
--

CREATE TABLE `food_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `catagoryId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(20) NOT NULL,
  `ArName` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food_types`
--

INSERT INTO `food_types` (`id`, `catagoryId`, `EnName`, `ArName`, `created_at`, `updated_at`) VALUES
(1, 1, 'Fruits', 'فاكهة', NULL, NULL),
(2, 1, 'Vegatables', 'خضروات', NULL, NULL),
(3, 1, 'Legumes', 'بقوليات', NULL, NULL),
(4, 2, 'Fats', 'دهون', NULL, NULL),
(5, 1, 'Nuts', 'مكسرات', NULL, NULL),
(6, 2, 'Meats', 'لحوم', NULL, NULL),
(7, 2, 'Fishs', 'أسماك', NULL, NULL),
(8, 2, 'Dairy Products', 'منتجات الألبان', NULL, NULL),
(9, 2, 'Eggs', 'بيض', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `activeState` enum('lowActivity','normalActivity','highActivity') NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `GeneralGoal` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(191, '0001_01_01_000000_create_users_table', 1),
(192, '0001_01_01_000001_create_cache_table', 1),
(193, '0001_01_01_000002_create_jobs_table', 1),
(194, '2025_04_20_194301_create_personal_access_tokens_table', 1),
(195, '2025_04_20_212200_create_food_catagories_table', 1),
(196, '2025_04_20_212221_create_food_types_table', 1),
(197, '2025_04_20_212224_create_food_table', 1),
(198, '2025_04_20_212438_create_exercise_catagories_table', 1),
(199, '2025_04_20_212442_create_exercise_types_table', 1),
(200, '2025_04_20_212447_create_exercises_table', 1),
(201, '2025_04_20_212508_create_explanes_table', 1),
(202, '2025_04_20_212612_create_my_dishes_table', 1),
(203, '2025_04_20_212619_create_my_exercises_table', 1),
(204, '2025_04_20_212650_create_my_calenders_table', 1),
(205, '2025_04_20_212750_create_goals_table', 1),
(206, '2025_04_21_091314_create_my_dish_food_table', 1),
(207, '2025_04_21_091332_create_my_exercise_exercises_table', 1),
(208, '2025_04_21_220351_create_my_favorite_exercises_table', 1),
(209, '2025_04_21_230057_create_my_favorite_food_table', 1),
(210, '2025_04_29_111552_create_my_dish_explanes_table', 2),
(211, '2025_04_29_111601_create_my_exercise_explanes_table', 2),
(213, '2025_05_07_082721_create_my_updates_table', 3),
(216, '2025_05_10_135854_create_user_subscribes_table', 4),
(217, '2025_05_11_134653_create_user_ratings_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `my_calenders`
--

CREATE TABLE `my_calenders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `day` date NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `burn` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_calenders`
--

INSERT INTO `my_calenders` (`id`, `userId`, `day`, `kcal`, `protein`, `fats`, `carbs`, `burn`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-04-29', 1650, 150, 80, 300, 0, NULL, NULL),
(2, 1, '2025-04-08', 1500, 100, 70, 360, 200, '2025-05-06 17:35:24', '2025-05-06 17:35:24'),
(4, 1, '2025-05-04', 1516, 68, 174, 479, 127, '2025-05-06 17:38:05', '2025-05-06 17:56:06'),
(6, 1, '2025-05-06', 1454, 4, 0, 118, 132, '2025-05-06 18:17:55', '2025-05-06 20:32:00'),
(7, 1, '2025-05-07', 2235, 72, 150, 193, 132, '2025-05-06 20:25:12', '2025-05-06 21:39:37'),
(8, 1, '2025-05-01', 1650, 150, 80, 200, 100, NULL, NULL),
(9, 1, '2025-05-02', 1900, 190, 60, 300, 200, NULL, NULL),
(14, 1, '2025-05-08', 2272, 74, 152, 196, 132, '2025-05-08 17:17:13', '2025-05-08 17:17:13'),
(15, 1, '2025-05-12', 195, 8, 5, 30, 0, '2025-05-12 11:51:23', '2025-05-12 11:51:23'),
(16, 1, '2025-05-14', 240, 16, 4, 40, 0, '2025-05-14 12:30:52', '2025-05-14 12:30:52'),
(17, 1, '2025-05-19', 385, 25, 21, 25, 0, '2025-05-19 08:08:09', '2025-05-19 08:08:09'),
(18, 1, '2025-05-21', 141, 1, 0, 37, 0, '2025-05-21 08:30:42', '2025-05-21 08:30:42');

-- --------------------------------------------------------

--
-- Table structure for table `my_dishes`
--

CREATE TABLE `my_dishes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `foodType` varchar(20) NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `totalQuantity` int(11) NOT NULL,
  `serving` int(11) NOT NULL,
  `iconName` varchar(255) NOT NULL,
  `explane` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_dishes`
--

INSERT INTO `my_dishes` (`id`, `userId`, `name`, `foodType`, `kcal`, `protein`, `fats`, `carbs`, `totalQuantity`, `serving`, `iconName`, `explane`, `created_at`, `updated_at`) VALUES
(348, 1, 'جبنه زيتون', 'breakfast', 141, 1, 0, 37, 200, 3, 'food18', NULL, '2025-05-14 12:22:44', '2025-05-14 12:22:44'),
(350, 1, 'ليمون', 'lunch', 141, 1, 0, 37, 200, 4, 'food11', 'تبتبتب\nيزنيزي\nنيتيت', '2025-05-14 12:23:46', '2025-05-14 12:23:46'),
(351, 1, 'كبسة سوريه', 'breakfast', 1800, 120, 30, 300, 1500, 2, 'food11', '##ingredients[\"#F47551\"]\n1 - أرز بسمتي جاف 450 غرام \n2 - دجاج منزوع الجلد طازج 600 غرام \n3 - بصل مفروم 200 غرام \n4 - طماطم مفرومة 300 غرام \n5 - معجون طماطم معلب 30 غرام \n6 - ثوم مهروس 15 غرام \n7 - زنجبيل مبشور 10 غرام \n8 - زيت زيتون سائل 15 غرام \n9 - كركم مطحون 5 غرام \n10 - بابريكا مطحونة 5 غرام \n11 - كمون مطحون 3 غرام \n12 - كزبرة جافة مطحونة 3 غرام \n13 - ورق غار كامل 2 غرام \n14 - هيل كامل 5 غرام \n15 - قرفة عود 3 غرام \n16 - فلفل أسود حب 3 غرام \n17 - لوز محمص 30 غرام اختياري\n18 - بقدونس مفروم 15 غرام اختياري\n\n##preparation[\"#FFA935\"]\n1 - اغسل الأرز البسمتي جيداً وانقعه في ماء دافئ لمدة ٣٠ دقيقة.\n2 - في قدر كبير، ضع قطع الدجاج منزوعة الجلد واضف الماء بحيث يغطي الدجاج.\n3 - أضف ورق الغار، الهيل، القرفة، والفلفل الأسود إلى القدر.\n4 - اترك الدجاج على نار متوسطة حتى ينضج تماماً، ثم ارفعه من القدر واحتفظ بمرقة الدجاج.\n5 - في نفس القدر، ضع كمية قليلة من زيت الزيتون.\n6 - أضف البصل المفروم وقلبه حتى يذبل.\n7 - أضف الثوم المهروس والزنجبيل المبشور وقلب لمدة دقيقة.\n8 - أضف الطماطم المفرومة ومعجون الطماطم وقلب حتى تتسبك الصلصة.\n9 - أضف البهارات: الكركم، البابريكا، الكمون، والكزبرة الجافة.\n10 - أضف الأرز المنقوع والمصفى إلى القدر وقلبه مع الصلصة.\n11 - أضف مرقة الدجاج الساخنة بحيث تغطي الأرز بمقدار ١ سم فوق مستوى الأرز.\n12 - أضف الدجاج المسلوق إلى القدر.\n13 - اترك القدر على نار عالية حتى يغلي، ثم خفف النار وغط القدر.\n14 - اترك الأرز على نار هادئة لمدة ٢٠-٢٥ دقيقة حتى ينضج تماماً.\n15 - زين الكبسة باللوز المحمص والبقدونس المفروم قبل التقديم.', '2025-05-14 12:24:59', '2025-05-14 12:30:12'),
(352, 1, 'كسكس خضار دايت', 'dinner', 921, 27, 16, 159, 1056, 3, 'food12', '##ingredients[\"#F47551\"]\n1 - كسكس مجفف 225 غرام \n2 - كوسة مقطعة 150 غرام \n3 - جزر مقطع 150 غرام \n4 - فلفل أحمر مقطع 120 غرام \n5 - بصل مقطع 90 غرام \n6 - زيت زيتون بكر ممتاز 15 غرام \n7 - بهارات مشكلة 6 غرام \n8 - ماء مغلي 300 غرام \n\n##preparation[\"#FFA935\"]\n1 - اغسل الخضار وقطعها إلى مكعبات صغيرة.\n2 - تبل الخضار بالبهارات والزيت.\n3 - ضع الخضار في صينية واخبزها في الفرن لمدة ٢٠ دقيقة على درجة حرارة ١٨٠.\n4 - حضّر الكسكس حسب التعليمات الموجودة على العبوة.\n5 - اخلط الخضار المشوية مع الكسكس.\n6 - قدم الطبق ساخناً.', '2025-05-14 12:27:50', '2025-05-14 12:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `my_dish_food`
--

CREATE TABLE `my_dish_food` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `myDishId` bigint(20) UNSIGNED NOT NULL,
  `foodId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(255) NOT NULL,
  `ArName` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `my_exercises`
--

CREATE TABLE `my_exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `iconName` varchar(255) NOT NULL,
  `burn` int(11) NOT NULL,
  `TotalMinutes` int(11) NOT NULL,
  `explane` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `my_exercise_exercises`
--

CREATE TABLE `my_exercise_exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `myExerciseId` bigint(20) UNSIGNED NOT NULL,
  `exerciseId` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `met` int(11) NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `my_favorite_exercises`
--

CREATE TABLE `my_favorite_exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `catagoryId` bigint(20) UNSIGNED NOT NULL,
  `exerciseId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `met` int(11) DEFAULT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_favorite_exercises`
--

INSERT INTO `my_favorite_exercises` (`id`, `userId`, `catagoryId`, `exerciseId`, `EnName`, `ArName`, `image`, `met`, `haveExplane`, `created_at`, `updated_at`) VALUES
(58, 1, 3, 24, 'Hamstring Stretch', 'تمديد أوتار الركبة', 'exercises/exercise24.jpg', 2, 0, '2025-04-25 22:18:00', '2025-04-25 22:18:00'),
(59, 1, 2, 11, 'Jump Squats', 'قرفصاء القفز', 'exercises/exercise11.jpg', 8, 0, '2025-04-26 11:55:40', '2025-04-26 11:55:40'),
(69, 1, 3, 23, 'Pilates Leg Circles', 'دوائر الساقين في بيلاتس', 'exercises/exercise23.jpg', 3, 0, '2025-04-28 18:02:03', '2025-04-28 18:02:03'),
(73, 1, 1, 4, 'Moderate Jump Rope', 'نط الحبل متوسط الكثافة', 'exercises/exercise4.jpg', 10, 0, '2025-05-11 17:12:58', '2025-05-11 17:12:58');

-- --------------------------------------------------------

--
-- Table structure for table `my_favorite_food`
--

CREATE TABLE `my_favorite_food` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `catagoryId` bigint(20) UNSIGNED NOT NULL,
  `foodId` bigint(20) UNSIGNED NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `my_updates`
--

CREATE TABLE `my_updates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `food` tinyint(1) NOT NULL DEFAULT 0,
  `exercise` tinyint(1) NOT NULL DEFAULT 0,
  `app` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_updates`
--

INSERT INTO `my_updates` (`id`, `userId`, `food`, `exercise`, `app`, `created_at`, `updated_at`) VALUES
(2, 1, 0, 0, 0, '2025-05-07 05:40:28', '2025-05-07 17:48:00'),
(63, 71, 0, 0, 0, '2025-05-12 19:41:06', '2025-05-12 19:41:06');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'MyApp', 'd7b8e285ea8f58038084905a650e3c61785702cd3716cc6fe8dcdf1220c4f028', '[\"*\"]', NULL, NULL, '2025-04-22 21:10:23', '2025-04-22 21:10:23'),
(2, 'App\\Models\\User', 1, 'MyApp', '22f07055fd9e68a2cb662ad1ca049a4d18e58391d6503eb860f178432234457d', '[\"*\"]', NULL, NULL, '2025-04-22 21:49:51', '2025-04-22 21:49:51'),
(3, 'App\\Models\\User', 1, 'MyApp', 'b4ff099e619cb27da6f4e25ff4dd686597bff3f0ccb7a956e3019d143311c90b', '[\"*\"]', NULL, NULL, '2025-04-22 22:31:01', '2025-04-22 22:31:01'),
(4, 'App\\Models\\User', 1, 'MyApp', '471edcba6b67d49d98751086df0f6d25511835d9a609a4884a324589acd3fc6a', '[\"*\"]', NULL, NULL, '2025-04-22 22:33:24', '2025-04-22 22:33:24'),
(5, 'App\\Models\\User', 1, 'MyApp', '21e14c5484b40e7c2b4d84f19218f0948abbee25dc4744b11b20b8de92598d70', '[\"*\"]', NULL, NULL, '2025-04-22 22:33:30', '2025-04-22 22:33:30'),
(6, 'App\\Models\\User', 1, 'MyApp', '18526077120bc8479d30fc14df91cb3e28f87d55c0b304c96afdd3578bb21ba9', '[\"*\"]', NULL, NULL, '2025-04-22 22:33:34', '2025-04-22 22:33:34'),
(7, 'App\\Models\\User', 1, 'MyApp', 'ec3cb9914f8c2ae5f1f7ab3cf5339e0740a2c03e76e2c13d4b041e876777d104', '[\"*\"]', NULL, NULL, '2025-04-22 22:35:02', '2025-04-22 22:35:02'),
(8, 'App\\Models\\User', 1, 'MyApp', '92f8c9fcc732663dd66f5877315440da513d89882b99f654a54bc4c1c4bf7753', '[\"*\"]', NULL, NULL, '2025-04-22 22:35:07', '2025-04-22 22:35:07'),
(9, 'App\\Models\\User', 1, 'MyApp', '2c5856f1dc5fcb53819f63139dede158254a9a81c5c7d702aa28071929986f82', '[\"*\"]', NULL, NULL, '2025-04-22 22:35:56', '2025-04-22 22:35:56'),
(10, 'App\\Models\\User', 1, 'MyApp', '891c085f37a4f49c52d9e14b1c2472292494b19655fde6b4d5ff966e1beea794', '[\"*\"]', NULL, NULL, '2025-04-22 22:36:02', '2025-04-22 22:36:02'),
(11, 'App\\Models\\User', 1, 'MyApp', 'e3a7de2002a0e9070dfe617bf26d305230b8b49b5e7b2a931f20a96ccfd9775e', '[\"*\"]', NULL, NULL, '2025-04-22 22:37:14', '2025-04-22 22:37:14'),
(12, 'App\\Models\\User', 1, 'MyApp', '4c9c0d9f09b62d82f4a2490995e580e03d0aa3fa238a21f518955dcc85b450b1', '[\"*\"]', NULL, NULL, '2025-04-22 22:37:57', '2025-04-22 22:37:57'),
(13, 'App\\Models\\User', 1, 'MyApp', 'fe194a0ec5b14e17a205518474f69e9e47f476e00f010cc79cdb2ff9d13c0874', '[\"*\"]', NULL, NULL, '2025-04-22 22:38:12', '2025-04-22 22:38:12'),
(14, 'App\\Models\\User', 1, 'MyApp', 'f2f3d5bb125bfd470cff4f4d88a47794b100a7ae7b02e7c647f8d2e29f0559ef', '[\"*\"]', NULL, NULL, '2025-04-22 22:38:28', '2025-04-22 22:38:28'),
(15, 'App\\Models\\User', 1, 'MyApp', 'cd8b4d248ed5465ac169220c3f589d6b5a0f4f155cb8bb3555d685dee95386bc', '[\"*\"]', NULL, NULL, '2025-04-23 05:46:27', '2025-04-23 05:46:27'),
(16, 'App\\Models\\User', 1, 'MyApp', '1581a6c864fa82c5011be7370bb33990f22349ab88da2cc80301c855deb8b520', '[\"*\"]', NULL, NULL, '2025-04-23 05:57:48', '2025-04-23 05:57:48'),
(17, 'App\\Models\\User', 1, 'MyApp', 'e77c6f31529d47019b6294d1d8f5513ed8623175fac188070775505c4f658484', '[\"*\"]', NULL, NULL, '2025-04-23 06:03:06', '2025-04-23 06:03:06'),
(18, 'App\\Models\\User', 1, 'MyApp', 'ab31bb391ea33e17a4357973fee6e26959b824b1af37a294817e957122013622', '[\"*\"]', NULL, NULL, '2025-04-23 06:03:27', '2025-04-23 06:03:27'),
(19, 'App\\Models\\User', 1, 'MyApp', '5b3a05a32f1a0b9c164a8a7c6b55754ab2f62b9802bbe7bfea8bf61db4901228', '[\"*\"]', NULL, NULL, '2025-04-23 06:04:22', '2025-04-23 06:04:22'),
(20, 'App\\Models\\User', 1, 'MyApp', 'b3ef9c196b97e25eb55c9cdb3ab3bb76e8926f2d0afbd2cade7db767def7862e', '[\"*\"]', NULL, NULL, '2025-04-23 06:08:49', '2025-04-23 06:08:49'),
(21, 'App\\Models\\User', 2, 'MyApp', '522bf34715b67be3ca0d4dc7f4647a5277859ea21e6cfa1b4c2601d491d9a375', '[\"*\"]', NULL, NULL, '2025-04-23 07:31:29', '2025-04-23 07:31:29'),
(22, 'App\\Models\\User', 1, 'MyApp', '22013b4f657cbfb32ab18a3397e68b8022811963ca9c6d83a74197cfd0494541', '[\"*\"]', NULL, NULL, '2025-04-23 08:21:56', '2025-04-23 08:21:56'),
(23, 'App\\Models\\User', 1, 'MyApp', '1e675c4966d82bdb3577646fa606cbc32bf45a35ff9cee9629f3207226f8e840', '[\"*\"]', NULL, NULL, '2025-04-23 08:25:36', '2025-04-23 08:25:36'),
(24, 'App\\Models\\User', 3, 'MyApp', '60985634cdea92f5bd6c6e2a8ff8691caf72556d6f1cc38dc2d12520bb719821', '[\"*\"]', NULL, NULL, '2025-04-23 08:27:57', '2025-04-23 08:27:57'),
(25, 'App\\Models\\User', 4, 'MyApp', 'ee77828a61890a79dfaea39d16a13affdb4fdb54c0163d55ba8e328a8b144b21', '[\"*\"]', NULL, NULL, '2025-04-23 08:30:17', '2025-04-23 08:30:17'),
(26, 'App\\Models\\User', 1, 'MyApp', 'f494ed855302d6414a1f014eb8d8a1089a7bed9f8e03af178aae6c26e180ccbd', '[\"*\"]', '2025-04-26 11:59:28', NULL, '2025-04-23 09:08:03', '2025-04-26 11:59:28'),
(27, 'App\\Models\\User', 1, 'MyApp', '8272588fbec2f8d3ad418d2348acd5c03164e9146c188d5228ebf1fc116732c0', '[\"*\"]', '2025-04-26 21:38:49', NULL, '2025-04-23 13:06:54', '2025-04-26 21:38:49'),
(28, 'App\\Models\\User', 1, 'MyApp', '6859efbf510510d540e2d68d84c85d1e38c2c5f298803ea6ad44e3ee6fb94d7b', '[\"*\"]', '2025-05-14 11:45:21', NULL, '2025-04-23 22:41:40', '2025-05-14 11:45:21'),
(29, 'App\\Models\\User', 1, 'MyApp', 'a476479a67e197acb29f2241ccc6173cc8c95c91067404f1ba3415d8ed8ea655', '[\"*\"]', '2025-05-03 13:56:24', NULL, '2025-04-26 22:34:39', '2025-05-03 13:56:24'),
(30, 'App\\Models\\User', 1, 'MyApp', 'e97ddbd52560465f3598151897d48b9697ac586cf7fc6ce71a95276646001038', '[\"*\"]', '2025-05-08 21:42:03', NULL, '2025-04-26 22:51:01', '2025-05-08 21:42:03'),
(31, 'App\\Models\\User', 5, 'MyApp', 'ae31b72176b8486dc6ebadc9b580b58045b8646b10d70e2ae08d7e2e3aabff81', '[\"*\"]', '2025-05-06 20:26:36', NULL, '2025-05-05 16:03:53', '2025-05-06 20:26:36'),
(32, 'App\\Models\\User', 5, 'MyApp', '5be40d7866a3788ed2ecc5919d0bf45a7a1968adc80aa9df0c5e914aa6b61bec', '[\"*\"]', '2025-05-06 21:55:55', NULL, '2025-05-06 21:08:28', '2025-05-06 21:55:55'),
(33, 'App\\Models\\User', 6, 'MyApp', 'd34afb6b36a6518c4eca0fd2fe746db07624a92c950dc4bcbd1a205a8646c712', '[\"*\"]', NULL, NULL, '2025-05-07 05:39:50', '2025-05-07 05:39:50'),
(34, 'App\\Models\\User', 7, 'MyApp', '31516ce33f922336d112ef05c0318f80cc6fc08580e981d11274a48a42a50cc7', '[\"*\"]', NULL, NULL, '2025-05-07 05:40:28', '2025-05-07 05:40:28'),
(35, 'App\\Models\\User', 8, 'MyApp', '76caad21fc64a3364bbc32f42612cd10ed1bf3051343747a1cb6242b73107924', '[\"*\"]', NULL, NULL, '2025-05-07 05:40:30', '2025-05-07 05:40:30'),
(36, 'App\\Models\\User', 1, 'MyApp', 'd149900b82f9b78119b2ebfe2304ca071a78fb01a13d017a796a83ba12e91a9b', '[\"*\"]', '2025-05-12 10:52:19', NULL, '2025-05-08 05:47:50', '2025-05-12 10:52:19'),
(37, 'App\\Models\\User', 1, 'MyApp', '444f07cd08d322f2be4d415f53b2e7cce4702083eb751e8e9d9674972f686709', '[\"*\"]', '2025-05-12 11:09:49', NULL, '2025-05-08 21:44:06', '2025-05-12 11:09:49'),
(38, 'App\\Models\\User', 9, 'MyApp', '6005c2ff63b787a87c698b5e7a6d749b3601a87dab1b66ed4bfadf50cf759e5b', '[\"*\"]', NULL, NULL, '2025-05-11 08:31:03', '2025-05-11 08:31:03'),
(39, 'App\\Models\\User', 10, 'MyApp', 'bd999a1c0c5974528f4d9fdcdd8e8c222ba4e2d431a27d5ef0229b7534b83701', '[\"*\"]', NULL, NULL, '2025-05-11 08:31:45', '2025-05-11 08:31:45'),
(40, 'App\\Models\\User', 11, 'MyApp', 'e55a1ec4f9defbf3cbc9a4244657baf6679c5eebfb10fe4b9178a237d1964b6e', '[\"*\"]', NULL, NULL, '2025-05-11 08:32:28', '2025-05-11 08:32:28'),
(41, 'App\\Models\\User', 12, 'MyApp', '5007e88c7166874d45c233f73536d14ae5be2058a5fe9af1c18d52a637b93a91', '[\"*\"]', NULL, NULL, '2025-05-11 08:32:52', '2025-05-11 08:32:52'),
(42, 'App\\Models\\User', 13, 'MyApp', '29a5e8a8bcc3279e499b66f9fa1aa279d3938cb72a08b910f10143fe3397627c', '[\"*\"]', NULL, NULL, '2025-05-11 08:33:40', '2025-05-11 08:33:40'),
(43, 'App\\Models\\User', 14, 'MyApp', 'ca8f79d2d0614618a9359ff71219a490c44543ba498a2fcd495a54d2a6cde9bc', '[\"*\"]', NULL, NULL, '2025-05-11 08:34:44', '2025-05-11 08:34:44'),
(44, 'App\\Models\\User', 15, 'MyApp', '74ad13172eaea59d90336ec3e624c2c287be6443ac31e4163e04f9a0972b384c', '[\"*\"]', NULL, NULL, '2025-05-11 08:36:27', '2025-05-11 08:36:27'),
(45, 'App\\Models\\User', 16, 'MyApp', 'f2beeb5a85d750dbf9096e2b6324719a4fb9aa83dfd6686bd024ad84380c15ae', '[\"*\"]', NULL, NULL, '2025-05-11 08:46:04', '2025-05-11 08:46:04'),
(46, 'App\\Models\\User', 17, 'MyApp', 'f2b5edfbe6ce9f6ba442e0bd5c17d802477192e4ec70c8c5ff114d38b7f3b3aa', '[\"*\"]', NULL, NULL, '2025-05-11 08:46:45', '2025-05-11 08:46:45'),
(47, 'App\\Models\\User', 18, 'MyApp', '2b245e8df134525dba678147c8257ce8d7c7a2baec798d8892747e6c3477f69a', '[\"*\"]', NULL, NULL, '2025-05-11 08:46:50', '2025-05-11 08:46:50'),
(48, 'App\\Models\\User', 19, 'MyApp', 'f3e2d159e470efbafe335d274beeedf1ed52dfb91fb45d6a35f197892677abdb', '[\"*\"]', NULL, NULL, '2025-05-11 08:47:34', '2025-05-11 08:47:34'),
(49, 'App\\Models\\User', 20, 'MyApp', '521423b85261780db1f55cc9a78765ac54b6df7520ef5149f6591f6843a01ce2', '[\"*\"]', NULL, NULL, '2025-05-11 08:47:37', '2025-05-11 08:47:37'),
(50, 'App\\Models\\User', 21, 'MyApp', '3f71e0c9e412bbeacde133e6b01deb1215687e24be2d7d6c89077b8ad20e9448', '[\"*\"]', NULL, NULL, '2025-05-11 08:49:39', '2025-05-11 08:49:39'),
(51, 'App\\Models\\User', 22, 'MyApp', '9bd53330cca2d6093e6543137a667506ab4f57c2801b66421103de57f12c9214', '[\"*\"]', NULL, NULL, '2025-05-11 08:50:16', '2025-05-11 08:50:16'),
(52, 'App\\Models\\User', 23, 'MyApp', '6a1b1bf8d9d55f96e5e2656b5e3134eeaffa98c584b175290f96f82e6cfcdaf6', '[\"*\"]', NULL, NULL, '2025-05-11 08:50:19', '2025-05-11 08:50:19'),
(53, 'App\\Models\\User', 24, 'MyApp', '440f4b6dc0ffd20b54621c56382ef5813cc7290f1cc20f24fe4c04110d63807b', '[\"*\"]', NULL, NULL, '2025-05-11 08:50:43', '2025-05-11 08:50:43'),
(54, 'App\\Models\\User', 25, 'MyApp', 'd1684448efe5b88f7f6ab652c5da6f3f462000005ce7178533dafdeb1b088bcd', '[\"*\"]', NULL, NULL, '2025-05-11 08:50:45', '2025-05-11 08:50:45'),
(55, 'App\\Models\\User', 26, 'MyApp', '089b4efc14de66494e07b04d5da1089d0bf5c9ba2799aae97345ca9f8b7c4445', '[\"*\"]', NULL, NULL, '2025-05-11 08:51:11', '2025-05-11 08:51:11'),
(56, 'App\\Models\\User', 27, 'MyApp', '64caf50ab9f0e50cae5bd26933d38341c86899d08a8df5b01f704c31086b0069', '[\"*\"]', NULL, NULL, '2025-05-11 08:51:14', '2025-05-11 08:51:14'),
(57, 'App\\Models\\User', 28, 'MyApp', '8db5c6ce5459a332716a5789e7031e76ee9c11a57cc73c4a9824a53260dbf830', '[\"*\"]', NULL, NULL, '2025-05-11 08:56:34', '2025-05-11 08:56:34'),
(58, 'App\\Models\\User', 29, 'MyApp', 'b604aa5323caf0e0c1d67ad50c445d1ae8ce546b2a4293e0d1e543897258a7cf', '[\"*\"]', NULL, NULL, '2025-05-11 09:04:11', '2025-05-11 09:04:11'),
(59, 'App\\Models\\User', 30, 'MyApp', 'a7291f1a0b359b4d4e25b2668ac71dcad6e62a056513f4448d587a4ed3c59a6b', '[\"*\"]', NULL, NULL, '2025-05-11 09:05:23', '2025-05-11 09:05:23'),
(60, 'App\\Models\\User', 31, 'MyApp', '95c0c2c852cf1ea43da82e845ed9a44f4c6ce2b7e9ae239a0369fbbc608c6740', '[\"*\"]', NULL, NULL, '2025-05-11 09:06:32', '2025-05-11 09:06:32'),
(61, 'App\\Models\\User', 32, 'MyApp', 'b9b4dcf3ffa38a788c2949bc2b13e37c17311d91caa78e549eb961bdd27f1d6a', '[\"*\"]', NULL, NULL, '2025-05-11 09:07:01', '2025-05-11 09:07:01'),
(62, 'App\\Models\\User', 33, 'MyApp', '1d2a197d1473b53535e55ba68a4559f118232516cecf47b07715f8b0531aa36b', '[\"*\"]', NULL, NULL, '2025-05-11 09:07:14', '2025-05-11 09:07:14'),
(63, 'App\\Models\\User', 34, 'MyApp', 'd77394518284503e78b6cc7ef6ea8442aacc04ab47c1e60fe6f6d4d8d7dad7fb', '[\"*\"]', NULL, NULL, '2025-05-11 09:12:30', '2025-05-11 09:12:30'),
(64, 'App\\Models\\User', 35, 'MyApp', '8c7e020bc5d2593eb74b067f6af757797bda3123666400cb43ebf1337f4732f6', '[\"*\"]', NULL, NULL, '2025-05-11 09:12:57', '2025-05-11 09:12:57'),
(65, 'App\\Models\\User', 36, 'MyApp', 'ba70aa970dcc2f60413118849e44cf1881043423c479c8b182067e6f20eace6d', '[\"*\"]', NULL, NULL, '2025-05-11 09:14:09', '2025-05-11 09:14:09'),
(66, 'App\\Models\\User', 37, 'MyApp', 'b0b30e6314069fececdc7737c247078617688072b8a22b215f59428216d2f259', '[\"*\"]', NULL, NULL, '2025-05-11 09:15:05', '2025-05-11 09:15:05'),
(67, 'App\\Models\\User', 38, 'MyApp', 'df030fa9c91ee3f5af5806d9424aa36b436575fd3a077d94c487041af98b4c95', '[\"*\"]', NULL, NULL, '2025-05-11 09:16:39', '2025-05-11 09:16:39'),
(68, 'App\\Models\\User', 39, 'MyApp', '8dab0a96615a7ff5c01d95920d17b9c20fbe730f2d596b86e13a702170d8b1e3', '[\"*\"]', NULL, NULL, '2025-05-11 09:18:16', '2025-05-11 09:18:16'),
(69, 'App\\Models\\User', 40, 'MyApp', '8cad1fb39fd9518c4b541b6619444b3b283d917abe6ab697a9a132092e29c5c6', '[\"*\"]', NULL, NULL, '2025-05-11 09:18:46', '2025-05-11 09:18:46'),
(70, 'App\\Models\\User', 41, 'MyApp', '2b81df19e1b2e02390be99f78520e23bed977dcc77aa46b7761087dba9be2060', '[\"*\"]', NULL, NULL, '2025-05-11 09:23:13', '2025-05-11 09:23:13'),
(71, 'App\\Models\\User', 42, 'MyApp', 'b4a1f8792b61bc9991cb2bcec3a935d0f2b6d654a0b20f881216752be70427ce', '[\"*\"]', NULL, NULL, '2025-05-11 09:27:29', '2025-05-11 09:27:29'),
(72, 'App\\Models\\User', 43, 'MyApp', '2941f96d817fa95f569edf2872cb445af06ac3254b2fc15ebc8e66533b3ef744', '[\"*\"]', NULL, NULL, '2025-05-11 09:28:02', '2025-05-11 09:28:02'),
(73, 'App\\Models\\User', 44, 'MyApp', 'f943b31728b9fb8851a80e93f6701502782b5bdb967f88b677d62c7b3f3a1203', '[\"*\"]', NULL, NULL, '2025-05-11 09:31:01', '2025-05-11 09:31:01'),
(74, 'App\\Models\\User', 45, 'MyApp', 'f77dc8cb4b372668fc7ba3311e61ddcc028817944cf04278162f74c73804bbd8', '[\"*\"]', NULL, NULL, '2025-05-11 09:32:38', '2025-05-11 09:32:38'),
(75, 'App\\Models\\User', 46, 'MyApp', '31300139a9f2f7349ee11853466c95e9c70fd0b6b2123e2edce3a06f19ad6105', '[\"*\"]', NULL, NULL, '2025-05-11 09:40:19', '2025-05-11 09:40:19'),
(76, 'App\\Models\\User', 47, 'MyApp', 'b6b7de76c73e9c67329806d84e6e84b59dfaa838808e97b84576bb4720317681', '[\"*\"]', NULL, NULL, '2025-05-11 09:53:50', '2025-05-11 09:53:50'),
(77, 'App\\Models\\User', 48, 'MyApp', '0690cdc2caaceca3ef6d72e2265d3a2f57c0aa92afe4da87145af6d3b3a2e2e8', '[\"*\"]', NULL, NULL, '2025-05-11 09:54:31', '2025-05-11 09:54:31'),
(78, 'App\\Models\\User', 49, 'MyApp', '8bc793ca9a617a1e07ba1ce9b946113ed67514f3ce6710c6d62f63ed085f92ab', '[\"*\"]', NULL, NULL, '2025-05-11 09:54:54', '2025-05-11 09:54:54'),
(79, 'App\\Models\\User', 50, 'MyApp', 'd0ff23c6c14606ea5d8a0c2d172e75a786b7aa63803b5ffc41454cefaf28d006', '[\"*\"]', NULL, NULL, '2025-05-11 09:57:51', '2025-05-11 09:57:51'),
(80, 'App\\Models\\User', 51, 'MyApp', '1f6e38962e80017af10beca0df6cdc9d5d8699fcb098ecacd7b40cb2bfcf278e', '[\"*\"]', NULL, NULL, '2025-05-11 09:59:56', '2025-05-11 09:59:56'),
(81, 'App\\Models\\User', 52, 'MyApp', '04d9324da954339058c536d7f4a8ff76c083c914b95dc9f9e23116a0b3f037fd', '[\"*\"]', NULL, NULL, '2025-05-11 10:04:46', '2025-05-11 10:04:46'),
(82, 'App\\Models\\User', 53, 'MyApp', '24b88a1136530b54ee5473e2df0a503016b3ac507afa75b5290edf612d3ee113', '[\"*\"]', NULL, NULL, '2025-05-11 10:05:20', '2025-05-11 10:05:20'),
(83, 'App\\Models\\User', 54, 'MyApp', '9bdb3822bcde72c11f2cc476cb09165a319fb1197eab0914f4f9a7e3891a1b74', '[\"*\"]', NULL, NULL, '2025-05-11 10:05:50', '2025-05-11 10:05:50'),
(84, 'App\\Models\\User', 55, 'MyApp', 'b006629508646b1ec9e2119eda8d50e25036ef8f368003d7a25b82e8ecac4df7', '[\"*\"]', NULL, NULL, '2025-05-11 10:07:36', '2025-05-11 10:07:36'),
(85, 'App\\Models\\User', 56, 'MyApp', 'b806367b2e7727247ab0693adce9bae12547bfd419f20fd8544067f899727f00', '[\"*\"]', NULL, NULL, '2025-05-11 10:08:10', '2025-05-11 10:08:10'),
(86, 'App\\Models\\User', 57, 'MyApp', 'b26906195f9679d00e9d67dc8c038fb3c040a9c282d243722e1dbf73b3e4bee8', '[\"*\"]', NULL, NULL, '2025-05-11 10:08:40', '2025-05-11 10:08:40'),
(87, 'App\\Models\\User', 58, 'MyApp', '4bb762887660f34d842a08f9fc34032c39ede4c016baf99a92ee6621926c8773', '[\"*\"]', NULL, NULL, '2025-05-11 10:09:08', '2025-05-11 10:09:08'),
(88, 'App\\Models\\User', 59, 'MyApp', 'deceb8bdd394c021140e5939104d934480f04fbe805c91a38c4218a1c98e03ee', '[\"*\"]', NULL, NULL, '2025-05-11 10:10:36', '2025-05-11 10:10:36'),
(89, 'App\\Models\\User', 60, 'MyApp', '3414c600acd5de37becaa6bc0dfa19fd2b7bbc2033bbbf9f6bbbf5a8e8f399fd', '[\"*\"]', NULL, NULL, '2025-05-11 10:11:00', '2025-05-11 10:11:00'),
(90, 'App\\Models\\User', 61, 'MyApp', '60317ce1ffeb360d4c8b039d9eca3993d9f599f603dea5697b2161259397a4c8', '[\"*\"]', NULL, NULL, '2025-05-11 10:24:01', '2025-05-11 10:24:01'),
(91, 'App\\Models\\User', 62, 'MyApp', '06420cf9253ff95d7bd50c03388c1f6fd4a37ce8c600014e4d44a6b3b441ef8b', '[\"*\"]', NULL, NULL, '2025-05-11 10:25:45', '2025-05-11 10:25:45'),
(92, 'App\\Models\\User', 63, 'MyApp', 'f596286114fbea5b9ddbb788b4b712597a479694fca87ebd9ceacf7c23514791', '[\"*\"]', NULL, NULL, '2025-05-11 10:35:43', '2025-05-11 10:35:43'),
(93, 'App\\Models\\User', 64, 'MyApp', 'f640eeb92c823fa9c946a1693ab8c88945dd9ffe39d23b11fe3393466b37943d', '[\"*\"]', NULL, NULL, '2025-05-11 10:37:49', '2025-05-11 10:37:49'),
(94, 'App\\Models\\User', 1, 'MyApp', '80b73c609aa3d1db894273eb4c2f5d764e94c6c049b90b55d8e1c4da0e03725c', '[\"*\"]', NULL, NULL, '2025-05-12 07:25:29', '2025-05-12 07:25:29'),
(95, 'App\\Models\\User', 65, 'MyApp', '7387b100a14ce133a89be85a6655f98eef4445a542500503b879f6cbd1522587', '[\"*\"]', NULL, NULL, '2025-05-12 07:28:23', '2025-05-12 07:28:23'),
(96, 'App\\Models\\User', 66, 'MyApp', '83ac5debe1f52391e415f91c9d086f95f13b258a8f49a030a65f678e76ebcf99', '[\"*\"]', NULL, NULL, '2025-05-12 07:29:29', '2025-05-12 07:29:29'),
(97, 'App\\Models\\User', 68, 'MyApp', '418c73b485de293af19f23e8b51286613a38d9bccccecdff1fc45775d96845c3', '[\"*\"]', NULL, NULL, '2025-05-12 07:38:43', '2025-05-12 07:38:43'),
(98, 'App\\Models\\User', 69, 'MyApp', '6a6b992fb404f8ddec80edf636f49b9e3aab70d8b5f53117b92d3a053209bdc6', '[\"*\"]', NULL, NULL, '2025-05-12 07:44:58', '2025-05-12 07:44:58'),
(99, 'App\\Models\\User', 1, 'MyApp', '8ab4ae72277b7d36c0ce030247e5688c029487171a7e325bb3022d62c9217785', '[\"*\"]', NULL, NULL, '2025-05-12 11:08:03', '2025-05-12 11:08:03'),
(100, 'App\\Models\\User', 1, 'MyApp', '2566df565da6180014fd21204094fefc9df80a08e997a7992a688c39f0dedf27', '[\"*\"]', NULL, NULL, '2025-05-12 11:10:08', '2025-05-12 11:10:08'),
(101, 'App\\Models\\User', 1, 'MyApp', 'c651c182187351fb85dc52e99c8849e236e3d981b7e253269a0af9c34fb3b6b8', '[\"*\"]', NULL, NULL, '2025-05-12 11:12:35', '2025-05-12 11:12:35'),
(102, 'App\\Models\\User', 1, 'MyApp', '281389ce5ed587d17837b25244574654981c90bd2e1113cbd372d9b80d097385', '[\"*\"]', NULL, NULL, '2025-05-12 11:16:09', '2025-05-12 11:16:09'),
(103, 'App\\Models\\User', 1, 'MyApp', 'fc1324e4cc9b09d03483225f8468dde98c983909a43d0bc281f780dce0f6f9fb', '[\"*\"]', NULL, NULL, '2025-05-12 11:17:04', '2025-05-12 11:17:04'),
(104, 'App\\Models\\User', 1, 'MyApp', '685b718e59432e06dcf0232a0c74de77d4a96342b245d9e99b24750eab8fe454', '[\"*\"]', '2025-05-12 11:19:49', NULL, '2025-05-12 11:19:48', '2025-05-12 11:19:49'),
(105, 'App\\Models\\User', 70, 'MyApp', '449a277c5a438de74bf7834d9800d90533d15b369aeaeb02eb8dd9cc37d4ad1a', '[\"*\"]', NULL, NULL, '2025-05-12 11:29:44', '2025-05-12 11:29:44'),
(106, 'App\\Models\\User', 1, 'MyApp', 'd133060ea92f8fae554f9a540e86939b1024e0b440ac49c66f1ac023a394a9a1', '[\"*\"]', '2025-05-14 12:52:46', NULL, '2025-05-12 11:30:39', '2025-05-14 12:52:46'),
(107, 'App\\Models\\User', 71, 'MyApp', 'b203c8ba57adef3ba397b5f883ad0fc39acb428acf095ea46e0169a70f14eb08', '[\"*\"]', NULL, NULL, '2025-05-12 19:41:06', '2025-05-12 19:41:06'),
(108, 'App\\Models\\User', 1, 'MyApp', '2edd7b081dfbd934daa808097803fba97e06c19a378e7952be0726d1f7b454a2', '[\"*\"]', '2025-05-12 19:42:20', NULL, '2025-05-12 19:41:41', '2025-05-12 19:42:20'),
(109, 'App\\Models\\User', 71, 'MyApp', 'c662b9014711506191837d33ed298bbc716c4c2fc377c985ea24f0232c24fa82', '[\"*\"]', '2025-05-12 19:43:28', NULL, '2025-05-12 19:43:25', '2025-05-12 19:43:28'),
(110, 'App\\Models\\User', 1, 'MyApp', '0755c8df2d661c5753122a9237097918f197908ac2664c6152716d12d2e79b92', '[\"*\"]', '2025-05-19 08:14:00', NULL, '2025-05-15 09:30:51', '2025-05-19 08:14:00'),
(111, 'App\\Models\\User', 1, 'MyApp', 'db79fb544cc0eef2790ad6eec3a3b28ee5fd69a07d55f0f67ab8729464e2582e', '[\"*\"]', NULL, NULL, '2025-05-16 09:19:11', '2025-05-16 09:19:11'),
(112, 'App\\Models\\User', 1, 'MyApp', '7f64616b99a6f9f88cf302d552cdee05ea7aeae3b3e9bbf6ab3baaf5744740d7', '[\"*\"]', '2025-05-16 09:21:14', NULL, '2025-05-16 09:21:11', '2025-05-16 09:21:14'),
(113, 'App\\Models\\User', 1, 'MyApp', '6624bfe08b63ced3e5896de149c6ee88fd200dac6b6035e9dc1a9d6859ecdf7d', '[\"*\"]', NULL, NULL, '2025-05-16 09:25:05', '2025-05-16 09:25:05'),
(114, 'App\\Models\\User', 1, 'MyApp', '700de8cc7ec93e01bf53ff0b5526d2bdf7d634e339139a9b0a7915326a5d6554', '[\"*\"]', '2025-05-16 21:37:23', NULL, '2025-05-16 21:37:21', '2025-05-16 21:37:23'),
(115, 'App\\Models\\User', 1, 'MyApp', '3f3bb66cd5b19f4c03d7fed618c04d689946d4811ee94dd91d9e5d65bfec4de7', '[\"*\"]', '2025-05-21 08:22:55', NULL, '2025-05-21 00:53:29', '2025-05-21 08:22:55'),
(116, 'App\\Models\\User', 1, 'MyApp', '9d419a1b3a5b403d1f374fe62a20f9176a8cda5cff2590564fdbe91fc55c083e', '[\"*\"]', NULL, NULL, '2025-05-21 07:50:29', '2025-05-21 07:50:29'),
(117, 'App\\Models\\User', 1, 'MyApp', 'c38683d465ef91678935dc1cede2829d10180ca9f34243120c8783ad4d136fe6', '[\"*\"]', '2025-05-21 08:30:42', NULL, '2025-05-21 08:24:04', '2025-05-21 08:30:42'),
(118, 'App\\Models\\User', 1, 'MyApp', '6a1e1489d2c6aa763c6cf288e75976bcc5500a31c6b7a940e85d23a6753fb7dd', '[\"*\"]', '2025-05-23 22:05:47', NULL, '2025-05-21 10:08:06', '2025-05-23 22:05:47');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('738pIpKyIYA2uqCJ3c5nttmjZniXiqSQHHEhsxux', 1, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOUhTN2FWa3U5dlhnOXE0OU5QenZrTDNnR3ZyVjl0MTJDempMcVlteSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1748037398),
('BIbf1xLV3Ggwa5PpR8eP1Gaxf1wxwhsSjX1omvlh', 1, '192.168.1.108', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiV2pIV1dHaTB3N1FiRDNSY2lmcHpsQm9tWFlIbjJPRzVSZlc2cnQwcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xOTIuMTY4LjEuMTA4OjgwMDAvZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1747306508),
('uMl8GgtrE61R60Iah0GELSryKy3whLh3W3os9t5k', NULL, '192.168.1.108', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidG4xMUVIa2JncHhKR1dMQUpKektNbkphRHg3anVwdW1acVRtMU9leSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8xOTIuMTY4LjEuMTA4OjgwMDAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1748047052);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `admin`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Baraa jazah', 'baraajazah@gmail.com', '2025-04-22 09:13:10', '$2y$12$ZLSX6U0bUCGgDSY/mGdPxu8A/WawN5k4GiYmldDc5OE8/hryoze6O', 0, 'man4', 'YUp4kGF8wm', '2025-04-22 09:13:10', '2025-05-13 14:21:35'),
(71, 'baraa jazah1', 'baraajazah1@gmail.com', NULL, '$2y$12$xSSGwD1mewKrn32pf/tYTexJVkpta3pPqso6LkWhRUAPCzBwKeru.', 0, 'man1', NULL, '2025-05-12 19:41:06', '2025-05-12 19:41:06');

-- --------------------------------------------------------

--
-- Table structure for table `user_ratings`
--

CREATE TABLE `user_ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `stars` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_ratings`
--

INSERT INTO `user_ratings` (`id`, `userId`, `stars`, `comment`, `created_at`, `updated_at`) VALUES
(6, 1, 5, 'good App', '2025-05-11 11:11:06', '2025-05-11 11:11:06'),
(7, 1, 5, 'good App', '2025-05-12 08:02:45', '2025-05-12 08:02:45'),
(8, 1, 4, 'Tyyyy', '2025-05-12 16:50:29', '2025-05-12 16:50:29'),
(9, 1, 5, NULL, '2025-05-12 16:51:31', '2025-05-12 16:51:31'),
(10, 1, 5, NULL, '2025-05-12 17:30:01', '2025-05-12 17:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_subscribes`
--

CREATE TABLE `user_subscribes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `premier` int(11) DEFAULT 0,
  `premierEndDate` date DEFAULT NULL,
  `limitDish` int(11) NOT NULL DEFAULT 3,
  `limitAI` int(11) NOT NULL DEFAULT 20,
  `myDish` int(11) NOT NULL DEFAULT 0,
  `myAI` int(11) NOT NULL DEFAULT 0,
  `makeReview` tinyint(1) NOT NULL DEFAULT 0,
  `referralCode` tinyint(1) NOT NULL DEFAULT 0,
  `myReferralCode` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_subscribes`
--

INSERT INTO `user_subscribes` (`id`, `userId`, `premier`, `premierEndDate`, `limitDish`, `limitAI`, `myDish`, `myAI`, `makeReview`, `referralCode`, `myReferralCode`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL, 20, 20, 4, 5, 0, 0, '1YNDPID0', NULL, '2025-05-14 12:27:51'),
(60, 71, 0, NULL, 3, 20, 0, 0, 0, 0, '1YQE0N70', '2025-05-12 19:41:06', '2025-05-12 19:41:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercises_typeid_foreign` (`typeId`);

--
-- Indexes for table `exercise_catagories`
--
ALTER TABLE `exercise_catagories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercise_types`
--
ALTER TABLE `exercise_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercise_types_catagoryid_foreign` (`catagoryId`);

--
-- Indexes for table `explanes`
--
ALTER TABLE `explanes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_typeid_foreign` (`typeId`);

--
-- Indexes for table `food_catagories`
--
ALTER TABLE `food_catagories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_types`
--
ALTER TABLE `food_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_types_catagoryid_foreign` (`catagoryId`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goals_userid_foreign` (`userId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_calenders`
--
ALTER TABLE `my_calenders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_calenders_userid_foreign` (`userId`);

--
-- Indexes for table `my_dishes`
--
ALTER TABLE `my_dishes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_dishes_userid_foreign` (`userId`);

--
-- Indexes for table `my_dish_food`
--
ALTER TABLE `my_dish_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_dish_food_mydishid_foreign` (`myDishId`),
  ADD KEY `my_dish_food_foodid_foreign` (`foodId`);

--
-- Indexes for table `my_exercises`
--
ALTER TABLE `my_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_exercises_userid_foreign` (`userId`);

--
-- Indexes for table `my_exercise_exercises`
--
ALTER TABLE `my_exercise_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_exercise_exercises_myexerciseid_foreign` (`myExerciseId`),
  ADD KEY `my_exercise_exercises_exerciseid_foreign` (`exerciseId`);

--
-- Indexes for table `my_favorite_exercises`
--
ALTER TABLE `my_favorite_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_favorite_exercises_userid_foreign` (`userId`),
  ADD KEY `my_favorite_exercises_catagoryid_foreign` (`catagoryId`),
  ADD KEY `my_favorite_exercises_exerciseid_foreign` (`exerciseId`);

--
-- Indexes for table `my_favorite_food`
--
ALTER TABLE `my_favorite_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_favorite_food_userid_foreign` (`userId`),
  ADD KEY `my_favorite_food_catagoryid_foreign` (`catagoryId`),
  ADD KEY `my_favorite_food_foodid_foreign` (`foodId`);

--
-- Indexes for table `my_updates`
--
ALTER TABLE `my_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_updates_userid_foreign` (`userId`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_ratings`
--
ALTER TABLE `user_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ratings_userid_foreign` (`userId`);

--
-- Indexes for table `user_subscribes`
--
ALTER TABLE `user_subscribes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_subscribes_userid_foreign` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `exercise_catagories`
--
ALTER TABLE `exercise_catagories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exercise_types`
--
ALTER TABLE `exercise_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `explanes`
--
ALTER TABLE `explanes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `food_catagories`
--
ALTER TABLE `food_catagories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food_types`
--
ALTER TABLE `food_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT for table `my_calenders`
--
ALTER TABLE `my_calenders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `my_dishes`
--
ALTER TABLE `my_dishes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=353;

--
-- AUTO_INCREMENT for table `my_dish_food`
--
ALTER TABLE `my_dish_food`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=839;

--
-- AUTO_INCREMENT for table `my_exercises`
--
ALTER TABLE `my_exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_exercise_exercises`
--
ALTER TABLE `my_exercise_exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_favorite_exercises`
--
ALTER TABLE `my_favorite_exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `my_favorite_food`
--
ALTER TABLE `my_favorite_food`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=386;

--
-- AUTO_INCREMENT for table `my_updates`
--
ALTER TABLE `my_updates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `user_ratings`
--
ALTER TABLE `user_ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_subscribes`
--
ALTER TABLE `user_subscribes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `exercise_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exercise_types`
--
ALTER TABLE `exercise_types`
  ADD CONSTRAINT `exercise_types_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `exercise_catagories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `food_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `food_types`
--
ALTER TABLE `food_types`
  ADD CONSTRAINT `food_types_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `food_catagories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_calenders`
--
ALTER TABLE `my_calenders`
  ADD CONSTRAINT `my_calenders_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_dishes`
--
ALTER TABLE `my_dishes`
  ADD CONSTRAINT `my_dishes_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_dish_food`
--
ALTER TABLE `my_dish_food`
  ADD CONSTRAINT `my_dish_food_foodid_foreign` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_dish_food_mydishid_foreign` FOREIGN KEY (`myDishId`) REFERENCES `my_dishes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_exercises`
--
ALTER TABLE `my_exercises`
  ADD CONSTRAINT `my_exercises_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_exercise_exercises`
--
ALTER TABLE `my_exercise_exercises`
  ADD CONSTRAINT `my_exercise_exercises_exerciseid_foreign` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_exercise_exercises_myexerciseid_foreign` FOREIGN KEY (`myExerciseId`) REFERENCES `my_exercises` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_favorite_exercises`
--
ALTER TABLE `my_favorite_exercises`
  ADD CONSTRAINT `my_favorite_exercises_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `exercise_catagories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_favorite_exercises_exerciseid_foreign` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_favorite_exercises_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_favorite_food`
--
ALTER TABLE `my_favorite_food`
  ADD CONSTRAINT `my_favorite_food_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `food_catagories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_favorite_food_foodid_foreign` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_favorite_food_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_updates`
--
ALTER TABLE `my_updates`
  ADD CONSTRAINT `my_updates_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_ratings`
--
ALTER TABLE `user_ratings`
  ADD CONSTRAINT `user_ratings_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_subscribes`
--
ALTER TABLE `user_subscribes`
  ADD CONSTRAINT `user_subscribes_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
