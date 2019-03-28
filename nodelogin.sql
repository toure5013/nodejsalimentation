-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 28 mars 2019 à 18:47
-- Version du serveur :  10.1.34-MariaDB
-- Version de PHP :  7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `nodelogin`
--

-- --------------------------------------------------------

--
-- Structure de la table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `numero_tel` varchar(20) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `statut` varchar(20) DEFAULT NULL,
  `date_inscription` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `numero_tel`, `ville`, `statut`, `date_inscription`) VALUES
(1, 'test', 'test', 'test@test.com', '0', '', NULL, '0000-00-00 00:00:00'),
(2, 'toure5013', 'test1', 'toure5013@gmail.com', '44334233', 'Gagnoa', NULL, '0000-00-00 00:00:00'),
(3, 'tour2567', '0000', 'toure2567@gmail.com', '44334233', 'ga', NULL, '0000-00-00 00:00:00'),
(4, 'toure', '0000', 't@gmail.com', '44334233', 'Gagnoa', NULL, '0000-00-00 00:00:00'),
(6, 't', '000', '11@g.com', '111', '000', 'Free', '0000-00-00 00:00:00'),
(7, 't555', '000', '000@g.com', '000', '00', 'Free', '0000-00-00 00:00:00'),
(8, 't22', '000', '000@g1.com', '0000', '00', 'Free', '0000-00-00 00:00:00'),
(9, 'ttt', '5555', '44@g.c', '444', '55', 'Free', '0000-00-00 00:00:00'),
(10, 'wil', '0000', 'wil@gmail.com', '444', 'g', 'Free', '0000-00-00 00:00:00'),
(11, 'toure10', '0000', 'toure10@gmail.com', '445554455', 'Gagnoa', 'Free', '0000-00-00 00:00:00'),
(12, 'test0', '0000', '0@g.com', '444', '4444', 'Free', '0000-00-00 00:00:00'),
(13, 'toure11', '0000', 'toure11@gmail.co', '44334233', 'Abidjan', 'Free', '0000-00-00 00:00:00'),
(14, 'toure20', '0000', 'toure20@gmail.com', '44334233', 'ABIDJAN', 'Free', '0000-00-00 00:00:00'),
(15, 'toure40', '0000', 'toure40@gm.com', '08030133', 'GAGNOA', 'Free', '0000-00-00 00:00:00'),
(16, 'toure50', '0000', 'toure50@nan.ci', '08030133', 'ABIDJAN', 'Free', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id_commande` int(11) NOT NULL,
  `user_commande` varchar(255) NOT NULL,
  `produit_commande` varchar(255) NOT NULL,
  `date_commande` datetime NOT NULL,
  `date_livraison` varchar(255) NOT NULL,
  `quantite` varchar(11) NOT NULL,
  `ville_livraison` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id_commande`, `user_commande`, `produit_commande`, `date_commande`, `date_livraison`, `quantite`, `ville_livraison`, `id_user`) VALUES
(1, 'TOURE', '4.jpg', '2019-03-28 12:43:31', '', '', '', 0),
(2, 'TOURE', 'gateau1.jpg', '2019-03-28 12:45:35', '10/03/2019', '1', 'GAGNOA', 0),
(3, 'TOURE', 'tchepe.jpg', '2019-03-28 12:48:12', '10/03/2019', '10  plat', 'GAGNOA', 0),
(4, 'TOURE', 'diner4.jpg', '2019-03-28 12:49:23', '10/03/2019', '10  plat', 'GAGNOA', 0),
(5, 'TOURE', 'Café au noir', '2019-03-28 12:59:36', '10/03/2019', '10  plat', 'GAGNOA', 0),
(6, 'TOURE', 'tchepe.jpg', '2019-03-28 13:04:27', '22222', '10  plat', 'GAGNOA', 0),
(7, 'TOURE SOUEYMANE', 'Café au noir', '2019-03-28 15:53:31', '29/03/2019', '2 TASSE', 'ABIDJAN', 0),
(8, 'TOURE SOUEYMANE', 'Café au noir', '2019-03-28 16:07:22', '29/03/2019', '2 TASSE', 'GAGNOA', 0),
(9, 'TOURE SOUEYMANE', 'tchepe.jpg', '2019-03-28 16:09:31', '10/04/2019', '10 plats', 'ABIDJAN', 0),
(10, 'TOURE SOUEYMANE', 'Café au lait', '2019-03-28 16:30:10', '12/04/2019', '2tasse', 'GAGNOA', 0),
(11, 'TOURE SOUEYMANE', 'tchepe.jpg', '2019-03-28 16:43:46', '20/04/2019', '10  plat', 'ABIDJAN', 0);

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nom_menu` varchar(100) NOT NULL,
  `temps_cuissons_menu` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_menu` varchar(255) DEFAULT NULL,
  `date_menu` datetime NOT NULL,
  `id_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `menu`
--

INSERT INTO `menu` (`id_menu`, `nom_menu`, `temps_cuissons_menu`, `description`, `image_menu`, `date_menu`, `id_user`) VALUES
(1, 'frite Poison', '5000', 'Frite au poisson', 'frite.jpg', '0000-00-00 00:00:00', '0'),
(5, 'Pain', '60', 'Gâteau de qualité', 'pain.jpg', '2019-03-26 19:22:00', 'test');

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

CREATE TABLE `plats` (
  `id_plat` int(11) NOT NULL,
  `nom_plat` varchar(255) NOT NULL,
  `prix_plat` varchar(255) NOT NULL,
  `livraison_plat` varchar(100) NOT NULL,
  `date_plat` varchar(100) NOT NULL,
  `imageplat` varchar(255) NOT NULL,
  `nbrePersonne` int(11) NOT NULL,
  `id_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `plats`
--

INSERT INTO `plats` (`id_plat`, `nom_plat`, `prix_plat`, `livraison_plat`, `date_plat`, `imageplat`, `nbrePersonne`, `id_user`) VALUES
(4, 'Sauce graine', '2000', 'Domicile', '2019-03-28 07:38:10.777', '10.jpg', 3, 'test'),
(5, 'Sauce graine', '1000', 'client', '2019-03-28 13:13:08.198', '10.jpg', 4, 'test'),
(6, 'RIZ', '5000', 'Domicile', '2019-03-28 13:16:45.032', '3.jpg', 4, 'test'),
(7, 'Tchêpe', '2000', 'Domicile', '2019-03-28 13:17:52.198', 'tchepe.jpg', 3, 'test');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id_commande`);

--
-- Index pour la table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Index pour la table `plats`
--
ALTER TABLE `plats`
  ADD PRIMARY KEY (`id_plat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `plats`
--
ALTER TABLE `plats`
  MODIFY `id_plat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
