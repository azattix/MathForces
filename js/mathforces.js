// Container for outputt game process
var problemContainer = document.getElementById('demo');
// Live line
var progressBar = document.getElementById("myBar");  

// Declearing our game model
var Model = { 
	// First operand
	a: '',
	// Second operand
	b: '', 
	// We'll need a place to store correct answer
	correctAnswer: '',
	// We'll need a place to store temporary answer
	tempAnswer: '',
	// Range of numbers between 0 and 51
	range: 51,
	// User score
	score: 0, 

	// Which operation will be used
    signOperation: function() { 
		return["+","-","*","/"][Math.floor(4*Math.random())]
    },

    // Calculation
    calculate: function() {
    	// Call signOperation() func. to get operation value
		var binary = this.signOperation(); 
		// Declearing output value
		var output = ''; 

		// Set random value to operands
		this.a = this.randomizer();
		this.b = this.randomizer();

		// Generate operator
		switch(binary) {
			case '+':
				this.correctAnswer = this.plus();
				break;
			case '-':
				this.correctAnswer = this.minus();
				break;
			case '*':
				this.correctAnswer = this.multy();
				break;
			case '/':
				this.correctAnswer = this.divide();
				break;
		} 

		// Set temp answer
		this.tempAnswer = this.getTempAnswer(this.correctAnswer, binary);

		// prepare output
		output += '<div id="score">Score: ' + this.score + '</div>';
		output += this.a + ' ' + binary + ' ' + this.b + ' = ' + this.tempAnswer;

		return output; 	
    },

    // Get random number for operands
    randomizer: function () { 
		return Math.floor(Math.random() * this.range);
	},

	// Get temp answer 
	getTempAnswer: function (number, binary) {
		var oper = Math.floor(Math.random() * 3); 
		
		// Return right result
		if (oper == 1) { 
			return number;
		}  
		// Return temp result
		if (binary == '*') {
			if (number > 10) {
				if (oper == 0)
					return number - 10;
				if (oper == 2)
					return number + 10;
			}
		}

		return Math.floor(Math.random() * number + 10) + number - 10; 
	}, 

    // a + b
    plus: function () { 
    	return this.a + this.b;
    },

	// a - b
	minus: function () {
		if (this.b == this.range-1) {
			this.a = this.b;
		}

		while(this.a < this.b) {
			this.a = this.randomizer();
			this.b = this.randomizer();
		}

		return this.a - this.b;
	},

    // a * b
    multy: function () {
		var oper = Math.floor(Math.random() * 2); 
		
		if (this.a > 10 && this.b > 10) {
			if (oper == 0) { 
				this.a = Math.floor(Math.random() * 11); 	
			} else {
				this.b = Math.floor(Math.random() * 11);
			}				
		}

		return this.a * this.b;
	},

	// a / b
	divide: function () { 
		while(this.a % this.b != 0) {
			this.a = this.randomizer();   
			this.b = this.randomizer();
		} 
		return this.a / this.b;
	},

	// check user answer
	checkAnswer: function(flag) {
		if (flag === true) {  
			return this.tempAnswer == this.correctAnswer ? true: false;
		} 
		return this.tempAnswer != this.correctAnswer ? true: false;
	}
}

var View = Model;   
View.width = 0;
View.height = 15; 
View.playButton = document.getElementById('play');
View.markButton = document.getElementById('mark');
View.crossButton = document.getElementById('cross');

View.frontpage = function () { 
	// display problemContainer
	// problemContainer.innerHTML = 'MathForces';
	document.getElementById('myProgress').style.display = 'none';
} 

View.setLineInterval = function() { 
    // start timer 
    var timerId = setInterval(function() { 
    	// clear line
        // View.context.clearRect(Model.width, 0, 100, View.height);
        progressBar.style.width = View.width + '%';
        // Stop timer
        if (View.width <= 0) { 
            clearInterval(timerId);  
            
            if (document.getElementById('user_id').value) {
	            insertScoreSQL(Model.score);
	          }

            problemContainer.innerHTML = '<small>You scored:</small><br>' + Model.score;
            View.playButton.innerHTML = '<i class="fas fa-redo fa-2x"></i>';
						View.playButton.style.display = 'inline-block';
	        	View.markButton.style.display = 'none';
						View.crossButton.style.display = 'none';
        		progressBar.style.width = 0 + '%';
        } else {
        	View.width -= 1;
        } 
    }, 80);
}

View.startGame = function () {
	View.width = 100;
	Model.score = 0;
	// display problemContainer
	problemContainer.innerHTML = Model.calculate();
	document.getElementById('myProgress').style.display = 'block'; 
	// set interval
	View.setLineInterval();   
	View.playButton.style.display = 'none';
	View.markButton.style.display = 'inline-block';
	View.crossButton.style.display = 'inline-block';
}

View.restart = function () {
	View.width = 100;
	Model.score = 0;
	// display problemContainer
	problemContainer.innerHTML = Model.calculate(); 
	// set interval
	View.setLineInterval();   
	View.playButton.style.display = 'inline-block';
	View.markButton.style.display = 'none';
	View.crossButton.style.display = 'none';
}

View.counter = function(flag) {
	if (flag) {
	this.score++;
	this.width += 20;

		if (this.width > 100) {
			this.width = 100;
		}
		progressBar.style.width = View.width + '%';
		// this.context.fillRect(0,0,this.width,this.height);					
	} else {  
		this.width -= 40;
	}  
}

View.keyBoards = function(e) { 
	var flag = true; 

	// start the game on click space key
	if (e.keyCode == 32 && this.width <= 0) {
		this.startGame();
	}

	if ((e.keyCode == 37 || e.keyCode == 39) && this.width > 0) { 
		if (e.keyCode == 37) {
			flag = this.checkAnswer(true);
			this.buttonLight(true);
		} 
		else if (e.keyCode == 39) {
			flag = this.checkAnswer(false);
			this.buttonLight(false);
		}

		this.counter(flag);
		
		// display problemContainer
		problemContainer.innerHTML = this.calculate();
	}
}

View.checker = function (arg) {
	var flag = true;  

	if (arg === true) {
		flag = this.checkAnswer(true); 
	} 
	else {
		flag = this.checkAnswer(false); 
	}

	this.counter(flag);
	
	// display problemContainer
	problemContainer.innerHTML = this.calculate(); 
}

View.buttonLight = function(flag) {
	var time = 200;

	if (flag) {
		this.markButton.classList.add("light");
		setTimeout(function() { 
			View.markButton.classList.remove('light');
		}, time); 		
	} else {
		this.crossButton.classList.add("light");
		setTimeout(function() { 
			View.crossButton.classList.remove('light');
		}, time); 
	}
} 

var MathForces = View;  

MathForces.play = function() {  
	// display frontpage before starting the game
	this.frontpage();  

	this.playButton.addEventListener('click', this.startGame);

	this.markButton.addEventListener('click', function(){ 
		View.checker(true);
	});

	this.crossButton.addEventListener('click', function(){ 
		View.checker(false);
	});

	document.addEventListener('keydown', function(e) { 
		View.keyBoards(e);
	});
}

MathForces.play(); 