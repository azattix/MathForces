var  
	canvas = document.getElementById("myCanvas"),
	context = canvas.getContext("2d"), 
	// width of line interval
	width = 0;
 
var 
	// диапозон значений
	range = 51, 
	// счетчик баллов
	count = 0, 
	// операнды
	a, b,  
	// правильный ответ
	result, 
	play = document.querySelector('.play-button'),
	cross = document.getElementById('cross'),
	mark = document.getElementById('mark'),
	demo = document.getElementById('demo'),
	score = document.getElementById('result'),  
	// правильный | неправильный ответ
	temp;

play.addEventListener('click', startGame);

function startGame(){ 
	context.fillStyle = "#fff";
	context.fillRect(0,0,200,15);
	width = 200;
	count = 0;
	score.style.display = 'block';
	cross.style.display = 'inline-block';
	mark.style.display = 'inline-block';
	play.style.display = 'none';  

	// display line interval
	printLineInterval(); 

	// display problem
	calculate(); 
}

document.addEventListener('keydown', function(e) { 
	var flag = true;
	if (e.keyCode == 32 && width <= 0) {
		startGame();
	}
	if ((e.keyCode == 37 || e.keyCode == 39) && width > 0) { 
		if( e.keyCode == 37 ) {
			if (temp == result) {  
				flag = true;
			} else {  
				flag = false;
			}  

			mark.classList.add("light");

			setTimeout(function() { 
				mark.classList.remove('light');
			}, 200); 
		} 
		
		if (e.keyCode == 39) {
			if (temp != result) {  
				flag = true;
			} else {  
				flag = false; 
			} 

			cross.classList.add("light");

			setTimeout(function() { 
				cross.classList.remove('light');
			}, 200); 
		}

		if (flag) {
			count++;
			width += 40;

			if (width > 200) {
				width = 200;
			}
			
			context.fillRect(0,0,width,15);					
		} else {  
			width -= 80;
		}  
		
		calculate();
		score.innerHTML = 'Score: ' + count; 
	}
});

function printLineInterval() {   
	var timerId = setInterval(function() {
		// console.log(width);
		context.clearRect(width, 0, 200, 15); 

		if (width <= 0) {
			clearInterval(timerId); 
			demo.innerHTML = 'You scored <br>' + count;  
			score.style.display = 'none';
			play.innerHTML = '<i class="fas fa-redo fa-2x"></i>';
			play.style.display = 'inline-block';
			mark.style.display = 'none';
			cross.style.display = 'none';
		}

		score.innerHTML = 'Score: ' + count;

		width--;

	}, 70);
}

function calculate() {
	var 
		binary = signOperation(), 
		output;

	a = random();
	b = random();

	switch(binary) {
		case '+':
			result = a + b;
			break;
		case '-':
			result = minus();
			break;
		case '*':
			result = multy();
			break;
		case '/':
			result = divide();
			break;
	} 

	temp = randomizer(result, binary);

	// prepare output
	output = a + ' ' + binary + ' ' + b + ' = ' + temp;

	// display output
	demo.innerHTML = output;
}

function signOperation(argument) {
	var 
		operation = Math.floor(Math.random() * 4),
		sign = ['+', '-', '*', '/'];
		
	return sign[operation];
}

function random() { 
	return Math.floor(Math.random() * range);
}

function randomizer(number, binary) {
	var oper = Math.floor(Math.random() * 2); 
	
	if (oper == 1) { 
		return number;
	} 

	if (binary == '*') {
		if (number > 20)
		return number - 10;
	}

	return Math.floor(Math.random() * number + 10) + number - 10; 
}

function multy() {
	var oper = Math.floor(Math.random() * 2); 
	
	if (a > 10 && b > 10) {
		if (oper == 0) { 
			a = Math.floor(Math.random() * 11); 	
		} else {
			b = Math.floor(Math.random() * 11);
		}				
	}

	return a * b;
}

function divide() { 
	while(a % b != 0) {
		a = random();   
		b = random();
	} 

	return a / b;
}

function minus() {
	if (b == range-1) {
		a = b;
	}

	while(a < b) {
		a = random();
		b = random();
	}

	return a - b;
} 