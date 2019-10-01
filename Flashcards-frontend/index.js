//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const navigationBar = document.getElementById('navigation-bar');
const myDecksDropdown = document.getElementById('my-decks-dropdown');
const sharedDecksDropdown = document.getElementById('shared-decks-dropdown')
const deckWindow = document.getElementById('deck-window');
const cardWindow = document.querySelector('#card-window');
const cardDiv = document.querySelector('#cards');
const cardsURL = "http://localhost:3000/cards";
const decksURL = `http://localhost:3000/decks`;
const deckURL = id => `http://localhost:3000/decks/${id}`;
const cardURL = id => `http://localhost:3000/cards/${id}`;

function fetchDecks() {
    fetch(decksURL)
        .then(response => response.json() )
        .then(deckData => {
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
    fetch(deckURL(deckId))
    .then(res => res.json())
    .then(function(json){
        let card_index = 0;
        let shuffled = shuffleCards(json.cards);
        displayCard(shuffled[card_index]); 
        let next = document.createElement('button');
        let newCard = document.createElement('button');
        let editCard = document.createElement('button');
        let deleteCard = document.createElement('button');
        next.innerText = 'Next';
        newCard.innerText = "New card";
        editCard.innerText = "Edit card";
        deleteCard.innerText = "Delete card"; 
        cardWindow.appendChild(next);
        cardWindow.appendChild(newCard);
        cardWindow.appendChild(editCard);
        cardWindow.appendChild(deleteCard);
        
        next.addEventListener('click', function(){
            if((card_index < shuffled.length - 1)){
                cardDiv.innerHTML = "";
                displayCard(shuffled[++card_index]);
            }
            else{
                alert('You have reached the end of your cards!');
            }
            let forms = cardWindow.querySelectorAll('form');
            if(forms){
                for(const form of forms){
                    cardWindow.removeChild(form);
                }
            }
        })
        newCard.addEventListener('click', function(){
            let form = document.createElement('form');
            let frontlabel = document.createElement('p');
            frontlabel.innerText = "Front side:"
            let frontinput = document.createElement('input');
            frontinput.setAttribute('type', 'text');
            let backlabel = document.createElement('p');
            backlabel.innerText = "Back side:"
            let backinput = document.createElement('input');
            backinput.setAttribute('type', 'text');
            let submit = document.createElement('input');
            submit.setAttribute('type', 'submit');
            form.appendChild(frontlabel);
            form.appendChild(frontinput);
            form.appendChild(backlabel);
            form.appendChild(backinput);
            form.appendChild(submit);
            cardWindow.appendChild(form);
            submit.addEventListener('click', function(event){
                event.preventDefault();  
                let postdata = {                
                    front: frontinput.value,
                    back: backinput.value,
                    deck_id: deckId
                }
                // shuffled.push(postdata);
                let postconfig = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(postdata)
                }
                fetch(cardsURL, postconfig)
                .then(res => res.json())
                .then(function(json){
                    shuffled.push(json); 
                })
                .catch(error => console.log(error));
                
            })


        })
        editCard.addEventListener('click', function(){
            let form = document.createElement('form');
            let frontlabel = document.createElement('p');
            frontlabel.innerText = "Front side:"
            let frontinput = document.createElement('input');
            frontinput.setAttribute('type', 'text');
            frontinput.setAttribute('value', shuffled[card_index].front)
            let backlabel = document.createElement('p');
            backlabel.innerText = "Back side:"
            let backinput = document.createElement('input');
            backinput.setAttribute('type', 'text');
            backinput.setAttribute('value', shuffled[card_index].back)
            let submit = document.createElement('input');
            submit.setAttribute('type', 'submit');
            form.appendChild(frontlabel);
            form.appendChild(frontinput);
            form.appendChild(backlabel);
            form.appendChild(backinput);
            form.appendChild(submit);
            cardWindow.appendChild(form);
            submit.addEventListener('click', function(event){
                event.preventDefault();  
                let patchdata = {                
                    front: frontinput.value,
                    back: backinput.value,
                    deck_id: deckId
                }
                // shuffled.push(postdata);
                let patchconfig = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(patchdata)
                }
                fetch(cardURL(shuffled[card_index].id), patchconfig)
                .then(res => res.json())
                .then(function(json){
                    shuffled[card_index] = json; 
                    clearCardDiv();
                    displayCard(shuffled[card_index]);
                })
                .catch(error => console.log(error));
                
            })
            
        })
        deleteCard.addEventListener('click', function(){
            let result = confirm("Are you sure? You won't be able to undo this!")
            if(result){
                let delconfig = {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    }
                }
                fetch(cardURL(shuffled[card_index].id), delconfig)
                .catch(error => console.log(error));
                
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