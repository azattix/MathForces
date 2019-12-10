<?php 

require_once 'config.php';

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM `users` WHERE login = '$username' or email = '$email'";

if ($result = $mysqli->query($sql))
{
  if($result->num_rows > 0)
  { 
  	echo 'This user is already exists';
  	exit();
  }
} 

$sql = "INSERT INTO `users`(`login`, `email`, `password`) 
				VALUES ('$username', '$email', '$password')";

if ($mysqli->query($sql) == TRUE)
{
	$latest_id = $mysqli->insert_id;
	
	$sql = "SELECT * FROM `users` WHERE login = '$username' and password = '$password'";

	if ($result = $mysqli->query($sql))
	{
	  if($result->num_rows > 0)
	  { 
	  	session_start();
	    $row = $result->fetch_array();
	    $_SESSION["id"] = $row['user_id'];
	    $_SESSION['username'] = $row['login'];
	    echo "true";
	    $result->free();
	  }
	  else
	  {
	  	echo 'Something went wrong';
	  }
	} 
} 	
else
{
	echo 'Something went wrong';
}

$mysqli->close(); 

