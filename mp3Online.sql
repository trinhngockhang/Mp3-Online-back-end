/*
 Navicat Premium Data Transfer

 Source Server         : Digital Database
 Source Server Type    : MariaDB
 Source Server Version : 100143
 Source Host           : 128.199.239.13:3306
 Source Schema         : mp3Online

 Target Server Type    : MariaDB
 Target Server Version : 100143
 File Encoding         : 65001

 Date: 22/12/2019 17:31:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for album
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `songId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `songId_comment` (`songId`),
  KEY `userId_comment` (`userId`),
  CONSTRAINT `songId_comment` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`),
  CONSTRAINT `userId_comment` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for like_song
-- ----------------------------
DROP TABLE IF EXISTS `like_song`;
CREATE TABLE `like_song` (
  `songId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`songId`,`userId`) USING BTREE,
  KEY `song_userId` (`userId`),
  CONSTRAINT `songId_user` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`),
  CONSTRAINT `song_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for playlist
-- ----------------------------
DROP TABLE IF EXISTS `playlist`;
CREATE TABLE `playlist` (
  `Id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `playListName` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for playlist_song
-- ----------------------------
DROP TABLE IF EXISTS `playlist_song`;
CREATE TABLE `playlist_song` (
  `playListId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `songId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`playListId`,`songId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for singer_album
-- ----------------------------
DROP TABLE IF EXISTS `singer_album`;
CREATE TABLE `singer_album` (
  `albumId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `singerId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`albumId`,`singerId`),
  KEY `singerId_album` (`singerId`),
  CONSTRAINT `singerId_album` FOREIGN KEY (`singerId`) REFERENCES `singers` (`id`),
  CONSTRAINT `singer_albumId` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for singer_song
-- ----------------------------
DROP TABLE IF EXISTS `singer_song`;
CREATE TABLE `singer_song` (
  `singerId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `songId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`singerId`,`songId`),
  KEY `singer_songID` (`songId`),
  CONSTRAINT `singerId_song` FOREIGN KEY (`singerId`) REFERENCES `singers` (`id`),
  CONSTRAINT `singer_songID` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for singers
-- ----------------------------
DROP TABLE IF EXISTS `singers`;
CREATE TABLE `singers` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `avatar` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `coverImage` varchar(128) COLLATE utf8_unicode_ci DEFAULT 'https://static-zmp3.zadn.vn/dev/skins/zmp3-v5.2/images/default_cover.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for song_categories
-- ----------------------------
DROP TABLE IF EXISTS `song_categories`;
CREATE TABLE `song_categories` (
  `songId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `categoryId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`songId`,`categoryId`),
  KEY `song_categoryId` (`categoryId`),
  CONSTRAINT `songId_category` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`),
  CONSTRAINT `song_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for songs
-- ----------------------------
DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `lyric` text COLLATE utf8_unicode_ci,
  `image` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `liked` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `length` int(11) DEFAULT '0',
  `albumId` varchar(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `writer` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `coverImg` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `song_albumId` (`albumId`),
  CONSTRAINT `song_albumId` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(72) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(255) CHARACTER SET ascii NOT NULL DEFAULT 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png',
  `fbId` varchar(64) CHARACTER SET ascii DEFAULT NULL,
  `email` varchar(255) CHARACTER SET ascii DEFAULT NULL,
  `ssoId` varchar(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
