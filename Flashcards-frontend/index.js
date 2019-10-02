//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const navigationBar = document.getElementById('navigation-bar');
const myDecksButton = document.getElementById('my-decks-button')
const myDecksWindow = document.getElementById('my-decks-window');
const deckWindow = document.getElementById('deck-window')
const cardWindow = document.querySelector('#card-window');
const cardDiv = document.querySelector('#cards');
const signUp = document.querySelector('#sign-up');
const loginForm = document.querySelector('#login-form');
const check = document.querySelector('#check');
const cardsURL = "http://localhost:3000/cards";
const decksURL = `http://localhost:3000/decks`;
const sessionsURL = "http://localhost:3000/sessions";
const deckURL = id => `http://localhost:3000/decks/${id}`;
const cardURL = id => `http://localhost:3000/cards/${id}`;



signUp.addEventListener('click', function(event){
    event.preventDefault();
    console.log('im clik');
    clearDeckWindow();
    clearCardDiv();
    clearCardWindow();
    clearLoginForm();
    let form = document.createElement('form');
    let usernamelabel = document.createElement('p');
    usernamelabel.innerText = "Username:"
    let usernameinput = document.createElement('input');
    usernameinput.setAttribute('type', 'text');
    // let emaillabel = document.createElement('p');
    // emaillabel.innerText = "Back side:"
    // let emailinput = document.createElement('input');
    // emailinput.setAttribute('type', 'text');
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    form.appendChild(usernamelabel);
    form.appendChild(usernameinput);
    // form.appendChild(emaillabel);
    // form.appendChild(emailinput);
    form.appendChild(submit);
    loginForm.appendChild(form);
    submit.addEventListener('click', function(event){
        event.preventDefault();
        postdata = {username: usernameinput.value}
        postconfig = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(postdata)
        }
        fetch(sessionsURL, postconfig)
        .then(res => res.json())
        .then(function(json){
            Cookies.set('username', json.username);
        })
        .catch(error => console.log(error));
    })
    
})



check.addEventListener('click', function(){
    // fetch(sessionsURL)
    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(error => console.log(error));
    console.log(Cookies.get());
})

//add event listener for click
myDecksButton.addEventListener('click', (event) => {
    //console.log("'My Decks' button has been clicked via ", event);
    clearEverything();
    fetchDecks();
});

function fetchDecks() {
    fetch(decksURL)
        .then(response => response.json() )
        .then(deckData => {
            loadDecks(deckData);
        })
}

function loadDecks(deckData) {
    //display decks banner
    const myDecksBanner = document.createElement('h1')
    myDecksBanner.innerText = `These are all the flashcard decks you've created!`;
    myDecksWindow.appendChild(myDecksBanner);

    //create a "New Deck" button
    const newDeck = document.createElement('h3');
    newDeck.innerText = 'Create a New Deck with '
    const newDeckButton = document.createElement('button');
    newDeckButton.innerText = `Magic`;
    newDeckButton.style.backgroundColor = "MediumOrchid";
    newDeck.appendChild(newDeckButton);
    
    //append to mydecksWindow
    myDecksWindow.appendChild(newDeck);

    //add event listener for click
    newDeckButton.addEventListener('click', (event) => {
        console.log("'New Deck' button has been clicked");
        clearEverything();
        createDeckForm();
    })

    //bootstrap displaydecks into cards
    displayDecks2(deckData)
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
            clearDeckWindow();
            editDeckForm(deck);
        });

        //delete deck button
        const deleteDeckButton = document.createElement('button');
        deleteDeckButton.innerText = ' Delete ';
        li.appendChild(deleteDeckButton);
        deleteDeckButton.addEventListener('click', (event) => {
            console.log('delete button has been pushed');
            let result = confirm("Are you sure? You won't be able to undo this!")
            if(result) {
                clearDeckWindow();
                deleteDeck(deck);
            }
        });

        //append to main window area
        deckWindow.appendChild(li);
    }
}

