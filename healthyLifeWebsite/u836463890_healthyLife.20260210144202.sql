/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: u836463890_healthyLife
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
('laravel_cache_beraaceze@gmail.com|192.168.1.106','i:1;',1753883522),
('laravel_cache_beraaceze@gmail.com|192.168.1.106:timer','i:1753883522;',1753883522),
('laravel_cache_beraaceze@gmail.com|192.168.1.108','i:1;',1747306510),
('laravel_cache_beraaceze@gmail.com|192.168.1.108:timer','i:1747306510;',1747306510),
('laravel_cache_beraaceze@gmail.com|192.168.1.109','i:1;',1758364804),
('laravel_cache_beraaceze@gmail.com|192.168.1.109:timer','i:1758364804;',1758364804);
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
-- Table structure for table `exercise_catagories`
--

DROP TABLE IF EXISTS `exercise_catagories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_catagories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) NOT NULL,
  `TrName` varchar(40) NOT NULL,
  `DeName` varchar(40) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_catagories`
--

/*!40000 ALTER TABLE `exercise_catagories` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `exercise_catagories` VALUES
(1,'Cardio Training','تمارين الكارديو','Kardiyo Antrenmanı','Kardiotraining','catagories/exercise1.jpg',NULL,NULL),
(2,'Strength Training','تمارين القوة','Kuvvet Antrenmanı','Krafttraining','catagories/exercise2.jpg',NULL,NULL),
(3,'Flexibility & Mobility','تمارين المرونة والحركة','Esneklik & Hareketlilik','Beweglichkeit & Flexibilität','catagories/exercise3.jpg',NULL,NULL);
/*!40000 ALTER TABLE `exercise_catagories` ENABLE KEYS */;
commit;

--
-- Table structure for table `exercise_types`
--

DROP TABLE IF EXISTS `exercise_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `catagoryId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) NOT NULL,
  `TrName` varchar(40) NOT NULL,
  `DeName` varchar(40) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_types_catagoryid_foreign` (`catagoryId`),
  CONSTRAINT `exercise_types_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `exercise_catagories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_types`
--

