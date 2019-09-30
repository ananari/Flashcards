//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const navigationBar = document.getElementById('navigation-bar');
const deckWindow = document.getElementById('deck-window');
const cardWindow = document.querySelector('#card-window');
const cardDiv = document.querySelector('#cards');
const decksURL = `http://localhost:3000/decks`;

function fetchDecks() {
    fetch(decksURL)
        .then(response => response.json() )
        .then(deckData => {
            displayMyDecksButton(deckData);
        })
}

function displayMyDecksButton(deckData) {
    //create button for "My Decks"
    const myDecksButton = document.createElement('button');
    myDecksButton.innerText = 'My Decks';
    //append to Deck Nevigation nav tag
    navigationBar.appendChild(myDecksButton);
    //add event listener for click
    myDecksButton.addEventListener('click', (event) => {
        console.log("'My Decks' button has been clicked");
        clearDeckWindow();
        clearCardWindow();
        clearCardDiv();
        loadDecks(deckData);
    });
};

function loadDecks(deckData) {
    //display view name and instructions
    const myDecksBanner = document.createElement('h1')
    myDecksBanner.innerText = `These are all the decks you've created!`;
    deckWindow.appendChild(myDecksBanner);
    const instructions = document.createElement('h3');
    instructions.innerText = `click on a deck to go into study mode`;
    deckWindow.appendChild(instructions);

    //displays each deck with delete button on main window
    displayDecks(deckData)

}

function displayDecks(deckData) {
    for (const deck of deckData) {
        //console.log("deck name = ", deck)
        
        //create li for each deck with it's name
        const li = document.createElement('li');
        li.innerText = deck.name; //would be nice to display number of cards in each deck
        
        //study deck button
        const studyDeckButton = document.createElement('button');
        studyDeckButton.innerText = ' Study ';
        li.appendChild(studyDeckButton);
        studyDeckButton.addEventListener('click', (event) => {
            console.log('study button has been pushed');
            clearDeckWindow();
            displayDeck(deck.id);
        })

        //edit deck button
        const editDeckButton = document.createElement('button')
        editDeckButton.innerText = ' Edit '
        li.appendChild(editDeckButton)
        editDeckButton.addEventListener('click', (event) => {
            console.log('edit button has been pushed')
            
            //  PLACEDHOLDER FOR DISPLAYDECK FUNCTION
        })

        //delete deck button
        const deleteDeckButton = document.createElement('button')
        deleteDeckButton.innerText = ' Delete '
        li.appendChild(deleteDeckButton)
        deleteDeckButton.addEventListener('click', (event) => {
            console.log('delete button has been pushed')

            //  PLACEDHOLDER FOR DELETEDECK FUNCTION
        })

        //append to main window area
        deckWindow.appendChild(li);
    }
}

function clearDeckWindow() {
    while (deckWindow.hasChildNodes() ) {  
        deckWindow.removeChild(deckWindow.firstChild);
    }
}

function clearCardWindow() {
    while (cardWindow.hasChildNodes() ) {  
        cardWindow.removeChild(cardWindow.firstChild);
    }
}

function clearCardDiv() {
    while (cardDiv.hasChildNodes() ) {  
        cardDiv.removeChild(cardDiv.firstChild);
    }
}


function displayDeck(deckId){
    const deckURL = id => `http://localhost:3000/decks/${id}`;
    fetch(deckURL(deckId))
    .then(res => res.json())
    .then(function(json){
        let card_index = 0;
        let shuffled = shuffleCards(json.cards);
        displayCard(shuffled[card_index]); 
        let next = document.createElement('button');
        next.innerText = 'next';
        cardWindow.appendChild(next);
        
        next.addEventListener('click', function(){
            if(card_index < shuffled.length - 1){
                cardDiv.innerHTML = "";
                displayCard(shuffled[++card_index]);
            }
            else {
                alert('You have reached the end of your cards!');
            }
        })
    })
    .catch(error => console.log(error));
}

function displayCard(obj){
    let p = document.createElement('p');
    p.innerText = obj.front;
    let isFront = true;
    cardDiv.appendChild(p);
    p.addEventListener('click', function(){
        isFront = !(isFront);
        if(isFront){
            p.innerText = obj.front;
        }
        else {
            p.innerText = obj.back;
        }
    })
}

function shuffleCards(cards){
    let newcards = [...cards];
    for(let i = newcards.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = newcards[i]
        newcards[i] = newcards[j]
        newcards[j] = temp
    }
    return newcards;

}

fetchDecks();