function displayDecks2(deckData) {
    for (const deck of deckData) {
        //console.log("deck name = ", deck)
        
        //create deck div
        const newDiv = document.createElement('div');
        newDiv.classList.add("deck");
        deckWindow.appendChild(newDiv);
        
        //add deck name
        const deckName = document.createElement('h3');
        deckName.innerText = `${deck.name}`;
        newDiv.appendChild(deckName);

        //add # of cards
        const deckCards = document.createElement('h4');
        deckCards.innerText = `(contains ${deck.cards.length} cards)`;
        newDiv.appendChild(deckCards);
        
        //study deck button
        const studyDeckButton = document.createElement('button');
        studyDeckButton.innerText = '  Study!  ';
        studyDeckButton.style.backgroundColor = "lightgreen"
        newDiv.appendChild(studyDeckButton);
        studyDeckButton.addEventListener('click', (event) => {
            console.log('study button has been pushed');
            clearEverything();
            displayDeck(deck.id);
        });

        //edit deck button
        const editDeckButton = document.createElement('button');
        editDeckButton.innerText = '  Edit  ';
        editDeckButton.style.backgroundColor = "lightgoldenrodyellow"
        newDiv.appendChild(editDeckButton);
        editDeckButton.addEventListener('click', (event) => {
            console.log('edit button has been pushed');
            clearEverything();
            editDeckForm(deck);
        });

        //delete deck button
        const deleteDeckButton = document.createElement('button');
        deleteDeckButton.innerText = '  Delete  ';
        deleteDeckButton.style.backgroundColor = "lightcoral"
        newDiv.appendChild(deleteDeckButton);
        deleteDeckButton.addEventListener('click', (event) => {
            console.log('delete button has been pushed');
            let result = confirm("Are you sure? You won't be able to undo this!")
            if(result) {
                clearEverything();
                deleteDeck(deck);
            }
        });

        //append to main window area
        deckWindow.appendChild(newDiv);
    }
}

function createDeckForm() {
    //form title
    const formTitle = document.createElement('h3');
    formTitle.innerText = 'Create a new deck:';
    myDecksWindow.appendChild(formTitle);
    
    //create Form for new deck
    const newDeckForm = document.createElement('form');
    
    //label of name input box
    const newDeckNameLabel = document.createElement('p');
    newDeckNameLabel.innerText = "Name of new deck: ";
    newDeckForm.appendChild(newDeckNameLabel);

    //value of name input box
    const newDeckNameInput = document.createElement('input');
    newDeckNameInput.setAttribute('type', 'text');
    newDeckNameInput.setAttribute('placeholder', 'Enter deck name');
    newDeckForm.appendChild(newDeckNameInput);

    //label of user input box
    const newDeckUserLabel = document.createElement('p');
    newDeckUserLabel.innerText = "User of new deck: ";
    newDeckForm.appendChild(newDeckUserLabel);

    //value of label input box
    const newDeckUserInput = document.createElement('input');
    newDeckUserInput.setAttribute('type', 'number');
    newDeckUserInput.setAttribute('placeholder', 'Enter user id');
    newDeckForm.appendChild(newDeckUserInput);

    //submit button
    const newDeckSubmitButton = document.createElement('input');
    newDeckSubmitButton.setAttribute('type', 'Submit');
    newDeckForm.appendChild(newDeckSubmitButton);

    deckWindow.appendChild(newDeckForm);

    //add event listener and action for submit button
    newDeckSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();
        newDeckNameValue = newDeckNameInput.value;
            //console.log("New Deck Name Value = ", newDeckNameValue);
        newDeckUserValue = newDeckUserInput.value;
            //console.log("New User Name Value = ", newDeckUserValue);
        clearEverything();
        createDeck(newDeckNameValue, newDeckUserValue);
    })
}

