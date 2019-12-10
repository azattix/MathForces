<?php 

$mysqli = new mysqli("localhost", "root", "", "mathforces");
  
if ($mysqli === false)
{
  die("ERROR: Could not connect. " . $mysqli->connect_error);
}