/*!40000 ALTER TABLE `exercise_types` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `exercise_types` VALUES
(1,1,'Light Intensity','كارديو خفيفة الشدة ','Hafif Yoğunluk','Leichte Intensität',NULL,NULL),
(2,1,'Moderate Intensity','كارديو متوسطة الشدة ','Orta Yoğunluk','Mittlere Intensität',NULL,NULL),
(3,2,'Body weight Training','تمارين وزن الجسم','Vücut Ağırlığı Antrenmanı','Eigengewichts-Training',NULL,NULL),
(4,2,'Free Weights','الأوزان الحرة','Serbest Ağırlıklar','Freie Gewichte',NULL,NULL),
(5,2,'Resistance Bands','تمارين الأربطة','Direnç Bantları','Widerstandsbänder',NULL,NULL),
(6,2,'Machines','الآلات','Makineler','Geräte',NULL,NULL),
(7,3,'Yoga','تمارين اليوغا','Yoga','Yoga',NULL,NULL),
(8,3,'Pilates','البيلاتس','Pilates','Pilates',NULL,NULL),
(9,3,'Stretching','تمارين التمدد','Esneme','Dehnen',NULL,NULL),
(10,3,'Dynamic Stretching','تمارين التمدد الديناميكي','Dinamik Esneme','Dynamisches Dehnen',NULL,NULL),
(11,1,'Vigorous Intensity','كارديو عالية الشدة ','Yüksek Yoğunluk','Hohe Intensität',NULL,NULL),
(12,2,'Functional Strength','القوة الوظيفية','Fonksiyonel Kuvvet','Funktionelle Kraft',NULL,NULL),
(13,3,'Functional Mobility','الحركية الوظيفية','Fonksiyonel Hareketlilik','Funktionelle Mobilität',NULL,NULL);
/*!40000 ALTER TABLE `exercise_types` ENABLE KEYS */;
commit;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(45) NOT NULL,
  `ArName` varchar(45) DEFAULT NULL,
  `DeName` varchar(45) NOT NULL,
  `TrName` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `met` float NOT NULL,
  `haveExplane` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercises_typeid_foreign` (`typeId`),
  CONSTRAINT `exercises_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `exercise_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `exercises` VALUES
(50,1,'Slow Walking (2 km/h)','مشي بطيء (2 كم/س)','Langsames Gehen (2 km/h)','Yavaş Yürüyüş (2 km/sa)','exercises/1.jpg',2,'0','2025-09-21 08:32:48','2025-09-21 08:32:48'),
(51,1,'Indoor Walking','مشي داخلي','Gehen in Innenräumen','Kapalı Alan Yürüyüşü','exercises/2.jpg',2,'0','2025-09-21 08:32:49','2025-09-21 08:32:49'),
(52,1,'Slow Cycling (<10 km/h)','ركوب دراجة بطيء (<10 كم/س)','Langsames Radfahren (<10 km/h)','Yavaş Bisiklet (<10 km/sa)','exercises/3.jpg',3,'0','2025-09-21 08:32:49','2025-09-21 08:32:49'),
(53,1,'Treadmill Walking (slow, no incline)','مشي على جهاز السير (بطيء، بدون ميلان)','Laufband Gehen (langsam, ohne Steigung)','Yürüyüş Bandı (yavaş, eğimsiz)','exercises/4.jpg',2.5,'0','2025-09-21 08:32:49','2025-09-21 08:32:49'),
(54,1,'Stair Climbing (very slow, intermittent)','صعود الدرج (بطيء جداً، متقطع)','Treppensteigen (sehr langsam, unterbrochen)','Merdiven Çıkma (çok yavaş, aralıklı)','exercises/5.jpg',3,'0','2025-09-21 08:32:50','2025-09-21 08:32:50'),
(55,1,'Light Stretching','تمدد خفيف','Leichtes Dehnen','Hafif Esneme','exercises/6.jpg',2.3,'0','2025-09-21 08:32:50','2025-09-21 08:32:50'),
(56,1,'Bowling','بولينغ','Bowling','Bowling','exercises/7.jpg',2.5,'0','2025-09-21 08:32:50','2025-09-21 08:32:50'),
(57,1,'Light House Cleaning','تنظيف منزلي خفيف','Leichte Hausarbeit','Hafif Ev Temizliği','exercises/8.jpg',2.3,'0','2025-09-21 08:32:51','2025-09-21 08:32:51'),
(58,1,'Tai Chi (slow form)','تاي تشي (شكل بطيء)','Tai Chi (langsame Form)','Tai Chi (yavaş form)','exercises/9.jpg',2.7,'0','2025-09-21 08:32:51','2025-09-21 08:32:51'),
(59,1,'Cooking','الطبخ','Kochen','Yemek Pişirme','exercises/10.jpg',3,'0','2025-09-21 08:32:51','2025-09-21 08:32:51'),
(80,2,'Brisk Walking (5–6 km/h)','مشي سريع (5–6 كم/س)','Zügiges Gehen (5–6 km/h)','Hızlı Yürüyüş (5–6 km/sa)','exercises/20.jpg',4.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(81,2,'Leisure Cycling (10–12 km/h)','ركوب دراجة ترفيهي (10–12 كم/س)','Freizeit-Radfahren (10–12 km/h)','Keyifli Bisiklet (10–12 km/sa)','exercises/21.jpg',4.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(82,2,'Swimming (leisurely)','سباحة (بشكل ترفيهي)','Schwimmen (gemächlich)','Yüzme (keyif amaçlı)','exercises/22.jpg',5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(83,2,'Dancing (social)','رقص اجتماعي','Gesellschaftstanz','Sosyal Dans','exercises/23.jpg',4.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(84,2,'Hiking (easy trail)','المشي في الطبيعة (مسار سهل)','Wandern (leichter Weg)','Doğa Yürüyüşü (kolay parkur)','exercises/24.jpg',5.3,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(85,2,'Elliptical Trainer (light-moderate)','جهاز السير البيضاوي (خفيف-متوسط)','Crosstrainer (leicht-mittel)','Eliptik Bisiklet (hafif-orta)','exercises/25.jpg',4.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(86,2,'Rowing Machine (moderate)','آلة التجديف (متوسط)','Rudergerät (mäßig)','Kürek Makinesi (orta)','exercises/26.jpg',5.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(87,2,'Water Aerobics','أكوا جيم (تمارين مائية)','Wassergymnastik','Su Jimnastiği','exercises/27.jpg',4,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(88,2,'Aerobic Dance (Zumba moderate)','رقص إيروبيك (زومبا متوسط)','Aerobic Dance (Zumba, mäßig)','Aerobik Dans (Zumba orta)','exercises/28.jpg',5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(89,2,'Stair Walking (slow)','صعود الدرج (بطيء)','Treppensteigen (langsam)','Merdiven Çıkma (yavaş)','exercises/29.jpg',4,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(90,2,'Badminton (casual)','بدمينتون (ترفيهي)','Badminton (freizeitmäßig)','Badminton (eğlencelik)','exercises/30.jpg',5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(91,2,'Table Tennis','تنس طاولة','Tischtennis','Masa Tenisi','exercises/31.jpg',4,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(92,2,'Volleyball (recreational)','كرة طائرة (ترفيهية)','Volleyball (freizeitmäßig)','Voleybol (eğlencelik)','exercises/32.jpg',3.8,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(93,2,'Skateboarding (slow)','تزلج لوحي (بطيء)','Skateboarden (langsam)','Kaykay (yavaş)','exercises/33.jpg',4,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(94,2,'Mowing Lawn (walk mower)','جز العشب (ماكينة دفع)','Rasenmähen (Schiebemäher)','Çim Biçme (elle itmeli makine)','exercises/34.jpg',5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(95,2,'Canoeing (moderate effort)','التجديف (مجهود متوسط)','Kanufahren (mäßige Anstrengung)','Kano (orta efor)','exercises/35.jpg',5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(96,2,'Pilates (general)','بيلاتس','Pilates','Pilates','exercises/36.jpg',3.5,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(97,2,'Walking Upstairs (moderate pace)','صعود الدرج للأعلى (سرعة متوسطة)','Treppensteigen nach oben (mäßig)','Merdiven Çıkma (orta tempo)','exercises/37.jpg',4.8,'0','2025-09-21 08:34:51','2025-09-21 08:34:51'),
(117,11,'Running (8 km/h)','جري (8 كم/س)','Laufen (8 km/h)','Koşu (8 km/sa)','exercises/50.jpg',8.3,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(118,11,'Running (10 km/h)','جري (10 كم/س)','Laufen (10 km/h)','Koşu (10 km/sa)','exercises/51.jpg',10,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(119,11,'Jump Rope (general)','قفز الحبل','Seilspringen','İp Atlama','exercises/52.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(120,11,'HIIT (High Intensity Intervals)','تمارين HIIT (فواصل عالية الشدة)','HIIT (Hochintensives Intervalltraining)','HIIT (Yüksek Yoğunluklu Antrenman)','exercises/53.jpg',9,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(121,11,'Swimming (freestyle, fast)','سباحة حرة (سريعة)','Schwimmen (Kraul, schnell)','Serbest Stil Yüzme (hızlı)','exercises/54.jpg',9.8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(122,11,'Cycling (16–19 km/h)','ركوب دراجة (16–19 كم/س)','Radfahren (16–19 km/h)','Bisiklet (16–19 km/sa)','exercises/55.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(123,11,'Rowing Machine (vigorous)','آلة التجديف (عنيف)','Rudergerät (intensiv)','Kürek Makinesi (şiddetli)','exercises/56.jpg',8.5,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(124,11,'Stair Climbing','صعود الدرج','Treppensteigen','Merdiven Çıkma','exercises/57.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(125,11,'Boxing (sparring)','ملاكمة (تدريب/م sparring)','Boxen (Sparring)','Boks (sparring)','exercises/58.jpg',9,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(126,11,'Kickboxing','كيك بوكسينغ','Kickboxen','Kickboks','exercises/59.jpg',9.6,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(127,11,'CrossFit (circuit training)','كروس فت (تدريب دائري)','CrossFit (Zirkeltraining)','CrossFit (dairesel antrenman)','exercises/60.jpg',9,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(128,11,'Aerobic Dance (vigorous, Zumba fast)','رقص إيروبيك (سريع، زومبا)','Aerobic Dance (Zumba, schnell)','Aerobik Dans (hızlı Zumba)','exercises/61.jpg',8.5,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(129,11,'Martial Arts (general)','فنون قتالية (عام)','Kampfsport (allgemein)','Dövüş Sanatları (genel)','exercises/62.jpg',9.5,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(130,11,'Soccer (general play)','كرة قدم (لعب عام)','Fußball (allgemein)','Futbol (genel oyun)','exercises/63.jpg',7,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(131,11,'Basketball (game)','كرة سلة (مباراة)','Basketball (Spiel)','Basketbol (maç)','exercises/64.jpg',7,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(132,11,'Tennis (singles)','تنس (فردي)','Tennis (Einzel)','Tenis (tekler)','exercises/65.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(133,11,'Ice Hockey','هوكي جليد','Eishockey','Buz Hokeyi','exercises/66.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(134,11,'Cross-country Skiing (vigorous)','تزلج ريفي (مجهود عنيف)','Skilanglauf (intensiv)','Kros Kayağı (şiddetli)','exercises/67.jpg',9,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(135,11,'Elliptical Trainer (vigorous effort)','جهاز السير البيضاوي (مجهود عنيف)','Crosstrainer (intensiv)','Eliptik Bisiklet (şiddetli efor)','exercises/68.jpg',8,'0','2025-09-21 08:36:42','2025-09-21 08:36:42'),
(136,10,'Walking Lunges','اندفاع بالمشي','Ausfallschritte im Gehen','Yürüyerek Lunge','exercises/75.jpg',5,'0','2025-09-21 08:39:39','2025-09-21 08:39:39'),
(137,10,'High Knees','رفع الركبتين عالياً','Hohe Knie','Yüksek Diz Çekme','exercises/76.jpg',7,'0','2025-09-21 08:39:40','2025-09-21 08:39:40'),
(138,10,'Toy Soldiers','مشية الجندي','Spielzeugsoldaten-Übung','Oyuncak Asker Hareketi','exercises/77.jpg',3.5,'0','2025-09-21 08:39:40','2025-09-21 08:39:40'),
(139,10,'Butt Kicks','ركلات خلفية','Fersen Kicks','Butt Kicks / Topuk Kaldırma','exercises/78.jpg',6,'0','2025-09-21 08:39:40','2025-09-21 08:39:40'),
(140,10,'Lunge with Twist','اندفاع مع دوران','Ausfallschritt mit Drehung','Dönüşlü Lunge','exercises/79.jpg',5,'0','2025-09-21 08:39:41','2025-09-21 08:39:41'),
(141,13,'World’s Greatest Stretch','أفضل تمدد شامل','Ganzkörper-Dehnung','Tüm Vücut Esnemesi','exercises/80.jpg',3,'0','2025-09-21 08:40:30','2025-09-21 08:40:30'),
(142,13,'Lunge with Overhead Reach','اندفاع مع رفع الذراع للأعلى','Ausfallschritt mit Armstreckung','Üstten Kol Uzatma ile Hamle','exercises/81.jpg',3.5,'0','2025-09-21 08:40:30','2025-09-21 08:40:30'),
(143,13,'Deep Squat to Stand','القرفصاء العميق ثم الوقوف','Tiefe Kniebeuge zum Aufstehen','Derin Çömelme ve Kalkış','exercises/82.jpg',3.5,'0','2025-09-21 08:40:30','2025-09-21 08:40:30'),
(144,13,'Cossack Squat','قرفصاء كوزاك (تمرين جانبي)','Kossak-Kniebeuge','Kossak Çömelmesi','exercises/83.jpg',4,'0','2025-09-21 08:40:31','2025-09-21 08:40:31'),
(145,13,'Bear Crawl','الزحف على الأربعة','Bärenkriechen','Ayı Sürünüşü','exercises/84.jpg',6,'0','2025-09-21 08:40:31','2025-09-21 08:40:31'),
(146,13,'Lateral Lunge','الاندفاع الجانبي','Seitlicher Ausfallschritt','Yan Hamle (Lunge)','exercises/85.jpg',3.5,'0','2025-09-21 08:40:31','2025-09-21 08:40:31'),
(147,8,'The Hundred','المئة (تمرين تنفس وحركة جذع)','Die Hundert','Yüz (Nefes ve Gövde Hareketi)','exercises/95.jpg',3.5,'0','2025-09-21 08:41:07','2025-09-21 08:41:07'),
(148,8,'Double Leg Stretch','مد الرجلين مع الذراعين','Doppelbein-Streckung','Çift Bacak Açma','exercises/96.jpg',3.2,'0','2025-09-21 08:41:08','2025-09-21 08:41:08'),
(149,8,'Spine Stretch Forward','تمدد العمود الفقري للأمام','Wirbelsäulen-Streckung nach vorn','Omurga Öne Esnemesi','exercises/97.jpg',2.5,'0','2025-09-21 08:41:08','2025-09-21 08:41:08'),
(150,8,'Teaser','التمرين القمري (رفع الجذع والساقين)','Teaser','Teaser (Gövde ve Bacak Kaldırma)','exercises/98.jpg',3.5,'0','2025-09-21 08:41:09','2025-09-21 08:41:09'),
(151,9,'Hamstring Stretch','تمارين شد أوتار الركبة','Oberschenkelrückseiten-Dehnung','Hamstring Esnemesi','exercises/110.jpg',2.3,'0','2025-09-21 08:41:41','2025-09-21 08:41:41'),
(152,9,'Quadriceps Stretch','تمارين شد عضلات الفخذ الأمامية','Quadrizeps-Dehnung','Ön Uyluk Esnemesi','exercises/111.jpg',2.3,'0','2025-09-21 08:41:41','2025-09-21 08:41:41'),
(153,9,'Calf Stretch','تمارين شد الساق','Waden-Dehnung','Baldır Esnemesi','exercises/112.jpg',2.3,'0','2025-09-21 08:41:41','2025-09-21 08:41:41'),
(154,9,'Shoulder Stretch','تمارين شد الكتف','Schulter-Dehnung','Omuz Esnemesi','exercises/113.jpg',2.3,'0','2025-09-21 08:41:42','2025-09-21 08:41:42'),
(155,9,'Neck Stretch','تمارين شد الرقبة','Nacken-Dehnung','Boyun Esnemesi','exercises/114.jpg',2.3,'0','2025-09-21 08:41:42','2025-09-21 08:41:42'),
(156,9,'Butterfly Stretch','تمارين الفراشة','Schmetterlings-Dehnung','Kelebek Esnemesi','exercises/115.jpg',2.3,'0','2025-09-21 08:41:43','2025-09-21 08:41:43'),
(157,9,'Side Bend Stretch','تمارين الانحناء الجانبي','Seitliche Rumpfdehnung','Yan Eğilme Esnemesi','exercises/116.jpg',2.3,'0','2025-09-21 08:41:43','2025-09-21 08:41:43'),
(158,7,'Downward Dog','وضعية الكلب المتجه للأسفل','Herabschauender Hund','Aşağı Bakan Köpek','exercises/125.jpg',2.7,'0','2025-09-21 08:42:27','2025-09-21 08:42:27'),
(159,7,'Cobra Pose','وضعية الكوبرا','Kobra','Kobra Pozu','exercises/126.jpg',2.5,'0','2025-09-21 08:42:28','2025-09-21 08:42:28'),
(160,7,'Cat-Cow','حركة القطة والبقرة','Katze-Kuh','Kedi-İnek Hareketi','exercises/127.jpg',2.5,'0','2025-09-21 08:42:28','2025-09-21 08:42:28'),
(161,7,'Child’s Pose','وضعية الطفل','Kindhaltung','Çocuk Pozu','exercises/128.jpg',2.5,'0','2025-09-21 08:42:28','2025-09-21 08:42:28'),
(162,7,'Pigeon Pose','وضعية الحمامة','Taube','Güvercin Pozu','exercises/129.jpg',2.5,'0','2025-09-21 08:42:29','2025-09-21 08:42:29'),
(163,7,'Triangle Pose','وضعية المثلث','Dreieck','Üçgen Pozu','exercises/130.jpg',2.5,'0','2025-09-21 08:42:29','2025-09-21 08:42:29'),
(164,7,'Seated Forward Fold','الانحناء للأمام أثناء الجلوس','Sitzende Vorwärtsbeuge','Oturarak Öne Katlanma','exercises/131.jpg',2.5,'0','2025-09-21 08:42:29','2025-09-21 08:42:29'),
(165,7,'Bridge Pose','وضعية الجسر','Brücke','Köprü Pozu','exercises/132.jpg',2.7,'0','2025-09-21 08:42:30','2025-09-21 08:42:30'),
(186,3,'Push-ups','تمرين الضغط','Liegestütze','Şınav','exercises/150.jpg',5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(187,3,'Pull-ups','تمرين السحب','Klimmzüge','Barfiks','exercises/151.jpg',5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(188,3,'Bodyweight Squats','القرفصاء باستخدام وزن الجسم','Kniebeugen mit Eigengewicht','Vücut Ağırlığıyla Çömelme','exercises/152.jpg',6,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(189,3,'Lunges','الاندفاع','Ausfallschritte','Hamle (Lunge)','exercises/153.jpg',4.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(190,3,'Plank','تمرين البلانك','Unterarmstütz','Plank','exercises/154.jpg',3.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(191,3,'Dips (Chair)','تمرين الغطس على الكرسي','Dips (Stuhl)','Sandalyede Dips','exercises/155.jpg',4,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(192,3,'Glute Bridges','جسر الأرداف','Hüftbrücke','Kalça Köprüsü','exercises/156.jpg',3.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(193,3,'Mountain Climbers','متسلقو الجبال','Mountain Climbers','Dağ Tırmanışı','exercises/157.jpg',6.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(194,3,'Sit-ups','تمرين المعدة','Sit-ups','Mekik','exercises/158.jpg',4,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(195,3,'Pike Push-ups','تمرين الضغط بزاوية','Pike-Liegestütze','Pike Şınavı','exercises/159.jpg',5.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(196,3,'Burpees','تمرين البوربي','Burpees','Burpee','exercises/160.jpg',6.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(197,3,'Wall Sit','الجلوس على الحائط','Wand-Sitz','Duvar Oturuşu','exercises/161.jpg',3.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(198,3,'Jump Squats','القرفصاء بالقفز','Sprung-Kniebeugen','Zıplamalı Çömelme','exercises/162.jpg',6.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(199,3,'V-ups','تمرين V للبطن','V-Ups','V Mekik','exercises/163.jpg',4.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(200,3,'Hollow Body Hold','تثبيت الجسم المجوف','Hollow-Body-Halten','Hollow Body Pozu','exercises/164.jpg',2.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(201,3,'Archer Push-ups','تمرين الضغط القوسي','Bogenschützen-Liegestütze','Yaycı Şınavı','exercises/165.jpg',5.5,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(202,3,'Superman Hold','وضعية سوبرمان','Superman-Halten','Superman Pozu','exercises/166.jpg',3,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(203,3,'Plank to Push-up','الانتقال من بلانك للضغط','Unterarmstütz zu Liegestütz','Plank’tan Şınava Geçiş','exercises/167.jpg',6,'0','2025-09-21 08:45:50','2025-09-21 08:45:50'),
(204,4,'Dumbbell Bench Press','ضغط صدر بالدامبل','Kurzhantel-Bankdrücken','Dumbbell Bench Press','exercises/175.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(205,4,'Barbell Squat','القرفصاء بالبار','Langhantel-Kniebeuge','Barbell Squat','exercises/176.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(206,4,'Dumbbell Shoulder Press','ضغط أكتاف بالدامبل','Kurzhantel-Schulterdrücken','Dumbbell Omuz Press','exercises/177.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(207,4,'Barbell Deadlift','الرفعة الميتة بالبار','Kreuzheben mit Langhantel','Barbell Deadlift','exercises/178.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(208,4,'Dumbbell Bicep Curl','تمرين عضلة البايسبس بالدامبل','Kurzhantel-Bizepscurls','Dumbbell Biceps Curl','exercises/179.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(209,4,'Dumbbell Triceps Kickback','تمديد ترايسبس بالدامبل','Trizeps-Kickback mit Kurzhantel','Dumbbell Triceps Kickback','exercises/180.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(210,4,'Kettlebell Swing','تأرجح الكيتل بيل','Kettlebell-Schwung','Kettlebell Swing','exercises/181.jpg',8,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(211,4,'Dumbbell Lunges','الاندفاع بالدامبل','Ausfallschritte mit Kurzhantel','Dumbbell Hamle (Lunge)','exercises/182.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(212,4,'Barbell Row','التجديف بالبار','Langhantel-Rudern','Barbell Row','exercises/183.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(213,4,'Dumbbell Chest Fly','فتح الصدر بالدامبل','Kurzhantel-Fliegende','Dumbbell Chest Fly','exercises/184.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(214,4,'Clean and Press','كلين آند برس','Clean and Press','Clean and Press','exercises/185.jpg',8,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(215,4,'Snatch','سناتش','Snatch','Snatch','exercises/186.jpg',8,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(216,4,'Zottman Curl','تمرين زوتمان للبايسبس','Zottman-Curl','Zottman Curl','exercises/187.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(217,4,'Renegade Row','تمرين تجديف بدعم البلانك','Renegade-Rudern','Renegade Row','exercises/188.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(218,4,'Goblet Squat','القرفصاء الكأسية','Goblet-Kniebeuge','Goblet Squat','exercises/189.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(219,4,'Dumbbell Pullover','تمرين شد الصدر بالدامبل','Kurzhantel-Pullover','Dumbbell Pullover','exercises/190.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(220,4,'Barbell Hip Thrust','دفع الورك بالبار','Langhantel-Hüftstoß','Barbell Hip Thrust','exercises/191.jpg',6,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(221,4,'Lateral Raise','رفع جانبي للأكتاف','Seitliches Schulterheben','Yan Omuz Açma','exercises/192.jpg',5,'0','2025-09-21 08:46:40','2025-09-21 08:46:40'),
(222,12,'TRX Rows','تجديف بحبال TRX','TRX-Rudern','TRX Çekişi','exercises/200.jpg',6,'0','2025-09-21 08:47:40','2025-09-21 08:47:40'),
(223,12,'Farmer’s Walk','مشي الحامل للأوزان','Farmer’s Walk','Çiftçi Yürüyüşü','exercises/201.jpg',6,'0','2025-09-21 08:47:40','2025-09-21 08:47:40'),
(224,12,'Medicine Ball Slam','رمي وضرب الكرة الطبية','Medizinball-Slam','Medikal Top Slam','exercises/202.jpg',6.5,'0','2025-09-21 08:47:40','2025-09-21 08:47:40'),
(225,12,'Single-leg Deadlift','الرفعة الميتة بساق واحدة','Einbein-Kreuzheben','Tek Bacak Deadlift','exercises/203.jpg',6,'0','2025-09-21 08:47:41','2025-09-21 08:47:41'),
(226,12,'Battle Ropes','تمارين حبال القتال','Battle Ropes','Savaş Halatları','exercises/204.jpg',6,'0','2025-09-21 08:47:41','2025-09-21 08:47:41'),
(227,12,'Box Jumps','القفز على الصندوق','Kasten-Sprünge','Box Zıplamaları','exercises/205.jpg',6,'0','2025-09-21 08:47:42','2025-09-21 08:47:42'),
(228,12,'Sled Push','دفع الزلاجة','Schlitten-Schieben','Kızak İtme','exercises/206.jpg',6,'0','2025-09-21 08:47:42','2025-09-21 08:47:42'),
(229,12,'Sled Pull','سحب الزلاجة','Schlitten-Ziehen','Kızak Çekme','exercises/207.jpg',6,'0','2025-09-21 08:47:42','2025-09-21 08:47:42'),
(230,12,'Rotational Throw','رمي دوار/تدويري','Rotationswurf','Döndürerek Atış','exercises/208.jpg',6,'0','2025-09-21 08:47:43','2025-09-21 08:47:43'),
(231,12,'Kettlebell Snatch','سناتش بالكيتل بيل','Kettlebell-Snatch','Kettlebell Snatch','exercises/209.jpg',6.5,'0','2025-09-21 08:47:43','2025-09-21 08:47:43'),
(242,6,'Leg Press Machine','جهاز ضغط الأرجل','Beinpresse-Maschine','Bacak Press Makinesi','exercises/225.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(243,6,'Chest Press Machine','جهاز ضغط الصدر','Brustpresse-Maschine','Göğüs Press Makinesi','exercises/226.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(244,6,'Lat Pulldown Machine','جهاز سحب الظهر','Latzug-Maschine','Lat Pulldown Makinesi','exercises/227.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(245,6,'Seated Row Machine','جهاز تجديف الجلوس','Sitzendes Rudergerät','Oturarak Kürek Çekme Makinesi','exercises/228.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(246,6,'Shoulder Press Machine','جهاز ضغط الأكتاف','Schulterpresse-Maschine','Omuz Press Makinesi','exercises/229.jpg',5.5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(247,6,'Leg Curl Machine','جهاز شد العضلة الخلفية للفخذ','Beincurl-Maschine','Arka Uyluk Curl Makinesi','exercises/230.jpg',4.5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(248,6,'Cable Triceps Pushdown','تمرين ترايسبس بالكابل','Trizeps Pushdown am Kabel','Kablo Triceps Pushdown','exercises/231.jpg',4.5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(249,6,'Pec Deck Machine','جهاز صدر بيك ديك','Pec-Deck-Maschine','Pec Deck Makinesi','exercises/232.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(250,6,'Smith Machine Squat','القرفصاء بجهاز سميث','Smith-Maschine Kniebeuge','Smith Makinesi Squat','exercises/233.jpg',6,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(251,6,'Cable Chest Fly','فتح الصدر بالكابل','Kabel-Crossover','Kablo Chest Fly','exercises/234.jpg',5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(252,6,'Leg Abduction Machine','جهاز فتح الأرجل الجانبي','Beinseitheber-Maschine','Bacak Açma Makinesi','exercises/235.jpg',4.5,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(253,6,'Hack Squat Machine','جهاز القرفصاء هاك','Hack-Squat-Maschine','Hack Squat Makinesi','exercises/236.jpg',6,'0','2025-09-21 08:49:16','2025-09-21 08:49:16'),
(264,5,'Band Squats','القرفصاء باستخدام الحزام','Band-Kniebeugen','Bantla Squat','exercises/250.jpg',5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(265,5,'Band Rows','تجديف بالحزام','Band-Rudern','Bantla Çekiş','exercises/251.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(266,5,'Band Chest Press','ضغط الصدر بالحزام','Band-Brustpresse','Bantla Göğüs Press','exercises/252.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(267,5,'Band Deadlifts','الرفعة الميتة بالحزام','Band-Kreuzheben','Bantla Deadlift','exercises/253.jpg',5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(268,5,'Band Bicep Curls','تمرين البايسبس بالحزام','Band-Bizepscurls','Bantla Biceps Curl','exercises/254.jpg',4,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(269,5,'Band Lateral Walks','المشي الجانبي بالحزام','Band-Seitwärtsgehen','Bantla Yan Yürüyüş','exercises/255.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(270,5,'Band Shoulder Press','ضغط الأكتاف بالحزام','Band-Schulterdrücken','Bantla Omuz Press','exercises/256.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(271,5,'Band Chest Fly','فتح الصدر بالحزام','Band-Fliegende','Bantla Chest Fly','exercises/257.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(272,5,'Band Squat to Overhead Press','القرفصاء ثم ضغط للأعلى بالحزام','Band-Kniebeuge zu Schulterdrücken','Bantla Squat + Overhead Press','exercises/258.jpg',5.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(273,5,'Band Deadlift to Row','الرفعة الميتة ثم تجديف بالحزام','Band-Kreuzheben zu Rudern','Bantla Deadlift + Row','exercises/259.jpg',5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(274,5,'Band Upright Row','تجديف عمودي بالحزام','Band-Aufrechtes Rudern','Bantla Upright Row','exercises/260.jpg',4.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43'),
(275,5,'Band Thrusters','القرفصاء مع الدفع للأعلى بالحزام','Band-Thrusters','Bantla Thruster','exercises/261.jpg',5.5,'0','2025-09-21 08:50:43','2025-09-21 08:50:43');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
commit;

--
-- Table structure for table `explanes`
--

DROP TABLE IF EXISTS `explanes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `explanes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `explaneFor` varchar(20) DEFAULT NULL,
  `activeId` int(11) NOT NULL,
  `activeType` enum('food','exercise','normal') NOT NULL,
  `EnTextFile` varchar(255) NOT NULL,
  `ArTextFile` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `explanes`
--

/*!40000 ALTER TABLE `explanes` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `explanes` ENABLE KEYS */;
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
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(40) NOT NULL DEFAULT '',
  `ArName` varchar(40) NOT NULL DEFAULT '',
  `TrName` varchar(40) NOT NULL DEFAULT '',
  `DeName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `kcal` float NOT NULL,
  `protein` float NOT NULL,
  `fats` float NOT NULL,
  `carbs` float NOT NULL,
  `fiber` float NOT NULL DEFAULT 0,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_typeid_foreign` (`typeId`),
  CONSTRAINT `food_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `food_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

/*!40000 ALTER TABLE `food` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `food` VALUES
(807,8,'Whole Milk','حليب كامل الدسم','Tam Süt','Vollmilch','foods/200.jpg',60,3.2,3.3,4.67,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(808,8,'Skim Milk','حليب خالي الدسم','Yağsız Süt','Magermilch','foods/201.jpg',34,3.43,0.08,4.92,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(809,8,'Sweetened Condensed Milk','حليب مكثف محلى','Tatlılaştırılmış Süt','Gesüßte Kondensmilch','foods/202.jpg',321,7.9,8.7,54.4,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(810,8,'Fat-free Yogurt','زبادي خالي الدسم (لبن)','Yağsız Yoğurt','Magermilchjoghurt','foods/203.jpg',50,4.23,0.09,8.08,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(811,8,'Full-fat Yogurt','زبادي كامل الدسم (لبن)','Tam Yağlı Yoğurt','Joghurt mit Vollmilch','foods/204.jpg',78,3.82,4.48,5.57,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(812,8,'Labneh','لبنة','Labne','Labneh','foods/205.jpg',191,4.5,17,4.5,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(813,8,'Cream','قشطة  ','Kaymak',' Sahne','foods/206.jpg',585,1,63,3.3,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(814,8,'White Cheese (Cow)','جبنة بيضاء (بقرية)','Beyaz Peynir (İnek)','Weißer Käse (Kuh)','foods/207.jpg',310,20.38,24.3,2.53,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(815,8,'Feta Cheese','جبنة فيتا','Beyaz Peynir (Feta)','Feta-Käse','foods/208.jpg',265,14.2,21.5,3.88,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(816,8,'Cottage Cheese','جبنة قريش','Lor Peyniri','Hüttenkäse','foods/209.jpg',98,11.1,4.3,3.4,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(817,8,'Mozzarella Cheese','جبنة موزاريلا','Mozzarella Peyniri','Mozzarella','foods/210.jpg',299,22.2,22.1,2.4,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(818,8,'Cheddar Cheese','جبنة شيدر','Cheddar Peyniri','Cheddar-Käse','foods/211.jpg',403,24.9,33.1,1.3,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(819,8,'Halloumi Cheese','جبنة حلوم','Hellim Peyniri','Halloumi','foods/212.jpg',381,27.9,29.5,1,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(820,8,'Whole Egg','بيض كامل (دجاج)','Yumurta (Tam)','Ganzes Ei','foods/213.jpg',143,12.6,9.5,0.7,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(821,8,'Egg Yolk','صفار البيض','Yumurta Sarısı','Eigelb','foods/214.jpg',322,15.9,26.5,3.59,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(822,8,'Egg White','بياض البيض','Yumurta Akı','Eiweiß','foods/215.jpg',52,10.9,0.17,0.73,0,0,'2025-09-20 12:56:59','2025-09-20 12:56:59'),
(823,10,'Unsweetened Tea','شاي بدون سكر','Şekersiz Çay','Ungesüßter Tee','foods/250.jpg',1,0,0,0.3,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(824,10,'Unsweetened Iced Tea','شاي مثلج (غير محلى)','Şekersiz Buzlu Çay','Ungesüßter Eistee','foods/251.jpg',1,0,0,0.28,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(825,10,'Sweetened Tea','شاي مع سكر','Şekerli Çay','Gesüßter Tee','foods/252.jpg',40,0,0,10,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(826,10,'Orange Juice','عصير برتقال طبيعي','Portakal Suyu','Orangensaft','foods/253.jpg',45,0.7,0.2,10.4,0.2,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(827,10,'Grape Juice','عصير عنب','Üzüm Suyu','Traubensaft','foods/254.jpg',62,0,0,15.4,0.2,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(828,10,'Lemon Juice','عصير ليمون','Limon Suyu','Zitronensaft','foods/255.jpg',22,0.35,0.24,6.9,0.1,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(829,10,'Pineapple Juice','عصير أناناس','Ananas Suyu','Ananassaft','foods/256.jpg',53,0.4,0.1,13,0.2,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(830,10,'Apple Juice ','عصير تفاح ','Elma Suyu ','Apfelsaft ','foods/257.jpg',46,0.1,0.1,11.3,0.2,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(831,10,'Grapefruit Juice','عصير جريب فروت','Greyfurt Suyu','Grapefruitsaft','foods/258.jpg',39,0.5,0.1,9.2,0.1,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(832,10,'Carrot Juice','عصير جزر','Havuç Suyu','Karottensaft','foods/259.jpg',40,1,0.2,9.3,0.8,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(833,10,'Guava Juice','عصير جوافة','Guava Suyu','Guavensaft','foods/260.jpg',63,0.3,1,15.2,0.5,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(834,10,'Pear Juice','عصير كمثرى','Armut Suyu','Birnensaft','foods/261.jpg',57,0.2,0.1,15.1,0.3,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(835,10,'Mango Juice','عصير مانجو','Mango Suyu','Mangosaft','foods/262.jpg',60,0.4,0.2,15,0.5,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(836,10,'Apricot Juice','عصير مشمش','Kayısı Suyu','Aprikosensaft','foods/263.jpg',48,0.5,0.1,12,0.6,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(837,10,'Black Coffee','قهوة سادة','Sade Kahve','Schwarzer Kaffee','foods/264.jpg',2,0.1,0,0,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(838,10,'Cappuccino','كابتشينو','Kapuçino','Cappuccino','foods/265.jpg',31,1.7,1.66,2.42,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(839,10,'Diet Cola','كولا (دايت)','Diyet Kola','Cola light','foods/266.jpg',1,0,0,0.1,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(840,10,'Regular Cola','كولا (عادي)','Kola','Cola','foods/267.jpg',42,0,0,10.6,0,0,'2025-09-21 00:43:20','2025-09-21 00:43:20'),
(913,4,'Butter','الزبدة','Tereyağı','Butter','foods/50.jpg',717,0.85,81,0.06,0,0,'2025-09-21 00:53:40','2025-09-21 00:53:40'),
(914,4,'Avocado Oil','زيت الأفوكادو','Avokado Yağı','Avocadoöl','foods/51.jpg',884,0,100,0,0,0,'2025-09-21 00:53:40','2025-09-21 00:53:40'),
(915,4,'Corn Oil','زيت الذرة','Mısır Yağı','Maisöl','foods/52.jpg',884,0,100,0,0,0,'2025-09-21 00:53:41','2025-09-21 00:53:41'),
(916,4,'Olive Oil','زيت الزيتون','Zeytinyağı','Olivenöl','foods/53.jpg',884,0,100,0,0,0,'2025-09-21 00:53:41','2025-09-21 00:53:41'),
(917,4,'Sesame Oil','زيت السمسم','Susam Yağı','Sesamöl','foods/54.jpg',884,0,100,0,0,0,'2025-09-21 00:53:41','2025-09-21 00:53:41'),
(918,4,'Sunflower Oil','زيت دوار الشمس','Ayçiçek Yağı','Sonnenblumenöl','foods/55.jpg',884,0,100,0,0,0,'2025-09-21 00:53:42','2025-09-21 00:53:42'),
(919,4,'Margarine','مارغرين (سمن نباتي)','Margarin','Margarine','foods/56.jpg',717,0,80,0,0,0,'2025-09-21 00:53:42','2025-09-21 00:53:42'),
(920,4,'Ghee / Clarified Butter','سمن حيواني','Sade yağ','Butterschmalz','foods/57.jpg',884,0.3,100,0,0,0,'2025-09-21 00:53:42','2025-09-21 00:53:42'),
(921,4,'Beef tallow','شحم البقر','Sığır yağı','Rindertalg','foods/58.jpg',900,0,100,0,0,0,'2025-09-21 00:53:43','2025-09-21 00:53:43'),
(922,4,'Fish Oil','زيت السمك','Balık yağı','Fischöl','foods/59.jpg',900,0,100,0,0,0,'2025-09-21 00:53:43','2025-09-21 00:53:43'),
(965,3,'Long-grain Rice','أرز طويل الحبة','Uzun Taneli Pirinç','Langkornreis','foods/120.jpg',365,7.1,0.66,80,1.3,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(966,3,'Medium-grain White Rice','أرز أبيض متوسط الحبة','Orta Taneli Beyaz Pirinç','Mittelkorn Weißer Reis','foods/121.jpg',360,6.6,0.58,79,1.4,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(967,3,'Short-grain White Rice','أرز أبيض قصير الحبة','Kısa Taneli Beyaz Pirinç','Rundkorn Weißer Reis','foods/122.jpg',358,6.5,0.52,79,1.4,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(968,3,'Medium-grain Brown Rice','أرز بني متوسط الحبة','Orta Taneli Esmer Pirinç','Mittelkorn Brauner Reis','foods/123.jpg',362,7.5,2.7,76,3.4,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(969,3,'Bulgur','البرغل','Bulgur','Bulgur','foods/124.jpg',342,12,1.3,75.9,13,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(970,3,'Chickpeas','الحمص','Nohut','Kichererbsen','foods/125.jpg',378,20,6,63,12,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(971,3,'Whole Wheat Bread','الخبز القمح الكامل','Tam Buğday Ekmeği','Vollkornbrot','foods/126.jpg',254,12.3,3.5,42.7,6,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(972,3,'French Bread','الخبز الفرنسي','Fransız Ekmeği','Französisches Brot','foods/127.jpg',239,8.3,1,49,4.2,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(973,3,'White Bread','الخبز الابيض','Beyaz Ekmek','Weißbrot','foods/128.jpg',267,9.43,3.2,49.2,2.3,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(974,3,'Corn Kernels','الذرة الحبوب','Mısır Taneleri','Maiskörner','foods/129.jpg',365,9.4,4.5,74,7.3,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(975,3,'White Sugar','السكر الأبيض','Beyaz Şeker','Weißer Zucker','foods/130.jpg',387,0,0,100,0,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(976,3,'Brown Sugar','السكر البني','Esmer Şeker','Brauner Zucker','foods/131.jpg',380,0.1,0,98.1,0,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(977,3,'Semolina','السميد','İrmik','Grieß','foods/132.jpg',360,12.7,1.1,72.8,3.9,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(978,3,'Barley','الشعير','Arpa','Gerste','foods/133.jpg',354,12.5,2.3,73.5,17.3,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(979,3,'Oats','الشوفان','Yulaf','Hafer','foods/134.jpg',389,16.9,6.9,66.3,11,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(980,3,'Chia Seeds','الشيا','Chia Tohumu','Chiasamen','foods/135.jpg',486,16.5,30.7,42.1,34.4,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(981,3,'White Flour','الطحين الأبيض','Beyaz Un','Weißes Mehl','foods/136.jpg',364,10.3,1,76.3,2.7,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(982,3,'Red Lentils','العدس الأحمر','Kırmızı Mercimek','Rote Linsen','foods/137.jpg',358,23.9,2.17,63.1,10.8,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(983,3,'Honey','العسل','Bal','Honig','foods/138.jpg',304,0.3,0,82.4,0.2,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(984,3,'White Beans','الفاصولياء البيضاء','Beyaz Fasulye','Weiße Bohnen','foods/139.jpg',333,23,0.8,60,15,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(985,3,'Red Beans','الفاصولياء الحمراء','Kırmızı Fasulye','Rote Bohnen','foods/140.jpg',337,22.5,1.6,61,15.2,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(986,3,'Fava Beans','فول مجفف','Bakla','Saubohnen','foods/141.jpg',341,26.1,1.5,58.3,25,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(987,3,'Whole Wheat','القمح الكامل','Tam Buğday','Vollkornweizen','foods/142.jpg',340,13.2,2.5,72,10.7,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(988,3,'Couscous','الكسكس','Kuskus','Couscous','foods/143.jpg',376,12.8,0.6,77.4,5.4,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(989,3,'Dry Pasta','المكرونة الجافة','Kuru Makarna','Trockene Pasta','foods/144.jpg',371,13,1.5,75,3.2,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(990,3,'Soybeans','فول الصويا','Soya Fasulyesi','Sojabohnen','foods/145.jpg',449,43.3,21.6,29,8.1,0,'2025-09-21 00:55:52','2025-09-21 00:55:52'),
(1055,1,'Apple','تفاح','Elma','Apfel','foods/1.jpg',52,0.26,0.17,13.81,2.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1056,1,'Banana','موز','Muz','Banane','foods/2.jpg',89,1.09,0.33,22.84,2.6,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1057,1,'Orange','برتقال','Portakal','Orange','foods/3.jpg',47,0.94,0.12,11.75,2.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1058,1,'Strawberry','فراولة','Çilek','Erdbeere','foods/4.jpg',32,0.67,0.3,7.68,2,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1059,1,'Grape','عنب','Üzüm','Traube','foods/5.jpg',69,0.72,0.16,18.1,0.9,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1060,1,'Watermelon','بطيخ احمر','Karpuz','Wassermelone','foods/6.jpg',30,0.61,0.15,7.55,0.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1061,1,'Kiwi','كيوي','Kivi','Kiwi','foods/7.jpg',61,1.14,0.52,14.66,3,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1062,1,'Mango','مانجو','Mango','Mango','foods/8.jpg',60,0.82,0.38,14.98,1.6,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1063,1,'Pineapple','أناناس','Ananas','Ananas','foods/9.jpg',50,0.54,0.12,13.12,1.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1064,1,'Lemon','ليمون','Limon','Zitrone','foods/10.jpg',29,1.1,0.3,9.32,2.8,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1065,1,'Cantaloupe / Melon','شمام ','Kavun','Honigmelone','foods/11.jpg',34,0.84,0.19,8.16,0.9,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1066,1,'Peach','خوخ','Şeftali','Pfirsich','foods/12.jpg',39,0.91,0.25,9.54,1.5,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1067,1,'Apricot','مشمش','Kayısı','Aprikose','foods/13.jpg',48,1.4,0.39,11.12,2,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1068,1,'Pear','كمثرى (إجاص)','Armut','Birne','foods/14.jpg',57,0.36,0.14,15.23,3.1,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1069,1,'Pomegranate','رمان','Nar','Granatapfel','foods/15.jpg',83,1.67,1.17,18.7,4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1070,1,'Berry (generic)','توت','Böğürtlen (genel)','Beere (allgemein)','foods/16.jpg',47,0.9,0.35,11.5,4.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1071,1,'Blueberry','توت أزرق','Yaban mersini','Blaubeere','foods/17.jpg',57,0.74,0.33,14.49,2.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1072,1,'Blackberry','توت أسود','Böğürtlen','Brombeere','foods/18.jpg',43,1.39,0.49,9.61,5.3,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1073,1,'Raspberry','توت أحمر','Ahududu','Himbeere','foods/19.jpg',52,1.2,0.65,11.94,6.5,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1074,1,'Cherry','كرز','Kiraz','Kirsche','foods/20.jpg',50,1,0.3,12.18,1.6,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1075,1,'Guava','جوافة','Guava','Guave','foods/21.jpg',68,2.55,0.95,14.32,5.4,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1076,1,'Papaya','بابايا','Papaya','Papaya','foods/22.jpg',43,0.5,0.3,10.82,1.7,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1077,1,'Nectarine','دراق','Nektarin','Nektarine','foods/23.jpg',44,1.1,0.32,10.55,1.7,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1078,1,'Date','تمر','Hurma','Dattel','foods/24.jpg',282,2.45,0.39,75.03,8,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1079,1,'Fig','تين','İncir','Feige','foods/25.jpg',74,0.75,0.3,19.18,2.9,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1080,1,'Lime','ليمون أخضر (حامض)','Yeşil limon','Limette','foods/26.jpg',30,0.7,0.2,10.54,2.8,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1081,1,'Avocado','أفوكادو','Avokado','Avocado','foods/27.jpg',160,2,14.7,8.5,6.7,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1082,1,'Grapefruit','جريب فروت','Greyfurt','Grapefruit','foods/28.jpg',42,0.77,0.14,10.66,1.6,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1083,1,'Persimmon','كاكا – منغا','Trabzon hurması','Kakipflaume','foods/29.jpg',81,0.58,0.19,18.59,3.6,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1084,1,'Tamarind','تمر هندي','Demirhindi','Tamarinde','foods/30.jpg',239,2.8,0.6,62.5,5.1,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1085,1,'Dragon Fruit (Pitaya)','فاكهة التنين (بيتايا)','Ejder meyvesi','Drachenfrucht','foods/31.jpg',50,1.1,0.1,11.3,3,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1086,1,'Loquat','أسكدنيا','Yeni Dünya','apanische Wollmispel','foods/32.jpg',47,0.4,0.2,12.14,1.7,0,'2025-09-21 01:05:07','2025-09-21 01:05:07'),
(1097,6,'Veal','لحم العجل','Kalbfleisch','Dana eti (ve süt danası)','foods/160.jpg',197,19,13,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1098,6,' (20% fat) Beef','   (20% دهون) لحم البقر',' (20% fett) Rindfleisch',' (20% yağ) Sığır eti','foods/161.jpg',243,17.5,19.4,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1099,6,' (20% fat) Lamb',' ( 20% دهون)لحم الخروف ','(20% fett) Lammfleisch','(20% yağ) Kuzu eti','foods/162.jpg',237,17.5,18.6,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1100,6,'Goat Meat','لحم الماعز','Ziegenfleisch','Keçi eti','foods/164.jpg',110,20.6,2.3,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1101,6,'(7% fat) Turkey Meat','لحم الديك الرومي (7% دهون)','Putenfleisch (7% Fett)','Hindi eti (%7 yağ)','foods/166.jpg',153,17.3,9.59,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1102,6,'Skinless Duck Meat','لحم البط (بدون جلد)','Entenfleisch ohne Haut','Derisiz ördek eti','foods/167.jpg',135,18.3,5.95,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1103,6,'Skinless Goose Meat','لحم الإوز (بدون جلد)','Gänsefleisch ohne Haut','Derisiz kaz eti','foods/168.jpg',161,22.8,7,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1104,6,'Skinless Quail Meat','لحم السمان (بدون جلد)','Wachtelfleisch ohne Haut','Derisiz bıldırcın eti','foods/169.jpg',134,24,3,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1105,6,'Pigeon Meat\n','لحم الحمام','Taubenfleisch','Güvercin eti','foods/170.jpg',142,17.5,7.5,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1106,6,' (8% fat) Camel Meat ','لحم الجمل ( 8% دهون)','(8% fett) Kamel-Fleisch','(8% yağ) Deve eti','foods/171.jpg',136,19.5,6.4,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1107,6,'Rabbit Meat','لحم الأرنب','Kaninchenfleisch','Tavşan eti','foods/172.jpg',114,22,2.3,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1108,6,'Venison (Deer Meat)','لحم الغزال','Wildfleisch / Hirschfleisch','Geyik eti','foods/173.jpg',157,21.8,7.1,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1109,6,'Fish Meat (Average)','لحم السمك (متوسط)','Fischfleisch (durchschnittlich)','Balık eti (ortalama)','foods/174.jpg',179,20,10.4,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1110,6,'Shrimp','الروبيان (جمبري)','Garnele','Karides','foods/175.jpg',99,24,0.3,0.2,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1111,6,'Squid','الكاليماري (الحبار)','Tintenfisch','Kalamar','foods/176.jpg',92,15.6,1.4,3.1,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1112,6,'Octopus','الأخطبوط','Krake','Ahtapot','foods/177.jpg',82,15,1,2.2,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1113,6,'Chicken Breast','صدر الدجاج','Hühnerbrust','Tavuk göğsü','foods/178.jpg',127,21.4,5,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1114,6,'Chicken Thigh','فخذ الدجاج','Hühnerschenkel','Tavuk budu','foods/179.jpg',188,17,13.5,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1115,6,'Chicken Wing','جناح الدجاج','Hühnerflügel','Tavuk kanadı','foods/180.jpg',168,18.5,10.4,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1116,6,'Chicken Liver','الكبد (دجاج)','Hühnerleber','Tavuk ciğeri','foods/181.jpg',119,17,5,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1117,6,'Chicken Gizzards',' (دجاج) القوانص','Hühnermagen','Tavuk işkembe','foods/182.jpg',94,18,2,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1118,6,'Chicken Heart','القلب (دجاج)','Hühnerherz','Tavuk kalbi','foods/183.jpg',153,15.6,9.3,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1119,6,'Chicken Skin','الجلد (دجاج)','Hühnerhaut','Tavuk derisi','foods/184.jpg',440,10,44,0,0,0,'2025-09-21 01:11:49','2025-09-21 01:11:49'),
(1247,12,'Qatayef','القطايف','Qatayef','Qatayef','foods/275.jpg',360,5.35,10.7,63.59,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1248,12,'Maamoul','المعمول','Maamoul','Maamoul','foods/276.jpg',360,5,15,52,3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1249,12,'Basbousa','البسبوسة','Revani / Basbousa','Basbousa','foods/277.jpg',348,5.8,9.4,55,1.5,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1250,12,'Muhallebi','المهلبية','Muhallebi','Milchpudding','foods/278.jpg',155,3.14,3.07,25.45,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1251,12,'Lokma / Loukoumades','العوّامة / لقمة القاضي','Lokma','Loukoumades','foods/279.jpg',518,2.43,32.12,50,0.7,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1252,12,'Turkish Delight','الملبن / الراحة','Lokum','Lokum','foods/280.jpg',359,0.12,0.19,89.3,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1253,12,'Halawet el Jibn','حلاوة الجبن','Peynir Tatlısı','Käse-Dessert','foods/281.jpg',234,6,9,29,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1254,12,'Madlouka','المدلوقة','Madlouka','Madlouka','foods/282.jpg',388,8,16,55,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1255,12,'Baklava','بقلاوة','Baklava','Baklava','foods/283.jpg',412,7.7,21.5,49.4,2.6,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1256,12,'Kunafa','كنافة','Künefe','Knafeh','foods/284.jpg',355,6.2,17.5,45.8,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1257,12,'Sutlac','سوتلاش / أرز بحليب','Sütlaç','Milchreis','foods/285.jpg',105,1.78,1.36,21.6,0.36,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1258,12,'Shekerpare','شكرباره','Şekerpare','Şekerpare','foods/286.jpg',272,2.66,8.94,45.93,0.56,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1259,12,'Tulumba','بلح الشام','Tulumba','Tulumba','foods/287.jpg',400,5,20,50,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1260,12,'Kazandibi','كازان ديبي','Kazandibi','Kazandibi','foods/288.jpg',130,3.16,3.73,19.39,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1261,12,'Ashure','عاشوراء','Aşure','Asure','foods/289.jpg',313,7.13,5,55.64,6,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1262,12,'Halka Tatlisi',' (مشبك) حلوى الحلق','Halka Tatlısı','Halka Tatlısı','foods/290.jpg',313,2.34,18.89,31.04,0.3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1263,12,'Black Forest Cake',' كيك بلاك فورست   ','Kara Orman Pastası','Schwarzwälder Kirschtorte','foods/291.jpg',334,3,15,38,1.2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1264,12,'Streuselkuchen','ستروزيل كوخن','Streuselkuchen','Streuselkuchen','foods/292.jpg',376,5.9,14.9,54.4,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1265,12,'Berliner','برلينر','Berliner','Berliner','foods/293.jpg',351,5.8,14.9,49.5,6,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1266,12,'Kaiserschmarrn','كايزرشمارن','Kaiserschmarrn','Kaiserschmarrn','foods/294.jpg',157,5.4,5.2,21.9,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1267,12,'Donauwelle','دوناوفيله','Donauwelle','Donauwelle','foods/295.jpg',320,4,15,35,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1268,12,'Baumkuchen','باومكوخن','Baumkuchen','Baumkuchen','foods/296.jpg',382,6,22,36,3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1269,12,'Lebkuchen','ليبكوتشن','Lebkuchen','Lebkuchen','foods/297.jpg',384,6.2,9.7,65.2,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1270,12,'Kirschmichel','كيرشنكلافي','Kirschmichel','Kirschmichel','foods/298.jpg',195,9,12,12,3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1271,12,'Cheesecake','تشيز كيك','Cheesecake','Käsekuchen','foods/299.jpg',292,8,12.4,33.1,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1272,12,'Cookies','كوكيز شوكولاتة','Kurabiye (Çikolatalı)','Kekse','foods/300.jpg',495,6.9,25.9,58.8,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1273,12,'Donut','دونات','Donut','Donut','foods/301.jpg',421,6.7,25.6,39.7,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1274,12,'Apple Pie','كيك التفاح','Elmalı Turta','Apfelkuchen','foods/302.jpg',216,3.5,25.7,39.8,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1275,12,'Pancake','بانكيك','Pankek','Pfannkuchen','foods/303.jpg',227,6.5,25.8,39.9,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1276,12,'Snickerdoodles','سنيكر دودلز','Tarçınlı Kurabiye','Zimtplätzchen','foods/304.jpg',464,7.1,25.9,39.1,2,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1277,12,'Ice Cream Sundae','آيس كريم صانداي','Dondurma Kup','Eisbecher','foods/305.jpg',254,3,25.1,39.11,0,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1278,12,'Pumpkin Pie','كيك اليقطين','Balkabağı Turtası','Kürbiskuchen','foods/306.jpg',243,4,25.11,39.12,3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1279,12,'Brownie','براونيز','Brownie','Brownie','foods/307.jpg',466,6.2,25.12,39.13,3,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1280,12,'Cupcake','كب كيك','Cupcake','Cupcake','foods/308.jpg',388,6.2,25.13,39.14,1,0,'2025-09-21 01:34:50','2025-09-21 01:34:50'),
(1311,2,'Green Peas','البازلا الخضراء','Yeşil Bezelye','Grüne Erbsen','foods/70.jpg',81,5.4,0.4,14.5,5.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1312,2,'Sweet Potato (without skin)','البطاطا الحلوة (بدون قشر)','Tatlı Patates (kabuksuz)','Süßkartoffel (ohne Schale)','foods/71.jpg',79,1.58,0.38,17.3,2.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1313,2,'Parsley','البقدونس','Maydanoz','Petersilie','foods/72.jpg',36,3,0.8,6.3,3.3,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1314,2,'Lupine','الترمس','Börülce / Lupin','Lupine','foods/73.jpg',371,36.2,9.74,40.4,18.9,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1315,2,'Arugula / Rocket','الجرجير','Roka','Rucola','foods/74.jpg',25,2.6,0.66,3.7,1.6,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1316,2,'Purslane','الرجلة','Semizotu','Portulak','foods/75.jpg',20,2,0.36,3.4,0,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1317,2,'Spinach','السبانخ','Ispanak','Spinat','foods/76.jpg',23,2.9,0.39,3.6,2.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1318,2,'Green Beans','الفاصولياء الخضراء','Taze Fasulye','Grüne Bohnen','foods/77.jpg',35,1.9,0.3,7.9,3.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1319,2,'Red Radish','الفجل الأحمر','Kırmızı Turp','Rote Radieschen','foods/78.jpg',16,0.68,0.1,3.4,1.6,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1320,2,'Cauliflower','القرنبيط','Karnabahar','Blumenkohl','foods/79.jpg',25,1.9,0.3,5,2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1321,2,'Leek','الكراث (البقل)','Pırasa','Lauch','foods/80.jpg',61,1.5,0.3,14,1.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1322,2,'Coriander / Cilantro','الكزبرة','Kişniş','Koriander','foods/81.jpg',23,2.1,0.5,0.87,2.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1323,2,'Turnip','اللفت','Şalgam','Rübe','foods/82.jpg',28,0.9,0.1,6.4,1.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1324,2,'Eggplant / Aubergine','الباذنجان','Patlıcan','Aubergine','foods/83.jpg',25,1,0.2,6,3,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1325,2,'Okra','البامية','Bamya','Okra','foods/84.jpg',33,1.9,0.2,7.5,3.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1326,2,'Broccoli','البروكولي','Brokoli','Brokkoli','foods/85.jpg',34,2.8,0.4,6.6,2.6,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1327,2,'Onion','البصل','Soğan','Zwiebel','foods/86.jpg',40,1.1,0.1,9,1.7,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1328,2,'Potato (without skin)','البطاطا (بدون قشر)','Patates (kabuksuz)','Kartoffel (ohne Schale)','foods/87.jpg',73,1.81,0.26,16,1.4,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1329,2,'Bell Pepper','الفلفل الحلو','Dolmalık Biber','Paprika','foods/88.jpg',20,0.86,0.17,4.6,1.7,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1330,2,'Garlic','الثوم','Sarımsak','Knoblauch','foods/89.jpg',149,6.4,0.5,33,2.1,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1331,2,'Carrot','الجزر','Havuç','Karotte','foods/90.jpg',41,0.9,0.24,9.6,2.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1332,2,'Cucumber','الخيار','Salatalık','Gurke','foods/91.jpg',15,0.65,0.1,3.6,0.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1333,2,'Pickled Cucumber','الخيار مخلل حامض','Turşu Salatalık','Eingelegte Gurke','foods/92.jpg',11,0.3,0.2,2.3,1.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1334,2,'Fresh Corn','الذرة الطازج','Taze Mısır','Frischer Mais','foods/93.jpg',86,3.2,1.4,19,2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1335,2,'Canned Olives','الزيتون المعلب','Konserve Zeytin','Eingelegte Oliven','foods/94.jpg',145,1,15.3,3.8,3.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1336,2,'Beetroot','الشمندر','Pancar','Rote Bete','foods/95.jpg',44,1.6,0.2,9.6,2.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1337,2,'Tomato','الطماطم','Domates','Tomate','foods/96.jpg',18,0.9,0.2,3.9,1.2,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1338,2,'Hot Red Pepper','الفلفل الأحمر الحار','Acı Kırmızı Biber','Scharfe rote Paprika','foods/97.jpg',40,1.9,0.44,8.8,1.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1339,2,'Hot Green Pepper','الفلفل الأخضر الحار','Acı Yeşil Biber','Scharfe grüne Paprika','foods/98.jpg',40,2,0.2,9.5,1.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1340,2,'Celery','الكرفس','Kereviz','Sellerie','foods/99.jpg',16,0.7,0.2,3,1.6,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1341,2,'Mushroom','المشروم – الفطر','Mantar','Champignon','foods/100.jpg',26,3.6,0.33,4,1.8,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1342,2,'Tomato Paste','معجون الطماطم','Domates Salçası','Tomatenmark','foods/101.jpg',82,4.3,0.5,19,4.1,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1343,2,'Asparagus','الهليون','Kuşkonmaz','Spargel','foods/102.jpg',20,2.2,0.1,3.9,2.1,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1344,2,'Grape Leaves','ورق العنب','Asma Yaprağı','Weinblätter','foods/103.jpg',93,5.6,2.1,17,11,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1345,2,'Lettuce','خس','Marul','Kopfsalat','foods/104.jpg',15,1.4,0.15,2.9,1.3,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1346,2,'Cabbage','كرنب','Lahana','Kohl','foods/105.jpg',25,1.3,0.1,6,2.5,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1347,2,'Zucchini','كوسا','Kabak','Zucchini','foods/106.jpg',17,1.2,0.3,3.1,1,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1348,2,'White Radish','فجل أبيض','Beyaz Turp','Weißer Rettich','foods/107.jpg',14,1.1,0.1,2.6,1.4,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1349,2,'Artichoke','خرشوف- شوكي','Enginar','Artischocke','foods/108.jpg',47,3.3,0.15,11,5.4,0,'2025-09-21 01:39:49','2025-09-21 01:39:49'),
(1390,5,'Hazelnut','البندق','Fındık','Haselnuss','foods/230.jpg',628,15,60.8,16.7,9.7,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1391,5,'Almond','اللوز','Badem','Mandel','foods/231.jpg',579,21.2,49.9,21.6,12.5,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1392,5,'Walnut','الجوز','Ceviz','Walnuss','foods/232.jpg',654,15.2,65.2,13.7,6.7,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1393,5,'Pistachio','الفستق الحلبي','Antep fıstığı','Pistazie','foods/233.jpg',560,20.2,45.3,27.2,10.6,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1394,5,'Cashew','الكاجو','Kaju fıstığı','Cashew','foods/234.jpg',553,18.2,43.9,30.2,3.3,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1395,5,'Peanut','الفول السوداني','Yer fıstığı','Erdnuss','foods/235.jpg',570,25.1,47.6,20.9,8.7,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1396,5,'Chestnut','الكستناء','Kestane','Kastanie','foods/236.jpg',196,1.6,1.3,44,0,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1397,5,'Sunflower seeds','بذور عباد الشمس','Ay çekirdeği','Sonnenblumenkerne','foods/237.jpg',582,19.3,49.8,24.1,11,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1398,5,'Pumpkin seeds','بذور اليقطين','Kabak çekirdeği','Kürbiskerne','foods/238.jpg',555,30,40,18.7,6,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1399,5,'Watermelon seeds','بذور البطيخ','Karpuz çekirdeği','Wassermelonenkerne','foods/239.jpg',557,28.3,47.4,15.3,3.6,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1400,5,'Roasted chickpeas','الحمص المحمص','Kavrulmuş nohut','Geröstete Kichererbsen','foods/240.jpg',286,17.9,8.9,60.7,21.4,0,'2025-09-21 01:49:21','2025-09-21 01:49:21'),
(1401,5,'Roasted corn','الذرة المحمصة','Kavrulmuş mısır','Gerösteter Mais','foods/241.jpg',400,13.3,5.56,77.8,13.3,0,'2025-09-21 01:49:21','2025-09-21 01:49:21');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
commit;

--
-- Table structure for table `food_catagories`
--

DROP TABLE IF EXISTS `food_catagories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_catagories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EnName` varchar(20) NOT NULL,
  `ArName` varchar(20) NOT NULL,
  `TrName` varchar(40) NOT NULL,
  `DeName` varchar(40) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_catagories`