function editDeckForm(deck) {
    //form title
    const formTitle = document.createElement('h3');
    formTitle.innerText = `Edit the ${deck.name} deck: `;
    deckWindow.appendChild(formTitle);

    //create form for editing name of deck
    const editDeckForm = document.createElement('form');
    
    //label of name input box
    const editDeckNameLabel = document.createElement('p');
    editDeckNameLabel.innerText = "Rename deck to: ";
    editDeckForm.appendChild(editDeckNameLabel);

    //value of name input box
    const editDeckNameInput = document.createElement('input');
    editDeckNameInput.setAttribute('type', 'text');
    editDeckForm.appendChild(editDeckNameInput);

    //label of user input box
    const editDeckUserLabel = document.createElement('p');
    editDeckUserLabel.innerText = "User of new deck: ";
    editDeckForm.appendChild(editDeckUserLabel);

    //value of label input box
    const editDeckUserInput = document.createElement('input');
    editDeckUserInput.setAttribute('type', 'number');
    editDeckForm.appendChild(editDeckUserInput);

    //submit button
    const editDeckSubmitButton = document.createElement('input');
    editDeckSubmitButton.setAttribute('type', 'Submit');
    editDeckForm.appendChild(editDeckSubmitButton);

    deckWindow.appendChild(editDeckForm);

    //add event listener and action for submit button
    editDeckSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();
        editDeckNameValue = editDeckNameInput.value;
            //console.log("New Deck Name Value = ", editDeckNameValue);
        editDeckUserValue = editDeckUserInput.value;
            //console.log("New Deck Name Value = ", editDeckNameValue);
        clearEverything();
        editDeck(deck, editDeckNameValue, editDeckUserValue);
    });
}

function createDeck(newDeckNameValue, newDeckUserValue) {
    let newDeckData = {
        name: newDeckNameValue,
        user_id: newDeckUserValue
    };

    let newDeckObject = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDeckData)
    };

    fetch(decksURL, newDeckObject)
        .then(response => response.json() )
        .then( (deckData) => {
            fetchDecks(deckData);
        })
        .catch(error => console.log(error));
}

function deleteDeck(deck) {
    let deleteDeckURL = `http://localhost:3000/decks/` + deck.id;

    let deleteDeckObject = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    
    fetch(deleteDeckURL, deleteDeckObject)
    .then(response => response.json() )
    .then( (deckData) => {
        fetchDecks(deckData);
    })
    .catch(error => console.log(error));
}

function editDeck(deck, editDeckNameValue, editDeckUserValue) {
    let editDeckURL = `http://localhost:3000/decks/` + deck.id;
        console.log("editDeckURL = ", editDeckURL)
    
    let editDeckData = {
        name: editDeckNameValue,
        user_id: editDeckUserValue
    };

    let editDeckObject = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editDeckData)
    };

    fetch(editDeckURL, editDeckObject)
        .then(response => response.json() )
        .then( (deckData) => {
            console.log("response from edit deck fxn: ",deckData)
            fetchDecks(deckData);
        })
        .catch(error => console.log(error));
}


// **************************** CLEAR FUNCTIONS ********************************

function clearDeckWindow() {
    while (deckWindow.hasChildNodes() ) {  
        deckWindow.removeChild(deckWindow.firstChild);
    }
}

function clearMyDecksWindow() {
    while (myDecksWindow.hasChildNodes() ) {  
        myDecksWindow.removeChild(myDecksWindow.firstChild);
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

function clearLoginForm() {
    while (loginForm.hasChildNodes() ) {  
        loginForm.removeChild(loginForm.firstChild);
    }
}

function clearEverything() {
    clearMyDecksWindow();
    clearDeckWindow();
    clearCardWindow();
    clearCardDiv();
    clearLoginForm();
}

//*******************************CARD FUNCTIONS********************************

function displayDeck(deckId){
    fetch(deckURL(deckId))
    .then(res => res.json())
    .then(function(json){
        if(!(json.cards.length === 0)){
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
        }
        else{
            let shuffled = json.cards;
            let newCard = document.createElement('button');
            newCard.innerText = "New card";
            cardWindow.appendChild(newCard);
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
        }
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
