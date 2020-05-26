<?php session_start(); ?>
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
  <link rel="stylesheet" href="css/score.css">
  <link rel="stylesheet" href="css/footer.css">
</head>

<body onload="loadScores()">
  <?php require_once 'header.php'; ?>
  <div class="container">
    <div class="inner-container">
      <div id="demo">
      	<p>Game for your brain</p>
      	<p style="font-size: 16px">Top 3</p>
      	<table id="scores"></table>
      </div>
      <div id="myProgress">
        <div id="myBar"></div>
      </div> 
    </div>  
    <div id="button" style="text-align: center;">
      <div class="play-button" id="play"><i class="fas fa-play fa-2x"></i></div>
      <div class="play-button" id="mark"><i class="fas fa-check fa-2x"></i></div>
      <div class="play-button" id="cross"><i class="fas fa-times fa-2x"></i></div>
    </div>
	</div>

  <input id="user_id" type="hidden" value="<?php echo isset($_SESSION['id']) ? $_SESSION['id']:'' ?>" />

  <?php require_once 'footer.php'; ?>
  
  <script src="js/server.js"></script>
  <script src="js/mathforces.js"></script>
</body>

</html>