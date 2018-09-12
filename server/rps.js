class RpsGame {
	constructor(p1,p2) {
		this.players = [p1, p2];
		this.turns = [null, null];

		this.players.forEach ((player, index) => {
			player.on('turn', (turn) => {
				this.onTurn(index, turn);
			});
		});

		this.players.forEach((player) => {
			player.emit('message', 'Opponent found...Game Start!');
		});
	}

	sendToPlayers(msg, winner) {
		this.players.forEach((player) => {
			player.emit('result', msg, winner);
			player.emit('message', 'Round Over');
		});
	}

	onTurn(playerIndex, turn) {
		this.turns[playerIndex] = turn;
		this.players[playerIndex].emit('message', `You chose ${turn}`);

		if (playerIndex == 0) {
			this.players[1].emit('message', 'P1 has chosen');
		} else {
			this.players[0].emit('message', 'P2 has chosen')
		}

		this.checkGameOver();
	}

	checkGameOver() {
		const turns = this.turns;
		if (turns[0] && turns[1]) {
			var winner = this.getGameResult();
			this.sendToPlayers(`P1 chose ${turns[0]} : P2 chose ${turns[1]}`, winner);

			this.turns = [null, null];
		}
	}

	getGameResult() {
		//console.log(this.turns[0] + this.turns[1]);
		switch (this.turns[0] + this.turns[1]) {
			case "RockScissors":
			case "PaperRock":
			case "ScissorsPaper":
				return 'P1 wins';
				break;

			case "RockPaper":
			case "PaperScissors":
			case "ScissorRock":
				return 'P2 wins';
				break;

			case "RockRock":
			case "PaperPaper":
			case "ScissorScissors":
				return `It's a draw`;
				break;
		}
	}
}

module.exports = RpsGame;