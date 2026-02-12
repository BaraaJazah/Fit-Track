/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: u836463890_systemTakip
-- ------------------------------------------------------
-- Server version	11.8.3-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `alt_groups`
--

DROP TABLE IF EXISTS `alt_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `alt_groups` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `group_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alt_groups_group_id_foreign` (`group_id`),
  CONSTRAINT `alt_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alt_groups`
--

/*!40000 ALTER TABLE `alt_groups` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `alt_groups` VALUES
(1,'Hazır Beton',1,NULL,NULL),
(2,'Pompalı Beton',1,NULL,NULL),
(3,'C30 Beton',1,NULL,NULL),
(4,'Şap Beton',1,NULL,NULL),
(5,'Nervürlü Demir',2,NULL,NULL),
(6,'Hasır Çelik',2,NULL,NULL),
(7,'Demir Bağlantı Elemanları',2,NULL,NULL),
(8,'Ankraj Demiri',2,NULL,NULL),
(9,'Ahşap Kalıp',3,NULL,NULL),
(10,'Çelik Kalıp',3,NULL,NULL),
(11,'Tırmanır Kalıp',3,NULL,NULL),
(12,'Kalıp Yağı',3,NULL,NULL),
(13,'Priz ve Anahtar',4,NULL,NULL),
(14,'Kablo Döşeme',4,NULL,NULL),
(15,'Pano Montajı',4,NULL,NULL),
(16,'Aydınlatma',4,NULL,NULL),
(17,'PVC Pencere',5,NULL,NULL),
(18,'Alüminyum Kapı',5,NULL,NULL);
/*!40000 ALTER TABLE `alt_groups` ENABLE KEYS */;
commit;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `cache` VALUES
('laravel_cache_baraajaszah@gmail.coms|46.1.137.43','i:1;',1744631774),
('laravel_cache_baraajaszah@gmail.coms|46.1.137.43:timer','i:1744631774;',1744631774),
('laravel_cache_beraaceze@gmail.com|46.1.137.43','i:2;',1744630514),
('laravel_cache_beraaceze@gmail.com|46.1.137.43:timer','i:1744630514;',1744630514),
('laravel_cache_example1@gmail.com|193.140.8.25','i:2;',1744635570),
('laravel_cache_example1@gmail.com|193.140.8.25:timer','i:1744635570;',1744635570),
('laravel_cache_example2@gmail.com|193.140.8.25','i:1;',1744635564),
('laravel_cache_example2@gmail.com|193.140.8.25:timer','i:1744635564;',1744635564);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
commit;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
commit;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
commit;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `groups` VALUES
(1,'Beton',NULL,NULL),
(2,'Demir',NULL,NULL),
(3,'Kalıp',NULL,NULL),
(4,'Elektrik',NULL,NULL),
(5,'Doğrama',NULL,NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
commit;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
commit;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
commit;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(102,'0001_01_01_000001_create_cache_table',1),
(103,'0001_01_01_000002_create_jobs_table',1),
(104,'2025_04_12_131050_create_groups_table',1),
(105,'2025_04_12_132056_create_alt_groups_table',1),
(106,'2025_04_12_132126_create_units_table',1),
(107,'2025_04_12_141525_create_works_table',1),
(108,'3001_01_01_000000_create_users_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
commit;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
commit;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `sessions` VALUES
('4mEB3Yw72uvofJ1ShXX7EVs3DEUQqIgFlBQ2muJD',NULL,'129.28.14.231','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGJRUTRPeXBQOXIyUFlYd2VXTVl6OVNOYk9Ed1hpblRZcWtJZ2VYQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747935181),
('6AMOFXasyPpqDLH9g5yfjal5yPbMHdXPLsIqpCuM',NULL,'170.106.107.87','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHJUYmxZajFtc0hjS3J4VktnVnpqU1JMSlhaUHZDN3RVeldxS3BEWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747881951),
('79AOWnsJuPl15B76J2Gkt0XTwgjerGZ6DhwfzFMy',NULL,'43.159.145.153','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoidnZHMlo3MGcwWko2SVZJUXMwWFlNTHlNSDllUmVNNVY2dFhibWFKQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747881487),
('9lXgLu8myrxSllK0iBVRqDg0VS5er7lwwR6HhFuR',NULL,'49.51.180.2','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNnR5TkFWUFRRVnVlNHdZb1pZZGh0YzAxVVh2dnBmMWlWOGVTbVRzdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747887560),
('ACKDUZZS3dTkshyABC67r2uR0iriNwhfh6Ix0nDr',NULL,'184.154.76.53','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)','YTozOntzOjY6Il90b2tlbiI7czo0MDoic29OazJRd0VzMzRweUlIM1hLWjdUT1FQRzVkQU85OGN1ZjRia0JsNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747913780),
('Ag6VsTnXZ0LSKjXr9y3EIy4hqYFSVS9srxxe8zoM',NULL,'54.213.224.129','Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW9UeVJ6T09tMVRRSWtQSkZLOEtrWWZGblkzRWNZd2RpS0NqM2ZJTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747945072),
('c0kMsUNjZ8PxJ9nOtTUDke5jOAtzPdWz8qD7XHdt',NULL,'43.135.144.81','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFpkU2hMd0Z4ZEIxSU5uUjZyelZRTXFvUTRZdkx2a251V005SmJpMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747912619),
('cfhcCECwMSD6KCDMmmce5feVHkW2NGuGhjKlFW3I',NULL,'199.244.88.231','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0xzdXQ4bnhHVFcxZEVXUkdkbVBPandOWW81MThqMHp1Uzl5amNpSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747920209),
('dHi9ZHr1exdewbEkWQxzvvz0k83Pv3Yys9290dzD',NULL,'18.237.35.241','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWUdVYjlnUllma2gyUHJTWFQwaGtid01tMUJERTJJMm5kZkJ0dkRWaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747850997),
('gYC9ckbdvwxLDE7ixNbmO4uYUV70V807TnZ1PyoY',NULL,'43.159.145.153','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVDVIREtQT3FHalpwWTFwSWVkY0FyeVNvRjI1R2t1aFJKblJVVDJPZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748045539),
('h3I3TgoUpjeSKm4ugtM1dMyY9gKMxdjTnhwUbJf0',NULL,'114.80.36.40','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRlRuNHV0eHcyalpMbFlrME9jMUJhUFVaVEJtTmgwVDVHek4yN1hsMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747946828),
('J0liNy5yIarWmoTP5doHmFJKSsn8MlIFBw3g18Qo',NULL,'49.51.233.46','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWp5VVl2S29UbVVjbEcyeGhOcWdXclp3aTg0YXBOR3ZGeDlaMFRaRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747840141),
('LlfNPyfWf7P3FIAppZaA0QM7v5Pan3nZygYtmq9K',NULL,'35.163.128.89','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFpLUnRBMVkxemNQb2E3VksyTm55cVlzNks3ZHViSjZXdkVIY3B4SiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748043331),
('ngUjdOZLgJG7GGKOjtm46stZPKqlv9kDgz8AnhRA',NULL,'184.154.76.53','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTG9CSzlIRlFTMzdUWG9FMmtlcUJYc2pVVUFYR0ZYQm9rbWFYd3JvVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747913779),
('oExIG9VrHbQwyDSTkqbsbd0OLtPYyV2hfcR3rbLq',NULL,'43.130.40.120','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoicmpuSzNxZU9qZkJxdlk5TzVsdExNdngyY3VjR1piZlpkSmZhU3dCaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747850833),
('oRKnoGhQKuoC4bwNnyGrOPzUrV1aL1JWM1rQFYm1',NULL,'138.68.91.245','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieU1teWF6SHpOS1pTdE5RUFpJa2V2ME05V3JKakpXaHNRM2E3ZVZlaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747959837),
('PsSNNm47klB0NtInC7SyWwO8hzEIAL2YufyJnDDe',NULL,'124.221.245.78','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFl0S3hodEZIaTRqRmNWdUU2Y2xGeGRvMUd2cW9Ham4wY2llUnlRWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747842538),
('QFtPsRLmArsSTrx5ngUQzgF4YLLoj4a8vtqywT5L',NULL,'184.154.76.53','SiteLockSpider [en] (WinNT; I ;Nav)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSllSNmZITlY3M0N5OUdIaTB5dlZYUHRoeU51d2RhbWNDdnZVNlJSeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6OTQ6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZS9sb2dpbj9fdG9rZW49c29OazJRd0VzMzRweUlIM1hLWjdUT1FQRzVkQU85OGN1ZjRia0JsNiZlbWFpbD0xJnBhc3N3b3JkPTEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1747913784),
('qKWb9QA4DRxFidL9VNQypsai82EIg1GfmnMbd4Yy',NULL,'138.246.253.7','quic-go-HTTP/3','YToyOntzOjY6Il90b2tlbiI7czo0MDoiMnNabmppcnpoWkNHYjY1c1Z1NkpjN3dQRFpkU2dEWEJudEJZS3BUdyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1747986154),
('RpEX62tH91aLCtqYcev5ZDp0nfSkaiFUkSaodOgp',NULL,'44.245.163.52','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXNVUGFhdFgzTkI4SnpqOGNyc2VIYmYyb28yV2xPZ29PMkdRTmg4USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748042784),
('Sc5lKwL256vYtZNge2vkaSS6IBgPeTAzTdTsSPjb',NULL,'35.212.232.223','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko; compatible; BW/1.3; rb.gy/qyzae5) Chrome/124.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYnJBdXo2TmpTY1dwQXV2YzZwWkYxMlhsVVFwU1ZtVlpreUExNkxVVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747863254),
('taIef2fxPXGJiImZltr22yQzgRCzmDvZhS2Z7JqS',NULL,'52.13.92.152','Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoic1NNaTdDaHF2N3JTMUdjTGVIZzYzSlBmYUdGSmlzSE9kajR3bHpXaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747983101),
('ttItor2oKVvp02mSjiSQklr7lCMmIbMnH9GJqOMF',NULL,'162.14.197.180','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSm9GYnYxRm9ROWFPdnNGdUxFb0Z3clRNVWx4aENhNXgwZVdjMGd6ViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748015443),
('VIHXaocBbgUiQzET39OPKO2yMTP37Y8flAv0QFzv',NULL,'2a02:4780:40:c0de::6','Go-http-client/2.0','YToyOntzOjY6Il90b2tlbiI7czo0MDoid2UyWm1KNno3d1RtTDFtYXpEVmx5cVpzZUFvY1RiYWxFUWw0NldLTSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1747873145),
('wjKjcdNZxvSIVrPOSnQkl5VxULYjLp9wXvglaFml',NULL,'38.171.228.56','Mozilla/5.0 (X11; CrOS x86_64 14092.77.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.107 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiT3VsaFJTVGdOTTBwUnVvZEp2Z1RxWUd4VzdJZ2lZQkh2VFRIOGJJayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747908322),
('xHg8ashxsWt2GtcwcY41GF3ZkisZSfmJZc0YN2Uw',NULL,'2a02:4780:40:c0de::6','Go-http-client/2.0','YToyOntzOjY6Il90b2tlbiI7czo0MDoiSUhQRlVMbDY2dHlickJHVFVGWEVhRkl2T09OM0F1VkJRYmRCZmhnZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1747987494),
('XIJnpraDTMmwdyMnaPKXfNwVr97YKtmC6OtY9uVs',NULL,'54.203.14.207','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582','YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1ZwaXhUM25kTkhYeHNqZUxtc1NlblduZ1RFakRzSnVsSGlpbGdyUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747868620),
('XIoKpvweseiIqh7MCLUlheSjLZWFC3cAVlasUQVF',NULL,'35.91.32.56','Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmx6SkZrcFJOYVNNTWxweDIxYVNiVFM4NHlHbXlsQWw0OWN1VGQ0TyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747957947),
('xReRiG3F2BPRSzQQeBGwfEUr4dvTEg1V8j7eOtZp',NULL,'52.13.92.152','Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZTd4NEk1Z3VIS2w5QkZkSWNrYkV2anRiamU5OUY5Mkt4QzhnaTFLayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1747983098);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
commit;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

/*!40000 ALTER TABLE `units` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `units` VALUES
(1,'Planlama',NULL,NULL),
(2,'Şantiye',NULL,NULL),
(3,'Elektrik',NULL,NULL),
(4,'Mekanik',NULL,NULL),
(5,'İnşaat',NULL,NULL),
(6,'Mimarlık',NULL,NULL),
(7,'Statik',NULL,NULL),
(8,'Altyapı',NULL,NULL),
(9,'Kalite Kontrol',NULL,NULL),
(10,'İş Güvenliği',NULL,NULL),
(11,'Satın Alma',NULL,NULL),
(12,'Lojistik',NULL,NULL),
(13,'Depo',NULL,NULL),
(14,'aşeron Yönetimi',NULL,NULL),
(15,'Çevre ve Atık',NULL,NULL);
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `isResonsible` tinyint(1) NOT NULL DEFAULT 0,
  `unit_id` bigint(20) unsigned DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_unit_id_foreign` (`unit_id`),
  CONSTRAINT `users_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Baraa Jazah','baraajazah@gmail.com',NULL,'$2y$12$cm0pFbDRvu6HXD2Ae1IQJuqIZ6ze9T1PQaBrVnAJ5/xZUMpmmzwBi','5352723705',1,0,NULL,NULL,NULL,NULL),
(2,'employee1','employee1@gmail.com',NULL,'$2y$12$XRpZLqjh.1S8CCGtqrZygeYKQt9U34f3oYw4n2jKIlgKpwzc9/w36','5037415905',0,1,1,NULL,NULL,NULL),
(3,'employee2','employee2@gmail.com',NULL,'$2y$12$gcterL2wMx2t4/1yO7j21.GOhz9ppnvOF9pcLBXPvhUtEc.W9kLkC','5033698905',0,1,2,NULL,NULL,NULL),
(4,'employee3','employee3@gmail.com',NULL,'$2y$12$iHYGoYFa0Ik.gcPMhDFp.ujxtRQ7fs15N1BgRoChW2wkHiCpX70zq','5034567905',0,0,2,NULL,NULL,NULL),
(5,'employee4','employee4@gmail.com',NULL,'$2y$12$zlJ3rrHmw9Lq.FP72Ju76.8sCSnRe7hyosgbz9JlHOv06/Yal13Di','5031238905',0,1,5,NULL,NULL,NULL),
(13,'Endüstri Mühendisliği','endustri@gmail.com',NULL,'$2y$12$osNWHJF2kDtBpUpACVojM.PVTeDQhqqS4cq.hbMsqLg.IZa83tlyq','5352931892',1,0,NULL,NULL,'2025-04-14 10:40:23','2025-04-14 10:40:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
commit;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) unsigned NOT NULL,
  `altGroup_id` bigint(20) unsigned NOT NULL,
  `unit_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `explane` longtext NOT NULL,
  `status` enum('active','continue','wait','finish') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `works_group_id_foreign` (`group_id`),
  KEY `works_altgroup_id_foreign` (`altGroup_id`),
  KEY `works_unit_id_foreign` (`unit_id`),
  CONSTRAINT `works_altgroup_id_foreign` FOREIGN KEY (`altGroup_id`) REFERENCES `alt_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `works_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `works_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

/*!40000 ALTER TABLE `works` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `works` VALUES
(8,1,2,2,'Beton Dökme','Temel ve kolonlar için yüksek dayanımlı beton dökülmesi işlemi yapılacaktır. Beton dökme sırasında vibratör kullanılarak boşlukların önüne geçilecek ve yüzey düzgünlüğü sağlanacaktır.','active','2025-04-14 10:30:37','2025-04-14 10:30:37'),
(9,1,4,5,'Temel Kazısı','Bina temeli için gerekli olan kazı işlemleri eksiksiz ve güvenli bir şekilde gerçekleştirilecektir.','active','2025-04-14 10:31:45','2025-04-14 10:37:43'),
(10,2,6,8,'Demir Donatı Montajı','Betonarme elemanlar için proje detaylarına uygun şekilde demir donatı montajı yapılacaktır.','active','2025-04-14 10:32:33','2025-04-14 10:37:53'),
(11,3,9,4,'Kalıp Kurulumu','Kolon ve kirişler için ahşap veya çelik kalıp sistemleri kurulacaktır.','active','2025-04-14 10:33:14','2025-04-14 10:33:14'),
(12,1,4,2,'Betonarme Kolon Dökümü','Statik projeye uygun ölçülerde kolon betonları dökülecektir.','active','2025-04-14 10:33:48','2025-04-14 10:44:23'),
(13,1,1,2,'Duvar Örme','Bina iç ve dış duvarları tuğla veya bims malzemesi kullanılarak örülecektir','finish','2025-04-14 10:34:22','2025-04-14 13:22:00'),
(14,3,9,7,'Çatı Kaplama','Çatı iskeleti üzerine su yalıtımlı ve dayanıklı kaplama yapılacaktır','active','2025-04-14 10:34:55','2025-04-14 10:34:55'),
(15,5,18,4,'Sıva Uygulaması','İç ve dış duvarlara düzgün yüzey elde etmek amacıyla kaba ve ince sıva işlemleri yapılacaktır.','active','2025-04-14 10:35:35','2025-04-14 10:35:35'),
(16,4,14,3,'Elektrik Tesisatı Döşeme','Projeye uygun şekilde elektrik kabloları ve priz/switch hatları çekilecektir','active','2025-04-14 10:36:14','2025-04-14 12:07:36'),
(17,5,18,3,'Su Tesisatı Döşeme','Temiz su ve pis su tesisatları, projesine uygun olarak döşenecektir','active','2025-04-14 10:36:42','2025-04-14 10:36:42'),
(18,4,16,3,'Isı ve Su Yalıtımı','Temel, teras ve çatı bölgelerinde su ve ısı yalıtım malzemeleri ile koruma sağlanacaktır','active','2025-04-14 10:37:09','2025-04-14 10:37:09'),
(19,3,10,4,'aaaa','aaaaa','continue','2025-04-14 13:06:26','2025-04-14 13:06:51');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
commit;

--
-- Dumping routines for database 'u836463890_systemTakip'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-02-10 14:42:37