--

/*!40000 ALTER TABLE `food_catagories` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `food_catagories` VALUES
(1,'Plant-based Foods','اطعمة نباتية','Bitki Bazlı Gıdalar','Pflanzliche Lebensmittel','catagories/food1.jpg',NULL,NULL),
(2,'Animal-based Foods','اطعمة حيوانيه','Hayvansal Gıdalar','Tierische Lebensmittel','catagories/food2.jpg',NULL,NULL);
/*!40000 ALTER TABLE `food_catagories` ENABLE KEYS */;
commit;

--
-- Table structure for table `food_types`
--

DROP TABLE IF EXISTS `food_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `catagoryId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) NOT NULL,
  `TrName` varchar(40) NOT NULL,
  `DeName` varchar(40) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_types_catagoryid_foreign` (`catagoryId`),
  CONSTRAINT `food_types_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `food_catagories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_types`
--

/*!40000 ALTER TABLE `food_types` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `food_types` VALUES
(1,1,'Fruits','فاكهة','Meyveler','Obst',NULL,NULL),
(2,1,'Vegatables','خضروات','Sebzeler','Gemüse',NULL,NULL),
(3,1,'Legumes','بقوليات','Baklagiller','Hülsenfrüchte',NULL,NULL),
(4,2,'Fats','دهون','Yağlar','Fette',NULL,NULL),
(5,1,'Nuts','مكسرات','Kuruyemişler','Nüsse',NULL,NULL),
(6,2,'Meats','لحوم','Etler','Fleisch',NULL,NULL),
(8,2,'Dairy Products & Egg','منتجات الألبان والبيض','Süt Ürünleri & Yumurta','Milchprodukte & Eier',NULL,NULL),
(10,1,'Drinks','مشروبات','İçecekler','Getränke',NULL,NULL),
(12,1,'Sweets','حلويات','Tatlılar','Süßigkeiten',NULL,NULL);
/*!40000 ALTER TABLE `food_types` ENABLE KEYS */;
commit;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goals_userid_foreign` (`userId`),
  CONSTRAINT `goals_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(191,'0001_01_01_000000_create_users_table',1),
