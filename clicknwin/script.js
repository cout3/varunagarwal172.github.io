$(document).ready(function (e) {

	let boardSize = 0,
		startTimer,
		initialTime = $('.game-timer span').text(),
		highestScore = parseInt($(".game-high-score span").text()),
		playerScore = parseInt($(".game-player-score span").text());

	$(".game-level-option li").on("click", function (e) {
		let boardHtml = "";

		//Get the highest score if exists while we reload the page
		if(localStorage.getItem('highestScore')) {
			$(".game-high-score span").text(localStorage.getItem('highestScore'));
		}

		//represents the size of board. If 3x3 then 3 etc.
		boardSize = $(this).attr("data-board-size");

	    for(let i=0; i<(boardSize * boardSize); i++) { //since the cells should be n x n so using loop till boardSize x boardSize
	    	boardHtml+='<div class="board-cell" style="width:calc(100%/' + boardSize + '); height:calc(100%/' + boardSize + ')"></div>'; //create the cells of the board
	    }

	    $(".game-board-wrapper").css({'width': boardSize*100,'height': boardSize*100}).html(boardHtml); //setting the equal height and width of the cells
	    $(".game-wrapper, .game-level-option-wrapper").toggleClass("active"); //to show the game board after selection of difficulty level
	});

	
	//code to start, reset and exit the game
	$(".game-option div").on("click", function () {
        timerBar($(this)); //function calculates the timer and on its basis other functionality will be done
	});

	//code to evaluate the player score and update highest score if it is lesser than player score
	$(".game-board-wrapper").on("click", ".board-cell", function (e) {
		$(this).hasClass("active") ? playerScore++ : (playerScore > 0 ? playerScore-- : playerScore = 0);
		
		$(".game-player-score span").text(playerScore);

		if(playerScore > highestScore) {
			highestScore = playerScore;
			$(".game-high-score span").text(highestScore)
			localStorage.setItem('highestScore', highestScore);
		}

		$(this).addClass("no-pointer-events");
	});

	timerBar = function(ele) { 
		let eleName = ele[0].id, //requires to check what needs to be done i.e. start, reset and exit the game
			activeCellIndex = 0; //var to determine which index is active right now

		//start game
		if(eleName == "game-start") {
			ele.addClass("disabled");
			startTimer = setInterval(function() {

				let time = $('.game-timer span').text(),
					min = time.split(":")[0],
					sec = time.split(":")[1],
					cellIndex = Math.floor(Math.random() * (boardSize * boardSize));

					while(activeCellIndex == cellIndex) {
						cellIndex = Math.floor(Math.random() * (boardSize * boardSize));
					}
					activeCellIndex = cellIndex;

					if(sec > 0) {
						sec = (sec > 10) ? parseInt(sec - 1) : "0" + parseInt(sec - 1), time = min + ":" + sec;
					}
					else if(sec == 0 && min > 0) {
						min = (min > 10) ? min = parseInt(min - 1) : min = "0" + parseInt(min - 1), time = min + ":59";
					}
					else if(time == "00:00") {
						clearInterval(startTimer);
						$('.game-timer span').text(time);
						$(".board-cell").removeClass("active");
						alert("Game Over !!!");
						exitGame();
						//As an option we can also opt for location.reload();
					}

					$(".board-cell").removeClass("active no-pointer-events");
					$(".board-cell").eq(activeCellIndex).addClass("active");
					$('.game-timer span').text(time);
			}, 1000);
		}
		else if(eleName == "game-exit") { //exit game to initial stage
			exitGame();
			//As an option we can also opt for location.reload();
		}
		else if(eleName == "game-restart") { //restart game
			resetGame();
		}

		else return false;

    },

    resetGame = function() {
    	playerScore = 0;
    	$("#game-start").removeClass("disabled");
    	$('.game-timer span').text(initialTime);
    	$(".game-player-score span").text(playerScore);
    	$(".board-cell").removeClass("active");
    	clearInterval(startTimer);
    	
    },

    exitGame = function () {
    	resetGame();
		$(".game-wrapper, .game-level-option-wrapper").toggleClass("active");
    }
});