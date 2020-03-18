-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 15 mars 2020 à 15:00
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `db_crochetdh`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `texte` text NOT NULL,
  `prix` int(11) DEFAULT NULL,
  `dateCreation` date DEFAULT NULL,
  `porteClef` tinyint(1) NOT NULL,
  `dispo` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `titre`, `texte`, `prix`, `dateCreation`, `porteClef`, `dispo`, `id_categorie`) VALUES
(1, 'Porteurs de plantes', 'Pour les amoureux et amoureuses des plantes, trois personnages qui portent des pots de fleur avec de jolies plantes vertes.\n\nTaille : 10 cm', 20, '2020-01-20', 0, 1, 1),
(2, 'Serpents', 'Deux serpents aux couleurs vives : un vert et un arc-en-ciel.\nAvec des couleurs pareils ils doivent manquer de discrétion !\n\nLes yeux sont collés\n\nTaille : 50 cm', 17, '2019-11-14', 0, 1, 2),
(3, 'Animaux marins', 'Trois mignons animaux marins, un poulpe, un poisson et une méduse.\nUn porte clé parfait pour ceux qui aiment l\'océan!\n\nIls sont accrochés sur un anneau métallique de porte clés.\n\nLes yeux sont dessinés au marqueur indélébile.\n\nTaille : 9 cm\n', 10, '2019-06-03', 1, 1, 2),
(4, 'Méduse', 'Trois méduses colorées toutes douces et qui ne piquent pas, contrairement aux vrais !\nElles peuvent servirent de peluches ou de décoration à suspendre.\n\nTaille : 15 cm / 24 cm avec l\'attache', 15, '2019-09-24', 0, 1, 2),
(5, 'Poussins ronds', 'Ces petits poussins sont tout ronds avec des ailles et des pattes minuscules.\n\nCoton : Rose et jaune\nAcrylique : Bleu et violet\n\nLes yeux sont collés\n\nTaille : 5cm', 17, '2019-01-21', 0, 1, 2),
(6, 'Chauve-souris', 'Une chauve-souris verte , presque comme dans la comptine !\nElle peut servir de décoration on de doudou selon vos préférences.\nSes ailes tiennent droites sans armature métallique donc pas de risque de blessure.\n\nLes yeux sont des yeux de sécurité.\n\nHauteur : 12 cm\nLargeur : 30 cm', 30, '2019-03-05', 0, 1, 2),
(7, 'Zombie', 'Une peluche zombie pour vous  ̷m̷a̷n̷g̷e̷r̷  tenir compagnie lors de vos repas ! Ou vous aidez à faire de doux rêves.\nEn cas de zombie trop agité, faite attention à ne pas vous faire mordre !\n\nLes yeux sont brodés.\nLes intestins sont cousus sur le ventre.\n\nTaille : 15 cm\n', 20, '2019-10-16', 0, 1, 1),
(8, 'Licorne', 'Licornes en peluches se tenant allongées avec les pattes écartées\n\n♦ Bleu ♦\nLongueur : 17 cm (sans la queue)\nLargeur : 25 cm\nHauteur : 7 cm\npoids : 130g\nLes parties bleu et grises sont en acrylique. Le blanc en coton.\n\n♦ Violet ♦\nLongueur : 18 cm (sans la queue)\nLargeur : 20 cm\nHauteur : 6 cm\nPoids : 61g\nToutes les pelotes sont en acrylique.\n\n\nLes yeux sont des yeux de sécurité.', 35, '2019-07-15', 0, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `art_img`
--

DROP TABLE IF EXISTS `art_img`;
CREATE TABLE IF NOT EXISTS `art_img` (
  `fk_id_art` int(11) NOT NULL,
  `fk_id_img` int(11) NOT NULL,
  KEY `fk_id_art_cascade` (`fk_id_art`),
  KEY `fk_id_img_cascade` (`fk_id_img`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `art_img`
--

INSERT INTO `art_img` (`fk_id_art`, `fk_id_img`) VALUES
(1, 136),
(1, 135),
(1, 134),
(1, 130),
(1, 131),
(1, 132),
(1, 133),
(2, 138),
(3, 142),
(8, 161),
(8, 160),
(8, 159),
(8, 158),
(8, 157),
(7, 156),
(7, 155),
(6, 154),
(6, 153),
(6, 152),
(5, 151),
(5, 150),
(5, 149),
(4, 144),
(4, 143),
(4, 146),
(3, 141),
(3, 140),
(2, 139),
(2, 137),
(5, 148),
(5, 147),
(4, 145);

-- --------------------------------------------------------

--
-- Structure de la table `art_mat`
--

DROP TABLE IF EXISTS `art_mat`;
CREATE TABLE IF NOT EXISTS `art_mat` (
  `fk_id_art` int(11) NOT NULL,
  `fk_id_mat` int(11) NOT NULL,
  KEY `fk_id_art_cascade` (`fk_id_art`),
  KEY `fk_id_mat_cascade` (`fk_id_mat`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `art_mat`
--

INSERT INTO `art_mat` (`fk_id_art`, `fk_id_mat`) VALUES
(2, 2),
(1, 2),
(1, 1),
(3, 1),
(5, 1),
(7, 2),
(6, 2),
(5, 2),
(4, 2),
(8, 2),
(8, 1);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`) VALUES
(1, 'Personnages'),
(2, 'Animaux'),
(3, 'Vêtements'),
(4, 'Divers');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `nom`, `url`, `description`) VALUES
(146, 'méduse_1.jpg', '../assets/images/méduse_1.jpg', 'trois méduses'),
(147, 'poussin_3.jpg', '../assets/images/poussin_3.jpg', 'poussin rond violet'),
(133, 'IMG_20200119_134631.jpg', '../assets/images/IMG_20200119_134631.jpg', 'personnage noir avec une plante a feuilles triangulaires'),
(132, 'IMG_20200119_135126.jpg', '../assets/images/IMG_20200119_135126.jpg', 'Zoom sur une plante composée de nombreuses longues tiges'),
(131, 'IMG_20200119_134518.jpg', '../assets/images/IMG_20200119_134518.jpg', 'Trois personnages avec des couleurs de peau différentes portant des plantes dans des peau gris'),
(130, 'IMG_20200119_135040.jpg', '../assets/images/IMG_20200119_135040.jpg', 'Personnage blanc avec une plante type herbe'),
(134, 'IMG_20200119_134807.jpg', '../assets/images/IMG_20200119_134807.jpg', 'Zoom sur une plante composée de feuilles triangulaires'),
(135, 'IMG_20200119_134902.jpg', '../assets/images/IMG_20200119_134902.jpg', 'personnage marron avec une plante a longues tiges feuillues'),
(136, 'IMG_20200119_134922.jpg', '../assets/images/IMG_20200119_134922.jpg', 'Zoom sur une plante composée de trois tiges portant des feuilles arrondies'),
(137, 'serpent_colores_3.jpg', '../assets/images/serpent_colores_3.jpg', 'serpent vert '),
(138, 'serpent_colores_1.jpg', '../assets/images/serpent_colores_1.jpg', 'deux peluches serpents, un vert et un arc en ciel'),
(139, 'serpent_colores_2.jpg', '../assets/images/serpent_colores_2.jpg', 'serpent aux couleurs arc en ciel'),
(140, 'Porte_clef_marin_3.jpg', '../assets/images/Porte_clef_marin_3.jpg', 'méduse orange, poisson jaune, poulpe blanc'),
(141, 'Porte_clef_marin_2.jpg', '../assets/images/Porte_clef_marin_2.jpg', 'méduse vert pale, poisson rose pale, poulpe bleu'),
(142, 'Porte_clef_marin_1.jpg', '../assets/images/Porte_clef_marin_1.jpg', 'Deux porte-clef méduse, poisson, poulpe'),
(143, 'méduse_2.jpg', '../assets/images/méduse_2.jpg', 'méduse chapeau noir et tentacules bleu clair et foncé'),
(144, 'méduse_3.jpg', '../assets/images/méduse_3.jpg', 'méduse chapeau gris et tentacules arc en ciel'),
(145, 'méduse_4.jpg', '../assets/images/méduse_4.jpg', 'méduse chapeau noir et tentacules vertes'),
(148, 'poussin_5.jpg', '../assets/images/poussin_5.jpg', 'poussin rond bleu'),
(149, 'poussin_1.jpg', '../assets/images/poussin_1.jpg', '4 poussins rond, violet, jaune, bleu, rose'),
(150, 'poussin_2.jpg', '../assets/images/poussin_2.jpg', 'poussin rond jaune'),
(151, 'poussin_4.jpg', '../assets/images/poussin_4.jpg', 'poussin rond rose'),
(152, 'chauve-sourie_3.jpg', '../assets/images/chauve-sourie_3.jpg', 'chauve-souris posée dans une main'),
(153, 'chauve-sourie_1.jpg', '../assets/images/chauve-sourie_1.jpg', 'chauve-souris verte foncé, ses ailles sont vertes clair'),
(154, 'chauve-sourie_2.jpg', '../assets/images/chauve-sourie_2.jpg', 'chauve souris aux ailles repliées sur son corps'),
(155, 'zombi_2.jpg', '../assets/images/zombi_2.jpg', 'zombie dans une main'),
(156, 'zombi_1.jpg', '../assets/images/zombi_1.jpg', 'Zombie gris avec des yeux en croix et des intestins roses qui ressortent de son ventre.'),
(157, 'licorne_bleu_3.jpg', '../assets/images/licorne_bleu_3.jpg', 'licorne bleue vue de dessus'),
(158, 'licorne_1.jpg', '../assets/images/licorne_1.jpg', 'Deux licornes blanches, l\'une a la crinière et les pattes bleu, l\'autre violettes'),
(159, 'licorne_v_2.jpg', '../assets/images/licorne_v_2.jpg', 'licorne violette vue de coté'),
(160, 'licorne_v_3.jpg', '../assets/images/licorne_v_3.jpg', 'licorne violette vue de dessus'),
(161, 'licorne_bleu_2.jpg', '../assets/images/licorne_bleu_2.jpg', 'licorne bleue vue de coté');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE IF NOT EXISTS `matiere` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`id`, `nom`) VALUES
(1, 'Coton'),
(2, 'Acrilyque'),
(3, 'Laine');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