(192,'0001_01_01_000001_create_cache_table',1),
(193,'0001_01_01_000002_create_jobs_table',1),
(194,'2025_04_20_194301_create_personal_access_tokens_table',1),
(195,'2025_04_20_212200_create_food_catagories_table',1),
(196,'2025_04_20_212221_create_food_types_table',1),
(197,'2025_04_20_212224_create_food_table',1),
(198,'2025_04_20_212438_create_exercise_catagories_table',1),
(199,'2025_04_20_212442_create_exercise_types_table',1),
(200,'2025_04_20_212447_create_exercises_table',1),
(201,'2025_04_20_212508_create_explanes_table',1),
(202,'2025_04_20_212612_create_my_dishes_table',1),
(203,'2025_04_20_212619_create_my_exercises_table',1),
(204,'2025_04_20_212650_create_my_calenders_table',1),
(205,'2025_04_20_212750_create_goals_table',1),
(206,'2025_04_21_091314_create_my_dish_food_table',1),
(207,'2025_04_21_091332_create_my_exercise_exercises_table',1),
(208,'2025_04_21_220351_create_my_favorite_exercises_table',1),
(209,'2025_04_21_230057_create_my_favorite_food_table',1),
(210,'2025_04_29_111552_create_my_dish_explanes_table',2),
(211,'2025_04_29_111601_create_my_exercise_explanes_table',2),
(213,'2025_05_07_082721_create_my_updates_table',3),
(216,'2025_05_10_135854_create_user_subscribes_table',4),
(217,'2025_05_11_134653_create_user_ratings_table',5),
(219,'2025_07_23_160344_create_user_logins_table',6),
(220,'2025_09_19_192831_create_supports_table',7);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_calenders`
--

DROP TABLE IF EXISTS `my_calenders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_calenders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `day` date NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `burn` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_calenders_userid_foreign` (`userId`),
  CONSTRAINT `my_calenders_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_calenders`
--

/*!40000 ALTER TABLE `my_calenders` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `my_calenders` VALUES
(1,1,'2025-04-29',1650,150,80,300,0,NULL,NULL),
(2,1,'2025-04-08',1500,100,70,360,200,'2025-05-06 17:35:24','2025-05-06 17:35:24'),
(4,1,'2025-05-04',1516,68,174,479,127,'2025-05-06 17:38:05','2025-05-06 17:56:06'),
(6,1,'2025-05-06',1454,4,0,118,132,'2025-05-06 18:17:55','2025-05-06 20:32:00'),
(7,1,'2025-05-07',2235,72,150,193,132,'2025-05-06 20:25:12','2025-05-06 21:39:37'),
(8,1,'2025-05-01',1650,150,80,200,100,NULL,NULL),
(9,1,'2025-05-02',1900,190,60,300,200,NULL,NULL),
(14,1,'2025-05-08',2272,74,152,196,132,'2025-05-08 17:17:13','2025-05-08 17:17:13'),
(15,1,'2025-05-12',195,8,5,30,0,'2025-05-12 11:51:23','2025-05-12 11:51:23'),
(16,1,'2025-05-14',240,16,4,40,0,'2025-05-14 12:30:52','2025-05-14 12:30:52'),
(17,1,'2025-05-19',385,25,21,25,0,'2025-05-19 08:08:09','2025-05-19 08:08:09'),
(18,1,'2025-05-21',141,1,0,37,0,'2025-05-21 08:30:42','2025-05-21 08:30:42'),
(19,1,'2025-10-12',421,11,3,98,0,'2025-10-12 08:11:37','2025-10-12 08:27:54'),
(20,1,'2025-10-26',668,30,17,100,0,'2025-10-26 13:04:36','2025-10-26 13:04:36'),
(21,1,'2025-10-29',632,26,21,86,0,'2025-10-29 07:41:43','2025-10-29 07:53:12'),
(22,1,'2025-11-02',107,1,0,28,0,'2025-11-02 07:44:54','2025-11-02 07:45:32'),
(23,1,'2025-11-15',807,6,0,212,562,'2025-11-15 21:51:27','2025-11-15 22:17:32'),
(24,1,'2025-11-16',1373,38,6,271,749,'2025-11-15 23:20:58','2025-11-16 22:11:33'),
(25,1,'2025-11-20',1301,59,39,173,593,'2025-11-20 16:36:06','2025-11-20 19:05:11'),
(26,1,'2025-11-21',2080,108,58,273,415,'2025-11-21 20:02:27','2025-11-21 20:03:53'),
(27,1,'2025-11-22',1980,89,86,216,450,'2025-11-22 18:58:32','2025-11-22 18:59:31'),
(28,1,'2025-11-23',2461,95,82,328,0,'2025-11-23 14:14:50','2025-11-23 16:13:01'),
(29,1,'2025-11-24',1876,97,42,254,415,'2025-11-24 11:14:26','2025-11-24 21:34:11'),
(30,1,'2025-11-25',1921,67,55,271,344,'2025-11-25 17:42:27','2025-11-25 19:42:10'),
(31,1,'2025-11-28',1260,48,48,150,0,'2025-11-28 20:33:35','2025-11-28 20:33:35'),
(32,1,'2025-11-29',1543,59,52,214,0,'2025-11-29 22:11:49','2025-11-29 22:11:49'),
(33,1,'2025-12-01',855,35,27,110,0,'2025-12-01 17:07:47','2025-12-01 17:07:47'),
(34,1,'2025-12-02',1487,104,41,168,0,'2025-12-02 20:54:18','2025-12-02 20:55:10'),
(35,1,'2025-12-03',1138,49,31,160,0,'2025-12-03 16:08:17','2025-12-03 16:08:30'),
(36,1,'2025-12-05',1154,60,55,103,178,'2025-12-05 15:17:07','2025-12-05 15:17:32'),
(37,1,'2025-12-08',1136,69,63,71,0,'2025-12-08 13:43:31','2025-12-08 13:43:31'),
(38,1,'2025-12-10',1216,80,47,117,0,'2025-12-10 17:20:30','2025-12-10 17:32:24'),
(39,1,'2025-12-12',1128,65,56,90,0,'2025-12-12 16:25:44','2025-12-12 16:25:44'),
(40,1,'2025-12-15',1086,60,24,149,0,'2025-12-15 08:41:42','2025-12-15 16:33:15'),
(41,1,'2025-12-16',1172,70,28,151,0,'2025-12-16 17:32:02','2025-12-16 17:32:02'),
(42,1,'2025-12-27',1803,68,68,239,437,'2025-12-27 14:34:38','2025-12-27 19:26:40'),
(43,1,'2026-01-09',2188,88,37,355,658,'2026-01-09 17:30:54','2026-01-09 17:34:06'),
(44,1,'2026-01-10',1633,80,41,226,328,'2026-01-10 17:53:28','2026-01-10 17:55:14'),
(45,1,'2026-01-13',0,0,0,0,459,'2026-01-13 17:26:26','2026-01-13 17:26:26');
/*!40000 ALTER TABLE `my_calenders` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_dish_food`
--

