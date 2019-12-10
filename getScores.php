<?php 

require_once 'config.php';

$sql = "SELECT users.login, scores.score 
        FROM users, scores 
        WHERE users.user_id = scores.user_id 
        AND scores.score = (
            SELECT MAX(score) 
            FROM scores 
            WHERE scores.user_id = users.user_id
        ) ORDER BY scores.score DESC LIMIT 3";

$scores = '';

if ($result = $mysqli->query($sql))
{
  if($result->num_rows > 0)
  { 
    while($row = $result->fetch_array())
    {
      $scores .= "<tr><td>" . $row['login'] . "</td><td>" . $row['score'] . "</td></tr>";
    } 
    $result->free();
  }
} 

echo $scores;

$mysqli->close(); 
