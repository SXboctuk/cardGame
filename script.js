
window.addEventListener('DOMContentLoaded', () => {
	const templateCard = document.querySelector('.card-template');
	const templateWin = document.querySelector('.win-template');
	const rootNode = document.querySelector('.root');
	const scoreCounter = document.querySelector('.score-panel_counter');
	const scorePanel = document.querySelector('.score-panel');
	const btn4x4 = document.querySelector('.control-panel_button-4x4');
	const btn6x6 = document.querySelector('.control-panel_button-6x6');
	const btn8x8 = document.querySelector('.control-panel_button-8x8');
	const btnExit = document.querySelector('.control-panel_button-exit');

	btn4x4.addEventListener('click', () => {
		hiddenStartMenu();
		cardGame(4, 'card_4x4');
	});
	btn6x6.addEventListener('click', () => {
		hiddenStartMenu();
		cardGame(6, 'card_6x6');
	});
	btn8x8.addEventListener('click', () => {
		hiddenStartMenu();
		cardGame(8, 'card_8x8');
	});
	btnExit.addEventListener('click', () => {
		showStartMenu();

		rootNode.innerHTML = '';
	})

	function hiddenStartMenu() {
		btn4x4.classList.add('hidden');
		btn6x6.classList.add('hidden');
		btn8x8.classList.add('hidden');
		scorePanel.classList.remove('hidden');
		btnExit.classList.remove('hidden');
	}
	function showStartMenu() {
		btn4x4.classList.remove('hidden');
		btn6x6.classList.remove('hidden');
		btn8x8.classList.remove('hidden');
		scorePanel.classList.add('hidden');
		btnExit.classList.add('hidden');
	}

	

	function cardGame(size, classSizeCard) {
		let score = 0;
		let scoreBonus = 0;
		let bonus = 0;
		let cardNode = [];

		let imgNumber = new Set();
		let checkProcessing = false;

		let selected = {first: null, second: null};

		// generate picture number
		while(imgNumber.size < ((size*size)/2)) {
			imgNumber.add(Math.floor(1 + Math.random() * 32));
		}

		// create cards
		for(let num of imgNumber){
			const firstCloneCard = templateCard.content.cloneNode(true);
			firstCloneCard.querySelector('.card__back-img').src = `./image/${num}.png`;
			firstCloneCard.querySelector('.card').classList.add(classSizeCard);

			const secondCloneCard = templateCard.content.cloneNode(true);
			secondCloneCard.querySelector('.card__back-img').src = `./image/${num}.png`;
			secondCloneCard.querySelector('.card').classList.add(classSizeCard);
			

			cardNode = [...cardNode, firstCloneCard, secondCloneCard];
		}


		// console.log(cardNode.size);
		shuffle(cardNode);
		// add card
		rootNode.innerHTML = ""
		cardNode.forEach(elem => {
			rootNode.appendChild(elem);
		});

		cardNode = document.querySelectorAll('.card');
		scoreCounter.textContent = score;

		
		cardNode.forEach(elem => {
			// elem.classList.add(classSizeCard);
			elem.addEventListener('click', select);
		})

		function select(event){
			if (checkProcessing === false)
			{
				event.currentTarget.querySelector('.card__inner').classList.add('card__inner_selected');

				if (selected.first === null) {
					selected.first = event.currentTarget;
				}
				else if (selected.second === null) {
					selected.second = event.currentTarget;
					checkProcessing = true;
					setTimeout(() => {
						if(selected.first.querySelector('.card__back-img').src === selected.second.querySelector('.card__back-img').src) {
							selected.first.querySelector ('.card__front').classList.add('card__inner_done');
							selected.second.querySelector ('.card__front').classList.add('card__inner_done');

							selected.first.removeEventListener('click', select);
							selected.second.removeEventListener('click', select);

							selected.first = null;
							selected.second = null;

							scoreBonus += bonus;
							bonus++;
							score += 1;
							scoreCounter.textContent = score + scoreBonus;
							
							if (score === ((size*size)/2)) {
								showStartMenu();
								rootNode.innerHTML = "";
								const winTemplateClon = templateWin.content.cloneNode(true);
								winTemplateClon.querySelector('.win__score-counter').textContent = score + scoreBonus;
								rootNode.appendChild(winTemplateClon);
							}
						}
						else {
							selected.first.querySelector ('.card__inner').classList.remove('card__inner_selected');
							selected.second.querySelector('.card__inner').classList.remove('card__inner_selected');
							selected.first = null;
							selected.second = null;

							bonus = 0;
						}
						checkProcessing = false;
					}, 1000);
					

				}
			}
		}
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); 

			[array[i], array[j]] = [array[j], array[i]];
 		}
	}
});