DROP TABLE IF EXISTS `my_dish_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_dish_food` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `myDishId` bigint(20) unsigned NOT NULL,
  `foodId` varchar(20) NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_dish_food_mydishid_foreign` (`myDishId`),
  CONSTRAINT `my_dish_food_mydishid_foreign` FOREIGN KEY (`myDishId`) REFERENCES `my_dishes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=885 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_dish_food`
--

/*!40000 ALTER TABLE `my_dish_food` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `my_dish_food` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_dishes`
--

DROP TABLE IF EXISTS `my_dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_dishes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_dishes_userid_foreign` (`userId`),
  CONSTRAINT `my_dishes_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_dishes`
--

/*!40000 ALTER TABLE `my_dishes` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `my_dishes` VALUES
(362,1,'خبز اسمر','breakfast',218,6,1,43,100,1,'food27',NULL,'2025-11-16 20:10:10','2025-11-16 20:10:10'),
(363,1,'طون وحمص','lunch',290,27,12,16,200,1,'food32',NULL,'2025-11-20 16:32:04','2025-11-20 16:32:04'),
(364,1,'بيتزا المعهودة','lunch',210,8,8,25,100,1,'food3',NULL,'2025-11-20 16:35:45','2025-11-20 16:35:45'),
(365,1,'معكرونة بالباشاميل','lunch',2750,110,130,300,1033,4,'food33','##المكونات[\"#F47551\"]\n1 - معكرونة جافة 500 غرام \n2 - حليب سائل 1000 غرام \n3 - دقيق جاف 80 غرام \n4 - زبدة صلبة 80 غرام \n5 - جبنة موتزاريلا مبشورة 200 غرام \n6 - لحم مفروم نيء 250 غرام اختياري\n7 - ملح ناعم 5 غرام \n8 - فلفل ابيض مطحون 2 غرام \n9 - جوزة الطيب مطحونة 1 غرام \n\n##طريقة التحضير[\"#FFA935\"]\n1 - سلق المعكرونة في ماء مغلي مملح حتى تنضج.\n2 - تحضير صلصة البشاميل: إذابة الزبدة في قدر، ثم إضافة الدقيق وتقليبه حتى يصبح ذهبياً.\n3 - إضافة الحليب تدريجياً مع التحريك المستمر لتجنب التكتلات.\n4 - إضافة الملح والفلفل الأبيض وجوزة الطيب.\n5 - طهي الصلصة حتى تتكاثف.\n6 - في وعاء، خلط المعكرونة المسلوقة مع جزء من صلصة البشاميل.\n7 - في صينية خبز، وضع نصف كمية المعكرونة، ثم إضافة طبقة من اللحم المفروم المطبوخ (اختياري).\n8 - وضع النصف الآخر من المعكرونة فوق اللحم.\n9 - سكب باقي صلصة البشاميل فوق المعكرونة.\n10 - رش الجبن المبشور على الوجه.\n11 - خبز في فرن محمى مسبقاً على درجة حرارة ١٨٠ درجة مئوية لمدة ٢٠-٢٥ دقيقة أو حتى يصبح الوجه ذهبياً.','2025-11-22 15:47:59','2025-11-22 15:47:59');
/*!40000 ALTER TABLE `my_dishes` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_exercise_exercises`
--

DROP TABLE IF EXISTS `my_exercise_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_exercise_exercises` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `myExerciseId` bigint(20) unsigned NOT NULL,
  `exerciseId` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `met` int(11) NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_exercise_exercises_myexerciseid_foreign` (`myExerciseId`),
  KEY `my_exercise_exercises_exerciseid_foreign` (`exerciseId`),
  CONSTRAINT `my_exercise_exercises_exerciseid_foreign` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_exercise_exercises_myexerciseid_foreign` FOREIGN KEY (`myExerciseId`) REFERENCES `my_exercises` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_exercise_exercises`
--

/*!40000 ALTER TABLE `my_exercise_exercises` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `my_exercise_exercises` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_exercises`
--

DROP TABLE IF EXISTS `my_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_exercises` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `name` varchar(20) NOT NULL,
  `iconName` varchar(255) NOT NULL,
  `burn` int(11) NOT NULL,
  `TotalMinutes` int(11) NOT NULL,
  `explane` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_exercises_userid_foreign` (`userId`),
  CONSTRAINT `my_exercises_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_exercises`
--

/*!40000 ALTER TABLE `my_exercises` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `my_exercises` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_favorite_exercises`
--

DROP TABLE IF EXISTS `my_favorite_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_favorite_exercises` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `catagoryId` bigint(20) unsigned NOT NULL,
  `exerciseId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `met` int(11) DEFAULT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_favorite_exercises_userid_foreign` (`userId`),
  KEY `my_favorite_exercises_catagoryid_foreign` (`catagoryId`),
  KEY `my_favorite_exercises_exerciseid_foreign` (`exerciseId`),
  CONSTRAINT `my_favorite_exercises_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `exercise_catagories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_favorite_exercises_exerciseid_foreign` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_favorite_exercises_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_favorite_exercises`
--

/*!40000 ALTER TABLE `my_favorite_exercises` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `my_favorite_exercises` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_favorite_food`
--

DROP TABLE IF EXISTS `my_favorite_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_favorite_food` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `catagoryId` bigint(20) unsigned NOT NULL,
  `foodId` bigint(20) unsigned NOT NULL,
  `EnName` varchar(40) NOT NULL,
  `ArName` varchar(40) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `kcal` int(11) NOT NULL,
  `protein` int(11) NOT NULL,
  `fats` int(11) NOT NULL,
  `carbs` int(11) NOT NULL,
  `haveExplane` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_favorite_food_userid_foreign` (`userId`),
  KEY `my_favorite_food_catagoryid_foreign` (`catagoryId`),
  KEY `my_favorite_food_foodid_foreign` (`foodId`),
  CONSTRAINT `my_favorite_food_catagoryid_foreign` FOREIGN KEY (`catagoryId`) REFERENCES `food_catagories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_favorite_food_foodid_foreign` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_favorite_food_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_favorite_food`
--

/*!40000 ALTER TABLE `my_favorite_food` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `my_favorite_food` ENABLE KEYS */;
commit;

--
-- Table structure for table `my_updates`
--

