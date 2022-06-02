-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: p2p
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Member`
--

use p2p;

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Member` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Part` varchar(50) DEFAULT NULL,
  `Position` varchar(50) DEFAULT NULL,
  `TagName` varchar(50) DEFAULT NULL,
  `Date_Entry_Work` datetime DEFAULT NULL,
  `Date_Off_Work` datetime DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Url_Image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `Status_ID` int(11) NOT NULL,
  `Account_Number` varchar(50) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Amount_Loan` int(11) DEFAULT NULL,
  `Amount_Investment` int(11) DEFAULT NULL,
  `Amount_Block` int(11) DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `customer_account` FOREIGN KEY (`ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,2,'0962393883',50000000,10000000,10000000,10000000,NULL),(2,2,'0123456789',100000000,0,0,0,NULL),(3,1,'0987654321',200000000,0,0,0,NULL),(33,1,NULL,NULL,NULL,NULL,NULL,NULL),(34,1,NULL,NULL,NULL,NULL,NULL,NULL),(37,0,NULL,NULL,NULL,NULL,NULL,NULL),(38,1,'0906275026',10000000,10000000,10000000,10000000,NULL),(39,1,NULL,NULL,NULL,NULL,NULL,NULL),(40,1,NULL,NULL,NULL,NULL,NULL,NULL),(42,1,NULL,NULL,NULL,NULL,NULL,NULL),(43,1,NULL,NULL,NULL,NULL,NULL,NULL),(44,1,NULL,NULL,NULL,NULL,NULL,NULL),(45,1,NULL,NULL,NULL,NULL,NULL,NULL),(46,1,NULL,NULL,NULL,NULL,NULL,NULL),(47,1,NULL,NULL,NULL,NULL,NULL,NULL),(48,1,NULL,NULL,NULL,NULL,NULL,NULL),(49,1,NULL,NULL,NULL,NULL,NULL,NULL),(50,1,NULL,NULL,NULL,NULL,NULL,NULL),(51,1,NULL,NULL,NULL,NULL,NULL,NULL),(52,1,NULL,NULL,NULL,NULL,NULL,NULL),(53,1,NULL,NULL,NULL,NULL,NULL,NULL),(54,1,NULL,NULL,NULL,NULL,NULL,NULL),(55,1,NULL,NULL,NULL,NULL,NULL,NULL),(56,1,NULL,NULL,NULL,NULL,NULL,NULL),(57,1,NULL,NULL,NULL,NULL,NULL,NULL),(58,1,NULL,NULL,NULL,NULL,NULL,NULL),(59,1,NULL,NULL,NULL,NULL,NULL,NULL),(60,1,NULL,NULL,NULL,NULL,NULL,NULL),(61,1,NULL,NULL,NULL,NULL,NULL,NULL),(62,1,NULL,NULL,NULL,NULL,NULL,NULL),(63,1,NULL,NULL,NULL,NULL,NULL,NULL),(64,1,NULL,NULL,NULL,NULL,NULL,NULL),(65,1,NULL,NULL,NULL,NULL,NULL,NULL),(66,1,NULL,NULL,NULL,NULL,NULL,NULL),(67,1,NULL,NULL,NULL,NULL,NULL,NULL),(68,1,NULL,NULL,NULL,NULL,NULL,NULL),(69,1,NULL,NULL,NULL,NULL,NULL,NULL),(70,1,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_bank`
--

DROP TABLE IF EXISTS `account_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_bank` (
  `ID` int(11) NOT NULL,
  `Account_Number` varchar(50) DEFAULT NULL,
  `ATM_Number` varchar(50) DEFAULT NULL,
  `Bank_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Department_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `OwnerName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `cusbank` FOREIGN KEY (`ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_bank`
--

LOCK TABLES `account_bank` WRITE;
/*!40000 ALTER TABLE `account_bank` DISABLE KEYS */;
INSERT INTO `account_bank` VALUES (1,'123456','1234567890','BIDV','MB','Nguyên Quôc Khánh'),(2,'0123456789','123987654','MB','MB','Nguyễn Hoàng Hiệp'),(3,'0987654321','123459876','MB','MB','Trần Quang Thắng'),(4,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL),(23,NULL,NULL,NULL,NULL,NULL),(24,NULL,NULL,NULL,NULL,NULL),(25,NULL,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,NULL,NULL),(27,NULL,NULL,NULL,NULL,NULL),(28,NULL,NULL,NULL,NULL,NULL),(29,NULL,NULL,NULL,NULL,NULL),(30,NULL,NULL,NULL,NULL,NULL),(31,NULL,NULL,NULL,NULL,NULL),(32,NULL,NULL,NULL,NULL,NULL),(33,NULL,NULL,NULL,NULL,NULL),(34,NULL,NULL,NULL,NULL,NULL),(35,NULL,NULL,NULL,NULL,NULL),(36,NULL,NULL,NULL,NULL,NULL),(37,NULL,NULL,NULL,NULL,NULL),(38,NULL,NULL,NULL,NULL,NULL),(39,NULL,NULL,NULL,NULL,NULL),(40,NULL,NULL,NULL,NULL,NULL),(41,NULL,NULL,NULL,NULL,NULL),(42,NULL,NULL,NULL,NULL,NULL),(43,NULL,NULL,NULL,NULL,NULL),(44,NULL,NULL,NULL,NULL,NULL),(45,NULL,NULL,NULL,NULL,NULL),(46,NULL,NULL,NULL,NULL,NULL),(47,NULL,NULL,NULL,NULL,NULL),(48,NULL,NULL,NULL,NULL,NULL),(49,NULL,NULL,NULL,NULL,NULL),(50,NULL,NULL,NULL,NULL,NULL),(51,NULL,NULL,NULL,NULL,NULL),(52,NULL,NULL,NULL,NULL,NULL),(53,NULL,NULL,NULL,NULL,NULL),(54,NULL,NULL,NULL,NULL,NULL),(55,NULL,NULL,NULL,NULL,NULL),(56,NULL,NULL,NULL,NULL,NULL),(57,NULL,NULL,NULL,NULL,NULL),(58,NULL,NULL,NULL,NULL,NULL),(59,NULL,NULL,NULL,NULL,NULL),(60,NULL,NULL,NULL,NULL,NULL),(61,NULL,NULL,NULL,NULL,NULL),(62,NULL,NULL,NULL,NULL,NULL),(63,NULL,NULL,NULL,NULL,NULL),(64,NULL,NULL,NULL,NULL,NULL),(65,NULL,NULL,NULL,NULL,NULL),(66,NULL,NULL,NULL,NULL,NULL),(67,NULL,NULL,NULL,NULL,NULL),(68,NULL,NULL,NULL,NULL,NULL),(69,NULL,NULL,NULL,NULL,NULL),(70,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_bank_system_transaction`
--

DROP TABLE IF EXISTS `account_bank_system_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_bank_system_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transation_Type_ID` int(11) NOT NULL,
  `ChangedAmount` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Transaction_Content` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `AccountNumber` varchar(50) DEFAULT NULL,
  `codeTransactionBank` varchar(50) DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Transation_Type` (`Transation_Type_ID`),
  CONSTRAINT `Transation_Type` FOREIGN KEY (`Transation_Type_ID`) REFERENCES `account_bank_system_transaction_type` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_bank_system_transaction`
--

LOCK TABLES `account_bank_system_transaction` WRITE;
/*!40000 ALTER TABLE `account_bank_system_transaction` DISABLE KEYS */;
INSERT INTO `account_bank_system_transaction` VALUES (1,1,10000,200000,'2021-06-22 00:00:00','M4U 0906275026','738932882',NULL,NULL),(2,1,-10000000,15559913,'2021-05-06 00:35:00','M4U  0788494909','0560128609113',NULL,NULL),(3,2,10000000,15559913,'2021-05-06 00:35:00','M4U  0788494909','0560128609113',NULL,NULL),(4,1,-10000000,15559913,'2021-05-06 00:35:00','M4U  0788494909','0560128609113',NULL,NULL),(5,2,10000000,15559913,'2021-05-06 00:35:00','M4U  0788494909','0560128609113',NULL,NULL),(6,1,-10000000,15559913,'2021-05-06 00:35:00','M4U  0788494909','0560128609113',NULL,NULL),(7,2,10000000,15559913,'2021-05-06 07:35:00','M4U  0788494909','0560128609113',NULL,NULL),(8,2,10000000,15559913,'2021-05-06 07:35:00','M4U  0788494909','0560128609113',NULL,NULL),(9,2,10000000,15559913,'2021-05-06 07:35:00','M4U  0788494909','0560128609113',NULL,NULL);
/*!40000 ALTER TABLE `account_bank_system_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_bank_system_transaction_type`
--

DROP TABLE IF EXISTS `account_bank_system_transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_bank_system_transaction_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transaction_Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_bank_system_transaction_type`
--

LOCK TABLES `account_bank_system_transaction_type` WRITE;
/*!40000 ALTER TABLE `account_bank_system_transaction_type` DISABLE KEYS */;
INSERT INTO `account_bank_system_transaction_type` VALUES (1,'Chuyển tiền','Loại tin nhắn NH gửi'),(2,'Nhận tiền','Loại tin nhắn NH gửi');
/*!40000 ALTER TABLE `account_bank_system_transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_block`
--

DROP TABLE IF EXISTS `account_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_block` (
  `ID` int(11) NOT NULL,
  `Amount_GetMoney` int(11) DEFAULT NULL,
  `Amount_Wait_Investment` int(11) DEFAULT NULL,
  `Amount_Wait_LoanFromOwn` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_ACCOUNT_BLOCK_ACCOUNT1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_block`
--

LOCK TABLES `account_block` WRITE;
/*!40000 ALTER TABLE `account_block` DISABLE KEYS */;
INSERT INTO `account_block` VALUES (1,10000000,10000000,10000000),(38,1000000,10000000,10000000);
/*!40000 ALTER TABLE `account_block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_block_transaction`
--

DROP TABLE IF EXISTS `account_block_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_block_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_Block_Type_ID` int(11) NOT NULL,
  `Account_Block_ID` int(11) NOT NULL,
  `StatusID` int(11) DEFAULT NULL,
  `Amount_Block_Change` int(11) DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK_TYPE1_idx` (`Account_Block_Type_ID`),
  KEY `fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK1_idx` (`Account_Block_ID`),
  CONSTRAINT `fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK1` FOREIGN KEY (`Account_Block_ID`) REFERENCES `account_block` (`ID`),
  CONSTRAINT `fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK_TYPE1` FOREIGN KEY (`Account_Block_Type_ID`) REFERENCES `account_block_type` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_block_transaction`
--

LOCK TABLES `account_block_transaction` WRITE;
/*!40000 ALTER TABLE `account_block_transaction` DISABLE KEYS */;
INSERT INTO `account_block_transaction` VALUES (1,1,1,NULL,30000,'tôi muốn xét duyệt ngay trong hôm nay'),(2,1,1,NULL,30000,'tôi muốn xét duyệt ngay trong hôm nay'),(3,1,1,NULL,30000,'tôi muốn xét duyệt ngay trong hôm nay'),(4,1,1,NULL,300000,'tôi muốn xét duyệt ngay trong hôm nay'),(5,1,1,NULL,300000,'tôi muốn xét duyệt ngay trong hôm nay'),(6,1,1,NULL,300000,'tôi muốn xét duyệt ngay trong hôm nay'),(7,1,1,NULL,100000,'tôi muốn xét duyệt ngay trong hôm nay'),(8,1,1,NULL,100000,'tôi muốn xét duyệt ngay trong hôm nay'),(9,1,1,NULL,200000,'tôi muốn xét duyệt ngay trong hôm nay nhé'),(10,1,1,NULL,1000,''),(11,1,1,NULL,10000,''),(12,1,1,NULL,200000,'tôi muốn xét duyệt ngay trong hôm nay nhé'),(13,1,1,NULL,300000,''),(14,2,1,NULL,5000000,'Đầu tư khỏan vay có mã M4U_20210607_1_3'),(15,2,38,NULL,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(16,2,38,NULL,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2'),(17,2,1,NULL,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC'),(18,2,38,NULL,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(19,2,38,NULL,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2'),(20,2,1,NULL,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC'),(21,2,38,NULL,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(22,2,38,NULL,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2'),(23,2,1,NULL,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC');
/*!40000 ALTER TABLE `account_block_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_block_transaction_status`
--

DROP TABLE IF EXISTS `account_block_transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_block_transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sub_Account_Status_ID` int(11) NOT NULL,
  `Account_Block_Transaction_ID` int(11) NOT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACTION_idx` (`Sub_Account_Status_ID`),
  KEY `fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_ACCOUNT_BLOCK_TRANSACTI_idx` (`Account_Block_Transaction_ID`),
  CONSTRAINT `fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_ACCOUNT_BLOCK_TRANSACTION1` FOREIGN KEY (`Account_Block_Transaction_ID`) REFERENCES `account_block_transaction` (`ID`),
  CONSTRAINT `fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACTION_S1` FOREIGN KEY (`Sub_Account_Status_ID`) REFERENCES `sub_account_transaction_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_block_transaction_status`
--

LOCK TABLES `account_block_transaction_status` WRITE;
/*!40000 ALTER TABLE `account_block_transaction_status` DISABLE KEYS */;
INSERT INTO `account_block_transaction_status` VALUES (1,1,1,'2021-06-23 16:15:05',NULL),(2,1,2,'2021-06-23 16:19:37',NULL),(3,1,3,'2021-06-23 16:19:58',NULL),(4,1,4,'2021-06-23 16:27:38',NULL),(5,1,5,'2021-06-23 16:44:01',NULL),(6,1,6,'2021-06-23 16:47:34',NULL),(7,1,7,'2021-06-23 16:49:44',NULL),(8,1,8,'2021-06-23 16:51:22',NULL),(9,1,9,'2021-06-23 17:42:05',NULL),(10,1,10,'2021-06-23 20:29:46',NULL),(11,1,11,'2021-06-28 11:32:35',NULL),(12,1,12,'2021-06-28 21:18:52',NULL),(13,1,13,'2021-06-29 22:12:00',NULL),(14,1,14,'2021-06-29 22:15:27',NULL),(15,2,15,'2021-06-30 08:17:20',NULL),(16,2,16,'2021-06-30 08:17:20',NULL),(17,2,17,'2021-06-30 08:17:20',NULL),(18,2,18,'2021-06-30 08:19:56',NULL),(19,2,19,'2021-06-30 08:19:56',NULL),(20,2,20,'2021-06-30 08:19:56',NULL),(21,2,21,'2021-06-30 08:21:44',NULL),(22,2,22,'2021-06-30 08:21:44',NULL),(23,2,23,'2021-06-30 08:21:44',NULL);
/*!40000 ALTER TABLE `account_block_transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_block_type`
--

DROP TABLE IF EXISTS `account_block_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_block_type` (
  `ID` int(11) NOT NULL,
  `Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_block_type`
--

LOCK TABLES `account_block_type` WRITE;
/*!40000 ALTER TABLE `account_block_type` DISABLE KEYS */;
INSERT INTO `account_block_type` VALUES (1,'rút tiền',NULL),(2,'đầu tư',NULL);
/*!40000 ALTER TABLE `account_block_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_investment`
--

DROP TABLE IF EXISTS `account_investment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_investment` (
  `ID` int(11) NOT NULL,
  `Amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_ACCOUNT_INVESTMENT_ACCOUNT1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_investment`
--

LOCK TABLES `account_investment` WRITE;
/*!40000 ALTER TABLE `account_investment` DISABLE KEYS */;
INSERT INTO `account_investment` VALUES (1,10000000),(2,3000000),(38,10000000);
/*!40000 ALTER TABLE `account_investment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_investment_transaction`
--

DROP TABLE IF EXISTS `account_investment_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_investment_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_Investment_ID` int(11) NOT NULL,
  `Amount_Investment_Change` int(11) DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_INVESTMENT_TRANSACTION_ACCOUNT_INVESTMENT1_idx` (`Account_Investment_ID`),
  CONSTRAINT `fk_ACCOUNT_INVESTMENT_TRANSACTION_ACCOUNT_INVESTMENT1` FOREIGN KEY (`Account_Investment_ID`) REFERENCES `account_investment` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_investment_transaction`
--

LOCK TABLES `account_investment_transaction` WRITE;
/*!40000 ALTER TABLE `account_investment_transaction` DISABLE KEYS */;
INSERT INTO `account_investment_transaction` VALUES (1,2,3000000,NULL),(2,38,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(3,38,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2'),(4,38,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(5,38,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2'),(6,38,2000000,'Giải ngân cho hợp đồng M4U_20210607_1_1'),(7,38,3000000,'Giải ngân cho hợp đồng M4U_20210607_1_2');
/*!40000 ALTER TABLE `account_investment_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_investment_transaction_status`
--

DROP TABLE IF EXISTS `account_investment_transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_investment_transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sub_Account_Status_ID` int(11) NOT NULL,
  `Account_Investment_Transaction_ID` int(11) NOT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_INVESTMENT_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSA_idx` (`Sub_Account_Status_ID`),
  KEY `fk_ACCOUNT_INVESTMENT_TRANSACTION_STATUS_ACCOUNT_INVESTMENT_idx` (`Account_Investment_Transaction_ID`),
  CONSTRAINT `fk_ACCOUNT_INVESTMENT_TRANSACTION_STATUS_ACCOUNT_INVESTMENT_T1` FOREIGN KEY (`Account_Investment_Transaction_ID`) REFERENCES `account_investment_transaction` (`ID`),
  CONSTRAINT `fk_ACCOUNT_INVESTMENT_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACT1` FOREIGN KEY (`Sub_Account_Status_ID`) REFERENCES `sub_account_transaction_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_investment_transaction_status`
--

LOCK TABLES `account_investment_transaction_status` WRITE;
/*!40000 ALTER TABLE `account_investment_transaction_status` DISABLE KEYS */;
INSERT INTO `account_investment_transaction_status` VALUES (1,1,1,'2021-02-12 00:00:00',NULL),(2,2,1,'2021-02-13 00:00:00',NULL),(3,2,2,'2021-06-30 08:17:20',NULL),(4,2,3,'2021-06-30 08:17:20',NULL),(5,2,4,'2021-06-30 08:19:56',NULL),(6,2,5,'2021-06-30 08:19:56',NULL),(7,2,6,'2021-06-30 08:21:44',NULL),(8,2,7,'2021-06-30 08:21:44',NULL);
/*!40000 ALTER TABLE `account_investment_transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan`
--

DROP TABLE IF EXISTS `account_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan` (
  `ID` int(11) NOT NULL,
  `Amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_ACCOUNT1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan`
--

LOCK TABLES `account_loan` WRITE;
/*!40000 ALTER TABLE `account_loan` DISABLE KEYS */;
INSERT INTO `account_loan` VALUES (1,10000000),(2,200000000),(38,10000000);
/*!40000 ALTER TABLE `account_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_limitation`
--

DROP TABLE IF EXISTS `account_loan_limitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_limitation` (
  `ID` int(11) NOT NULL,
  `Amount_Credit` int(11) DEFAULT NULL,
  `Amount_Debit` int(11) DEFAULT NULL,
  `Amount_Release` int(11) DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_LIMITATION_ACCOUNT1` FOREIGN KEY (`ID`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_limitation`
--

LOCK TABLES `account_loan_limitation` WRITE;
/*!40000 ALTER TABLE `account_loan_limitation` DISABLE KEYS */;
INSERT INTO `account_loan_limitation` VALUES (1,20000000,NULL,NULL,NULL),(2,5000000,30000000,NULL,NULL),(3,10000000,20000000,NULL,NULL),(65,10000000,4000000,1000000,NULL),(66,NULL,NULL,NULL,NULL),(67,NULL,NULL,NULL,NULL),(68,NULL,NULL,NULL,NULL),(69,NULL,NULL,NULL,NULL),(70,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account_loan_limitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_limitation_transaction`
--

DROP TABLE IF EXISTS `account_loan_limitation_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_limitation_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_Loan_Limitation_ID` int(11) NOT NULL,
  `Account_Loan_Limitation_Type_ID` int(11) NOT NULL,
  `Account_Loan_Limitation_Status_ID` int(11) NOT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Amount_Limitation_Change` int(11) DEFAULT NULL,
  `Customer_ID` int(11) DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx` (`Account_Loan_Limitation_Type_ID`),
  KEY `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx1` (`Account_Loan_Limitation_Status_ID`),
  KEY `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx2` (`Account_Loan_Limitation_ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITATIO1` FOREIGN KEY (`Account_Loan_Limitation_Type_ID`) REFERENCES `account_loan_limitation_type` (`ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITATIO2` FOREIGN KEY (`Account_Loan_Limitation_Status_ID`) REFERENCES `account_loan_limitation_transaction_status` (`ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITATION1` FOREIGN KEY (`Account_Loan_Limitation_ID`) REFERENCES `account_loan_limitation` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_limitation_transaction`
--

LOCK TABLES `account_loan_limitation_transaction` WRITE;
/*!40000 ALTER TABLE `account_loan_limitation_transaction` DISABLE KEYS */;
INSERT INTO `account_loan_limitation_transaction` VALUES (1,2,1,1,'2021-02-11 00:00:00',3000000,NULL,NULL),(2,2,1,2,'2021-02-12 00:00:00',3000000,NULL,NULL),(3,65,1,1,'2021-06-29 13:47:12',51000000,65,'test'),(4,65,2,1,'2021-06-29 13:48:55',15000000,65,'test');
/*!40000 ALTER TABLE `account_loan_limitation_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_limitation_transaction_status`
--

DROP TABLE IF EXISTS `account_loan_limitation_transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_limitation_transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_limitation_transaction_status`
--

LOCK TABLES `account_loan_limitation_transaction_status` WRITE;
/*!40000 ALTER TABLE `account_loan_limitation_transaction_status` DISABLE KEYS */;
INSERT INTO `account_loan_limitation_transaction_status` VALUES (1,'Chờ thẩm định',NULL),(2,'Đã thẩm định',NULL),(3,'Đã duyệt',NULL),(4,'Đã từ chối',NULL),(5,'Đã hủy',NULL);
/*!40000 ALTER TABLE `account_loan_limitation_transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_limitation_type`
--

DROP TABLE IF EXISTS `account_loan_limitation_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_limitation_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type_Name` varchar(50) DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_limitation_type`
--

LOCK TABLES `account_loan_limitation_type` WRITE;
/*!40000 ALTER TABLE `account_loan_limitation_type` DISABLE KEYS */;
INSERT INTO `account_loan_limitation_type` VALUES (1,'Tín dụng',NULL),(2,'Thế chấp',NULL),(3,'Giải chấp',NULL);
/*!40000 ALTER TABLE `account_loan_limitation_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_transaction`
--

DROP TABLE IF EXISTS `account_loan_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_Loan_ID` int(11) NOT NULL,
  `Amount_Loan_Change` int(11) DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_LOAN_TRANSACTION_ACCOUNT_LOAN1_idx` (`Account_Loan_ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_TRANSACTION_ACCOUNT_LOAN1` FOREIGN KEY (`Account_Loan_ID`) REFERENCES `account_loan` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_transaction`
--

LOCK TABLES `account_loan_transaction` WRITE;
/*!40000 ALTER TABLE `account_loan_transaction` DISABLE KEYS */;
INSERT INTO `account_loan_transaction` VALUES (1,1,10000000,'Nạp thêm tiền vào tài khoản'),(2,2,-5000000,'Rút tiền khỏi tài khoản'),(3,1,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC'),(4,1,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC'),(5,1,5000000,'Giải ngân cho hợp đồng M4U_20210607_1_TC');
/*!40000 ALTER TABLE `account_loan_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_loan_transaction_status`
--

DROP TABLE IF EXISTS `account_loan_transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_loan_transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sub_Account_Status_ID` int(11) NOT NULL,
  `Account_Loan_Transaction_ID` int(11) NOT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_LOAN_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACTION__idx` (`Sub_Account_Status_ID`),
  KEY `fk_ACCOUNT_LOAN_TRANSACTION_STATUS_ACCOUNT_LOAN_TRANSACTION_idx` (`Account_Loan_Transaction_ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_TRANSACTION_STATUS_ACCOUNT_LOAN_TRANSACTION1` FOREIGN KEY (`Account_Loan_Transaction_ID`) REFERENCES `account_loan_transaction` (`ID`),
  CONSTRAINT `fk_ACCOUNT_LOAN_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACTION_ST1` FOREIGN KEY (`Sub_Account_Status_ID`) REFERENCES `sub_account_transaction_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_loan_transaction_status`
--

LOCK TABLES `account_loan_transaction_status` WRITE;
/*!40000 ALTER TABLE `account_loan_transaction_status` DISABLE KEYS */;
INSERT INTO `account_loan_transaction_status` VALUES (1,1,1,'2021-06-12 00:00:00',NULL),(2,1,2,'2021-06-15 00:00:00',NULL),(3,2,3,'2021-06-30 08:17:20',NULL),(4,2,4,'2021-06-30 08:19:56',NULL),(5,2,5,'2021-06-30 08:21:44',NULL);
/*!40000 ALTER TABLE `account_loan_transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_status`
--

DROP TABLE IF EXISTS `account_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_status`
--

LOCK TABLES `account_status` WRITE;
/*!40000 ALTER TABLE `account_status` DISABLE KEYS */;
INSERT INTO `account_status` VALUES (1,'Đang chờ duyệt','KH mới tạo TK, đang chờ phê duyệt khi đủ các thông tin cá  nhân khác'),(2,'Đang hoạt động','Đã được kích hoạt'),(3,'Đang phong tỏa','vì 1 lý do xyz nào đó , tài khoản bị khóa');
/*!40000 ALTER TABLE `account_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_trannsaction_status`
--

DROP TABLE IF EXISTS `account_trannsaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_trannsaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transaction_Status_ID` int(11) NOT NULL,
  `Account_Transaction_ID` int(11) NOT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ACCOUNT_TRANNSACTION_STATUS_TRANSACTION_STATUS1_idx` (`Transaction_Status_ID`),
  KEY `fk_ACCOUNT_TRANNSACTION_STATUS_ACCOUNT_TRANSACTION1_idx` (`Account_Transaction_ID`),
  CONSTRAINT `fk_ACCOUNT_TRANNSACTION_STATUS_ACCOUNT_TRANSACTION1` FOREIGN KEY (`Account_Transaction_ID`) REFERENCES `account_transaction` (`ID`),
  CONSTRAINT `fk_ACCOUNT_TRANNSACTION_STATUS_TRANSACTION_STATUS1` FOREIGN KEY (`Transaction_Status_ID`) REFERENCES `transaction_status` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_trannsaction_status`
--

LOCK TABLES `account_trannsaction_status` WRITE;
/*!40000 ALTER TABLE `account_trannsaction_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_trannsaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_transaction`
--

DROP TABLE IF EXISTS `account_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transaction_Code` varchar(50) DEFAULT NULL,
  `Account_ID` int(11) DEFAULT NULL,
  `Account_Status_ID` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Transation_Type_ID` int(11) DEFAULT NULL,
  `Transaction_Date` datetime DEFAULT NULL,
  `FromAccount_ID` int(11) DEFAULT NULL,
  `ToAccount_ID` int(11) DEFAULT NULL,
  `Transaction_Status_ID` int(11) DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `account_accountID` (`Account_ID`),
  KEY `account_FromAccountID` (`FromAccount_ID`),
  KEY `account_ToAccountID` (`ToAccount_ID`),
  KEY `account_trans_type_idx` (`Transation_Type_ID`),
  KEY `fk_ACCOUNT_TRANSACTION_ACCOUNT_STATUS1_idx` (`Account_Status_ID`),
  CONSTRAINT `account_FromAccountID` FOREIGN KEY (`FromAccount_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `account_ToAccountID` FOREIGN KEY (`ToAccount_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `account_accountID` FOREIGN KEY (`Account_ID`) REFERENCES `account` (`ID`),
  CONSTRAINT `account_trans_type` FOREIGN KEY (`Transation_Type_ID`) REFERENCES `account_transaction_type` (`ID`),
  CONSTRAINT `fk_ACCOUNT_TRANSACTION_ACCOUNT_STATUS1` FOREIGN KEY (`Account_Status_ID`) REFERENCES `account_status` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_transaction`
--

LOCK TABLES `account_transaction` WRITE;
/*!40000 ALTER TABLE `account_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_transaction_type`
--

DROP TABLE IF EXISTS `account_transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_transaction_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transaction_Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_transaction_type`
--

LOCK TABLES `account_transaction_type` WRITE;
/*!40000 ALTER TABLE `account_transaction_type` DISABLE KEYS */;
INSERT INTO `account_transaction_type` VALUES (1,'Nộp tiền','Nộp tiền vào tài khoản hệ thống'),(2,'Rút tiền','rút tiền '),(3,'Cho vay',NULL);
/*!40000 ALTER TABLE `account_transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `LastName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `PlaceOfBirth` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `PermanentResidence` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Address` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Descriptions` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `Url_Facebook` text,
  `Contact_Often` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'NGUYEN QUOC ','KHANH ','1983-09-02','Phong Khê - Yên Phong - Bắc Ninh','171/30 Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội','171/30 Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội','0962393883','nam ',NULL,NULL),(2,'Hiệp','Nguyễn Hoàng','1997-06-01','Đà Nẵng','165, Đường Liên Chiểu, TP Đà Nẵng','165, Đường Liên Chiểu, TP Đà Nẵng','0123456789',NULL,NULL,NULL),(3,'Thắng','Trần Quang','1998-02-01','Nam sách - Nghệ An','Nam sách - Nghệ An','Nam sách - Nghệ An','0987654321',NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'1231','adasd',NULL,NULL,'12313','12313','2313','12',NULL,NULL),(24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'12317','adasd9',NULL,NULL,'12313','12313','2313','12',NULL,NULL),(30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'Quang','Nguyen Van',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(42,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(46,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(47,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(49,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(51,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(54,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(56,'QUOC KHANH','NGUYEN','1983-09-02','Phong Khê - Yên Phong - Bắc Ninh','171/30 Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội','171/30 Nguyễn Hoàng Tôn, Xuân La, Tây Hồ, Hà Nội','0962393883','',NULL,NULL),(57,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(58,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(60,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(61,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(62,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(63,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(64,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(66,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(67,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(68,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(69,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(70,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_status`
--

DROP TABLE IF EXISTS `customer_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) DEFAULT NULL,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_status`
--

LOCK TABLES `customer_status` WRITE;
/*!40000 ALTER TABLE `customer_status` DISABLE KEYS */;
INSERT INTO `customer_status` VALUES (1,1,'Độc thân',NULL);
/*!40000 ALTER TABLE `customer_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indentity_document`
--

DROP TABLE IF EXISTS `indentity_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indentity_document` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Identity_Document_Type_ID` int(11) DEFAULT NULL,
  `IdentityNumber` varchar(20) DEFAULT NULL,
  `DateOfIssue` date DEFAULT NULL,
  `DateOfExpiry` date DEFAULT NULL,
  `PlaceOfIssue` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `FrontalImage` varchar(100) DEFAULT NULL,
  `BackImage` varchar(100) DEFAULT NULL,
  `SelfieWithDocument` varchar(100) DEFAULT NULL,
  `Descriptions` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `indentity_type` (`Identity_Document_Type_ID`),
  CONSTRAINT `fk_INDENTITY_DOCUMENT_CUSTOMER1` FOREIGN KEY (`ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `indentity_type` FOREIGN KEY (`Identity_Document_Type_ID`) REFERENCES `indentity_document_type` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indentity_document`
--

LOCK TABLES `indentity_document` WRITE;
/*!40000 ALTER TABLE `indentity_document` DISABLE KEYS */;
INSERT INTO `indentity_document` VALUES (1,4,'1234567890','2015-02-02','2015-02-02','Bắc Ninh ','null','null','null','test');
/*!40000 ALTER TABLE `indentity_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indentity_document_type`
--

DROP TABLE IF EXISTS `indentity_document_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indentity_document_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Document_Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indentity_document_type`
--

LOCK TABLES `indentity_document_type` WRITE;
/*!40000 ALTER TABLE `indentity_document_type` DISABLE KEYS */;
INSERT INTO `indentity_document_type` VALUES (1,'CMND',NULL),(2,'Bằng tốt nghiệp ',NULL),(3,'Bằng tiếng anh  ',NULL),(4,'Bằng tiếng nhật   ',NULL),(5,NULL,NULL),(6,'bằng lái xe ',NULL);
/*!40000 ALTER TABLE `indentity_document_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_contract`
--

DROP TABLE IF EXISTS `loan_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_contract` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Loan_Contract_Status_ID` int(11) NOT NULL,
  `Main_Loan_Contract_ID` int(11) NOT NULL,
  `Contract_Number` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Contract_Type_ID` int(11) DEFAULT NULL,
  `Lender_ID` int(11) DEFAULT NULL,
  `Borrower_ID` int(11) NOT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Contract_Date` datetime DEFAULT NULL,
  `Loan_Term_Method_Payment_ID` int(11) NOT NULL,
  `Loan_Rate` float DEFAULT NULL,
  `Loan_Fee` float DEFAULT NULL,
  `Loan_Rate_EarlyPay` float DEFAULT NULL,
  `Loan_Fee_EarlyPay` float DEFAULT NULL,
  `Payment_Due_Date` date DEFAULT NULL,
  `Request_Investment_Auto_ID` int(11) DEFAULT NULL,
  `Descriptions` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Contract_Type` (`Contract_Type_ID`),
  KEY `Main_Loan_Contract` (`Main_Loan_Contract_ID`),
  KEY `Lender` (`Lender_ID`),
  KEY `Borrower` (`Borrower_ID`),
  KEY `Loan_Term_Method_Payment` (`Loan_Term_Method_Payment_ID`),
  KEY `fk_LOAN_CONTRACT_Request_Investment_Auto1_idx` (`Request_Investment_Auto_ID`),
  CONSTRAINT `Borrower` FOREIGN KEY (`Borrower_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `Contract_Type` FOREIGN KEY (`Contract_Type_ID`) REFERENCES `loan_contract_type` (`ID`),
  CONSTRAINT `Lender` FOREIGN KEY (`Lender_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `Loan_Term_Method_Payment` FOREIGN KEY (`Loan_Term_Method_Payment_ID`) REFERENCES `loan_term_method_payment` (`ID`),
  CONSTRAINT `Main_Loan_Contract` FOREIGN KEY (`Main_Loan_Contract_ID`) REFERENCES `main_loan_contract` (`ID`),
  CONSTRAINT `fk_LOAN_CONTRACT_Request_Investment_Auto1` FOREIGN KEY (`Request_Investment_Auto_ID`) REFERENCES `request_investment_auto` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_contract`
--

LOCK TABLES `loan_contract` WRITE;
/*!40000 ALTER TABLE `loan_contract` DISABLE KEYS */;
INSERT INTO `loan_contract` VALUES (1,1,1,'VO_24052021_1_1',1,2,1,2000000,'2021-05-24 00:00:00',1,1.5,1200000,3,2000000,NULL,NULL,NULL),(2,1,10,'VO_24052021_1_1',1,1,38,2000000,'2021-05-24 00:00:00',1,1.5,1200000,3,NULL,NULL,NULL,NULL),(3,1,10,'VO_24052021_1_2',1,2,1,2000000,'2021-05-24 00:00:00',1,1.5,1200000,3,NULL,NULL,NULL,NULL),(4,1,10,'VO_24052021_1_3',1,1,38,2000000,'2021-05-24 00:00:00',1,1.5,1200000,1200000,NULL,NULL,NULL,NULL),(5,2,17,'M4U_20210607_1_1',1,38,1,2000000,'2021-05-24 00:00:00',1,1.5,1200000,NULL,NULL,NULL,NULL,NULL),(6,2,17,'M4U_20210607_1_2',1,38,1,3000000,'2021-05-24 00:00:00',1,1.5,200000,NULL,NULL,NULL,NULL,''),(7,1,18,'M4U_20210707_1_1',1,NULL,1,1000000,'2021-05-24 00:00:00',1,1.5,NULL,NULL,NULL,NULL,5,NULL),(8,1,18,'M4U_20210707_1_2',1,NULL,1,10000000,'2021-05-24 00:00:00',1,1.3,NULL,NULL,NULL,NULL,5,NULL),(9,1,18,'M4U_20210707_1_3',1,NULL,1,2000000,'2021-05-24 00:00:00',1,1.5,NULL,NULL,NULL,NULL,5,NULL),(10,1,18,'M4U_20210707_1_4',1,NULL,1,20000000,'2021-05-24 00:00:00',1,1.4,NULL,NULL,NULL,NULL,5,NULL),(11,1,18,'M4U_20210707_1_5',1,47,1,7000000,'2021-05-24 00:00:00',1,1.5,NULL,NULL,NULL,NULL,5,NULL),(12,1,16,'M4U_20210507_1_1',1,1,38,1500000,'2021-06-07 00:00:00',1,1.5,NULL,NULL,NULL,NULL,4,NULL),(13,1,15,'M4U_20210407_1_1',1,1,38,1000000,'2021-06-07 00:00:00',1,1.5,NULL,NULL,NULL,NULL,4,NULL),(14,1,15,'M4U_20210407_1_2',1,1,38,5000000,'2021-06-07 00:00:00',1,1.5,NULL,NULL,NULL,NULL,NULL,NULL),(15,1,10,'M4U_20210607_1_3',1,1,1,5000000,'2021-08-24 00:00:00',1,1.3,NULL,NULL,NULL,NULL,NULL,NULL),(16,1,10,'M4U_20210607_1_4',1,NULL,1,3000000,'2021-08-24 00:00:00',1,1.4,NULL,NULL,NULL,NULL,NULL,NULL),(17,1,19,'M4U_20210707_2_1',1,NULL,1,1000000,'2021-07-07 00:00:00',1,1.3,500000,NULL,NULL,NULL,6,NULL),(18,1,19,'M4U_20210707_2_2',1,NULL,1,1000000,'2021-07-07 00:00:00',1,1.3,500000,NULL,NULL,NULL,6,NULL),(19,1,19,'M4U_20210707_2_3',1,NULL,1,1000000,'2021-07-07 00:00:00',1,1.3,500000,NULL,NULL,NULL,6,NULL),(20,1,19,'M4U_20210707_2_4',1,38,1,1000000,'2021-07-07 00:00:00',1,1.3,500000,NULL,NULL,NULL,6,NULL),(21,1,19,'M4U_20210707_2_5',1,38,1,1000000,'2021-07-07 00:00:00',1,1.3,500000,NULL,NULL,NULL,6,NULL),(22,1,20,'M4U_20210707_3_1',1,NULL,38,2000000,'2021-07-08 00:00:00',1,1.4,1000000,NULL,NULL,NULL,NULL,NULL),(23,1,20,'M4U_20210707_3_2',1,NULL,38,2000000,'2021-07-08 00:00:00',1,1.5,1000000,NULL,NULL,NULL,NULL,NULL),(24,1,20,'M4U_20210707_3_3',1,NULL,38,2000000,'2021-07-08 00:00:00',1,1.5,1000000,NULL,NULL,NULL,NULL,NULL),(25,1,20,'M4U_20210707_3_4',1,NULL,38,2000000,'2021-07-08 00:00:00',1,1.5,1000000,NULL,NULL,NULL,NULL,NULL),(26,1,20,'M4U_20210707_3_5',1,NULL,38,2000000,'2021-07-08 00:00:00',1,1.5,1000000,NULL,NULL,NULL,NULL,NULL),(27,1,24,'M4U_20210628_1_0',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(28,1,24,'M4U_20210628_1_1',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(29,1,24,'M4U_20210628_1_2',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(30,1,24,'M4U_20210628_1_3',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(31,1,24,'M4U_20210628_1_4',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(32,1,24,'M4U_20210628_1_5',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(33,1,24,'M4U_20210628_1_6',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(34,1,24,'M4U_20210628_1_7',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(35,1,24,'M4U_20210628_1_8',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(36,1,24,'M4U_20210628_1_9',1,NULL,1,1000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(37,1,24,'M4U_20210628_1_0',1,NULL,1,2000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(38,1,24,'M4U_20210628_1_1',1,NULL,1,2000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(39,1,24,'M4U_20210628_1_2',1,NULL,1,2000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(40,1,24,'M4U_20210628_1_3',1,NULL,1,2000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(41,1,24,'M4U_20210628_1_4',1,NULL,1,2000000,'2021-06-28 22:50:32',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(42,1,24,'M4U_20210628_1_0',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(43,1,24,'M4U_20210628_1_1',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(44,1,24,'M4U_20210628_1_2',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(45,1,24,'M4U_20210628_1_3',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(46,1,24,'M4U_20210628_1_4',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(47,1,24,'M4U_20210628_1_5',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(48,1,24,'M4U_20210628_1_6',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(49,1,24,'M4U_20210628_1_7',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(50,1,24,'M4U_20210628_1_8',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(51,1,24,'M4U_20210628_1_9',1,NULL,1,1000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(52,1,24,'M4U_20210628_1_0',1,NULL,1,2000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(53,1,24,'M4U_20210628_1_1',1,NULL,1,2000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(54,1,24,'M4U_20210628_1_2',1,NULL,1,2000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(55,1,24,'M4U_20210628_1_3',1,NULL,1,2000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC'),(56,1,24,'M4U_20210628_1_4',1,NULL,1,2000000,'2021-06-28 23:16:20',1,1.5,1200000,NULL,NULL,NULL,NULL,'Khoản vay được tách từ khoản vay M4U_20210707_4_TC');
/*!40000 ALTER TABLE `loan_contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_contract_status`
--

DROP TABLE IF EXISTS `loan_contract_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_contract_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_contract_status`
--

LOCK TABLES `loan_contract_status` WRITE;
/*!40000 ALTER TABLE `loan_contract_status` DISABLE KEYS */;
INSERT INTO `loan_contract_status` VALUES (1,'Đang chờ giải ngân',NULL),(2,'Đã giải ngân',NULL),(3,'Đã tất toán',NULL),(4,'Đã hủy',NULL);
/*!40000 ALTER TABLE `loan_contract_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_contract_status_change`
--

DROP TABLE IF EXISTS `loan_contract_status_change`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_contract_status_change` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Loan_Contract_ID` int(11) DEFAULT NULL,
  `Loan_Contract_Status_ID` int(11) NOT NULL,
  `Status_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `loanContract_idx` (`Loan_Contract_ID`),
  KEY `fk_LOAN_CONTRACT_STATUS_CHANGE_LOAN_CONTRACT_STATUS1_idx` (`Loan_Contract_Status_ID`),
  CONSTRAINT `fk_LOAN_CONTRACT_STATUS_CHANGE_LOAN_CONTRACT_STATUS1` FOREIGN KEY (`Loan_Contract_Status_ID`) REFERENCES `loan_contract_status` (`ID`),
  CONSTRAINT `loanContract` FOREIGN KEY (`Loan_Contract_ID`) REFERENCES `loan_contract` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_contract_status_change`
--

LOCK TABLES `loan_contract_status_change` WRITE;
/*!40000 ALTER TABLE `loan_contract_status_change` DISABLE KEYS */;
INSERT INTO `loan_contract_status_change` VALUES (1,3,2,'2021-06-22 14:12:39',NULL),(2,4,2,'2021-06-22 14:15:23',NULL),(3,1,2,'2021-06-22 14:16:19',NULL),(4,6,2,'2021-06-23 10:16:28',NULL),(5,7,2,'2021-06-23 10:22:21',NULL),(6,13,2,'2021-06-23 10:22:50',NULL),(7,12,1,'2021-06-23 10:24:35',NULL),(8,10,1,'2021-06-23 10:24:35',NULL),(9,9,1,'2021-06-23 15:20:33',NULL),(10,13,1,'2021-06-23 20:56:12',NULL),(11,12,1,'2021-06-23 20:56:12',NULL),(12,13,1,'2021-06-24 18:35:19',NULL),(13,12,1,'2021-06-24 18:35:19',NULL),(14,11,1,'2021-06-25 01:46:32',NULL),(15,27,1,'2021-06-28 22:50:32',NULL),(16,28,1,'2021-06-28 22:50:32',NULL),(17,29,1,'2021-06-28 22:50:32',NULL),(18,30,1,'2021-06-28 22:50:32',NULL),(19,31,1,'2021-06-28 22:50:32',NULL),(20,32,1,'2021-06-28 22:50:32',NULL),(21,33,1,'2021-06-28 22:50:32',NULL),(22,34,1,'2021-06-28 22:50:32',NULL),(23,35,1,'2021-06-28 22:50:32',NULL),(24,36,1,'2021-06-28 22:50:32',NULL),(25,37,1,'2021-06-28 22:50:32',NULL),(26,38,1,'2021-06-28 22:50:32',NULL),(27,39,1,'2021-06-28 22:50:32',NULL),(28,40,1,'2021-06-28 22:50:32',NULL),(29,41,1,'2021-06-28 22:50:32',NULL),(30,42,1,'2021-06-28 23:16:20',NULL),(31,43,1,'2021-06-28 23:16:20',NULL),(32,44,1,'2021-06-28 23:16:20',NULL),(33,45,1,'2021-06-28 23:16:20',NULL),(34,46,1,'2021-06-28 23:16:20',NULL),(35,47,1,'2021-06-28 23:16:20',NULL),(36,48,1,'2021-06-28 23:16:20',NULL),(37,49,1,'2021-06-28 23:16:20',NULL),(38,50,1,'2021-06-28 23:16:20',NULL),(39,51,1,'2021-06-28 23:16:20',NULL),(40,52,1,'2021-06-28 23:16:20',NULL),(41,53,1,'2021-06-28 23:16:20',NULL),(42,54,1,'2021-06-28 23:16:20',NULL),(43,55,1,'2021-06-28 23:16:20',NULL),(44,56,1,'2021-06-28 23:16:20',NULL),(45,15,1,'2021-06-29 22:15:27',NULL),(46,5,2,'2021-06-30 08:17:20',NULL),(47,6,2,'2021-06-30 08:17:20',NULL),(48,5,2,'2021-06-30 08:19:56',NULL),(49,6,2,'2021-06-30 08:19:56',NULL),(50,5,2,'2021-06-30 08:21:44',NULL),(51,6,2,'2021-06-30 08:21:44',NULL),(52,27,4,'2021-06-30 08:45:00',NULL),(53,28,4,'2021-06-30 08:45:01',NULL),(54,29,4,'2021-06-30 08:45:01',NULL),(55,30,4,'2021-06-30 08:45:01',NULL),(56,31,4,'2021-06-30 08:45:01',NULL),(57,32,4,'2021-06-30 08:45:01',NULL),(58,33,4,'2021-06-30 08:45:01',NULL),(59,34,4,'2021-06-30 08:45:01',NULL),(60,35,4,'2021-06-30 08:45:01',NULL),(61,36,4,'2021-06-30 08:45:01',NULL),(62,37,4,'2021-06-30 08:45:01',NULL),(63,38,4,'2021-06-30 08:45:01',NULL),(64,39,4,'2021-06-30 08:45:01',NULL),(65,40,4,'2021-06-30 08:45:01',NULL),(66,41,4,'2021-06-30 08:45:01',NULL),(67,42,4,'2021-06-30 08:45:01',NULL),(68,43,4,'2021-06-30 08:45:01',NULL),(69,44,4,'2021-06-30 08:45:01',NULL),(70,45,4,'2021-06-30 08:45:01',NULL),(71,46,4,'2021-06-30 08:45:01',NULL),(72,47,4,'2021-06-30 08:45:01',NULL),(73,48,4,'2021-06-30 08:45:01',NULL),(74,49,4,'2021-06-30 08:45:01',NULL),(75,50,4,'2021-06-30 08:45:01',NULL),(76,51,4,'2021-06-30 08:45:01',NULL),(77,52,4,'2021-06-30 08:45:01',NULL),(78,53,4,'2021-06-30 08:45:01',NULL),(79,54,4,'2021-06-30 08:45:01',NULL),(80,55,4,'2021-06-30 08:45:01',NULL),(81,56,4,'2021-06-30 08:45:01',NULL);
/*!40000 ALTER TABLE `loan_contract_status_change` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_contract_type`
--

DROP TABLE IF EXISTS `loan_contract_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_contract_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_contract_type`
--

LOCK TABLES `loan_contract_type` WRITE;
/*!40000 ALTER TABLE `loan_contract_type` DISABLE KEYS */;
INSERT INTO `loan_contract_type` VALUES (1,'Vay tín chấp',NULL),(2,'Vay thế chấp',NULL);
/*!40000 ALTER TABLE `loan_contract_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_fee`
--

DROP TABLE IF EXISTS `loan_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_fee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Fee` float DEFAULT NULL,
  `BeginDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_fee`
--

LOCK TABLES `loan_fee` WRITE;
/*!40000 ALTER TABLE `loan_fee` DISABLE KEYS */;
INSERT INTO `loan_fee` VALUES (1,1200000,'2021-01-01 00:00:00','2021-04-01 00:00:00',NULL),(2,1500000,'2021-04-01 00:00:00',NULL,NULL),(3,1600000,'2021-02-04 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `loan_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_objective`
--

DROP TABLE IF EXISTS `loan_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_objective` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Loan_Objective_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_objective`
--

LOCK TABLES `loan_objective` WRITE;
/*!40000 ALTER TABLE `loan_objective` DISABLE KEYS */;
INSERT INTO `loan_objective` VALUES (1,'Vay mua nhà',NULL),(2,'Vay mua xe',NULL);
/*!40000 ALTER TABLE `loan_objective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_rate`
--

DROP TABLE IF EXISTS `loan_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_rate` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Rate` float DEFAULT NULL,
  `BeginDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_rate`
--

LOCK TABLES `loan_rate` WRITE;
/*!40000 ALTER TABLE `loan_rate` DISABLE KEYS */;
INSERT INTO `loan_rate` VALUES (1,1.5,'2021-01-01 00:00:00','2021-04-01 00:00:00',NULL),(2,1.4,'2021-04-01 00:00:00',NULL,NULL),(3,1.3,'2021-01-01 00:00:00','2021-06-01 00:00:00',NULL);
/*!40000 ALTER TABLE `loan_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_rate_fee_monitoring`
--

DROP TABLE IF EXISTS `loan_rate_fee_monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_rate_fee_monitoring` (
  `ID` int(11) NOT NULL,
  `Name` float DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Total` int(11) DEFAULT NULL,
  `LOAN_CONTRACT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_LOAN_RATE_FEE_MONITORING_LOAN_CONTRACT1_idx` (`LOAN_CONTRACT_ID`),
  CONSTRAINT `fk_LOAN_RATE_FEE_MONITORING_LOAN_CONTRACT1` FOREIGN KEY (`LOAN_CONTRACT_ID`) REFERENCES `loan_contract` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_rate_fee_monitoring`
--

LOCK TABLES `loan_rate_fee_monitoring` WRITE;
/*!40000 ALTER TABLE `loan_rate_fee_monitoring` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_rate_fee_monitoring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_term`
--

DROP TABLE IF EXISTS `loan_term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_term` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Term_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_term`
--

LOCK TABLES `loan_term` WRITE;
/*!40000 ALTER TABLE `loan_term` DISABLE KEYS */;
INSERT INTO `loan_term` VALUES (1,'Vay 30 ngày',NULL),(2,'Vay 60 ngày',NULL),(3,'Vay 90 ngày',NULL);
/*!40000 ALTER TABLE `loan_term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_term_method_payment`
--

DROP TABLE IF EXISTS `loan_term_method_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_term_method_payment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Method_Payment_ID` int(11) NOT NULL,
  `Loan_Term_ID` int(11) NOT NULL,
  `Loan_Rate_ID` int(11) NOT NULL,
  `Loan_Fee_ID` int(11) NOT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Method_Payment` (`Method_Payment_ID`),
  KEY `Loan_Term` (`Loan_Term_ID`),
  KEY `Loan_Rate` (`Loan_Rate_ID`),
  KEY `Loan_Fee` (`Loan_Fee_ID`),
  CONSTRAINT `Loan_Fee` FOREIGN KEY (`Loan_Fee_ID`) REFERENCES `loan_fee` (`ID`),
  CONSTRAINT `Loan_Rate` FOREIGN KEY (`Loan_Rate_ID`) REFERENCES `loan_rate` (`ID`),
  CONSTRAINT `Loan_Term` FOREIGN KEY (`Loan_Term_ID`) REFERENCES `loan_term` (`ID`),
  CONSTRAINT `Method_Payment` FOREIGN KEY (`Method_Payment_ID`) REFERENCES `method_payment` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_term_method_payment`
--

LOCK TABLES `loan_term_method_payment` WRITE;
/*!40000 ALTER TABLE `loan_term_method_payment` DISABLE KEYS */;
INSERT INTO `loan_term_method_payment` VALUES (1,1,1,1,1,NULL),(2,1,2,3,3,NULL),(3,2,1,1,2,NULL);
/*!40000 ALTER TABLE `loan_term_method_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_loan_contract`
--

DROP TABLE IF EXISTS `main_loan_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_loan_contract` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Main_Loan_Status_ID` int(11) NOT NULL,
  `Contract_Number` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Borrower_ID` int(11) NOT NULL,
  `Contract_Date` datetime DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Loan_Term_ID` int(11) NOT NULL,
  `Loan_Objective_ID` int(11) NOT NULL,
  `Method_Payment_ID` int(11) DEFAULT NULL,
  `Deadline_Disbursement_Date` datetime DEFAULT NULL,
  `Disbursement_Date` datetime DEFAULT NULL,
  `Descriptions` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `Payment_Due_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Loan_Terms` (`Loan_Term_ID`),
  KEY `Loan_Objective` (`Loan_Objective_ID`),
  KEY `Customer` (`Borrower_ID`),
  KEY `f_method_payment_idx` (`Method_Payment_ID`),
  CONSTRAINT `Customer` FOREIGN KEY (`Borrower_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `Loan_Objective` FOREIGN KEY (`Loan_Objective_ID`) REFERENCES `loan_objective` (`ID`),
  CONSTRAINT `Loan_Terms` FOREIGN KEY (`Loan_Term_ID`) REFERENCES `loan_term` (`ID`),
  CONSTRAINT `f_method_payment` FOREIGN KEY (`Method_Payment_ID`) REFERENCES `method_payment` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_loan_contract`
--

LOCK TABLES `main_loan_contract` WRITE;
/*!40000 ALTER TABLE `main_loan_contract` DISABLE KEYS */;
INSERT INTO `main_loan_contract` VALUES (1,1,'M4U_20210609_1_TC',1,'2021-06-09 00:00:00',300,3,1,NULL,NULL,NULL,'cần vào ngày mai',NULL),(3,1,'M4U_20210605_1_TC',1,'2021-05-06 00:00:00',2000000,1,1,NULL,NULL,NULL,'cần gấp',NULL),(7,1,'M4U_20210607_1_TC',1,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(8,1,'M4U_20210607_1_TC',1,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(9,1,'M4U_20210617_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(10,1,'M4U_20200607_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(11,1,'M4U_20210109_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(12,1,'M4U_20210909_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(13,1,'M4U_20210607_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'cần gấp',NULL),(14,1,'M4U_20210607_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,NULL,NULL,'',NULL),(15,1,'M4U_20210407_1_TC',38,'2021-06-07 00:00:00',6000000,2,2,NULL,'2021-09-10 00:00:00',NULL,'',NULL),(16,1,'M4U_20210507_1_TC',38,'2021-06-07 00:00:00',3000000,2,1,NULL,'2021-12-10 00:00:00',NULL,'',NULL),(17,1,'M4U_20210607_1_TC',1,'2021-06-07 00:00:00',5000000,1,2,1,'2021-08-10 00:00:00',NULL,NULL,NULL),(18,1,'M4U_20210707_1_TC',1,'2021-07-07 00:00:00',40000000,3,1,NULL,'2021-08-05 00:00:00',NULL,NULL,NULL),(19,1,'M4U_20210707_2_TC',1,'2021-07-07 00:00:00',50000000,1,1,NULL,'2021-08-05 00:00:00',NULL,NULL,NULL),(20,1,'M4U_20210707_3_TC',38,'2021-07-08 00:00:00',100000000,2,2,NULL,'2021-08-06 00:00:00',NULL,NULL,NULL),(21,1,'Contract_Number',1,'2021-06-28 01:23:55',2000000,1,1,2,'2021-06-27 07:00:00',NULL,'',NULL),(22,1,'Contract_Number',1,'2021-06-28 11:29:42',2000000,1,1,2,'2021-06-28 07:00:00',NULL,'',NULL),(23,1,'Contract_Number',1,'2021-06-28 11:31:53',5000000,1,1,2,'2021-06-28 07:00:00',NULL,'',NULL),(24,1,'M4U_20210707_4_TC',1,'2021-06-28 20:46:53',20000000,1,1,1,'2021-06-30 20:46:53',NULL,NULL,NULL),(25,1,'Contract_Number',1,'2021-06-28 21:54:36',200000,1,1,2,'2021-06-28 07:00:00',NULL,'',NULL),(26,1,'Contract_Number',1,'2021-06-29 22:06:12',1999999,1,1,1,'2021-06-29 07:00:00',NULL,'Test 1',NULL),(27,1,'Contract_Number',1,'2021-06-29 22:07:12',2999999,3,1,4,'2021-06-29 07:00:00',NULL,'Test 2',NULL),(28,1,'Contract_Number',1,'2021-06-29 22:07:50',3999999,1,1,4,'2021-06-29 07:00:00',NULL,'Test 3',NULL);
/*!40000 ALTER TABLE `main_loan_contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_loan_contract_status`
--

DROP TABLE IF EXISTS `main_loan_contract_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_loan_contract_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_loan_contract_status`
--

LOCK TABLES `main_loan_contract_status` WRITE;
/*!40000 ALTER TABLE `main_loan_contract_status` DISABLE KEYS */;
INSERT INTO `main_loan_contract_status` VALUES (1,'Đang chờ giải ngân',NULL),(2,'Đang giải ngân',NULL),(3,'Đã giải ngân',NULL),(4,'Đã tất toán',NULL),(5,'Hủy',NULL);
/*!40000 ALTER TABLE `main_loan_contract_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_loan_contract_status_change`
--

DROP TABLE IF EXISTS `main_loan_contract_status_change`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_loan_contract_status_change` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Main_Loan_Contract_Status_ID` int(11) DEFAULT NULL,
  `Main_Contract_ID` int(11) NOT NULL,
  `Status_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `main_loan_idx` (`Main_Contract_ID`),
  KEY `main_status_idx` (`Main_Loan_Contract_Status_ID`),
  CONSTRAINT `main_loan` FOREIGN KEY (`Main_Contract_ID`) REFERENCES `main_loan_contract` (`ID`),
  CONSTRAINT `main_status` FOREIGN KEY (`Main_Loan_Contract_Status_ID`) REFERENCES `main_loan_contract_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_loan_contract_status_change`
--

LOCK TABLES `main_loan_contract_status_change` WRITE;
/*!40000 ALTER TABLE `main_loan_contract_status_change` DISABLE KEYS */;
INSERT INTO `main_loan_contract_status_change` VALUES (1,1,21,'2021-06-28 01:23:55',NULL),(2,1,22,'2021-06-28 11:29:42',NULL),(3,1,23,'2021-06-28 11:31:53',NULL),(4,1,25,'2021-06-28 21:54:36',NULL),(5,1,26,'2021-06-29 22:06:12',NULL),(6,1,27,'2021-06-29 22:07:12',NULL),(7,1,28,'2021-06-29 22:07:50',NULL),(8,3,17,'2021-06-30 08:17:20',NULL),(9,3,17,'2021-06-30 08:19:56',NULL),(10,3,17,'2021-06-30 08:21:44',NULL),(11,5,24,'2021-06-30 08:22:45',NULL),(12,5,24,'2021-06-30 08:27:25',NULL),(13,5,24,'2021-06-30 08:45:00',NULL);
/*!40000 ALTER TABLE `main_loan_contract_status_change` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `method_payment`
--

DROP TABLE IF EXISTS `method_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `method_payment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Payment_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `method_payment`
--

LOCK TABLES `method_payment` WRITE;
/*!40000 ALTER TABLE `method_payment` DISABLE KEYS */;
INSERT INTO `method_payment` VALUES (1,'Trả lãi đầu kỳ','Ví dụ vay 10 triệu, chịu lãi 1 triệu, khi đó người dùng sẽ nhận về 9 triệu, 1 triệu trả lãi luôn, cuối kỳ thanh toán 9 triệu'),(2,'Trả lãi cuối kỳ','Ví dụ vay 10 triệu, chịu lãi 1 triệu, khi đó người dùng sẽ nhận về đủ 10 triệu, cuối kỳ thanh toán 11 triệu cả gốc và lãi'),(3,'Trả lãi hàng tháng','Ví dụ vay 10 triệu, chịu lãi 1 triệu, hàng tháng trả lãi, cuối kỳ thanh toán gốc'),(4,'Trả góp','Ví dụ vay 10 triệu, hàng tháng trả lãi và 1 phần gốc, cho tới khi hết thời gian vay');
/*!40000 ALTER TABLE `method_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoring`
--

DROP TABLE IF EXISTS `monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoring` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TableName` varchar(20) DEFAULT NULL,
  `ContentOfChange` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `DateOfChange` datetime DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Descriptions` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Users_Monitoring` (`UserID`),
  CONSTRAINT `Users_Monitoring` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoring`
--

LOCK TABLES `monitoring` WRITE;
/*!40000 ALTER TABLE `monitoring` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitoring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Notification_Type_ID` int(11) DEFAULT NULL,
  `To_User_ID` int(11) DEFAULT NULL,
  `Notification_Date` datetime DEFAULT NULL,
  `Notification_Status_ID` int(11) DEFAULT NULL,
  `Notification_Content` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Notification_Type` (`Notification_Type_ID`),
  KEY `Notification_Status` (`Notification_Status_ID`),
  CONSTRAINT `Notification_Status` FOREIGN KEY (`Notification_Status_ID`) REFERENCES `notification_status` (`ID`),
  CONSTRAINT `Notification_Type` FOREIGN KEY (`Notification_Type_ID`) REFERENCES `notification_type` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_status`
--

DROP TABLE IF EXISTS `notification_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nofification_Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_status`
--

LOCK TABLES `notification_status` WRITE;
/*!40000 ALTER TABLE `notification_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_type`
--

DROP TABLE IF EXISTS `notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Notification_Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_type`
--

LOCK TABLES `notification_type` WRITE;
/*!40000 ALTER TABLE `notification_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otp` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Otp_Type_ID` int(11) DEFAULT NULL,
  `Otp_Code` varchar(6) DEFAULT NULL,
  `Otp_Date` datetime DEFAULT NULL,
  `From_Tel` varchar(15) DEFAULT NULL,
  `To_Tel` varchar(15) DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `Time_Limit` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Otp_Type` (`Otp_Type_ID`),
  CONSTRAINT `Otp_Type` FOREIGN KEY (`Otp_Type_ID`) REFERENCES `otp_type` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (11,NULL,'1483','2021-06-16 01:59:48',NULL,'0359759901',NULL,0,'2021-06-16 02:14:48'),(12,NULL,'2321','2021-06-16 02:16:19',NULL,'0359759901',NULL,0,'2021-06-16 02:21:19'),(13,NULL,'1902','2021-06-16 02:20:13',NULL,'0359759901',NULL,0,'2021-06-16 02:25:13'),(14,NULL,'4196','2021-06-16 02:20:44',NULL,'0359759901',NULL,0,'2021-06-16 02:25:44'),(15,NULL,'1027','2021-06-16 02:22:56',NULL,'0359759901',NULL,0,'2021-06-16 02:27:56'),(16,NULL,'6374','2021-06-16 02:29:58',NULL,'0359759901',NULL,0,'2021-06-16 02:34:58'),(17,NULL,'8085','2021-06-16 02:31:06',NULL,'0359759901',NULL,0,'2021-06-16 02:36:06'),(18,NULL,'123','2021-06-16 09:31:06',NULL,NULL,NULL,NULL,NULL),(19,NULL,'3588','2021-06-16 02:42:54',NULL,'0976367373',NULL,0,'2021-06-16 02:47:54'),(20,NULL,'8117','2021-06-16 02:44:24',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(21,NULL,'5239','2021-06-16 02:52:11',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(22,NULL,'5923','2021-06-16 02:55:08',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(23,NULL,'9682','2021-06-16 03:11:02',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(24,NULL,'3743','2021-06-16 03:11:09',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(25,NULL,'9060','2021-06-16 03:13:12',NULL,'0976367373',NULL,0,'2021-06-16 02:31:06'),(26,NULL,'3958','2021-06-16 10:29:41',NULL,'0976367373',NULL,0,'2021-06-16 09:31:06'),(27,NULL,'7384','2021-06-16 10:33:16',NULL,'0976367373',NULL,0,'2021-06-16 10:38:16'),(28,NULL,'2708','2021-06-16 11:46:19',NULL,'0906275026',NULL,0,'2021-06-16 11:51:19'),(29,NULL,'5234','2021-06-16 11:51:19',NULL,'0906275026',NULL,0,'2021-06-16 11:56:19'),(30,NULL,'2392','2021-06-16 11:59:33',NULL,'0906275026',NULL,0,'2021-06-16 12:04:33'),(31,NULL,'5486','2021-06-16 12:04:02',NULL,'0906275026',NULL,0,'2021-06-16 12:09:02'),(32,NULL,'7265','2021-06-16 12:05:03',NULL,'0906275026',NULL,0,'2021-06-16 12:10:03'),(33,NULL,'5164','2021-06-16 12:05:52',NULL,'0906275026',NULL,0,'2021-06-16 12:10:52'),(34,NULL,'4392','2021-06-16 12:06:14',NULL,'0906275026',NULL,0,'2021-06-16 12:11:14'),(35,NULL,'3650','2021-06-16 12:12:40',NULL,NULL,NULL,0,'2021-06-16 12:17:40'),(36,NULL,'7848','2021-06-16 12:18:54',NULL,NULL,NULL,0,'2021-06-16 12:23:54'),(37,NULL,'6576','2021-06-16 12:20:51',NULL,NULL,NULL,0,'2021-06-16 12:25:51'),(38,NULL,'2536','2021-06-16 12:21:42',NULL,NULL,NULL,0,'2021-06-16 12:26:42'),(39,NULL,'3156','2021-06-16 12:21:59',NULL,NULL,NULL,0,'2021-06-16 12:26:59'),(40,NULL,'5041','2021-06-16 12:22:10',NULL,NULL,NULL,0,'2021-06-16 12:27:10'),(41,NULL,'6224','2021-06-16 12:30:47',NULL,NULL,NULL,0,'2021-06-16 12:35:47'),(42,NULL,'2748','2021-06-16 12:31:32',NULL,'0906275026',NULL,0,'2021-06-16 12:36:32'),(43,NULL,'5972','2021-06-16 12:31:50',NULL,'0906275026',NULL,0,'2021-06-16 12:36:50'),(44,NULL,'6546','2021-06-16 12:34:15',NULL,'0906275026',NULL,0,'2021-06-16 12:39:15'),(45,NULL,'4292','2021-06-16 12:35:24',NULL,'0906275026',NULL,0,'2021-06-16 12:40:24'),(46,NULL,'6653','2021-06-16 12:40:54',NULL,'0906275026',NULL,0,'2021-06-16 12:45:54'),(47,NULL,'6774','2021-06-16 15:20:30',NULL,'0906275026',NULL,0,'2021-06-16 15:25:30'),(48,NULL,'3676','2021-06-16 15:39:19',NULL,'0906275026',NULL,0,'2021-06-16 15:44:19'),(49,NULL,'7780','2021-06-16 15:49:14',NULL,'0906275026',NULL,0,'2021-06-16 15:54:14'),(50,NULL,'9355','2021-06-16 16:05:09',NULL,'0906275026',NULL,2,'2021-06-16 16:10:09'),(51,NULL,'6262','2021-06-16 16:13:17',NULL,'0906275026',NULL,6,'2021-06-16 16:18:17'),(52,NULL,'1255','2021-06-16 16:19:28',NULL,'0906275026',NULL,1,'2021-06-16 16:24:28'),(53,NULL,'7984','2021-06-16 16:49:14',NULL,'0906275026',NULL,1,'2021-06-16 16:54:14'),(54,NULL,'8907','2021-06-16 17:29:59',NULL,'0386600977',NULL,0,'2021-06-16 17:34:59'),(55,NULL,'6873','2021-06-16 17:31:51',NULL,'0929687217',NULL,4,'2021-06-16 17:36:51'),(56,NULL,'9737','2021-06-16 17:33:16',NULL,'0929687217',NULL,4,'2021-06-16 17:38:16'),(57,NULL,'9530','2021-06-16 17:34:33',NULL,'0929687217',NULL,4,'2021-06-16 17:39:33'),(58,NULL,'6228','2021-06-16 17:35:40',NULL,'0929687217',NULL,4,'2021-06-16 17:40:40'),(59,NULL,'2291','2021-06-16 18:08:36',NULL,'0906275026',NULL,0,'2021-06-16 18:13:36'),(60,NULL,'8255','2021-06-16 18:10:42',NULL,'0929687217',NULL,0,'2021-06-16 18:15:42'),(61,NULL,'2039','2021-06-16 18:12:15',NULL,'0929687217',NULL,0,'2021-06-16 18:17:15'),(62,NULL,'9416','2021-06-16 18:18:46',NULL,'0906275026',NULL,2,'2021-06-16 18:23:46'),(63,NULL,'3000','2021-06-16 18:20:38',NULL,'0906275026',NULL,2,'2021-06-16 18:25:38'),(64,NULL,'9396','2021-06-16 18:41:27',NULL,'987654326',NULL,0,'2021-06-16 18:46:27'),(65,NULL,'3475','2021-06-16 19:05:06',NULL,'0823590344',NULL,1,'2021-06-16 19:10:06'),(66,NULL,'4362','2021-06-16 19:07:28',NULL,'0386600957',NULL,9,'2021-06-16 19:12:28'),(67,NULL,'1863','2021-06-16 19:08:37',NULL,'0386600957',NULL,9,'2021-06-16 19:13:37'),(68,NULL,'1590','2021-06-16 19:09:30',NULL,'0386600957',NULL,9,'2021-06-16 19:14:30'),(69,NULL,'1885','2021-06-16 19:16:13',NULL,'0386600957',NULL,2,'2021-06-16 19:21:13'),(70,NULL,'9080','2021-06-16 19:17:33',NULL,'0386600957',NULL,2,'2021-06-16 19:22:33'),(71,NULL,'9524','2021-06-16 20:11:10',NULL,'0906275026',NULL,2,'2021-06-16 20:16:10'),(72,NULL,'7250','2021-06-16 21:14:05',NULL,'0962393883',NULL,1,'2021-06-16 21:19:05'),(73,NULL,'9594','2021-06-16 21:19:39',NULL,'0823590344',NULL,1,'2021-06-16 21:24:39'),(74,NULL,'7611','2021-06-16 21:22:30',NULL,'0962393883',NULL,1,'2021-06-16 21:27:30'),(75,NULL,'3981','2021-06-16 21:27:32',NULL,'0962393883',NULL,2,'2021-06-16 21:32:32'),(76,NULL,'8142','2021-06-16 21:37:31',NULL,'0906275026',NULL,1,'2021-06-16 21:42:31'),(77,NULL,'8708','2021-06-16 22:10:06',NULL,'0906275026',NULL,1,'2021-06-16 22:15:06'),(78,NULL,'9401','2021-06-17 00:48:42',NULL,'0962393883',NULL,0,'2021-06-17 00:53:42'),(79,NULL,'5354','2021-06-17 00:49:57',NULL,'0962393883',NULL,0,'2021-06-17 00:54:57'),(80,NULL,'5735','2021-06-22 14:11:44',NULL,'0386600957',NULL,2,'2021-06-22 14:16:44'),(81,NULL,'9570','2021-06-22 14:14:32',NULL,'0823590344',NULL,1,'2021-06-22 14:19:32'),(82,NULL,'5014','2021-06-22 14:14:40',NULL,'0386600957',NULL,2,'2021-06-22 14:19:40'),(83,NULL,'6928','2021-06-22 15:30:16',NULL,'0962393883',NULL,1,'2021-06-22 15:35:16'),(84,NULL,'4048','2021-06-22 16:24:10',NULL,'0929687217',NULL,1,'2021-06-22 16:29:10'),(85,NULL,'3424','2021-06-23 08:25:03',NULL,'0929687217',NULL,1,'2021-06-23 08:30:03'),(86,NULL,'2118','2021-06-23 09:17:04',NULL,'0123456789',NULL,2,'2021-06-23 09:22:04'),(87,NULL,'8396','2021-06-23 09:21:14',NULL,'0386600977',NULL,2,'2021-06-23 09:26:14'),(88,NULL,'4298','2021-06-23 09:21:47',NULL,'0386600977',NULL,2,'2021-06-23 09:26:47'),(89,NULL,'4995','2021-06-23 09:24:35',NULL,'0906275026',NULL,1,'2021-06-23 09:29:35'),(90,NULL,'3615','2021-06-23 10:17:17',NULL,'0962393883',NULL,3,'2021-06-23 10:22:17'),(91,NULL,'4644','2021-06-23 10:18:40',NULL,'0962393883',NULL,3,'2021-06-23 10:23:40'),(92,NULL,'7370','2021-06-23 10:20:55',NULL,'0386600957',NULL,1,'2021-06-23 10:25:55'),(93,NULL,'2321','2021-06-23 10:59:07',NULL,'0962393883',NULL,1,'2021-06-23 11:04:07'),(94,NULL,'8506','2021-06-23 12:17:32',NULL,'0379132427',NULL,0,'2021-06-23 12:22:32'),(95,NULL,'4123','2021-06-23 13:38:16',NULL,'0962393883',NULL,1,'2021-06-23 13:43:16'),(96,NULL,'2078','2021-06-23 13:44:37',NULL,'0962393883',NULL,1,'2021-06-23 13:49:37'),(97,NULL,'6032','2021-06-23 14:10:33',NULL,'0962393883',NULL,2,'2021-06-23 14:15:33'),(98,NULL,'6471','2021-06-23 14:13:52',NULL,'0962393883',NULL,2,'2021-06-23 14:18:52'),(99,NULL,'8514','2021-06-23 17:06:27',NULL,'0929687217',NULL,0,'2021-06-23 17:11:27'),(100,NULL,'1936','2021-06-23 17:38:36',NULL,'0962393883',NULL,1,'2021-06-23 17:43:36'),(101,NULL,'1149','2021-06-23 19:33:04',NULL,'0929687217',NULL,0,'2021-06-23 19:38:04'),(102,NULL,'1424','2021-06-23 20:00:05',NULL,'0929687217',NULL,0,'2021-06-23 20:05:05'),(103,NULL,'9018','2021-06-23 20:12:51',NULL,'0929687217',NULL,0,'2021-06-23 20:17:51'),(104,NULL,'4681','2021-06-23 20:13:39',NULL,'0929687217',NULL,0,'2021-06-23 20:18:39'),(105,NULL,'5625','2021-06-23 20:47:21',NULL,'0962393883',NULL,1,'2021-06-23 20:52:21'),(106,NULL,'4071','2021-06-23 20:47:54',NULL,'0929687217',NULL,0,'2021-06-23 20:52:54'),(107,NULL,'1132','2021-06-23 20:51:39',NULL,'0929687217',NULL,0,'2021-06-23 20:56:39'),(108,NULL,'6712','2021-06-23 20:51:39',NULL,'0929687217',NULL,0,'2021-06-23 20:56:39'),(109,NULL,'3457','2021-06-23 20:52:20',NULL,'0929687217',NULL,0,'2021-06-23 20:57:20'),(110,NULL,'3487','2021-06-23 20:53:23',NULL,'0929687217',NULL,0,'2021-06-23 20:58:23'),(111,NULL,'3733','2021-06-23 20:54:14',NULL,'0929687217',NULL,0,'2021-06-23 20:59:14'),(112,NULL,'1095','2021-06-25 00:31:36',NULL,'0929687217',NULL,2,'2021-06-25 00:36:36'),(113,NULL,'6346','2021-06-25 00:32:24',NULL,'0929687217',NULL,2,'2021-06-25 00:37:24'),(114,NULL,'8587','2021-06-25 00:39:07',NULL,'0929687217',NULL,1,'2021-06-25 00:44:07'),(115,NULL,'1054','2021-06-25 08:11:01',NULL,'0929687217',NULL,0,'2021-06-25 08:16:01'),(116,NULL,'5872','2021-06-25 08:13:15',NULL,'0929687217',NULL,0,'2021-06-25 08:18:15'),(117,NULL,'9640','2021-06-25 08:14:19',NULL,'0929687217',NULL,0,'2021-06-25 08:19:19'),(118,NULL,'3161','2021-06-25 08:16:08',NULL,'0929687217',NULL,0,'2021-06-25 08:21:08'),(119,NULL,'5894','2021-06-25 08:17:07',NULL,'0929687217',NULL,0,'2021-06-25 08:22:07'),(120,NULL,'3177','2021-06-25 08:20:31',NULL,'0929687217',NULL,0,'2021-06-25 08:25:31'),(121,NULL,'5761','2021-06-25 08:22:01',NULL,'0929687217',NULL,0,'2021-06-25 08:27:01'),(122,NULL,'1545','2021-06-25 08:22:05',NULL,'0929687217',NULL,0,'2021-06-25 08:27:05'),(123,NULL,'3234','2021-06-25 08:22:06',NULL,'0929687217',NULL,0,'2021-06-25 08:27:06'),(124,NULL,'5004','2021-06-25 08:22:06',NULL,'0929687217',NULL,0,'2021-06-25 08:27:06'),(125,NULL,'5059','2021-06-25 08:22:07',NULL,'0929687217',NULL,0,'2021-06-25 08:27:07'),(126,NULL,'3948','2021-06-25 08:22:07',NULL,'0929687217',NULL,0,'2021-06-25 08:27:07'),(127,NULL,'4375','2021-06-25 08:22:08',NULL,'0929687217',NULL,0,'2021-06-25 08:27:08'),(128,NULL,'8402','2021-06-25 08:22:08',NULL,'0929687217',NULL,0,'2021-06-25 08:27:08'),(129,NULL,'5442','2021-06-25 08:22:08',NULL,'0929687217',NULL,0,'2021-06-25 08:27:08'),(130,NULL,'7898','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(131,NULL,'1348','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(132,NULL,'4826','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(133,NULL,'9460','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(134,NULL,'5339','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(135,NULL,'5044','2021-06-25 08:22:09',NULL,'0929687217',NULL,0,'2021-06-25 08:27:09'),(136,NULL,'4115','2021-06-25 09:28:27',NULL,'0962393883',NULL,1,'2021-06-25 09:33:27'),(137,NULL,'1450','2021-06-25 09:39:28',NULL,'0962393883',NULL,1,'2021-06-25 09:44:28'),(138,NULL,'8116','2021-06-25 10:13:44',NULL,'0929687217',NULL,5,'2021-06-25 10:18:44'),(139,NULL,'5089','2021-06-25 10:14:06',NULL,'0929687217',NULL,5,'2021-06-25 10:19:06'),(140,NULL,'6090','2021-06-25 10:14:54',NULL,'0929687217',NULL,8,'2021-06-25 10:19:54'),(141,NULL,'1371','2021-06-25 10:15:43',NULL,'0929687217',NULL,9,'2021-06-25 10:20:43'),(142,NULL,'2263','2021-06-25 10:19:12',NULL,'0929687217',NULL,15,'2021-06-25 10:24:12'),(143,NULL,'7673','2021-06-25 10:19:24',NULL,'0929687217',NULL,15,'2021-06-25 10:24:24'),(144,NULL,'7710','2021-06-25 10:19:40',NULL,'0929687217',NULL,15,'2021-06-25 10:24:40'),(145,NULL,'4282','2021-06-25 10:19:49',NULL,'0929687217',NULL,15,'2021-06-25 10:24:49'),(146,NULL,'7124','2021-06-25 10:20:26',NULL,'0929687217',NULL,15,'2021-06-25 10:25:26'),(147,NULL,'6075','2021-06-25 10:20:50',NULL,'0929687217',NULL,15,'2021-06-25 10:25:50'),(148,NULL,'1622','2021-06-25 10:20:55',NULL,'0929687217',NULL,15,'2021-06-25 10:25:55'),(149,NULL,'2413','2021-06-25 10:20:56',NULL,'0929687217',NULL,15,'2021-06-25 10:25:56'),(150,NULL,'3040','2021-06-25 10:20:59',NULL,'0929687217',NULL,15,'2021-06-25 10:25:59'),(151,NULL,'3963','2021-06-25 10:21:00',NULL,'0929687217',NULL,15,'2021-06-25 10:26:00'),(152,NULL,'2157','2021-06-25 10:22:11',NULL,'0929687217',NULL,15,'2021-06-25 10:27:11'),(153,NULL,'6571','2021-06-25 10:22:52',NULL,'0929687217',NULL,0,'2021-06-25 10:27:52'),(154,NULL,'5351','2021-06-25 10:36:56',NULL,'0962393883',NULL,1,'2021-06-25 10:41:56'),(155,NULL,'6025','2021-06-25 10:54:33',NULL,'0962393883',NULL,1,'2021-06-25 10:59:33'),(156,NULL,'8879','2021-06-25 11:12:57',NULL,'0962393883',NULL,1,'2021-06-25 11:17:57'),(157,NULL,'5743','2021-06-25 11:23:26',NULL,'0929687217',NULL,0,'2021-06-25 11:28:26'),(158,NULL,'5348','2021-06-25 11:43:55',NULL,'0929687217',NULL,0,'2021-06-25 11:48:55'),(159,NULL,'4076','2021-06-25 11:44:08',NULL,'0929687217',NULL,0,'2021-06-25 11:49:08'),(160,NULL,'2933','2021-06-25 11:44:22',NULL,'0929687217',NULL,0,'2021-06-25 11:49:22'),(161,NULL,'9967','2021-06-25 11:44:53',NULL,'0929687217',NULL,0,'2021-06-25 11:49:53'),(162,NULL,'1772','2021-06-25 11:50:49',NULL,'0929687217',NULL,3,'2021-06-25 11:55:49'),(163,NULL,'8040','2021-06-25 11:54:37',NULL,'0929687217',NULL,7,'2021-06-25 11:59:37'),(164,NULL,'9336','2021-06-25 11:56:01',NULL,'0929687217',NULL,8,'2021-06-25 12:01:01'),(165,NULL,'7848','2021-06-25 11:57:44',NULL,'0929687217',NULL,10,'2021-06-25 12:02:44'),(166,NULL,'1904','2021-06-25 11:59:20',NULL,'0929687217',NULL,10,'2021-06-25 12:04:20'),(167,NULL,'1229','2021-06-25 12:00:40',NULL,'0929687217',NULL,10,'2021-06-25 12:05:40'),(168,NULL,'5670','2021-06-25 12:01:22',NULL,'0929687217',NULL,10,'2021-06-25 12:06:22'),(169,NULL,'4001','2021-06-25 12:06:05',NULL,'0929687217',NULL,4,'2021-06-25 12:11:05'),(170,NULL,'2322','2021-06-25 12:07:27',NULL,'0929687217',NULL,4,'2021-06-25 12:12:27'),(171,NULL,'5106','2021-06-25 12:08:21',NULL,'0929687217',NULL,4,'2021-06-25 12:13:21'),(172,NULL,'9561','2021-06-25 12:09:39',NULL,'0929687217',NULL,4,'2021-06-25 12:14:39'),(173,NULL,'4439','2021-06-25 14:47:51',NULL,'0962393883',NULL,1,'2021-06-25 14:52:51'),(174,NULL,'8547','2021-06-25 15:34:56',NULL,'0962393883',NULL,0,'2021-06-25 15:39:56'),(175,NULL,'5111','2021-06-25 16:20:19',NULL,'0929687217',NULL,1,'2021-06-25 16:25:19'),(176,NULL,'1654','2021-06-25 16:53:17',NULL,'0962393883',NULL,0,'2021-06-25 16:58:17'),(177,NULL,'9845','2021-06-25 16:53:20',NULL,'0962393883',NULL,0,'2021-06-25 16:58:20'),(178,NULL,'2323','2021-06-25 16:54:01',NULL,'0929687217',NULL,0,'2021-06-25 16:59:01'),(179,NULL,'1234','2021-06-25 19:47:49',NULL,'0929687217',NULL,1,'2021-06-25 19:52:49'),(180,NULL,'3437','2021-06-25 20:40:19',NULL,'0929687217',NULL,1,'2021-06-25 20:45:19'),(181,NULL,'6974','2021-06-25 20:40:44',NULL,'0929687217',NULL,2,'2021-06-25 20:45:44'),(182,NULL,'4277','2021-06-25 20:41:18',NULL,'0929687217',NULL,2,'2021-06-25 20:46:18'),(183,NULL,'3900','2021-06-25 20:45:21',NULL,'0929687217',NULL,2,'2021-06-25 20:50:21'),(184,NULL,'1767','2021-06-25 21:16:46',NULL,'0386600977',NULL,1,'2021-06-25 21:21:46'),(185,NULL,'2503','2021-06-25 22:42:02',NULL,'0929687217',NULL,0,'2021-06-25 22:47:02'),(186,NULL,'4577','2021-06-25 23:08:26',NULL,'0962393883',NULL,1,'2021-06-25 23:13:26'),(187,NULL,'9576','2021-06-25 23:19:16',NULL,'0962393883',NULL,3,'2021-06-25 23:24:16'),(188,NULL,'6464','2021-06-25 23:20:18',NULL,'0929687217',NULL,1,'2021-06-25 23:25:18'),(189,NULL,'4713','2021-06-25 23:22:07',NULL,'0962393883',NULL,3,'2021-06-25 23:27:07'),(190,NULL,'7479','2021-06-25 23:23:18',NULL,'0962393883',NULL,3,'2021-06-25 23:28:18'),(191,NULL,'5960','2021-06-26 07:49:03',NULL,'0962393883',NULL,0,'2021-06-26 07:54:03'),(192,NULL,'3631','2021-06-26 10:03:02',NULL,'0929687217',NULL,2,'2021-06-26 10:08:02'),(193,NULL,'4259','2021-06-26 10:07:13',NULL,'0929687217',NULL,2,'2021-06-26 10:12:13'),(194,NULL,'8647','2021-06-26 10:23:19',NULL,'0929687217',NULL,2,'2021-06-26 10:28:19'),(195,NULL,'5572','2021-06-26 10:24:56',NULL,'0929687217',NULL,3,'2021-06-26 10:29:56'),(196,NULL,'4811','2021-06-26 10:28:42',NULL,'0929687217',NULL,3,'2021-06-26 10:33:42'),(197,NULL,'7212','2021-06-26 10:39:09',NULL,'0929687217',NULL,2,'2021-06-26 10:44:09'),(198,NULL,'4701','2021-06-26 10:40:13',NULL,'0929687217',NULL,2,'2021-06-26 10:45:13'),(199,NULL,'5387','2021-06-26 18:05:37',NULL,'0929687217',NULL,1,'2021-06-26 18:10:37'),(200,NULL,'1423','2021-06-26 18:06:44',NULL,'0929687217',NULL,2,'2021-06-26 18:11:44'),(201,NULL,'5112','2021-06-26 18:10:57',NULL,'0929687217',NULL,3,'2021-06-26 18:15:57'),(202,NULL,'5196','2021-06-26 18:12:12',NULL,'0929687217',NULL,3,'2021-06-26 18:17:12'),(203,NULL,'6654','2021-06-26 20:05:45',NULL,'0929687217',NULL,1,'2021-06-26 20:10:45'),(204,NULL,'5140','2021-06-26 20:20:16',NULL,'0962393883',NULL,1,'2021-06-26 20:25:16'),(205,NULL,'6700','2021-06-26 21:45:10',NULL,'0962393883',NULL,3,'2021-06-26 21:50:10'),(206,NULL,'1210','2021-06-26 21:48:30',NULL,'0962393883',NULL,6,'2021-06-26 21:53:30'),(207,NULL,'3189','2021-06-26 21:51:12',NULL,'0962393883',NULL,6,'2021-06-26 21:56:12'),(208,NULL,'7197','2021-06-26 21:52:03',NULL,'0962393883',NULL,6,'2021-06-26 21:57:03'),(209,NULL,'9729','2021-06-26 21:56:43',NULL,'0962393883',NULL,1,'2021-06-26 22:01:43'),(210,NULL,'6402','2021-06-26 22:10:51',NULL,'0962393883',NULL,1,'2021-06-26 22:15:51'),(211,NULL,'1111','2021-06-27 15:55:09',NULL,'0386600977',NULL,0,'2021-06-27 16:00:09'),(212,NULL,'1111','2021-06-27 15:59:09',NULL,'0386600977',NULL,0,'2021-06-27 16:04:09'),(213,NULL,'1111','2021-06-27 16:18:00',NULL,'0386600977',NULL,1,'2021-06-27 16:23:00'),(214,NULL,'1111','2021-06-27 16:26:57',NULL,'0962393883',NULL,2,'2021-06-27 16:31:57'),(215,NULL,'1111','2021-06-27 16:27:28',NULL,'0962393883',NULL,2,'2021-06-27 16:32:28'),(216,NULL,'1111','2021-06-27 17:12:32',NULL,'0962393883',NULL,1,'2021-06-27 17:17:32'),(217,NULL,'1111','2021-06-27 17:27:45',NULL,'0962393883',NULL,1,'2021-06-27 17:32:45'),(218,NULL,'1111','2021-06-27 17:33:23',NULL,'0962393883',NULL,1,'2021-06-27 17:38:23'),(219,NULL,'1111','2021-06-27 19:55:43',NULL,'0962393883',NULL,1,'2021-06-27 20:00:43'),(220,NULL,'1111','2021-06-27 20:57:22',NULL,'0962393883',NULL,2,'2021-06-27 21:02:22'),(221,NULL,'1111','2021-06-27 20:58:29',NULL,'0962393883',NULL,0,'2021-06-27 21:03:29'),(222,NULL,'1111','2021-06-27 21:00:23',NULL,'0962393883',NULL,0,'2021-06-27 21:05:23'),(223,NULL,'1111','2021-06-28 11:38:20',NULL,'0962393883',NULL,1,'2021-06-28 11:43:20'),(224,NULL,'1111','2021-06-28 14:13:43',NULL,'0862226869',NULL,0,'2021-06-28 14:18:43'),(225,NULL,'1111','2021-06-28 20:38:33',NULL,'0962393883',NULL,1,'2021-06-28 20:43:33'),(226,NULL,'1111','2021-06-28 20:46:36',NULL,'0962393883',NULL,1,'2021-06-28 20:51:36'),(227,NULL,'1111','2021-06-28 21:00:25',NULL,'0962393883',NULL,1,'2021-06-28 21:05:25'),(228,NULL,'1111','2021-06-28 21:51:07',NULL,'0962393883',NULL,1,'2021-06-28 21:56:07'),(229,NULL,'1111','2021-06-28 22:13:27',NULL,'0962393883',NULL,1,'2021-06-28 22:18:27'),(230,NULL,'1111','2021-06-28 22:42:34',NULL,'0962393883',NULL,1,'2021-06-28 22:47:34'),(231,NULL,'1111','2021-06-29 08:01:21',NULL,'0962393883',NULL,1,'2021-06-29 08:06:21'),(232,NULL,'1111','2021-06-29 08:58:29',NULL,'0906275026',NULL,0,'2021-06-29 09:03:29'),(233,NULL,'1111','2021-06-29 09:00:20',NULL,'0906275026',NULL,0,'2021-06-29 09:05:20'),(234,NULL,'1111','2021-06-29 09:11:57',NULL,'0962393883',NULL,3,'2021-06-29 09:16:57'),(235,NULL,'1111','2021-06-29 09:15:23',NULL,'0962393883',NULL,4,'2021-06-29 09:20:23'),(236,NULL,'1111','2021-06-29 09:17:41',NULL,'0962393883',NULL,0,'2021-06-29 09:22:41'),(237,NULL,'1111','2021-06-29 09:21:54',NULL,'0962393883',NULL,1,'2021-06-29 09:26:54'),(238,NULL,'1111','2021-06-29 09:27:04',NULL,'0962393883',NULL,1,'2021-06-29 09:32:04'),(239,NULL,'1111','2021-06-29 09:29:18',NULL,'0962393883',NULL,1,'2021-06-29 09:34:18'),(240,NULL,'1111','2021-06-29 09:55:48',NULL,'0962393883',NULL,1,'2021-06-29 10:00:48'),(241,NULL,'1111','2021-06-29 10:18:21',NULL,'0962393883',NULL,1,'2021-06-29 10:23:21'),(242,NULL,'1111','2021-06-29 14:04:43',NULL,'0962393883',NULL,1,'2021-06-29 14:09:43'),(243,NULL,'1111','2021-06-29 15:07:40',NULL,'0962393883',NULL,1,'2021-06-29 15:12:40'),(244,NULL,'1111','2021-06-29 16:30:35',NULL,'0962393883',NULL,1,'2021-06-29 16:35:35'),(245,NULL,'1111','2021-06-29 20:58:00',NULL,'0962393883',NULL,1,'2021-06-29 21:03:00'),(246,NULL,'1111','2021-06-29 21:12:10',NULL,'0962393883',NULL,1,'2021-06-29 21:17:10'),(247,NULL,'1111','2021-06-29 21:16:35',NULL,'0929687213',NULL,2,'2021-06-29 21:21:35'),(248,NULL,'1111','2021-06-29 21:17:05',NULL,'0975752559',NULL,1,'2021-06-29 21:22:05'),(249,NULL,'1111','2021-06-29 21:20:48',NULL,'0929687213',NULL,3,'2021-06-29 21:25:48'),(250,NULL,'1111','2021-06-29 21:22:14',NULL,'0929687213',NULL,3,'2021-06-29 21:27:14'),(251,NULL,'1111','2021-06-29 21:28:12',NULL,'0962393883',NULL,1,'2021-06-29 21:33:12'),(252,NULL,'1111','2021-06-29 21:43:52',NULL,'0962393883',NULL,1,'2021-06-29 21:48:52'),(253,NULL,'1111','2021-06-29 21:59:05',NULL,'0962393883',NULL,2,'2021-06-29 22:04:05'),(254,NULL,'1111','2021-06-29 22:00:19',NULL,'0962393883',NULL,2,'2021-06-29 22:05:19'),(255,NULL,'1111','2021-06-29 22:00:49',NULL,'0962393883',NULL,2,'2021-06-29 22:05:49'),(256,NULL,'1111','2021-06-29 22:01:18',NULL,'0962393883',NULL,2,'2021-06-29 22:06:18'),(257,NULL,'1111','2021-06-29 22:16:33',NULL,'0962393883',NULL,3,'2021-06-29 22:21:33'),(258,NULL,'1111','2021-06-29 22:16:39',NULL,'0962393883',NULL,3,'2021-06-29 22:21:39'),(259,NULL,'1111','2021-06-29 22:19:53',NULL,'0962393883',NULL,3,'2021-06-29 22:24:53'),(260,NULL,'1111','2021-06-29 22:20:02',NULL,'0962393883',NULL,3,'2021-06-29 22:25:02'),(261,NULL,'1111','2021-06-29 22:27:55',NULL,'0962393883',NULL,1,'2021-06-29 22:32:55'),(262,NULL,'1111','2021-06-29 22:32:28',NULL,'0906275026',NULL,11,'2021-06-29 22:37:28'),(263,NULL,'1111','2021-06-29 22:32:40',NULL,'0906275026',NULL,11,'2021-06-29 22:37:40'),(264,NULL,'1111','2021-06-29 22:33:18',NULL,'0906275026',NULL,11,'2021-06-29 22:38:18'),(265,NULL,'1111','2021-06-29 22:33:46',NULL,'0906275026',NULL,11,'2021-06-29 22:38:46'),(266,NULL,'1111','2021-06-29 22:35:33',NULL,'0906275026',NULL,11,'2021-06-29 22:40:33'),(267,NULL,'1111','2021-06-29 22:36:18',NULL,'0906275026',NULL,0,'2021-06-29 22:41:18'),(268,NULL,'1111','2021-06-29 22:40:37',NULL,'0906275026',NULL,0,'2021-06-29 22:45:37'),(269,NULL,'1111','2021-06-29 23:10:27',NULL,'0962393883',NULL,1,'2021-06-29 23:15:27'),(270,NULL,'1111','2021-06-29 23:25:58',NULL,'0906275026',NULL,0,'2021-06-29 23:30:58'),(271,NULL,'1111','2021-06-29 23:28:02',NULL,'0906275026',NULL,0,'2021-06-29 23:33:02'),(272,NULL,'1111','2021-06-29 23:31:25',NULL,'0906275026',NULL,1,'2021-06-29 23:36:25'),(273,NULL,'1111','2021-06-29 23:32:15',NULL,'0906275026',NULL,1,'2021-06-29 23:37:15'),(274,NULL,'1111','2021-06-29 23:33:24',NULL,'0962393883',NULL,0,'2021-06-29 23:38:24'),(275,NULL,'1111','2021-06-29 23:33:34',NULL,'0962393883',NULL,0,'2021-06-29 23:38:34'),(276,NULL,'1111','2021-06-29 23:36:50',NULL,'0962393883',NULL,0,'2021-06-29 23:41:50'),(277,NULL,'1111','2021-06-29 23:37:46',NULL,'0386600977',NULL,0,'2021-06-29 23:42:46'),(278,NULL,'1111','2021-06-29 23:38:53',NULL,'0386600977',NULL,0,'2021-06-29 23:43:53'),(279,NULL,'1111','2021-06-29 23:46:15',NULL,'0386600977',NULL,0,'2021-06-29 23:51:15'),(280,NULL,'1111','2021-06-29 23:47:40',NULL,'0386600977',NULL,0,'2021-06-29 23:52:40'),(281,NULL,'1111','2021-06-30 07:11:13',NULL,'0386600977',NULL,0,'2021-06-30 07:16:13'),(282,NULL,'1111','2021-06-30 07:24:28',NULL,'0386600977',NULL,0,'2021-06-30 07:29:28'),(283,NULL,'1111','2021-06-30 07:24:48',NULL,'0386600977',NULL,0,'2021-06-30 07:29:48'),(284,NULL,'1111','2021-06-30 07:25:03',NULL,'0386600977',NULL,0,'2021-06-30 07:30:03'),(285,NULL,'1111','2021-06-30 07:25:13',NULL,'0386600977',NULL,0,'2021-06-30 07:30:13'),(286,NULL,'1111','2021-06-30 07:27:52',NULL,'0386600977',NULL,0,'2021-06-30 07:32:52'),(287,NULL,'1111','2021-06-30 07:28:40',NULL,'0386600977',NULL,0,'2021-06-30 07:33:40'),(288,NULL,'1111','2021-06-30 07:29:03',NULL,'0386600977',NULL,0,'2021-06-30 07:34:03'),(289,NULL,'1111','2021-06-30 07:30:50',NULL,'0386600977',NULL,0,'2021-06-30 07:35:50'),(290,NULL,'1111','2021-06-30 07:30:55',NULL,'0386600977',NULL,0,'2021-06-30 07:35:55'),(291,NULL,'1111','2021-06-30 07:31:23',NULL,'0386600977',NULL,0,'2021-06-30 07:36:23'),(292,NULL,'1111','2021-06-30 07:31:43',NULL,'0386600977',NULL,0,'2021-06-30 07:36:43'),(293,NULL,'1111','2021-06-30 07:32:36',NULL,'0386600977',NULL,0,'2021-06-30 07:37:36'),(294,NULL,'1111','2021-06-30 07:34:06',NULL,'0386600977',NULL,0,'2021-06-30 07:39:06'),(295,NULL,'1111','2021-06-30 07:34:29',NULL,'0386600977',NULL,0,'2021-06-30 07:39:29'),(296,NULL,'1111','2021-06-30 07:35:44',NULL,'0386600977',NULL,0,'2021-06-30 07:40:44'),(297,NULL,'1111','2021-06-30 07:38:13',NULL,'0386600977',NULL,0,'2021-06-30 07:43:13'),(298,NULL,'1111','2021-06-30 07:41:28',NULL,'0386600977',NULL,0,'2021-06-30 07:46:28'),(299,NULL,'1111','2021-06-30 07:41:47',NULL,'0386600977',NULL,0,'2021-06-30 07:46:47'),(300,NULL,'1111','2021-06-30 07:47:03',NULL,'0906275026',NULL,0,'2021-06-30 07:52:03'),(301,NULL,'1111','2021-06-30 07:47:32',NULL,'0906275026',NULL,0,'2021-06-30 07:52:32'),(302,NULL,'1111','2021-06-30 07:49:04',NULL,'0906275026',NULL,0,'2021-06-30 07:54:04'),(303,NULL,'1111','2021-06-30 07:49:26',NULL,'0906275026',NULL,0,'2021-06-30 07:54:26'),(304,NULL,'1111','2021-06-30 07:51:52',NULL,'0906275026',NULL,0,'2021-06-30 07:56:52'),(305,NULL,'1111','2021-06-30 07:54:37',NULL,'0906275026',NULL,0,'2021-06-30 07:59:37'),(306,NULL,'1111','2021-06-30 08:00:37',NULL,'0906275026',NULL,0,'2021-06-30 08:05:37'),(307,NULL,'4627','2021-06-30 08:12:50',NULL,'0906275026',NULL,0,'2021-06-30 08:17:50'),(308,NULL,'6267','2021-06-30 08:15:04',NULL,'0906275026',NULL,0,'2021-06-30 08:20:04'),(309,NULL,'7919','2021-06-30 08:16:04',NULL,'0906275026',NULL,0,'2021-06-30 08:21:04'),(310,NULL,'5649','2021-06-30 08:16:52',NULL,'0906275026',NULL,0,'2021-06-30 08:21:52'),(311,NULL,'8910','2021-06-30 08:18:03',NULL,'0906275026',NULL,0,'2021-06-30 08:23:03'),(312,NULL,'4671','2021-06-30 08:19:05',NULL,'0906275026',NULL,0,'2021-06-30 08:24:05'),(313,NULL,'3591','2021-06-30 08:26:30',NULL,'0962393883',NULL,1,'2021-06-30 08:31:30'),(314,NULL,'6878','2021-06-30 08:43:04',NULL,'0962393883',NULL,2,'2021-06-30 08:48:04'),(315,NULL,'5664','2021-06-30 09:04:35',NULL,'0962393883',NULL,1,'2021-06-30 09:09:35'),(316,NULL,'8566','2021-06-30 09:04:39',NULL,'0962393883',NULL,1,'2021-06-30 09:09:39'),(317,NULL,'1439','2021-06-30 09:49:11',NULL,'0962393883',NULL,0,'2021-06-30 09:54:11'),(318,NULL,'9325','2021-06-30 11:16:26',NULL,'0962393883',NULL,3,'2021-06-30 11:21:26'),(319,NULL,'9642','2021-06-30 11:17:03',NULL,'0962393883',NULL,3,'2021-06-30 11:22:03'),(320,NULL,'3997','2021-06-30 11:17:18',NULL,'0962393883',NULL,3,'2021-06-30 11:22:18'),(321,NULL,'7257','2021-06-30 11:18:06',NULL,'0962393883',NULL,3,'2021-06-30 11:23:06'),(322,NULL,'6132','2021-06-30 11:20:44',NULL,'0962393883',NULL,3,'2021-06-30 11:25:44'),(323,NULL,'1351','2021-06-30 11:35:00',NULL,'0962393883',NULL,2,'2021-06-30 11:40:00'),(324,NULL,'5027','2021-06-30 11:36:24',NULL,'0962393883',NULL,2,'2021-06-30 11:41:24'),(325,NULL,'2466','2021-06-30 11:37:01',NULL,'0962393883',NULL,2,'2021-06-30 11:42:01'),(326,NULL,'9588','2021-06-30 11:38:12',NULL,'0962393883',NULL,2,'2021-06-30 11:43:12');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_type`
--

DROP TABLE IF EXISTS `otp_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otp_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Otp_Type_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_type`
--

LOCK TABLES `otp_type` WRITE;
/*!40000 ALTER TABLE `otp_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_schedule`
--

DROP TABLE IF EXISTS `payment_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_schedule` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Loan_Contract_ID` int(11) NOT NULL,
  `Payment_Date` date DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `f_contract_schedule` (`Loan_Contract_ID`),
  CONSTRAINT `f_contract_schedule` FOREIGN KEY (`Loan_Contract_ID`) REFERENCES `loan_contract` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_schedule`
--

LOCK TABLES `payment_schedule` WRITE;
/*!40000 ALTER TABLE `payment_schedule` DISABLE KEYS */;
INSERT INTO `payment_schedule` VALUES (1,5,'2021-05-25',NULL);
/*!40000 ALTER TABLE `payment_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Permission_Name` char(10) CHARACTER SET utf8 DEFAULT NULL,
  `Permission_Parent` int(11) DEFAULT NULL,
  `Permission_Key` char(10) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Relationship_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES (1,'vợ chồng','test'),(2,'anh em ','test');
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relative_customer`
--

DROP TABLE IF EXISTS `relative_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relative_customer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `LastName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `PhoneNumber` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Address` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relative_customer`
--

LOCK TABLES `relative_customer` WRITE;
/*!40000 ALTER TABLE `relative_customer` DISABLE KEYS */;
INSERT INTO `relative_customer` VALUES (1,'NGUYEN VAN ','A ','123456789','BAC NINH','test'),(2,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `relative_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relative_relation`
--

DROP TABLE IF EXISTS `relative_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relative_relation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Customer_ID` int(11) DEFAULT NULL,
  `Relative_Customer_ID` int(11) DEFAULT NULL,
  `Relationship_ID` int(11) DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `cus_relative` (`Customer_ID`),
  KEY `relative` (`Relative_Customer_ID`),
  KEY `relationship` (`Relationship_ID`),
  CONSTRAINT `cus_relative` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `relationship` FOREIGN KEY (`Relationship_ID`) REFERENCES `relationship` (`ID`),
  CONSTRAINT `relative` FOREIGN KEY (`Relative_Customer_ID`) REFERENCES `relative_customer` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relative_relation`
--

LOCK TABLES `relative_relation` WRITE;
/*!40000 ALTER TABLE `relative_relation` DISABLE KEYS */;
INSERT INTO `relative_relation` VALUES (1,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL),(3,1,1,2,'test');
/*!40000 ALTER TABLE `relative_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_investment_auto`
--

DROP TABLE IF EXISTS `request_investment_auto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_investment_auto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `status_ID` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `CUSTOMER_ID` int(11) NOT NULL,
  `USERS_ID` int(11) DEFAULT NULL,
  `Request_code` varchar(50) DEFAULT NULL,
  `Loan_Term_ID` int(11) DEFAULT NULL,
  `Loan_Rate_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Request_Investment_Auto_CUSTOMER1_idx` (`CUSTOMER_ID`),
  KEY `fk_Request_Investment_Auto_USERS1_idx` (`USERS_ID`),
  KEY `f_loan_rate_idx` (`Loan_Rate_ID`),
  KEY `f_loan_term_idx` (`Loan_Term_ID`),
  CONSTRAINT `f_loan_rate` FOREIGN KEY (`Loan_Rate_ID`) REFERENCES `loan_rate` (`ID`),
  CONSTRAINT `f_loan_term` FOREIGN KEY (`Loan_Term_ID`) REFERENCES `loan_term` (`ID`),
  CONSTRAINT `fk_Request_Investment_Auto_CUSTOMER1` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `fk_Request_Investment_Auto_USERS1` FOREIGN KEY (`USERS_ID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_investment_auto`
--

LOCK TABLES `request_investment_auto` WRITE;
/*!40000 ALTER TABLE `request_investment_auto` DISABLE KEYS */;
INSERT INTO `request_investment_auto` VALUES (1,3,10000000,NULL,1,NULL,'',1,1),(2,6,20000000,NULL,38,NULL,NULL,2,2),(3,2,15000000,NULL,1,NULL,NULL,1,2),(4,1,25000000,NULL,1,NULL,NULL,2,1),(5,2,40000000,NULL,38,NULL,NULL,1,1),(6,2,50000000,NULL,38,NULL,NULL,1,1),(7,2,100000000,NULL,1,NULL,NULL,2,2),(8,1,50000000,NULL,1,NULL,'M4U_20210618_2/DTTD',2,2),(9,6,1000000,NULL,1,NULL,'M4U_20210618_2/DTTD',1,1),(10,1,300000,NULL,1,NULL,'M4U_20210618_2/DTTD',1,1);
/*!40000 ALTER TABLE `request_investment_auto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_investment_auto_change_status`
--

DROP TABLE IF EXISTS `request_investment_auto_change_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_investment_auto_change_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Date` datetime DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Request_Investment_Auto_ID` int(11) NOT NULL,
  `Request_Investment_Auto_Status_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Request_Investment_Auto_Change_Status_Request_Investment_idx` (`Request_Investment_Auto_ID`),
  KEY `fk_Request_Investment_Auto_Change_Status_Request_Investment_idx1` (`Request_Investment_Auto_Status_ID`),
  CONSTRAINT `fk_Request_Investment_Auto_Change_Status_Request_Investment_A1` FOREIGN KEY (`Request_Investment_Auto_ID`) REFERENCES `request_investment_auto` (`ID`),
  CONSTRAINT `fk_Request_Investment_Auto_Change_Status_Request_Investment_A2` FOREIGN KEY (`Request_Investment_Auto_Status_ID`) REFERENCES `request_investment_auto_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_investment_auto_change_status`
--

LOCK TABLES `request_investment_auto_change_status` WRITE;
/*!40000 ALTER TABLE `request_investment_auto_change_status` DISABLE KEYS */;
INSERT INTO `request_investment_auto_change_status` VALUES (1,'2021-06-23 20:25:09',NULL,8,1),(2,'2021-06-23 20:48:45',NULL,9,1),(3,'2021-06-26 15:18:53',NULL,9,6),(4,'2021-06-28 21:22:08',NULL,2,6),(5,'2021-06-29 22:12:59',NULL,10,1);
/*!40000 ALTER TABLE `request_investment_auto_change_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_investment_auto_status`
--

DROP TABLE IF EXISTS `request_investment_auto_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_investment_auto_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_investment_auto_status`
--

LOCK TABLES `request_investment_auto_status` WRITE;
/*!40000 ALTER TABLE `request_investment_auto_status` DISABLE KEYS */;
INSERT INTO `request_investment_auto_status` VALUES (1,'Đang chờ giới thiệu khoản vay',NULL),(2,'Đang chờ nhà đầu tư chọn khoản vay',NULL),(3,'Đã chọn khoản vay',NULL),(4,'Đang giải ngân',NULL),(5,'Đã tất toán',NULL),(6,'Đã hủy',NULL);
/*!40000 ALTER TABLE `request_investment_auto_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_account_transaction_status`
--

DROP TABLE IF EXISTS `sub_account_transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_account_transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_account_transaction_status`
--

LOCK TABLES `sub_account_transaction_status` WRITE;
/*!40000 ALTER TABLE `sub_account_transaction_status` DISABLE KEYS */;
INSERT INTO `sub_account_transaction_status` VALUES (1,'Chưa duyệt',NULL),(2,'Đã duyệt',NULL),(3,'Đã hủy',NULL);
/*!40000 ALTER TABLE `sub_account_transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_status`
--

DROP TABLE IF EXISTS `transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_status` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status_Code` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Status_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_status`
--

LOCK TABLES `transaction_status` WRITE;
/*!40000 ALTER TABLE `transaction_status` DISABLE KEYS */;
INSERT INTO `transaction_status` VALUES (1,'CD','Chưa duyệt',NULL),(2,'DD','Đã duyệt',NULL);
/*!40000 ALTER TABLE `transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Transaction_Date` datetime DEFAULT NULL,
  `Transaction_Content` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `Transaction_Type_ID` int(11) DEFAULT NULL,
  `Transaction_Status_ID` int(11) DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_permission`
--

DROP TABLE IF EXISTS `user_role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_permission` (
  `Role_ID` int(11) NOT NULL,
  `Permission_ID` int(11) NOT NULL,
  PRIMARY KEY (`Role_ID`,`Permission_ID`),
  KEY `Permission` (`Permission_ID`),
  CONSTRAINT `Permission` FOREIGN KEY (`Permission_ID`) REFERENCES `permissions` (`ID`),
  CONSTRAINT `roles` FOREIGN KEY (`Role_ID`) REFERENCES `user_roles` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_permission`
--

LOCK TABLES `user_role_permission` WRITE;
/*!40000 ALTER TABLE `user_role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Role_Name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Password` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `Descriptions` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_USERS_CUSTOMER1` FOREIGN KEY (`ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'0962393883','$2b$06$ScZzsCBXpJayGKJQvICuJeqS71xp/39WRGQl7bjphM4nDoqF47Cfa',NULL),(14,'0359759901','$2b$06$gzar/I7uiOodFSnLaf9Z8OvIixtmLH32nWm6AW5CyUQ3iD3OArpFe',NULL),(15,'123456789','$2b$06$9lxAtJD6Z30KwIhhP4HKM.5NI1JREWJI9RsLIZaHIwvQDYbrs/2KK',NULL),(16,'0929687217','$2b$06$r0sebR9RldjEu1jFDF0JrOuWxeAZAN91OY1QsC9D5g31.DZa5JuYq',NULL),(17,'123456788','$2b$06$EWzGx5uOXIiHM5wKjINFmeTe5xH5folJyzYuwQnuDf356GPDYfNDC',NULL),(19,'0123456789','$2b$06$0MCxpakYUC.PdCKKJODFiOox4SHX9xKjeMIDGGHMGjsp0EbaU.8Aa',NULL),(20,'0929687216','$2b$06$BKwJQU0ZhSMhNYNBqe29x.Jya0VPvyTII48NdOYHuoCFxlyQjmSc.',NULL),(21,'1234567889','$2b$06$9ae76gGlHoE6hApzQH7WGe/0.Wc4qpLye3n.pu2liw7UDWS0cvWPG',NULL),(22,'12312312312','$2b$06$G6ilomi1NBw1jEt.TQKTPOziKE7.IwCG51vcKqHrFydIezDMXKhva',NULL),(23,'1234567890','$2b$06$uPLZI2zD9n/4YE8CVk9pR.GXB810Rr/q2FsZ76xAckRV96t7guZ3i',NULL),(25,'123123123122321','$2b$06$wHhQyY8j/xSu7ify.56.0uL69xLFt3LR.ToHyhRkOSf0JLNruE2HW',NULL),(27,NULL,NULL,NULL),(28,'0386600976','$2b$06$EjvbV06WayXrN2tprUKrTO8qTxS9gkKRP/wpA2oVUBJIwSaAtmwTu',NULL),(29,'0386600977','$2b$06$h.8AY6KmGZ65WUB0w8Lm7enV1aqIZoMCdyyVT01MVpPkIuXp2QWSi',NULL),(30,'03866009571','$2b$06$UzKnjqnCqkS982.WuqWFq.brA2bwHOuesEqzYFE8.RLqUtL8fDxbC',NULL),(31,'0359759900','$2b$06$XtUdA/4euQKWfEPqR27TWua6u/3i6jNmi2fX.ytKNl9XQpnQdlbZi',NULL),(32,'0386600970','$2b$06$BSGmP9/qg2cim0iRv3DsUu1Dphy7SZBO/2Buf5upiGnXF41Sd6Wve',NULL),(33,'0386600971','$2b$06$Of5rqk8E5J/aykxrXuicDee6Uh7CE4xW0BwjPmPrGsSEOAq0yPCpS',NULL),(34,'035975123','$2b$06$LfmRMcFpWuD3.zIT97ppO.BeGfxEaZACqkkhOLhlgLxzvT3IeETyS',NULL),(35,'0386600975','$2b$06$L/yBdBLLuF7rXIht9cZxIezYa5YZVYF66a7HonA2QeFqH0t7JP6ie',NULL),(36,'035975124','$2b$06$l2coiftGx4PFiHQVEh183./2dIhj8aNy.0/SE1iqYKDAAQ46WRw6K',NULL),(37,'035975126','$2b$06$4CrObQJlK3AGVq8Yw.mXNukTV9l.qqqAGwZMyolyDFqtRyGIolHX2',NULL),(38,'0906275026','$2b$06$WStm0fwj9xzqJECUMZkvyev5FEpCLxOy3CX9Ggeu7076bQD2Hd.oy',NULL),(39,'035975128','$2b$06$VOskdOTGK1MWRujpiNGAeOtTiPnoDZVJ.XaTjaPOZ.fFCjSIdsHWu',NULL),(40,'035975129','$2b$06$HasWQEiEM9O/bp1yGSnV1Ot/15o4kSsGgNsVus2afv/PGfO0aMvDC',NULL),(41,'9876543211','$2b$06$PaJQKdILUZM7yngtHrKILu5jj60i55l7FPAs7.JIT1lGFKwwHfAaG',NULL),(42,'0402199999','$2b$06$Tx7bSSfc7e8hHiH4GrVPhOZR6qYqKPY5u6StTvQ1OGoLWo.iu0ijO',NULL),(43,'9876543212','$2b$06$onXljTrM9ynbU7ho8LzWxuubI15VK7liWQyvt3HdRgbTNMN3FGfzG',NULL),(44,'0987654321','$2b$06$l5O0FF0mgW95SwMHQ1EeUOmjmYWyInxshlQn6XTceSPm2kOCbnGBa',NULL),(45,'0929687218','$2b$06$CvRMzezlL6guKs/d48HIruAXxaQDF4x7lOKq.EFbZfMELBO4dpqiO',NULL),(46,'0987654322','$2b$06$V/MVFoOBM3VZOh1iD9mSNu.10UYT4bNWSxlz4NU6sBLTPSZcFdwoa',NULL),(47,'0862226869','$2b$06$B854ldeFigDVjEh76FiNu.MtUptDi57EfjinwfWESZFK8Vg2DAfm6',NULL),(48,'0906275025','$2b$06$ECUZJ1SXUPZdYVytcTMBIecwxfxlH0TxnyQqZTP5ttAaW2tTHpAO.',NULL),(50,'987654323','$2b$06$P2kX1KfMfL5WSbZ91Jo2SO11U4VEuQtzM3ibTPky/.2m/g6qBIieK',NULL),(51,'987654326','$2b$06$XhcqVTP9QBFGGl4AGbe9j.VN2KN/PdLhCyk9y8xwx9vIiNvNv5r4G',NULL),(53,'0823590344','$2b$06$VupPexSiPPpBxKrtZHOwYu15PQ/94qd6TwTA/U.2AVRcO25Qlzc7O',NULL),(54,'0386600957','$2b$06$/4Sb7xaOWb13wD9hHoK18O70O9UpjalzFgtZ6kpvjg5tv8DsxDz0.',NULL),(55,'0379132427','$2b$06$QAAOB1VRdTiPv3hjLYxmle4hkFNhHplTuo7L7E3d6Uw0cXq60w966',NULL),(56,'0981088307','$2b$06$CQLCuEKKf/Tn7NNFn4u.2upfM2KOQeLSQySUGcyPFprftJdaFQ7o.',NULL),(57,'037923213','$2b$06$2ypghz6zyF0G.ajHDFMZAeWs.iw2CON7eqieQ5lwhlsbu6dQtC27S',NULL),(58,'012312312312','$2b$06$bxXwX5TndQ1TQ9quKHmxPeuOhUpKc.CfigeFwui4YAPVlHgpq3ZIC',NULL),(59,'0231232132','$2b$06$ERO8xu5atDpb6NwGaI6ECOsq3fsGtHonrbr/U6g/uH9OlLIAkWnOy',NULL),(60,'123123123213','$2b$06$lkCU9Voo2Uzalrb1XxU42.D89LaIgPd5kKDSN0S4B5MBVgIONTX.u',NULL),(61,'02321312312','$2b$06$SbxHCczOwFT1uMJ8cQcxx.vmFhN0n1otKB4m5Jwmr9zAba4ubpl6K',NULL),(62,'0321321332','$2b$06$F7XGiLZM6cer8lmgcU5/zu0Gb1cpnhcvj5gvU1n8EtozihhIYBDDS',NULL),(63,'1231212312312312','$2b$06$436/UhBaaWjQT3j7pe3AS.iugZbbBo6UHMp20eHJ6HPi/CYpNu9zu',NULL),(64,'0359378860','$2b$06$hhwUAH5oWLBxjMhaORMf7eZuxFqZormxLIeTN79LNERoQ6Bp148tq',NULL),(65,'0946461194','$2b$06$ICrJuN0GcyTaDvvb7CJnSuWt78v3PLPsXuW2/Ft2mt/jUN9WojIXe',NULL),(66,'0929687212','$2b$06$keRhAJVANoC7HD9I6tJ0AOve1dHr7kCYNrNfGto/kujb8hx7LilQq',NULL),(67,'0929687213','$2b$06$nkplt3OR.Crv6mM/Ql6qz.Pa62uebULOq8kzpaRX/.QIIbpEn2Dra',NULL),(68,'0929687214','$2b$06$PHeq5c6BzDrsqZuyUvonLuDeegObsSqAAQlfTSs9B5daMWwVgswC.',NULL),(69,'0975752559','$2b$06$eQmbAa35i6I1fJJkEQTbh.AgckJu9QD9azbbGbfnwWTGaMTwxc15a',NULL),(70,'0392256809','$2b$06$mDSfldw7gPoiIDyMukbJh.QriKChhXAYsxR83COXrawSYe9sMHYo2',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-30 12:46:02
