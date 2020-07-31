-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2020 at 01:54 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment4`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cmntID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `cmntBody` longtext NOT NULL,
  `byUser` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cmntID`, `postID`, `cmntBody`, `byUser`) VALUES
(10, 53, 'hellloooooooooooo', 'jekey'),
(11, 55, 'afdasdf', 'amy'),
(12, 65, 'afasdfdfa', 'amy'),
(13, 65, 'adfsadfdsaf', 'amy'),
(16, 83, 'hellloooooooo', 'amy'),
(17, 83, 'hiiiiieeeeee', 'amy'),
(18, 83, 'heihfakldshf\n', 'amy'),
(19, 83, 'heihfakldshf\n', 'amy');

-- --------------------------------------------------------

--
-- Table structure for table `likestatus`
--

CREATE TABLE `likestatus` (
  `ID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `likeStatus` int(11) NOT NULL DEFAULT 0,
  `byUser` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likestatus`
--

INSERT INTO `likestatus` (`ID`, `postID`, `likeStatus`, `byUser`) VALUES
(7, 56, 1, 'amy'),
(8, 55, -1, 'amy'),
(9, 54, 1, 'amy'),
(10, 53, -1, 'amy'),
(11, 52, 1, 'amy'),
(12, 57, -1, 'amy'),
(13, 0, -1, 'amy'),
(14, 58, 1, 'amy'),
(15, 59, -1, 'amy'),
(16, 60, 1, 'amy'),
(17, 62, 1, 'amy'),
(18, 66, 1, 'amy'),
(19, 78, 1, 'amy'),
(20, 79, 1, 'amy'),
(21, 80, 1, 'amy'),
(22, 82, -1, 'amy'),
(23, 81, -1, 'amy'),
(24, 76, 1, 'amy'),
(25, 75, 1, 'amy'),
(26, 74, 1, 'amy'),
(27, 77, 1, 'amy'),
(28, 82, -1, 'jekey'),
(29, 0, 1, 'jekey'),
(30, 81, 1, 'jekey'),
(31, 80, 0, 'jekey'),
(32, 63, 1, 'amy'),
(33, 83, 0, 'amy');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL,
  `topic` tinytext NOT NULL,
  `body` longtext NOT NULL,
  `likeNo` int(11) NOT NULL,
  `commentNo` int(11) NOT NULL,
  `byUser` tinytext NOT NULL,
  `edited` int(11) NOT NULL DEFAULT 0,
  `editedByUser` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`ID`, `topic`, `body`, `likeNo`, `commentNo`, `byUser`, `edited`, `editedByUser`) VALUES
(52, '42', 'adfdsafdasf', 0, 0, 'jekey', 0, ''),
(53, '1', 'helllo', 0, 0, 'jekey', 0, ''),
(54, '2', 'adfasdfdsaf', 0, 0, 'jekey', 0, ''),
(55, '3', 'sdafsadf', 0, 0, 'amy', 0, ''),
(56, '4', 'adfasdfasdf', 0, 0, 'amy', 0, ''),
(57, '5', 'afadfasdf', 0, 0, 'amy', 0, ''),
(58, '6', 'adfsdaf', 0, 0, 'amy', 0, ''),
(59, '7', 'afafdsfdsaf', 0, 0, 'amy', 0, ''),
(60, '8', 'dASDASD', 0, 0, 'amy', 0, ''),
(61, '9', 'dsafafsdf', 0, 0, 'amy', 0, ''),
(62, '10', 'dasfsadfafds', 0, 0, 'amy', 0, ''),
(63, '11', 'dsafasdfsdaf', 0, 0, 'amy', 0, ''),
(83, '12', 'dafdsffds adsfsadfasdf asdfasfd adfadsfsdfads', 0, 0, 'amy', 1, 'amy');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `ID` int(11) NOT NULL,
  `username` tinytext NOT NULL,
  `firstName` tinytext NOT NULL,
  `lastName` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `gender` char(1) NOT NULL,
  `dob` date NOT NULL,
  `userType` tinytext NOT NULL,
  `pwd` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`ID`, `username`, `firstName`, `lastName`, `email`, `gender`, `dob`, `userType`, `pwd`) VALUES
(3, 'amy', 'amy', 'santiago', 'amy@gmail.com', 'f', '2020-07-08', 'Admin', '$2y$10$/5VXQxptPX1MTUyhZpeXAe./X74Y1LTWCITAvyhNOttuQ3ExhufWq'),
(4, 'jekey', 'Jake', 'Peralta', 'jakey@gmail.com', 'm', '2020-07-29', 'Admin', '$2y$10$rfDungGlqQgmcBJjOLTpXupXIcWmjmSPHCg7xsb70VmYpUgZ7fAEG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cmntID`);

--
-- Indexes for table `likestatus`
--
ALTER TABLE `likestatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cmntID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `likestatus`
--
ALTER TABLE `likestatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