DROP TABLE IF EXISTS `my_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_updates` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `food` tinyint(1) NOT NULL DEFAULT 0,
  `exercise` tinyint(1) NOT NULL DEFAULT 0,
  `app` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_updates_userid_foreign` (`userId`),
  CONSTRAINT `my_updates_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_updates`
--

/*!40000 ALTER TABLE `my_updates` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `my_updates` VALUES
(2,1,0,0,0,'2025-05-07 05:40:28','2025-05-07 17:48:00'),
(63,71,0,0,0,'2025-05-12 19:41:06','2025-05-12 19:41:06'),
(66,78,0,0,0,'2025-10-11 18:24:42','2025-10-11 18:24:42'),
(67,79,0,0,0,'2025-10-12 08:09:41','2025-10-12 08:09:41');
/*!40000 ALTER TABLE `my_updates` ENABLE KEYS */;
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
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `personal_access_tokens` VALUES
(1,'App\\Models\\User',1,'MyApp','d7b8e285ea8f58038084905a650e3c61785702cd3716cc6fe8dcdf1220c4f028','[\"*\"]',NULL,NULL,'2025-04-22 21:10:23','2025-04-22 21:10:23'),
(2,'App\\Models\\User',1,'MyApp','22f07055fd9e68a2cb662ad1ca049a4d18e58391d6503eb860f178432234457d','[\"*\"]',NULL,NULL,'2025-04-22 21:49:51','2025-04-22 21:49:51'),
(3,'App\\Models\\User',1,'MyApp','b4ff099e619cb27da6f4e25ff4dd686597bff3f0ccb7a956e3019d143311c90b','[\"*\"]',NULL,NULL,'2025-04-22 22:31:01','2025-04-22 22:31:01'),
(4,'App\\Models\\User',1,'MyApp','471edcba6b67d49d98751086df0f6d25511835d9a609a4884a324589acd3fc6a','[\"*\"]',NULL,NULL,'2025-04-22 22:33:24','2025-04-22 22:33:24'),
(5,'App\\Models\\User',1,'MyApp','21e14c5484b40e7c2b4d84f19218f0948abbee25dc4744b11b20b8de92598d70','[\"*\"]',NULL,NULL,'2025-04-22 22:33:30','2025-04-22 22:33:30'),
(6,'App\\Models\\User',1,'MyApp','18526077120bc8479d30fc14df91cb3e28f87d55c0b304c96afdd3578bb21ba9','[\"*\"]',NULL,NULL,'2025-04-22 22:33:34','2025-04-22 22:33:34'),
(7,'App\\Models\\User',1,'MyApp','ec3cb9914f8c2ae5f1f7ab3cf5339e0740a2c03e76e2c13d4b041e876777d104','[\"*\"]',NULL,NULL,'2025-04-22 22:35:02','2025-04-22 22:35:02'),
(8,'App\\Models\\User',1,'MyApp','92f8c9fcc732663dd66f5877315440da513d89882b99f654a54bc4c1c4bf7753','[\"*\"]',NULL,NULL,'2025-04-22 22:35:07','2025-04-22 22:35:07'),
(9,'App\\Models\\User',1,'MyApp','2c5856f1dc5fcb53819f63139dede158254a9a81c5c7d702aa28071929986f82','[\"*\"]',NULL,NULL,'2025-04-22 22:35:56','2025-04-22 22:35:56'),
(10,'App\\Models\\User',1,'MyApp','891c085f37a4f49c52d9e14b1c2472292494b19655fde6b4d5ff966e1beea794','[\"*\"]',NULL,NULL,'2025-04-22 22:36:02','2025-04-22 22:36:02'),
(11,'App\\Models\\User',1,'MyApp','e3a7de2002a0e9070dfe617bf26d305230b8b49b5e7b2a931f20a96ccfd9775e','[\"*\"]',NULL,NULL,'2025-04-22 22:37:14','2025-04-22 22:37:14'),
(12,'App\\Models\\User',1,'MyApp','4c9c0d9f09b62d82f4a2490995e580e03d0aa3fa238a21f518955dcc85b450b1','[\"*\"]',NULL,NULL,'2025-04-22 22:37:57','2025-04-22 22:37:57'),
(13,'App\\Models\\User',1,'MyApp','fe194a0ec5b14e17a205518474f69e9e47f476e00f010cc79cdb2ff9d13c0874','[\"*\"]',NULL,NULL,'2025-04-22 22:38:12','2025-04-22 22:38:12'),
(14,'App\\Models\\User',1,'MyApp','f2f3d5bb125bfd470cff4f4d88a47794b100a7ae7b02e7c647f8d2e29f0559ef','[\"*\"]',NULL,NULL,'2025-04-22 22:38:28','2025-04-22 22:38:28'),
(15,'App\\Models\\User',1,'MyApp','cd8b4d248ed5465ac169220c3f589d6b5a0f4f155cb8bb3555d685dee95386bc','[\"*\"]',NULL,NULL,'2025-04-23 05:46:27','2025-04-23 05:46:27'),
(16,'App\\Models\\User',1,'MyApp','1581a6c864fa82c5011be7370bb33990f22349ab88da2cc80301c855deb8b520','[\"*\"]',NULL,NULL,'2025-04-23 05:57:48','2025-04-23 05:57:48'),
(17,'App\\Models\\User',1,'MyApp','e77c6f31529d47019b6294d1d8f5513ed8623175fac188070775505c4f658484','[\"*\"]',NULL,NULL,'2025-04-23 06:03:06','2025-04-23 06:03:06'),
(18,'App\\Models\\User',1,'MyApp','ab31bb391ea33e17a4357973fee6e26959b824b1af37a294817e957122013622','[\"*\"]',NULL,NULL,'2025-04-23 06:03:27','2025-04-23 06:03:27'),
(19,'App\\Models\\User',1,'MyApp','5b3a05a32f1a0b9c164a8a7c6b55754ab2f62b9802bbe7bfea8bf61db4901228','[\"*\"]',NULL,NULL,'2025-04-23 06:04:22','2025-04-23 06:04:22'),
(20,'App\\Models\\User',1,'MyApp','b3ef9c196b97e25eb55c9cdb3ab3bb76e8926f2d0afbd2cade7db767def7862e','[\"*\"]',NULL,NULL,'2025-04-23 06:08:49','2025-04-23 06:08:49'),
(21,'App\\Models\\User',2,'MyApp','522bf34715b67be3ca0d4dc7f4647a5277859ea21e6cfa1b4c2601d491d9a375','[\"*\"]',NULL,NULL,'2025-04-23 07:31:29','2025-04-23 07:31:29'),
(22,'App\\Models\\User',1,'MyApp','22013b4f657cbfb32ab18a3397e68b8022811963ca9c6d83a74197cfd0494541','[\"*\"]',NULL,NULL,'2025-04-23 08:21:56','2025-04-23 08:21:56'),
(23,'App\\Models\\User',1,'MyApp','1e675c4966d82bdb3577646fa606cbc32bf45a35ff9cee9629f3207226f8e840','[\"*\"]',NULL,NULL,'2025-04-23 08:25:36','2025-04-23 08:25:36'),
(24,'App\\Models\\User',3,'MyApp','60985634cdea92f5bd6c6e2a8ff8691caf72556d6f1cc38dc2d12520bb719821','[\"*\"]',NULL,NULL,'2025-04-23 08:27:57','2025-04-23 08:27:57'),
(25,'App\\Models\\User',4,'MyApp','ee77828a61890a79dfaea39d16a13affdb4fdb54c0163d55ba8e328a8b144b21','[\"*\"]',NULL,NULL,'2025-04-23 08:30:17','2025-04-23 08:30:17'),
(26,'App\\Models\\User',1,'MyApp','f494ed855302d6414a1f014eb8d8a1089a7bed9f8e03af178aae6c26e180ccbd','[\"*\"]','2025-04-26 11:59:28',NULL,'2025-04-23 09:08:03','2025-04-26 11:59:28'),
(27,'App\\Models\\User',1,'MyApp','8272588fbec2f8d3ad418d2348acd5c03164e9146c188d5228ebf1fc116732c0','[\"*\"]','2025-04-26 21:38:49',NULL,'2025-04-23 13:06:54','2025-04-26 21:38:49'),
(28,'App\\Models\\User',1,'MyApp','6859efbf510510d540e2d68d84c85d1e38c2c5f298803ea6ad44e3ee6fb94d7b','[\"*\"]','2025-09-20 07:46:19',NULL,'2025-04-23 22:41:40','2025-09-20 07:46:19'),
(29,'App\\Models\\User',1,'MyApp','a476479a67e197acb29f2241ccc6173cc8c95c91067404f1ba3415d8ed8ea655','[\"*\"]','2025-05-03 13:56:24',NULL,'2025-04-26 22:34:39','2025-05-03 13:56:24'),
(30,'App\\Models\\User',1,'MyApp','e97ddbd52560465f3598151897d48b9697ac586cf7fc6ce71a95276646001038','[\"*\"]','2025-05-08 21:42:03',NULL,'2025-04-26 22:51:01','2025-05-08 21:42:03'),
(31,'App\\Models\\User',5,'MyApp','ae31b72176b8486dc6ebadc9b580b58045b8646b10d70e2ae08d7e2e3aabff81','[\"*\"]','2025-05-06 20:26:36',NULL,'2025-05-05 16:03:53','2025-05-06 20:26:36'),
(32,'App\\Models\\User',5,'MyApp','5be40d7866a3788ed2ecc5919d0bf45a7a1968adc80aa9df0c5e914aa6b61bec','[\"*\"]','2025-05-06 21:55:55',NULL,'2025-05-06 21:08:28','2025-05-06 21:55:55'),
(33,'App\\Models\\User',6,'MyApp','d34afb6b36a6518c4eca0fd2fe746db07624a92c950dc4bcbd1a205a8646c712','[\"*\"]',NULL,NULL,'2025-05-07 05:39:50','2025-05-07 05:39:50'),
(34,'App\\Models\\User',7,'MyApp','31516ce33f922336d112ef05c0318f80cc6fc08580e981d11274a48a42a50cc7','[\"*\"]',NULL,NULL,'2025-05-07 05:40:28','2025-05-07 05:40:28'),
(35,'App\\Models\\User',8,'MyApp','76caad21fc64a3364bbc32f42612cd10ed1bf3051343747a1cb6242b73107924','[\"*\"]',NULL,NULL,'2025-05-07 05:40:30','2025-05-07 05:40:30'),
(36,'App\\Models\\User',1,'MyApp','d149900b82f9b78119b2ebfe2304ca071a78fb01a13d017a796a83ba12e91a9b','[\"*\"]','2025-05-12 10:52:19',NULL,'2025-05-08 05:47:50','2025-05-12 10:52:19'),
(37,'App\\Models\\User',1,'MyApp','444f07cd08d322f2be4d415f53b2e7cce4702083eb751e8e9d9674972f686709','[\"*\"]','2025-05-12 11:09:49',NULL,'2025-05-08 21:44:06','2025-05-12 11:09:49'),
(38,'App\\Models\\User',9,'MyApp','6005c2ff63b787a87c698b5e7a6d749b3601a87dab1b66ed4bfadf50cf759e5b','[\"*\"]',NULL,NULL,'2025-05-11 08:31:03','2025-05-11 08:31:03'),
(39,'App\\Models\\User',10,'MyApp','bd999a1c0c5974528f4d9fdcdd8e8c222ba4e2d431a27d5ef0229b7534b83701','[\"*\"]',NULL,NULL,'2025-05-11 08:31:45','2025-05-11 08:31:45'),
(40,'App\\Models\\User',11,'MyApp','e55a1ec4f9defbf3cbc9a4244657baf6679c5eebfb10fe4b9178a237d1964b6e','[\"*\"]',NULL,NULL,'2025-05-11 08:32:28','2025-05-11 08:32:28'),
(41,'App\\Models\\User',12,'MyApp','5007e88c7166874d45c233f73536d14ae5be2058a5fe9af1c18d52a637b93a91','[\"*\"]',NULL,NULL,'2025-05-11 08:32:52','2025-05-11 08:32:52'),
(42,'App\\Models\\User',13,'MyApp','29a5e8a8bcc3279e499b66f9fa1aa279d3938cb72a08b910f10143fe3397627c','[\"*\"]',NULL,NULL,'2025-05-11 08:33:40','2025-05-11 08:33:40'),
(43,'App\\Models\\User',14,'MyApp','ca8f79d2d0614618a9359ff71219a490c44543ba498a2fcd495a54d2a6cde9bc','[\"*\"]',NULL,NULL,'2025-05-11 08:34:44','2025-05-11 08:34:44'),
(44,'App\\Models\\User',15,'MyApp','74ad13172eaea59d90336ec3e624c2c287be6443ac31e4163e04f9a0972b384c','[\"*\"]',NULL,NULL,'2025-05-11 08:36:27','2025-05-11 08:36:27'),
(45,'App\\Models\\User',16,'MyApp','f2beeb5a85d750dbf9096e2b6324719a4fb9aa83dfd6686bd024ad84380c15ae','[\"*\"]',NULL,NULL,'2025-05-11 08:46:04','2025-05-11 08:46:04'),
(46,'App\\Models\\User',17,'MyApp','f2b5edfbe6ce9f6ba442e0bd5c17d802477192e4ec70c8c5ff114d38b7f3b3aa','[\"*\"]',NULL,NULL,'2025-05-11 08:46:45','2025-05-11 08:46:45'),
(47,'App\\Models\\User',18,'MyApp','2b245e8df134525dba678147c8257ce8d7c7a2baec798d8892747e6c3477f69a','[\"*\"]',NULL,NULL,'2025-05-11 08:46:50','2025-05-11 08:46:50'),
(48,'App\\Models\\User',19,'MyApp','f3e2d159e470efbafe335d274beeedf1ed52dfb91fb45d6a35f197892677abdb','[\"*\"]',NULL,NULL,'2025-05-11 08:47:34','2025-05-11 08:47:34'),
(49,'App\\Models\\User',20,'MyApp','521423b85261780db1f55cc9a78765ac54b6df7520ef5149f6591f6843a01ce2','[\"*\"]',NULL,NULL,'2025-05-11 08:47:37','2025-05-11 08:47:37'),
(50,'App\\Models\\User',21,'MyApp','3f71e0c9e412bbeacde133e6b01deb1215687e24be2d7d6c89077b8ad20e9448','[\"*\"]',NULL,NULL,'2025-05-11 08:49:39','2025-05-11 08:49:39'),
(51,'App\\Models\\User',22,'MyApp','9bd53330cca2d6093e6543137a667506ab4f57c2801b66421103de57f12c9214','[\"*\"]',NULL,NULL,'2025-05-11 08:50:16','2025-05-11 08:50:16'),
(52,'App\\Models\\User',23,'MyApp','6a1b1bf8d9d55f96e5e2656b5e3134eeaffa98c584b175290f96f82e6cfcdaf6','[\"*\"]',NULL,NULL,'2025-05-11 08:50:19','2025-05-11 08:50:19'),
(53,'App\\Models\\User',24,'MyApp','440f4b6dc0ffd20b54621c56382ef5813cc7290f1cc20f24fe4c04110d63807b','[\"*\"]',NULL,NULL,'2025-05-11 08:50:43','2025-05-11 08:50:43'),
(54,'App\\Models\\User',25,'MyApp','d1684448efe5b88f7f6ab652c5da6f3f462000005ce7178533dafdeb1b088bcd','[\"*\"]',NULL,NULL,'2025-05-11 08:50:45','2025-05-11 08:50:45'),
(55,'App\\Models\\User',26,'MyApp','089b4efc14de66494e07b04d5da1089d0bf5c9ba2799aae97345ca9f8b7c4445','[\"*\"]',NULL,NULL,'2025-05-11 08:51:11','2025-05-11 08:51:11'),
(56,'App\\Models\\User',27,'MyApp','64caf50ab9f0e50cae5bd26933d38341c86899d08a8df5b01f704c31086b0069','[\"*\"]',NULL,NULL,'2025-05-11 08:51:14','2025-05-11 08:51:14'),
(57,'App\\Models\\User',28,'MyApp','8db5c6ce5459a332716a5789e7031e76ee9c11a57cc73c4a9824a53260dbf830','[\"*\"]',NULL,NULL,'2025-05-11 08:56:34','2025-05-11 08:56:34'),
(58,'App\\Models\\User',29,'MyApp','b604aa5323caf0e0c1d67ad50c445d1ae8ce546b2a4293e0d1e543897258a7cf','[\"*\"]',NULL,NULL,'2025-05-11 09:04:11','2025-05-11 09:04:11'),
(59,'App\\Models\\User',30,'MyApp','a7291f1a0b359b4d4e25b2668ac71dcad6e62a056513f4448d587a4ed3c59a6b','[\"*\"]',NULL,NULL,'2025-05-11 09:05:23','2025-05-11 09:05:23'),
(60,'App\\Models\\User',31,'MyApp','95c0c2c852cf1ea43da82e845ed9a44f4c6ce2b7e9ae239a0369fbbc608c6740','[\"*\"]',NULL,NULL,'2025-05-11 09:06:32','2025-05-11 09:06:32'),
(61,'App\\Models\\User',32,'MyApp','b9b4dcf3ffa38a788c2949bc2b13e37c17311d91caa78e549eb961bdd27f1d6a','[\"*\"]',NULL,NULL,'2025-05-11 09:07:01','2025-05-11 09:07:01'),
(62,'App\\Models\\User',33,'MyApp','1d2a197d1473b53535e55ba68a4559f118232516cecf47b07715f8b0531aa36b','[\"*\"]',NULL,NULL,'2025-05-11 09:07:14','2025-05-11 09:07:14'),
(63,'App\\Models\\User',34,'MyApp','d77394518284503e78b6cc7ef6ea8442aacc04ab47c1e60fe6f6d4d8d7dad7fb','[\"*\"]',NULL,NULL,'2025-05-11 09:12:30','2025-05-11 09:12:30'),
(64,'App\\Models\\User',35,'MyApp','8c7e020bc5d2593eb74b067f6af757797bda3123666400cb43ebf1337f4732f6','[\"*\"]',NULL,NULL,'2025-05-11 09:12:57','2025-05-11 09:12:57'),
(65,'App\\Models\\User',36,'MyApp','ba70aa970dcc2f60413118849e44cf1881043423c479c8b182067e6f20eace6d','[\"*\"]',NULL,NULL,'2025-05-11 09:14:09','2025-05-11 09:14:09'),
(66,'App\\Models\\User',37,'MyApp','b0b30e6314069fececdc7737c247078617688072b8a22b215f59428216d2f259','[\"*\"]',NULL,NULL,'2025-05-11 09:15:05','2025-05-11 09:15:05'),
(67,'App\\Models\\User',38,'MyApp','df030fa9c91ee3f5af5806d9424aa36b436575fd3a077d94c487041af98b4c95','[\"*\"]',NULL,NULL,'2025-05-11 09:16:39','2025-05-11 09:16:39'),
(68,'App\\Models\\User',39,'MyApp','8dab0a96615a7ff5c01d95920d17b9c20fbe730f2d596b86e13a702170d8b1e3','[\"*\"]',NULL,NULL,'2025-05-11 09:18:16','2025-05-11 09:18:16'),
(69,'App\\Models\\User',40,'MyApp','8cad1fb39fd9518c4b541b6619444b3b283d917abe6ab697a9a132092e29c5c6','[\"*\"]',NULL,NULL,'2025-05-11 09:18:46','2025-05-11 09:18:46'),
(70,'App\\Models\\User',41,'MyApp','2b81df19e1b2e02390be99f78520e23bed977dcc77aa46b7761087dba9be2060','[\"*\"]',NULL,NULL,'2025-05-11 09:23:13','2025-05-11 09:23:13'),
(71,'App\\Models\\User',42,'MyApp','b4a1f8792b61bc9991cb2bcec3a935d0f2b6d654a0b20f881216752be70427ce','[\"*\"]',NULL,NULL,'2025-05-11 09:27:29','2025-05-11 09:27:29'),
(72,'App\\Models\\User',43,'MyApp','2941f96d817fa95f569edf2872cb445af06ac3254b2fc15ebc8e66533b3ef744','[\"*\"]',NULL,NULL,'2025-05-11 09:28:02','2025-05-11 09:28:02'),
(73,'App\\Models\\User',44,'MyApp','f943b31728b9fb8851a80e93f6701502782b5bdb967f88b677d62c7b3f3a1203','[\"*\"]',NULL,NULL,'2025-05-11 09:31:01','2025-05-11 09:31:01'),
(74,'App\\Models\\User',45,'MyApp','f77dc8cb4b372668fc7ba3311e61ddcc028817944cf04278162f74c73804bbd8','[\"*\"]',NULL,NULL,'2025-05-11 09:32:38','2025-05-11 09:32:38'),
(75,'App\\Models\\User',46,'MyApp','31300139a9f2f7349ee11853466c95e9c70fd0b6b2123e2edce3a06f19ad6105','[\"*\"]',NULL,NULL,'2025-05-11 09:40:19','2025-05-11 09:40:19'),
(76,'App\\Models\\User',47,'MyApp','b6b7de76c73e9c67329806d84e6e84b59dfaa838808e97b84576bb4720317681','[\"*\"]',NULL,NULL,'2025-05-11 09:53:50','2025-05-11 09:53:50'),
(77,'App\\Models\\User',48,'MyApp','0690cdc2caaceca3ef6d72e2265d3a2f57c0aa92afe4da87145af6d3b3a2e2e8','[\"*\"]',NULL,NULL,'2025-05-11 09:54:31','2025-05-11 09:54:31'),
(78,'App\\Models\\User',49,'MyApp','8bc793ca9a617a1e07ba1ce9b946113ed67514f3ce6710c6d62f63ed085f92ab','[\"*\"]',NULL,NULL,'2025-05-11 09:54:54','2025-05-11 09:54:54'),
(79,'App\\Models\\User',50,'MyApp','d0ff23c6c14606ea5d8a0c2d172e75a786b7aa63803b5ffc41454cefaf28d006','[\"*\"]',NULL,NULL,'2025-05-11 09:57:51','2025-05-11 09:57:51'),
(80,'App\\Models\\User',51,'MyApp','1f6e38962e80017af10beca0df6cdc9d5d8699fcb098ecacd7b40cb2bfcf278e','[\"*\"]',NULL,NULL,'2025-05-11 09:59:56','2025-05-11 09:59:56'),
(81,'App\\Models\\User',52,'MyApp','04d9324da954339058c536d7f4a8ff76c083c914b95dc9f9e23116a0b3f037fd','[\"*\"]',NULL,NULL,'2025-05-11 10:04:46','2025-05-11 10:04:46'),
(82,'App\\Models\\User',53,'MyApp','24b88a1136530b54ee5473e2df0a503016b3ac507afa75b5290edf612d3ee113','[\"*\"]',NULL,NULL,'2025-05-11 10:05:20','2025-05-11 10:05:20'),
(83,'App\\Models\\User',54,'MyApp','9bdb3822bcde72c11f2cc476cb09165a319fb1197eab0914f4f9a7e3891a1b74','[\"*\"]',NULL,NULL,'2025-05-11 10:05:50','2025-05-11 10:05:50'),
(84,'App\\Models\\User',55,'MyApp','b006629508646b1ec9e2119eda8d50e25036ef8f368003d7a25b82e8ecac4df7','[\"*\"]',NULL,NULL,'2025-05-11 10:07:36','2025-05-11 10:07:36'),
(85,'App\\Models\\User',56,'MyApp','b806367b2e7727247ab0693adce9bae12547bfd419f20fd8544067f899727f00','[\"*\"]',NULL,NULL,'2025-05-11 10:08:10','2025-05-11 10:08:10'),
(86,'App\\Models\\User',57,'MyApp','b26906195f9679d00e9d67dc8c038fb3c040a9c282d243722e1dbf73b3e4bee8','[\"*\"]',NULL,NULL,'2025-05-11 10:08:40','2025-05-11 10:08:40'),
(87,'App\\Models\\User',58,'MyApp','4bb762887660f34d842a08f9fc34032c39ede4c016baf99a92ee6621926c8773','[\"*\"]',NULL,NULL,'2025-05-11 10:09:08','2025-05-11 10:09:08'),
(88,'App\\Models\\User',59,'MyApp','deceb8bdd394c021140e5939104d934480f04fbe805c91a38c4218a1c98e03ee','[\"*\"]',NULL,NULL,'2025-05-11 10:10:36','2025-05-11 10:10:36'),
(89,'App\\Models\\User',60,'MyApp','3414c600acd5de37becaa6bc0dfa19fd2b7bbc2033bbbf9f6bbbf5a8e8f399fd','[\"*\"]',NULL,NULL,'2025-05-11 10:11:00','2025-05-11 10:11:00'),
(90,'App\\Models\\User',61,'MyApp','60317ce1ffeb360d4c8b039d9eca3993d9f599f603dea5697b2161259397a4c8','[\"*\"]',NULL,NULL,'2025-05-11 10:24:01','2025-05-11 10:24:01'),
(91,'App\\Models\\User',62,'MyApp','06420cf9253ff95d7bd50c03388c1f6fd4a37ce8c600014e4d44a6b3b441ef8b','[\"*\"]',NULL,NULL,'2025-05-11 10:25:45','2025-05-11 10:25:45'),
(92,'App\\Models\\User',63,'MyApp','f596286114fbea5b9ddbb788b4b712597a479694fca87ebd9ceacf7c23514791','[\"*\"]',NULL,NULL,'2025-05-11 10:35:43','2025-05-11 10:35:43'),
(93,'App\\Models\\User',64,'MyApp','f640eeb92c823fa9c946a1693ab8c88945dd9ffe39d23b11fe3393466b37943d','[\"*\"]',NULL,NULL,'2025-05-11 10:37:49','2025-05-11 10:37:49'),
(94,'App\\Models\\User',1,'MyApp','80b73c609aa3d1db894273eb4c2f5d764e94c6c049b90b55d8e1c4da0e03725c','[\"*\"]',NULL,NULL,'2025-05-12 07:25:29','2025-05-12 07:25:29'),
(95,'App\\Models\\User',65,'MyApp','7387b100a14ce133a89be85a6655f98eef4445a542500503b879f6cbd1522587','[\"*\"]',NULL,NULL,'2025-05-12 07:28:23','2025-05-12 07:28:23'),
(96,'App\\Models\\User',66,'MyApp','83ac5debe1f52391e415f91c9d086f95f13b258a8f49a030a65f678e76ebcf99','[\"*\"]',NULL,NULL,'2025-05-12 07:29:29','2025-05-12 07:29:29'),
(97,'App\\Models\\User',68,'MyApp','418c73b485de293af19f23e8b51286613a38d9bccccecdff1fc45775d96845c3','[\"*\"]',NULL,NULL,'2025-05-12 07:38:43','2025-05-12 07:38:43'),
(98,'App\\Models\\User',69,'MyApp','6a6b992fb404f8ddec80edf636f49b9e3aab70d8b5f53117b92d3a053209bdc6','[\"*\"]',NULL,NULL,'2025-05-12 07:44:58','2025-05-12 07:44:58'),
(99,'App\\Models\\User',1,'MyApp','8ab4ae72277b7d36c0ce030247e5688c029487171a7e325bb3022d62c9217785','[\"*\"]',NULL,NULL,'2025-05-12 11:08:03','2025-05-12 11:08:03'),
(100,'App\\Models\\User',1,'MyApp','2566df565da6180014fd21204094fefc9df80a08e997a7992a688c39f0dedf27','[\"*\"]',NULL,NULL,'2025-05-12 11:10:08','2025-05-12 11:10:08'),
(101,'App\\Models\\User',1,'MyApp','c651c182187351fb85dc52e99c8849e236e3d981b7e253269a0af9c34fb3b6b8','[\"*\"]',NULL,NULL,'2025-05-12 11:12:35','2025-05-12 11:12:35'),
(102,'App\\Models\\User',1,'MyApp','281389ce5ed587d17837b25244574654981c90bd2e1113cbd372d9b80d097385','[\"*\"]',NULL,NULL,'2025-05-12 11:16:09','2025-05-12 11:16:09'),
(103,'App\\Models\\User',1,'MyApp','fc1324e4cc9b09d03483225f8468dde98c983909a43d0bc281f780dce0f6f9fb','[\"*\"]',NULL,NULL,'2025-05-12 11:17:04','2025-05-12 11:17:04'),
(104,'App\\Models\\User',1,'MyApp','685b718e59432e06dcf0232a0c74de77d4a96342b245d9e99b24750eab8fe454','[\"*\"]','2025-05-12 11:19:49',NULL,'2025-05-12 11:19:48','2025-05-12 11:19:49'),
(105,'App\\Models\\User',70,'MyApp','449a277c5a438de74bf7834d9800d90533d15b369aeaeb02eb8dd9cc37d4ad1a','[\"*\"]',NULL,NULL,'2025-05-12 11:29:44','2025-05-12 11:29:44'),
(106,'App\\Models\\User',1,'MyApp','d133060ea92f8fae554f9a540e86939b1024e0b440ac49c66f1ac023a394a9a1','[\"*\"]','2025-05-14 12:52:46',NULL,'2025-05-12 11:30:39','2025-05-14 12:52:46'),
(107,'App\\Models\\User',71,'MyApp','b203c8ba57adef3ba397b5f883ad0fc39acb428acf095ea46e0169a70f14eb08','[\"*\"]',NULL,NULL,'2025-05-12 19:41:06','2025-05-12 19:41:06'),
(108,'App\\Models\\User',1,'MyApp','2edd7b081dfbd934daa808097803fba97e06c19a378e7952be0726d1f7b454a2','[\"*\"]','2025-05-12 19:42:20',NULL,'2025-05-12 19:41:41','2025-05-12 19:42:20'),
(109,'App\\Models\\User',71,'MyApp','c662b9014711506191837d33ed298bbc716c4c2fc377c985ea24f0232c24fa82','[\"*\"]','2025-05-12 19:43:28',NULL,'2025-05-12 19:43:25','2025-05-12 19:43:28'),
(110,'App\\Models\\User',1,'MyApp','0755c8df2d661c5753122a9237097918f197908ac2664c6152716d12d2e79b92','[\"*\"]','2025-05-19 08:14:00',NULL,'2025-05-15 09:30:51','2025-05-19 08:14:00'),
(111,'App\\Models\\User',1,'MyApp','db79fb544cc0eef2790ad6eec3a3b28ee5fd69a07d55f0f67ab8729464e2582e','[\"*\"]',NULL,NULL,'2025-05-16 09:19:11','2025-05-16 09:19:11'),
(112,'App\\Models\\User',1,'MyApp','7f64616b99a6f9f88cf302d552cdee05ea7aeae3b3e9bbf6ab3baaf5744740d7','[\"*\"]','2025-05-16 09:21:14',NULL,'2025-05-16 09:21:11','2025-05-16 09:21:14'),
(113,'App\\Models\\User',1,'MyApp','6624bfe08b63ced3e5896de149c6ee88fd200dac6b6035e9dc1a9d6859ecdf7d','[\"*\"]',NULL,NULL,'2025-05-16 09:25:05','2025-05-16 09:25:05'),
(114,'App\\Models\\User',1,'MyApp','700de8cc7ec93e01bf53ff0b5526d2bdf7d634e339139a9b0a7915326a5d6554','[\"*\"]','2025-05-16 21:37:23',NULL,'2025-05-16 21:37:21','2025-05-16 21:37:23'),
(115,'App\\Models\\User',1,'MyApp','3f3bb66cd5b19f4c03d7fed618c04d689946d4811ee94dd91d9e5d65bfec4de7','[\"*\"]','2025-05-21 08:22:55',NULL,'2025-05-21 00:53:29','2025-05-21 08:22:55'),
(116,'App\\Models\\User',1,'MyApp','9d419a1b3a5b403d1f374fe62a20f9176a8cda5cff2590564fdbe91fc55c083e','[\"*\"]',NULL,NULL,'2025-05-21 07:50:29','2025-05-21 07:50:29'),
(117,'App\\Models\\User',1,'MyApp','c38683d465ef91678935dc1cede2829d10180ca9f34243120c8783ad4d136fe6','[\"*\"]','2025-05-21 08:30:42',NULL,'2025-05-21 08:24:04','2025-05-21 08:30:42'),
(118,'App\\Models\\User',1,'MyApp','6a1e1489d2c6aa763c6cf288e75976bcc5500a31c6b7a940e85d23a6753fb7dd','[\"*\"]','2025-05-23 22:05:47',NULL,'2025-05-21 10:08:06','2025-05-23 22:05:47'),
(119,'App\\Models\\User',74,'MyApp','b5eba79328d9a397ef85661f66d49714353acc8e0f53f66024af565493c16045','[\"*\"]',NULL,NULL,'2025-07-30 13:27:36','2025-07-30 13:27:36'),
(120,'App\\Models\\User',1,'MyApp','54595377160bd428c4700dd27d9ae862e212110b8409b8983f60ede2306d3c89','[\"*\"]','2025-09-21 14:33:15',NULL,'2025-09-21 12:55:37','2025-09-21 14:33:15'),
(121,'App\\Models\\User',1,'MyApp','cafaf9c62a785703e8f4f0746364304b3acca4b29f4729e830602b026c6d2d3d','[\"*\"]','2025-10-11 18:23:29',NULL,'2025-09-21 14:33:28','2025-10-11 18:23:29'),
(122,'App\\Models\\User',1,'MyApp','8adbba0af096c19948bf918aabc74686efc7dffee1b1af26ed189ab1c654e095','[\"*\"]','2025-09-24 15:52:52',NULL,'2025-09-24 15:51:58','2025-09-24 15:52:52'),
(123,'App\\Models\\User',71,'MyApp','d3e77d3096e9a4facc301fd6b2b46f6cdf46a8ad75fcca72d9251a2194b6aa86','[\"*\"]','2025-10-01 14:13:01',NULL,'2025-09-24 15:56:49','2025-10-01 14:13:01'),
(124,'App\\Models\\User',1,'MyApp','15856d3ac0c3999bca1ee0eae9db15be7ff794451ef20c6dfca7edfe92d2e3b7','[\"*\"]','2025-09-24 15:58:58',NULL,'2025-09-24 15:58:53','2025-09-24 15:58:58'),
(125,'App\\Models\\User',75,'MyApp','a18cba0499e6703116ba1afe74121f30105dc04f5b77eaab24b47f810048eb6d','[\"*\"]','2025-09-24 16:07:26',NULL,'2025-09-24 16:07:22','2025-09-24 16:07:26'),
(126,'App\\Models\\User',1,'MyApp','f71de09c8222cbe463b65a9d490b130c954c788b31a4539039c261b3986b3f5b','[\"*\"]','2025-09-24 19:47:08',NULL,'2025-09-24 17:03:05','2025-09-24 19:47:08'),
(127,'App\\Models\\User',1,'MyApp','4fde7ba967c4492d04ad45acec92cc7656b07f3906fd0b56209b6d6917c59e5e','[\"*\"]','2025-09-24 19:52:00',NULL,'2025-09-24 19:51:54','2025-09-24 19:52:00'),
(128,'App\\Models\\User',1,'MyApp','7929e6c5a993e085a9ec470c8c68233adc1b3d63ad5ed5f41d40f5af7dc9f492','[\"*\"]','2025-09-24 20:18:46',NULL,'2025-09-24 19:52:17','2025-09-24 20:18:46'),
(129,'App\\Models\\User',75,'MyApp','420aa8e79b01d2ddf64bf35d2260b1ed085ddfd692820ce06c1f68ec797c53b0','[\"*\"]','2025-09-24 20:24:13',NULL,'2025-09-24 20:21:49','2025-09-24 20:24:13'),
(130,'App\\Models\\User',76,'MyApp','d189cca000fbedd2e72ee6691afafdabee4b8be748122a8ff9de1363b128f3f9','[\"*\"]','2025-09-24 20:25:44',NULL,'2025-09-24 20:25:38','2025-09-24 20:25:44'),
(131,'App\\Models\\User',76,'MyApp','8c5b2fad0a5be195457643cfd25c8ca1d55772aaa3ea25f6f6a7aee2df91a1dc','[\"*\"]','2025-09-24 20:26:35',NULL,'2025-09-24 20:26:25','2025-09-24 20:26:35'),
(132,'App\\Models\\User',1,'MyApp','6dc44fcd7f9cd0522c82b9dc5e2b26a5abdeea1b86933241f1dd6142252cb541','[\"*\"]','2025-10-01 14:20:26',NULL,'2025-09-25 04:48:26','2025-10-01 14:20:26'),
(133,'App\\Models\\User',1,'MyApp','05d0fa9f453d62e6a2b82869a8c547eb3c217fea9125b2d235976f20399d69a7','[\"*\"]','2025-10-01 18:30:57',NULL,'2025-10-01 17:46:04','2025-10-01 18:30:57'),
(134,'App\\Models\\User',1,'MyApp','aed3fabe53bd05bdb267f14112272ae64a309bc488ee06d4c319733a27344de3','[\"*\"]','2025-10-12 07:58:43',NULL,'2025-10-09 20:34:42','2025-10-12 07:58:43'),
(135,'App\\Models\\User',78,'MyApp','6bb36b629b9394414283943ae53a58f76449efc986c51c0ba50559d1dad3e7af','[\"*\"]','2025-10-12 12:01:24',NULL,'2025-10-11 18:24:42','2025-10-12 12:01:24'),
(136,'App\\Models\\User',1,'MyApp','deb57298d7b90059b232523840e08650f70d4864e1451ad1a320aaa60fe546e2','[\"*\"]','2025-10-12 08:08:55',NULL,'2025-10-12 08:08:51','2025-10-12 08:08:55'),
(137,'App\\Models\\User',79,'MyApp','bc92128278d7e6999313a1959d6ffd880f9a101484e82c3d5739f029a8b1c469','[\"*\"]','2025-10-12 08:09:45',NULL,'2025-10-12 08:09:41','2025-10-12 08:09:45'),
(138,'App\\Models\\User',1,'MyApp','ac4e1a16c76099ff25c548bab9802a0e49c89a0f497e3d732fafa372163c8138','[\"*\"]','2025-10-12 08:10:40',NULL,'2025-10-12 08:10:37','2025-10-12 08:10:40'),
(139,'App\\Models\\User',1,'MyApp','23ea2499bfb05ed493478cdd38f7804e644e5d23bd78d2ccc271a99826949bba','[\"*\"]','2025-10-12 08:11:37',NULL,'2025-10-12 08:11:06','2025-10-12 08:11:37'),
(140,'App\\Models\\User',1,'MyApp','5bdfd41f197fc7106b60c6e82da09fe272ae0d8271a7139783389f7ebbd8d177','[\"*\"]','2025-10-12 08:11:59',NULL,'2025-10-12 08:11:55','2025-10-12 08:11:59'),
(141,'App\\Models\\User',1,'MyApp','1859da171e6ea5805d8d59569adbe71957bf542a27cf31d8a023eb65771f236c','[\"*\"]','2025-10-12 08:24:31',NULL,'2025-10-12 08:12:36','2025-10-12 08:24:31'),
(142,'App\\Models\\User',1,'MyApp','6133ec4e42d97c550cc4c548804e6a626017afa2c9d5383957b56f5af30443ad','[\"*\"]','2025-10-12 08:27:54',NULL,'2025-10-12 08:25:18','2025-10-12 08:27:54'),
(143,'App\\Models\\User',79,'MyApp','ca2f13e200ae88091f22961789cf5bce91ea1f1f45ce8553acf300aacbe27f6a','[\"*\"]','2025-10-12 08:28:40',NULL,'2025-10-12 08:28:14','2025-10-12 08:28:40'),
(144,'App\\Models\\User',1,'MyApp','94ed4d03c40298798e4ac4642f1c5f7416612dd3b328f47ff6e3f3090a7b7cea','[\"*\"]','2025-10-12 08:33:11',NULL,'2025-10-12 08:29:32','2025-10-12 08:33:11'),
(145,'App\\Models\\User',1,'MyApp','79eb2f8a29f286ab53abf57c114596b54223be06a95f204bf786de0a5b2b06a5','[\"*\"]','2025-10-12 08:38:22',NULL,'2025-10-12 08:34:08','2025-10-12 08:38:22'),
(146,'App\\Models\\User',1,'MyApp','c6a98f8090d70bad1333443e6d76a82e424edc81382015842cc4b046b04eb3ad','[\"*\"]','2025-10-12 08:39:46',NULL,'2025-10-12 08:38:53','2025-10-12 08:39:46'),
(147,'App\\Models\\User',1,'MyApp','45505ca247f371a3653d171b28552ad3fb7013075401cf75450728e84d94d57b','[\"*\"]','2025-11-15 19:08:05',NULL,'2025-10-12 08:39:59','2025-11-15 19:08:05'),
(148,'App\\Models\\User',1,'MyApp','ebc8ee57edfa4b48118903b6551cdc49d8a66a0bf129778c94d1e39b22edf712','[\"*\"]','2025-10-12 10:15:14',NULL,'2025-10-12 10:15:12','2025-10-12 10:15:14'),
(149,'App\\Models\\User',1,'MyApp','17e3b8074728d879eb7f115b037ee913715b9887b8587c6cc7968f9257e9c4d3','[\"*\"]','2025-10-12 10:42:57',NULL,'2025-10-12 10:15:39','2025-10-12 10:42:57'),
(150,'App\\Models\\User',1,'MyApp','9fc1e7c7f60c930f73cb187ba52b7bf030b4705e5e1746e69617c4911c9c9734','[\"*\"]','2025-10-12 11:17:29',NULL,'2025-10-12 11:17:27','2025-10-12 11:17:29'),
(151,'App\\Models\\User',1,'MyApp','e5fc21507d236ada6483b4638d13debda23c55267a54ffa62de44e241c876c28','[\"*\"]','2025-11-22 18:59:31',NULL,'2025-10-12 12:54:35','2025-11-22 18:59:31'),
(152,'App\\Models\\User',1,'MyApp','bab2a1b5134a0a957d46d987df951e217058768a91e4c370f721407323770b80','[\"*\"]','2025-11-15 19:09:38',NULL,'2025-11-15 19:09:31','2025-11-15 19:09:38'),
(153,'App\\Models\\User',1,'MyApp','80c0ee426501d262471a0770a997ca94ce800082cd4a5df418b64cadef3f33f3','[\"*\"]','2025-11-23 17:52:25',NULL,'2025-11-15 19:21:25','2025-11-23 17:52:25'),
(154,'App\\Models\\User',1,'MyApp','25b97492ea57c1596c18cbbbf40d45324824eb60f5863e85f05fe1dc6b97adf8','[\"*\"]','2025-11-15 23:03:11',NULL,'2025-11-15 21:20:42','2025-11-15 23:03:11'),
(155,'App\\Models\\User',1,'MyApp','69a0f92d5e31e50c70b3a3f3728df91bddb21a24af4125f5566ddaf928142e96','[\"*\"]','2025-11-23 17:28:01',NULL,'2025-11-23 16:51:47','2025-11-23 17:28:01'),
(156,'App\\Models\\User',1,'MyApp','16ffb8620e393efc75e35a52b0c4c38c737de1011b0f632751e9b9895827af30','[\"*\"]','2026-01-28 17:44:43',NULL,'2025-11-23 17:28:44','2026-01-28 17:44:43');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
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
('2vhnqfOlPaZzacfynFqqLaDNcUgWaqOdDXupqHDd',NULL,'54.162.53.4','Mozilla/5.0 (X11; Linux i686; rv:124.0) Gecko/20100101 Firefox/124.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2UyVWptaE5maGRkN29OWWpzZ1g5NXA5bWhqREo3NDJtYWdLOTNQaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770652236),
('6JgrxMKUl45zga22HHHztZzuGPYrrdJbyMCmbNeV',NULL,'209.50.171.53','Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Vivaldi/5.3.2679.68','YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1lDN1NiRURxbW5UT2xya01WZVZ1TTQ5clhaRWtiUGdFekVDTmNSNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc2OiJodHRwczovL2VuZHVzdHJpLnNpdGUvP2VtYWlsPWFybGVuZS5tYWNrbmlnaHQlNDBnbWFpbC5jb20mbWVzc2FnZT1TVE9QJTIwU2VsbGluZyUyME9uZS1PZmYlMjBQcm9kdWN0cyUyMFRoYXQlMjBQYXklMjBZb3UlMjBPbmNlJTIwQW5kJTIwU1RBUlQlMjBCdWlsZGluZyUyMEElMjAlMjdTZXQlMjBJdCUyMCUyNiUyMEZvcmdldCUyMEl0JTI3JTIwU3lzdGVtJTIwVGhhdCUyMERlcG9zaXRzJTIwTW9uZXklMjBJbnRvJTIwWW91ciUyMEJhbmslMjBBY2NvdW50JTIwRXZlcnklMjBTaW5nbGUlMjBNb250aCUyMExpa2UlMjBDbG9ja3dvcmslMjElMjBodHRwcyUzQSUyRiUyRnd3dy55b3V0dWJlLmNvbSUyRiU0MEFJU29sdXRpb25zVG9wJm5hbWU9QXJsZW5lJTIwTWFja25pZ2h0JnN1YmplY3Q9UXVpY2tseSUyMENyZWF0ZSUyMFlvdXIlMjBPd24lMjBDb250aW51aXR5JTIwUHJvZ3JhbSUyMFRoYXQlMjBQYXlzJTIwWW91JTIwTW9udGhseS4uLiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770675092),
('83vHRTuUnzkEoEfyH6H4D3Trz4CnT3fUII5IFbqJ',NULL,'51.38.141.126','{USER_AGENT}','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ29tMWZhOE10d24ydTJmS1pJc0Y4SEREZ2d3bVFGa0pzamRjQTQ4TCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770666729),
('dMvkFgvruqq1jKMdW0H5IrjYdREuBFzJneY1yWKS',NULL,'93.158.90.41','Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRmNsbGFhZENvWFhXNnhycUZjMEpmQTNZV2tmd05VWXdWVXZkOFJmZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770669337),
('DO9Gc2IPR0PGDJ6dAKTLJwNLUWrtqxhBSzr8nlvH',NULL,'147.182.151.94','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGEzMkx5aEZrZmFON21yOXRoVjJpWXZhUGpDUUJWWTZlaE16b0ROaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1770683623),
('DRG0bJqnIxgowVZw54vGLEv01rBizgvqVPn58rHQ',NULL,'35.188.191.251','Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)','YTozOntzOjY6Il90b2tlbiI7czo0MDoicldWcmFjb0Q3QzlSeVNHZnVwa1RKb1c4dERFTVo1eWc3Yk5hNVJFMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770649607),
('HkrBsYB9L0QsXr9HTJnNEIIzzyLO1cUggFHzy5wo',NULL,'104.28.196.57','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMXV2eDBRWnExcUFMSlhIalNWQUthS05vN29NZFhGS1I5Vm5ZOUVHeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770713268),
('LHwazWAe4oSjDPy6vj3iyVlYMyqdCmHtMNXHyozS',NULL,'207.230.107.154','\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36\"','YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1kzMXM0SlpmMkFmWnJ1eWRZTVh1a0FPZGppeDFBR1hsM2xiMGxBNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1770731519),
('MZc4DEBLDmEyLE0bhF5qzXFk4F50Ogsv1UA2ITPA',NULL,'35.86.89.170','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.132 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiblM0MnBLNkliMFlFSHdkYlJTWE1GYzFuSGJwUW1LYlBHcktjb1dReCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770680156),
('NN8xa08MnVLRsU8sMeqZw95z4T2kdEgOlxKIlIQ6',NULL,'18.201.203.167','Mozilla/5.0 (compatible; NetcraftSurveyAgent/1.0; +info@netcraft.com)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2RuZVQ2ZEE0eFVnSjJKSnR1aXphSDJ2TjZreHNub0M4VkJmWWFvSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1770664274),
('NuYTTT95EXfcT8J4hofgpUbOiow4e22aBWNvGEjS',NULL,'100.23.208.125','Mozilla/5.0 (compatible; wpbot/1.4; +https://forms.gle/ajBaxygz9jSR8p8G9)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFB5NFo4SG9oWWpKQVlSbG5rSDJqdjQ3V3FhbW5aaWRUZE1helBtTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770697195),
('OFML7U69eCAtaSktd43RWwoXJVUi4GaVWm5kXaFm',NULL,'54.218.3.53','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFh6WTF3bHZqRFlneFd2WVg3eG43Ym1ybThBRDk5cjJHT3hOMU0xVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770677297),
('P5MMRR79W2LtKKgdDzV92MGAawHrGgGCGvnRjOp9',NULL,'2a02:4780:40:c0de::2a','Go-http-client/2.0','YToyOntzOjY6Il90b2tlbiI7czo0MDoiZTNPZEhPckxocFJGQkRIUFNhSkk1VUp0UjYxZ1M4SmtVWkpCaWEzYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1770703484),
('SAagDCb7zVWEhb0JrZByEmQXogsfGXqFSG5YagjD',NULL,'2620:101:2002:11a5:10:8:141:59','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEUzVkdmTzgxd2dGOFFBZ0dGT09GS05WTmg1QXBpVTRXWkhXWjJwZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1770643855),
('W3YKpN8LdepeGXdxGDzPHzmSyBKYM0qkB3VbJF1r',NULL,'104.28.196.57','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoidU15eGg3OHlqZGhIbmZHZkw3cksxcEFieEJLcnJObkdqc0M4VnRCTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770713259),
('y1W6OVb2RuPQPNfhyBHQrVocXyKlmj8KPwhiFxc2',NULL,'2001:41d0:a:4429::1','Mozilla/5.0 (compatible; OpenEASM/1.0)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTXY0SE1TVU13Z295OVVQandNeHpUU0lQc3MxMVl1dWd2RDNtSnNBaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vZW5kdXN0cmkuc2l0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1770640145),
('ZaJ87vBCR7TW96bbImXC0TZdVUJJo12CKpjvDwG7',NULL,'35.188.191.251','Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)','YTozOntzOjY6Il90b2tlbiI7czo0MDoic3ZhRlJidWNtQVFzb2ZPRWNJVGZWSXNaUE1heEFQNTY1ZFc3aE5uYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LmVuZHVzdHJpLnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1770649607);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
commit;

--
-- Table structure for table `supports`
--

DROP TABLE IF EXISTS `supports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `supports` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `readed` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supports_userid_foreign` (`userId`),
  CONSTRAINT `supports_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supports`
--

/*!40000 ALTER TABLE `supports` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `supports` VALUES
(1,1,'2','Xksa das jhdqwf jwkqaw das dfqk snba nmdba kshdwhah asdkha wodadm smndsah dlja wldj  oiaw dhsa dbasjhd iuawhid \nXksa das jhdqwf jwkqaw das dfqk snba nmdba kshdwhah asdkha wodadm smndsah dlja wldj  oiaw dhsa dbasjhd iuawhid ',1,'2025-09-10 20:02:44','2025-09-20 07:44:46'),
(2,71,'يشسلا ةتشسم يتشسزتب يشسنت بمنشيسن يبس','Xksa das jhdqwf jwkqaw das dfqk snba nmdba kshdwhah asdkha wodadm smndsah dlja wldj  oiaw dhsa dbasjhd iuawhid ',1,'2025-09-13 20:02:51','2025-09-20 07:44:40'),
(4,1,'3','Xksa das jhdqwf jwkqaw das dfqk snba nmdba kshdwhah asdkha wodadm smndsah dlja wldj  oiaw dhsa dbasjhd iuawhid ',1,'2025-09-12 20:03:02','2025-09-20 07:44:42'),
(7,1,'N6m66m','Junnu',1,'2025-09-24 15:52:32','2025-09-24 15:53:58'),
(8,1,'تيتيتييني','نينينيي',1,'2025-09-24 15:52:52','2025-09-24 15:53:53');
/*!40000 ALTER TABLE `supports` ENABLE KEYS */;
commit;

--
-- Table structure for table `user_logins`
--

DROP TABLE IF EXISTS `user_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `date` date NOT NULL,
  `num` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_logins_userid_foreign` (`userId`),
  CONSTRAINT `user_logins_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logins`
--

/*!40000 ALTER TABLE `user_logins` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_logins` VALUES
(1,1,'2025-07-29',1,NULL,NULL),
(2,1,'2025-07-27',4,NULL,NULL),
(3,71,'2025-07-27',2,NULL,NULL),
(4,71,'2025-07-30',3,NULL,NULL),
(5,1,'2025-07-25',9,NULL,NULL),
(6,71,'2025-07-18',5,NULL,NULL),
(7,1,'2025-07-29',1,NULL,NULL),
(8,1,'2025-07-30',1,'2025-07-30 13:19:24','2025-07-30 13:19:24'),
(9,1,'2025-09-21',1,'2025-09-21 14:33:15','2025-09-21 14:33:15'),
(10,1,'2025-09-22',1,'2025-09-22 16:12:26','2025-09-22 16:12:26'),
(11,1,'2025-09-24',1,'2025-09-24 06:12:10','2025-09-24 06:12:10'),
(12,71,'2025-09-24',1,'2025-09-24 15:56:52','2025-09-24 15:56:52'),
(15,1,'2025-09-25',1,'2025-09-25 04:48:29','2025-09-25 04:48:29'),
(16,1,'2025-09-26',1,'2025-09-26 03:29:40','2025-09-26 03:29:40'),
(17,1,'2025-09-27',1,'2025-09-27 08:28:51','2025-09-27 08:28:51'),
(18,1,'2025-09-28',1,'2025-09-28 06:28:05','2025-09-28 06:28:05'),
(19,1,'2025-09-29',1,'2025-09-29 15:29:28','2025-09-29 15:29:28'),
(20,1,'2025-09-30',1,'2025-09-30 13:22:39','2025-09-30 13:22:39'),
(21,1,'2025-10-01',1,'2025-10-01 09:42:09','2025-10-01 09:42:09'),
(22,71,'2025-10-01',1,'2025-10-01 14:13:01','2025-10-01 14:13:01'),
(23,1,'2025-10-03',1,'2025-10-03 08:58:21','2025-10-03 08:58:21'),
(24,1,'2025-10-04',1,'2025-10-04 22:58:12','2025-10-04 22:58:12'),
(25,1,'2025-10-07',1,'2025-10-07 08:20:41','2025-10-07 08:20:41'),
(26,1,'2025-10-09',1,'2025-10-09 20:34:43','2025-10-09 20:34:43'),
(27,1,'2025-10-10',1,'2025-10-10 13:57:01','2025-10-10 13:57:01'),
(28,1,'2025-10-11',1,'2025-10-11 11:59:08','2025-10-11 11:59:08'),
(29,78,'2025-10-11',1,'2025-10-11 18:24:44','2025-10-11 18:24:44'),
(30,1,'2025-10-12',1,'2025-10-12 07:48:22','2025-10-12 07:48:22'),
(31,79,'2025-10-12',1,'2025-10-12 08:09:45','2025-10-12 08:09:45'),
(32,78,'2025-10-12',1,'2025-10-12 08:51:30','2025-10-12 08:51:30'),
(33,1,'2025-10-14',1,'2025-10-14 19:03:17','2025-10-14 19:03:17'),
(34,1,'2025-10-15',1,'2025-10-15 09:24:55','2025-10-15 09:24:55'),
(35,1,'2025-10-16',1,'2025-10-16 12:02:30','2025-10-16 12:02:30'),
(36,1,'2025-10-17',1,'2025-10-17 04:34:52','2025-10-17 04:34:52'),
(37,1,'2025-10-21',1,'2025-10-21 19:21:23','2025-10-21 19:21:23'),
(38,1,'2025-10-22',1,'2025-10-22 20:52:30','2025-10-22 20:52:30'),
(39,1,'2025-10-24',1,'2025-10-24 18:50:31','2025-10-24 18:50:31'),
(40,1,'2025-10-26',1,'2025-10-26 13:03:33','2025-10-26 13:03:33'),
(41,1,'2025-10-28',1,'2025-10-28 16:02:12','2025-10-28 16:02:12'),
(42,1,'2025-10-29',1,'2025-10-29 07:40:28','2025-10-29 07:40:28'),
(43,1,'2025-10-30',1,'2025-10-30 10:12:19','2025-10-30 10:12:19'),
(44,1,'2025-10-31',1,'2025-10-31 13:13:39','2025-10-31 13:13:39'),
(45,1,'2025-11-01',1,'2025-11-01 06:09:53','2025-11-01 06:09:53'),
(46,1,'2025-11-02',1,'2025-11-02 07:44:54','2025-11-02 07:44:54'),
(47,1,'2025-11-09',1,'2025-11-09 23:22:56','2025-11-09 23:22:56'),
(48,1,'2025-11-15',1,'2025-11-15 17:06:30','2025-11-15 17:06:30'),
(49,1,'2025-11-16',1,'2025-11-16 19:36:38','2025-11-16 19:36:38'),
(50,1,'2025-11-17',1,'2025-11-17 13:10:03','2025-11-17 13:10:03'),
(51,1,'2025-11-20',1,'2025-11-20 16:28:30','2025-11-20 16:28:30'),
(52,1,'2025-11-21',1,'2025-11-21 20:01:29','2025-11-21 20:01:29'),
(53,1,'2025-11-22',1,'2025-11-22 15:43:04','2025-11-22 15:43:04'),
(54,1,'2025-11-23',1,'2025-11-23 13:22:29','2025-11-23 13:22:29'),
(55,1,'2025-11-24',1,'2025-11-24 10:17:47','2025-11-24 10:17:47'),
(56,1,'2025-11-25',1,'2025-11-25 17:42:09','2025-11-25 17:42:09'),
(57,1,'2025-11-27',1,'2025-11-27 18:26:32','2025-11-27 18:26:32'),
(58,1,'2025-11-28',1,'2025-11-28 20:33:09','2025-11-28 20:33:09'),
(59,1,'2025-11-29',1,'2025-11-29 22:09:31','2025-11-29 22:09:31'),
(60,1,'2025-12-01',1,'2025-12-01 17:07:13','2025-12-01 17:07:13'),
(61,1,'2025-12-02',1,'2025-12-02 23:19:25','2025-12-02 23:19:25'),
(62,1,'2025-12-03',1,'2025-12-03 13:04:19','2025-12-03 13:04:19'),
(63,1,'2025-12-05',1,'2025-12-05 13:59:25','2025-12-05 13:59:25'),
(64,1,'2025-12-07',1,'2025-12-07 16:09:32','2025-12-07 16:09:32'),
(65,1,'2025-12-08',1,'2025-12-08 13:19:07','2025-12-08 13:19:07'),
(66,1,'2025-12-09',1,'2025-12-09 23:03:23','2025-12-09 23:03:23'),
(67,1,'2025-12-10',1,'2025-12-10 17:13:41','2025-12-10 17:13:41'),
(68,1,'2025-12-12',1,'2025-12-12 16:25:15','2025-12-12 16:25:15'),
(69,1,'2025-12-14',1,'2025-12-14 05:48:26','2025-12-14 05:48:26'),
(70,1,'2025-12-15',1,'2025-12-15 08:40:58','2025-12-15 08:40:58'),
(71,1,'2025-12-16',1,'2025-12-16 08:22:02','2025-12-16 08:22:02'),
(72,1,'2025-12-17',1,'2025-12-17 10:12:07','2025-12-17 10:12:07'),
(73,1,'2025-12-18',1,'2025-12-18 23:17:02','2025-12-18 23:17:02'),
(74,1,'2025-12-19',1,'2025-12-19 07:19:15','2025-12-19 07:19:15'),
(75,1,'2025-12-22',1,'2025-12-22 12:39:07','2025-12-22 12:39:07'),
(76,1,'2025-12-24',1,'2025-12-24 08:30:26','2025-12-24 08:30:26'),
(77,1,'2025-12-25',1,'2025-12-25 16:33:14','2025-12-25 16:33:14'),
(78,1,'2025-12-27',1,'2025-12-27 14:35:01','2025-12-27 14:35:01'),
(79,1,'2025-12-29',1,'2025-12-29 11:53:09','2025-12-29 11:53:09'),
(80,1,'2026-01-01',1,'2026-01-01 11:29:01','2026-01-01 11:29:01'),
(81,1,'2026-01-03',1,'2026-01-03 02:37:11','2026-01-03 02:37:11'),
(82,1,'2026-01-09',1,'2026-01-09 14:19:10','2026-01-09 14:19:10'),
(83,1,'2026-01-10',1,'2026-01-10 16:46:16','2026-01-10 16:46:16'),
(84,1,'2026-01-13',1,'2026-01-13 17:23:09','2026-01-13 17:23:09'),
(85,1,'2026-01-15',1,'2026-01-15 20:45:32','2026-01-15 20:45:32'),
(86,1,'2026-01-17',1,'2026-01-17 13:38:24','2026-01-17 13:38:24'),
(87,1,'2026-01-19',1,'2026-01-19 12:20:26','2026-01-19 12:20:26'),
(88,1,'2026-01-21',1,'2026-01-21 22:48:02','2026-01-21 22:48:02'),
(89,1,'2026-01-28',1,'2026-01-28 17:44:43','2026-01-28 17:44:43');
/*!40000 ALTER TABLE `user_logins` ENABLE KEYS */;
commit;

