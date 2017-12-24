var time = 30;
var questionArray = 0;
var userGuess;
var correctAnswers = 0;
var unanswered = 0;
var loses = 0;

var questions = [{
	question: "Who is the most famous video game character of all time?",
	choices: ["Donkey Kong", "Ash Ketchum", "Mario", "Master Chief"],
	answer: 2,
	imageSrc: "assets/images/mario.png"
}, {
	question: "NES is Short for....?",
	choices: ["New Enterprise System", "Nintendo Entertainment System", "No End System", "New Enthropy Simulation"],
	answer: 1,
	imageSrc: "assets/images/nes.jpg"
}, {
	question: "What video game console has the highest number of video game console sales of all time?",
	choices: ["Playstation 2", "Xbox 360", "Nintendo 64", "Playstation 3"],
	answer: 0,
	imageSrc: "assets/images/playstation2.jpg"
}, {
	question: "Which of these characters is the fastest?",
	choices: ["Mario", "PacMan", "Qbert", "Sonic"],
	answer: 3,
	imageSrc: "assets/images/sonic.png"
}, {
	question: "Which of these video game characters is the hero in the video game 'Legend of Zelda'?",
	choices: ["Samus", "Villager", "Link", "Pikachu"],
	answer: 2,
	imageSrc: "assets/images/link.png"
}]



$("#time-remaining").html("Time Remaining: " + time);
intervalId = setInterval(decrement, 1000);

function decrement () {
	time--;
	$("#time-remaining").html("Time Remaining: " + time);

	if (time === 0) {
		outOfTime()
	}
}

function nextQuestion() {
$("#questions").html(questions[questionArray].question)

 for(var i = 0; i < questions[questionArray].choices.length; i++) {
    $("#choices").append("<div>" + "<input type='button' value='" + questions[questionArray].choices[i] + "'/>" + "</div>"); 
	}
}

function click() {
$("input").on("click", function(event) {
	userGuess = $(this).val()
		if (userGuess === questions[questionArray].choices[questions[questionArray].answer]) {
			win()
		} else {
			loss()
		} 
	})
}

function win() {
	clearInterval(intervalId);
	$("#questions").html("Correct!")
	$("#choices").html("<img src='" + questions[questionArray].imageSrc + "'/>")
	questionArray++
	correctAnswers++
		if (questionArray === questions.length) {
		done()
		return
	}
	var windowTimeout = setTimeout(function(){
	$("#choices").html("")
	time = 30
	$("#time-remaining").html("Time Remaining: " + time)
	nextQuestion()
	click()
	run()
	}, 4000);
}

function run() {
      intervalId = setInterval(decrement, 1000);
}

function done() {
	$("#questions").html("All done, Here's how you did!")
	$("#choices").html("Correct Answered: " + correctAnswers + "<br>" + "Unanswered: " + unanswered + "<br>" + "Wrong Answered: " + loses + "<br>" + "<button id='reset'>Play Again!</button")
	clearInterval(intervalId);
	reset()
}	

function outOfTime() {
	clearInterval(intervalId);
	unanswered++
	$("#questions").html("You ran out of time!")
	$("#choices").html("The correct answer was: " + questions[questionArray].choices[questions[questionArray].answer])
	questionArray++
		if (questionArray === questions.length) {
		done()
		return
	}
	var windowTimeout = setTimeout(function(){
	time = 30
	$("#choices").html("")
	$("#time-remaining").html("Time Remaining: " + time)
	nextQuestion()
	click()
	run()
	}, 4000);
}

function loss() {
	clearInterval(intervalId);
	$("#questions").html("Wrong!!")
	$("#choices").html("The correct answer was: " + questions[questionArray].choices[questions[questionArray].answer] + "<br>" + "<img src='" + questions[questionArray].imageSrc + "'/>")
	questionArray++
	loses++
		if (questionArray === questions.length) {
		done()
		return
	}
	var windowTimeout = setTimeout(function(){
	$("#choices").html("")
	time = 30
	$("#time-remaining").html("Time Remaining: " + time)
	nextQuestion()
	click()
	run()
	}, 4000);
}

function start() {
	$("#questions").html("<button id='start'>START</button>")
	$("#choices").html("")
	$("#time-remaining").html("")
	clearInterval(intervalId)
			$("button").on("click", function(event){
			nextQuestion()
			$("#time-remaining").html("Time Remaining: " + time);
			intervalId = setInterval(decrement, 1000);
			click()
		})
}

function reset () {
	$("button").on("click", function(event) {
		time = 30;
		questionArray = 0;
		correctAnswers = 0;
		unanswered = 0;
		loses = 0;
		$("#choices").html("")
		nextQuestion()
		$("#time-remaining").html("Time Remaining: " + time);
		intervalId = setInterval(decrement, 1000);
		click()
	})
}

start()
