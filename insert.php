<?php 

require_once 'config.php';

$user_id = $_POST['user_id'];
$score = $_POST['score'];

$sql = "INSERT INTO `scores`(`user_id`, `score`) 
				VALUES ($user_id, $score)";

$mysqli->query($sql);
$mysqli->close();