--
-- Table structure for table `user_ratings`
--

DROP TABLE IF EXISTS `user_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ratings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `stars` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_ratings_userid_foreign` (`userId`),
  CONSTRAINT `user_ratings_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ratings`
--

/*!40000 ALTER TABLE `user_ratings` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_ratings` VALUES
(6,1,5,'good App','2025-05-11 11:11:06','2025-05-11 11:11:06'),
(11,71,4,'asdasd sad as dasd as',NULL,NULL),
(13,1,1,'Danke','2025-10-01 10:43:15','2025-10-01 10:43:15');
/*!40000 ALTER TABLE `user_ratings` ENABLE KEYS */;
commit;

--
-- Table structure for table `user_subscribes`
--

DROP TABLE IF EXISTS `user_subscribes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscribes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_subscribes_userid_foreign` (`userId`),
  CONSTRAINT `user_subscribes_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subscribes`
--

/*!40000 ALTER TABLE `user_subscribes` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_subscribes` VALUES
(1,1,3,NULL,22,45,0,31,1,0,'1YNDPID0',NULL,'2025-12-16 08:25:18'),
(60,71,1,NULL,13,50,0,0,0,0,'1YQE0N70','2025-05-12 19:41:06','2025-09-20 05:52:05'),
(63,78,0,NULL,3,20,0,0,0,0,'1YQLRUI0','2025-10-11 18:24:42','2025-10-11 18:24:42'),
(64,79,0,NULL,3,20,0,0,0,0,'1YQQ3PN0','2025-10-12 08:09:41','2025-10-12 08:09:41');
/*!40000 ALTER TABLE `user_subscribes` ENABLE KEYS */;
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
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Baraa jazah','baraajazah@gmail.com','2025-04-22 09:13:10','$2y$12$ZLSX6U0bUCGgDSY/mGdPxu8A/WawN5k4GiYmldDc5OE8/hryoze6O',10,'man4','Iiki9Mr1aWScDM4k2YV63rVI642YORYTpSPwwZfX14aP1lKEkec3smhzq8GB','2025-04-22 09:13:10','2025-05-13 14:21:35'),
(71,'baraa jazah1','baraajazah1@gmail.com',NULL,'$2y$12$xSSGwD1mewKrn32pf/tYTexJVkpta3pPqso6LkWhRUAPCzBwKeru.',0,'man1',NULL,'2025-05-12 19:41:06','2025-05-12 19:41:06'),
(78,'omer','omeromer12@gmail.com',NULL,'$2y$12$EjcvoVUD2cE2HSFgPp2fIe5tqlGjSVSMKzuRsKzAiUiTzCSG8Kd.G',0,NULL,NULL,'2025-10-11 18:24:42','2025-10-11 18:24:42'),
(79,'omer','omer@gmail.com',NULL,'$2y$12$O4uYwz1A5LcVNatvp9Tm0.jBtuWSfObuvhbmrenJNdvt/6CTSNZOu',0,NULL,NULL,'2025-10-12 08:09:41','2025-10-12 08:09:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
commit;

--
-- Dumping routines for database 'u836463890_healthyLife'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-02-10 14:42:28
