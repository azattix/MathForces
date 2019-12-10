<div class="header">
  <a href="index.php" class="logo">MathForces</a>
  <div class="header-right">
  	<?php 
  	if (!isset($_SESSION['id'])) {  ?>
	    <a href="signin.php">Signin</a>
	    <a href="signup.php">Signup</a>
	  <?php } else { ?>
	  	<a href="#"><i class="far fa-user"></i> <?php echo $_SESSION['username']; ?></a>
	  	<a href="logout.php">Logout</a>
	  <?php } ?>
  </div>
</div>