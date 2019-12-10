<?php 

require_once 'config.php';

$sql = "SELECT users.login, scores.score, users.user_id 
        FROM users, scores 
        WHERE users.user_id = scores.user_id 
        AND scores.score = (
            SELECT MAX(score) 
            FROM scores 
            WHERE scores.user_id = users.user_id
        ) ORDER BY scores.score DESC LIMIT 3";

$user_id = 0;

if (isset($_POST['user_id'])) 
{
  $user_id = $_POST['user_id'];
}

$scores = '';

if ($result = $mysqli->query($sql))
{
  if($result->num_rows > 0)
  { 
    while($row = $result->fetch_array())
    {  
      $scores .= ($user_id == $row['user_id']) ? "<tr class='selected'>" : "<tr>";
      $scores .= "<td>" . $row['login'] . "</td><td>" . $row['score'] . "</td>";
      $scores .= "</tr>";
    } 
    $result->free();
  }
} 

echo $scores;

$mysqli->close(); 
