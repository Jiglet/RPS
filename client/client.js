let p1Score = 0;
let p2Score = 0;
let round = 1;
const p1Score_span = document.getElementById("player1-score");
const p2Score_span = document.getElementById("player2-score");
const scoreBoard_div = document.querySelector(".scoreboard");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");

const writeEvent = (text) => {
	const parent = document.querySelector('#events');

	const el = document.createElement('p');
	el.innerHTML = text;

	parent.appendChild(el);
};

const onFormSubmitted = (e) => {
	e.preventDefault();

	const input = document.querySelector('#chat');
	const text = input.value;
	input.value = '';

	sock.emit('message', text);
};

const writeResult = (text, winner) => {
	if (winner == "P1 wins") {
		p1Score++;
		p1Score_span.innerHTML = p1Score;
		p2Score_span.innerHTML = p2Score;
	} else if (winner == "P2 wins") {
		p2Score++;
		p1Score_span.innerHTML = p1Score;
		p2Score_span.innerHTML = p2Score;
	}

	var yeet = document.querySelector('.round');
	yeet.innerHTML = `Round ${round}`;
	round++;

	const yuh = document.querySelector('.result');
	yuh.innerHTML = text + "<br />" + winner + "!";
};

const sock = io();
sock.on('message', writeEvent);
sock.on('result', writeResult)

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);

/*function getComputerChoice() {
	const choices = ['r', 'p', 's'];
	const randomNum = Math.floor(Math.random() * 3);
	return choices[randomNum];
}

function convertToWord(letter) {
	if (letter === "r") return "Rock";
	if (letter === "p") return "Paper";
	if (letter === "s") return "Scissors";
}

function win(userChoice, computerChoice) {
	p1Score++;
	p1Score_span.innerHTML = p1Score;
	p2Score_span.innerHTML = p2Score;
	result_p.innerHTML = `<span style = 'color: #f92c2c;'>${convertToWord(userChoice)}</span> beats <span style = 'color: #3375A3;'>${convertToWord(computerChoice)}</span> You win!`;
}

function lose(userChoice, computerChoice) {
	p2Score++;
	p1Score_span.innerHTML = p1Score;
	p2Score_span.innerHTML = p2Score;
	result_p.innerHTML = `<span style = 'color: #f92c2c;'>${convertToWord(userChoice)}</span> loses to <span style = 'color: #3375A3;'>${convertToWord(computerChoice)}</span> You lose :(`;
}

function draw(userChoice, computerChoice) {
	result_p.innerHTML = `<span style = 'color: #f92c2c;'>${convertToWord(userChoice)}</span> ties with <span style = 'color: #3375A3;'>${convertToWord(computerChoice)}</span> It's a draw.`;
}

function game(userChoice) {
	const computerChoice = getComputerChoice();
	switch (userChoice + computerChoice) {
		case "rs":
		case "pr":
		case "sp":
			win(userChoice, computerChoice);
			break;

		case "rp":
		case "ps":
		case "sr":
			lose(userChoice, computerChoice);
			break;

		case "rr":
		case "pp":
		case "ss":
			draw(userChoice, computerChoice);
			break;
	}
}*/

function main() {
	rock_div.addEventListener('click', function() {
		sock.emit('turn', "Rock");
		//game("r");
	})

	paper_div.addEventListener('click', function() {
		sock.emit('turn', "Paper");
		//game("p");
	})

	scissor_div.addEventListener('click', function() {
		sock.emit('turn', "Scissors");
		//game("s");
	})
}

main();