<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Math Forces</title>
  <!-- Fonts -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
  <!-- Custom style for this template -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/header.css">
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="css/footer.css">
</head>

<body> 
  <?php require 'header.php'; ?>

	<div class="login">
		<h3>Signin</h3>
		<input type="text" placeholder="Username" id="username"> 
		<input type="password" placeholder="Password" id="password"> 
		<input type="submit" value="Submit" onclick="singin()">
	</div>

  <?php require_once 'footer.php'; ?>

  <script src="js/server.js"></script> 
</body>

</html>