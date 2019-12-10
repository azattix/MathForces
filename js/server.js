function loadScores() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("scores").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "getScores.php", true);

  if (document.getElementById('user_id').value) {
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_id=" + document.getElementById('user_id').value);
  } else {
    xhttp.send();
  }
}

function insertScoreSQL(score) {
	const user_id = document.getElementById('user_id').value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "insert.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("user_id=" + user_id + "&score=" + score);
} 

function singin() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText === 'true') {
        location.href = 'index.php';
      } else {
        alert(this.responseText);
      }
    }
  };
  xhttp.open("POST", "login.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  xhttp.send("username=" + username + "&password=" + password);
}