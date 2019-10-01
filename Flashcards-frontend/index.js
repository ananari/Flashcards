//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const navigationBar = document.getElementById('navigation-bar');
const myDecksDropdown = document.getElementById('my-decks-dropdown');
const sharedDecksDropdown = document.getElementById('shared-decks-dropdown')
const deckWindow = document.getElementById('deck-window');
const cardWindow = document.querySelector('#card-window');
const cardDiv = document.querySelector('#cards');
const decksURL = `http://localhost:3000/decks`;

function fetchDecks() {
    fetch(decksURL)
        .then(response => response.json() )
        .then(deckData => {
            clearEverything
            myDecksButton(deckData);
        })
}

function myDecksButton(deckData) {
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
    //display decks banner
    const myDecksBanner = document.createElement('h1')
    myDecksBanner.innerText = `These are all the decks you've created!`;
    deckWindow.appendChild(myDecksBanner);

    //create a "New Deck" button
    const p = document.createElement('p');
    p.innerText = 'Create a New Deck: '
    const newDeckButton = document.createElement('button');
    newDeckButton.innerText = `New Deck`;
    p.appendChild(newDeckButton);
    
    //append to Deck window
    deckWindow.appendChild(p);

    //add event listener for click
    newDeckButton.addEventListener('click', (event) => {
        console.log("'New Deck' button has been clicked");
        clearDeckWindow();
        clearCardWindow();
        clearCardDiv();
        createDeckForm();
    })

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
        });

        //edit deck button
        const editDeckButton = document.createElement('button');
        editDeckButton.innerText = ' Edit ';
        li.appendChild(editDeckButton);
        editDeckButton.addEventListener('click', (event) => {
            console.log('edit button has been pushed');
            
            //  PLACEDHOLDER FOR DISPLAYDECK FUNCTION
        });

        //delete deck button
        const deleteDeckButton = document.createElement('button');
        deleteDeckButton.innerText = ' Delete ';
        li.appendChild(deleteDeckButton);
        deleteDeckButton.addEventListener('click', (event) => {
            console.log('delete button has been pushed');
            clearDeckWindow();
            deleteDeck(deck.id);
        });

        //append to main window area
        deckWindow.appendChild(li);
    }
}

function createDeckForm() {
    //create Form for new deck
    const newDeckForm = document.createElement('form');
    
    //label of name input box
    const newDeckNameLabel = document.createElement('p');
    newDeckNameLabel.innerText = "Name of new deck: ";
    newDeckForm.appendChild(newDeckNameLabel);

    //value of name input box
    const newDeckNameInput = document.createElement('input');
    newDeckNameInput.setAttribute('type', 'text');
    newDeckForm.appendChild(newDeckNameInput);

    //label of user input box
    const newDeckUserLabel = document.createElement('p');
    newDeckUserLabel.innerText = "User of new deck: ";
    newDeckForm.appendChild(newDeckUserLabel);

    //value of label input box
    const newDeckUserInput = document.createElement('input');
    newDeckUserInput.setAttribute('type', 'number');
    newDeckForm.appendChild(newDeckUserInput);

    //submit button
    const newDeckSubmitButton = document.createElement('input');
    newDeckSubmitButton.setAttribute('type', 'Submit')
    newDeckForm.appendChild(newDeckSubmitButton);

    deckWindow.appendChild(newDeckForm);

    //add event listener and action for submit button
    newDeckSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();
        newDeckNameValue = newDeckNameInput.value;
            //console.log("New Deck Name Value = ", newDeckNameValue);
        newDeckUserValue = newDeckUserInput.value;
            //console.log("New User Name Value = ", newDeckUserValue);
        clearDeckWindow();
        clearCardWindow();
        clearCardDiv();
        createNewDeck(newDeckNameValue, newDeckUserValue);
    })
}

function createNewDeck(newDeckNameValue, newDeckUserValue) {
    let newDeckData = {
        name: newDeckNameValue,
        user_id: newDeckUserValue
    }

    let newDeckObject = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDeckData)
    }

    fetch(decksURL, newDeckObject)
        .then(response => response.json() )
        .then( (deckData) => {
            loadDecks(deckData);
        })
        .catch(error => console.log(error));
}

function deleteDeck(deckID) {
    let deleteURL = `http://localhost:3000/decks/` + deckID;

    let deleteObject = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch(deleteURL, deleteObject)
    .then(response => response.json() )
    .then( (deckData) => {
        loadDecks(deckData);
    })
    .catch(error => console.log(error));
}

function clearDeckWindow() {
    while (deckWindow.hasChildNodes() ) {  
        deckWindow.removeChild(deckWindow.firstChild);
    }
}

function clearNavigationBar() {
    while (navigationBar.hasChildNodes() ) {  
        navigationBar.removeChild(navigationBar.firstChild);
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

function clearEverything() {
    clearCardWindow();
    clearDeckWindow();
    clearNavigationBar();
    clearCardDiv();
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