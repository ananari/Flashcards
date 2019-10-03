//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const navigationBar = document.getElementById('navigation-bar');
const myDecksButton = document.getElementById('my-decks-button')
const myDecksWindow = document.getElementById('my-decks-window');
const deckWindow = document.getElementById('deck-window')
const cardWindow = document.querySelector('#card-window');
const cardDiv = document.querySelector('#cards');
const logIn = document.querySelector('#log-in');
const signUp = document.querySelector('#sign-up');
const logOut = $('#log-out')[0];
const myProfile = $('#my-profile')[0];
const loginForm = document.querySelector('#login-form');
const flash = $('#flash')[0];
const cardsURL = "http://localhost:3000/cards";
const decksURL = `http://localhost:3000/decks`;
const sessionsURL = "http://localhost:3000/sessions";
const usersURL = "http://localhost:3000/users";
const deckURL = id => `http://localhost:3000/decks/${id}`;
const cardURL = id => `http://localhost:3000/cards/${id}`;
let currentUser = {};
const userURL = () => `http://localhost:3000/users/${currentUser.id}`;

createNavBar(); 

logIn.addEventListener('click', function(event){
    event.preventDefault();
    clearEverything();
    newSession();
})

signUp.addEventListener('click', function(event){
    event.preventDefault();
    clearEverything();
    newUser();
})

logOut.addEventListener('click', function(event){
    event.preventDefault();
    currentUser = {};
    clearEverything();
    cardWindow.innerText = "We hope you had a great day!";
    createNavBar();
})

//add event listener for click
myDecksButton.addEventListener('click', (event) => {
    //console.log("'My Decks' button has been clicked via ", event);
    clearEverything();
    fetchDecks();
});

myProfile.addEventListener('click', function(event){
    event.preventDefault();
    clearEverything();
    editUser();
})

//*********************************USER FUNCTIONS*****************************************/

function newSession(){
    let form = document.createElement('form');
    let usernamelabel = document.createElement('p');
    usernamelabel.innerText = "Username:"
    let usernameinput = document.createElement('input');
    usernameinput.setAttribute('type', 'text');
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    form.appendChild(usernamelabel);
    form.appendChild(usernameinput);
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
            if(json.hasOwnProperty("errors")) {
                console.log(json);
                let errorMsg = "";
                for(const j in json["errors"]){
                    for(const k of json["errors"][j]){
                        errorMsg += `${j} ${k} \n`
                    }
                }
                flash.innerText = errorMsg;
            }
            else {
                currentUser = json; 
                createNavBar();
                clearEverything();
                fetchDecks();
            }
        })
        .catch(error => console.log(error));
    })
}

function newUser(){
    let form = document.createElement('form');
    let usernamelabel = document.createElement('p');
    usernamelabel.innerText = "Username:"
    let usernameinput = document.createElement('input');
    usernameinput.setAttribute('type', 'text');
    let emaillabel = document.createElement('p');
    emaillabel.innerText = "Email:"
    let emailinput = document.createElement('input');
    emailinput.setAttribute('type', 'text');
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    form.appendChild(usernamelabel);
    form.appendChild(usernameinput);
    form.appendChild(emaillabel);
    form.appendChild(emailinput);
    form.appendChild(submit);
    loginForm.appendChild(form);
    submit.addEventListener('click', function(event){
        clearFlash();
        event.preventDefault();
        postdata = {username: usernameinput.value, email: emailinput.value}
        postconfig = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(postdata)
        }
        fetch(usersURL, postconfig)
        .then(res => res.json())
        .then(function(json){
            if(json.hasOwnProperty("errors")) {
                console.log(json);
                let errorMsg = "";
                for(const j in json["errors"]){
                    for(const k of json["errors"][j]){
                        errorMsg += `${j} ${k} \n`
                    }
                }
                flash.innerText = errorMsg;
            }
            else {
                currentUser = json; 
                clearEverything();
                createNavBar(); 
                fetchDecks();
            }
        })
        .catch(error => console.log(error));
    })
}

function editUser(){
    let usernameData = document.createElement('p');
    usernameData.innerText = `Username: ${currentUser.username}`;
    let emailData = document.createElement('p');
    emailData.innerText = `E-mail address: ${currentUser.email}`;
    let edit = document.createElement('button');
    edit.innerText = "edit";
    loginForm.append(usernameData);
    loginForm.append(emailData);
    loginForm.append(edit);
    edit.addEventListener('click', function(){
        let form = document.createElement('form');
        let nameLabel = document.createElement('p');
        nameLabel.innerText = "Username: "
        let nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text'); 
        nameInput.setAttribute('value', currentUser.username);
        let emailLabel = document.createElement('p');
        emailLabel.innerTetx = "E-mail address: ";
        let emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'text');
        emailInput.setAttribute('value', currentUser.email);
        let submit = document.createElement('input')
        submit.setAttribute('type', 'submit');
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(emailLabel);
        form.appendChild(emailInput);
        form.appendChild(submit);
        loginForm.append(form);
        submit.addEventListener('click', function(event){
            event.preventDefault();
            let patchdata = {username: nameInput.value, email: emailInput.value};
            console.log(patchdata);
            let patchconfig = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(patchdata)
            }
            console.log(patchconfig);
            fetch(userURL(), patchconfig)
            .then(res => res.json())
            .then(function(json){
                if(json.hasOwnProperty("errors")) {
                    console.log(json);
                    let errorMsg = "";
                    for(const j in json["errors"]){
                        for(const k of json["errors"][j]){
                            errorMsg += `${j} ${k} \n`
                        }
                    }
                    flash.innerText = errorMsg;
                }
                else {
                    currentUser = json; 
                    createNavBar();
                    clearEverything();
                    editUser();
                }
            });
        })

    })
}

//*********************************DECK FUNCTIONS****************************************/

function fetchDecks() {
    fetch(decksURL)
        .then(response => response.json() )
        .then(deckData => {
            let filteredData = deckData.filter(deck => deck.user_id == currentUser.id)
            loadDecks(filteredData);
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
    newDeckButton.classList.add('new-deck-button')
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
    displayDecks(deckData)
}

function displayDecks(deckData) {
    for (const deck of deckData) {
        //console.log("deck name = ", deck)
        
        //create deck div
        const newDiv = document.createElement('div');
        newDiv.classList.add("deck");
        deckWindow.appendChild(newDiv);
        
        //add deck name
        const deckName = document.createElement('h2');
        deckName.innerText = `${deck.name}`;
        newDiv.appendChild(deckName);

        //add # of cards
        const deckCards = document.createElement('h4');
        deckCards.innerText = `${deck.cards.length} cards`;
        newDiv.appendChild(deckCards);
        
        //study deck button
        const studyDeckButton = document.createElement('button');
        studyDeckButton.innerText = 'Study!';
        studyDeckButton.classList.add('study-button');
        newDiv.appendChild(studyDeckButton);
        studyDeckButton.addEventListener('click', (event) => {
            console.log('study button has been pushed');
            clearEverything();
            displayDeck(deck.id);
        });

        //edit deck button
        const editDeckButton = document.createElement('button');
        editDeckButton.innerText = 'Edit Name';
        editDeckButton.classList.add('edit-button');
        newDiv.appendChild(editDeckButton);
        editDeckButton.addEventListener('click', (event) => {
            console.log('edit button has been pushed');
            clearEverything();
            editDeckForm(deck);
        });

        //view all cards button
        const viewAllCardsButton = document.createElement('button');
        viewAllCardsButton.innerText = 'View All';
        viewAllCardsButton.classList.add('viewAll-button');
        newDiv.appendChild(viewAllCardsButton);
        viewAllCardsButton.addEventListener('click', (event) => {
            console.log('view all cards button has been pushed');
            clearEverything();
            displayAllCards(deck);
        });        

        //delete deck button
        const deleteDeckButton = document.createElement('button');
        deleteDeckButton.innerText = 'Delete';
        deleteDeckButton.classList.add('delete-button')
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

function displayAllCards(deck) {
    console.log("displayAllCards deckID = ", deck.cards)
    //create front column and attach to deck window
    const frontColumn = document.createElement('col');
    frontColumn.innerText = 'Front of card';
    frontColumn.setAttribute('id', 'front-column')
    frontColumn.classList.add('viewAll-column');
    deckWindow.appendChild(frontColumn);
    //create back column and attach to deck window
    const backColumn = document.createElement('col');
    backColumn.innerText = 'Back of card';
    backColumn.setAttribute('id', 'back-column')
    backColumn.classList.add('viewAll-column');
    deckWindow.appendChild(backColumn);
    
    for (const card of deck.cards) {
        
        //add front of card to row and append to front column
            //console.log("front of card = ", card.front)
        const frontRow = document.createElement('row');
        const frontDiv = document.createElement('div');
        frontDiv.innerText = card.front;
        frontDiv.classList.add('card-front');
        frontRow.appendChild(frontDiv);
        frontColumn.appendChild(frontRow);

        //add back of card to row and append to back column
            //console.log("back of card = ", card.back)
        const backRow = document.createElement('row')
        const backDiv = document.createElement('div');
        backDiv.innerText = card.back;
        backDiv.classList.add('card-back');
        backRow.appendChild(backDiv);
        backColumn.appendChild(backRow);
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
        newDeckUserValue = currentUser.id;
            //console.log("New User Name Value = ", newDeckUserValue);
        clearEverything();
        createDeck(newDeckNameValue, newDeckUserValue);
    })
}

function editDeckForm(deck) {
    //form title
    const formTitle = document.createElement('h3');
    formTitle.innerText = `Edit the ${deck.name} deck: `;
    myDecksWindow.appendChild(formTitle);

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
        editDeckUserValue = currentUser.id;
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
            flash.innerText = "Your deck has been successfully created.";
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
        flash.innerText = "Your deck has been successfully deleted.";
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
            // console.log("response from edit deck fxn: ",deckData)
            fetchDecks(deckData);
            flash.innerText = "Your deck has been successfully edited.";
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
    cardDiv.classList.remove('card-front');
    cardDiv.classList.remove('card-back');
}

function clearLoginForm() {
    while (loginForm.hasChildNodes() ) {  
        loginForm.removeChild(loginForm.firstChild);
    }
}

function clearFlash() {
    flash.innerText = "";
}

function clearEverything() {
    clearMyDecksWindow();
    clearDeckWindow();
    clearCardWindow();
    clearCardDiv();
    clearLoginForm();
    clearFlash();
}

//*******************************CARD FUNCTIONS********************************

function displayDeck(deckId){
    clearFlash();
    fetch(deckURL(deckId))
    .then(res => res.json())
    .then(function(json){
        if(!(json.cards.length === 0)){
            let card_index = 0;
            let shuffled = shuffleCards(json.cards);
            displayCard(shuffled[card_index]);   
            createCardWindow(deckId, card_index, shuffled);
          }
        else{
            flash.innerText = "Oops! You have no cards here. Maybe you'd like to add one?"
            let cards = json.cards;
            let index = 0;
            let newCard = document.createElement('button');
            newCard.innerText = "New card";
            cardWindow.appendChild(newCard);
            newCard.addEventListener('click', function(){
                clearFlash();
                $('#card-window form').remove();
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
                        cards.push(json); 
                        displayCard(json);
                        clearCardWindow();
                        createCardWindow(deckId, index, cards);
                        flash.innerText = "Your card has been successfully created."
                    })
                    .catch(error => console.log(error));
                    
                })


            })
        }
    })
    .catch(error => console.log(error));
}

function createCardWindow(deckId, index, cards){
    let nextCard = document.createElement('button');
    let newCard = document.createElement('button');
    let editCard = document.createElement('button');
    let deleteCard = document.createElement('button');
    nextCard.innerText = 'Next card';
    nextCard.classList.add('card-nav');
    newCard.innerText = "New card";
    newCard.classList.add('card-nav');
    editCard.innerText = "Edit card";
    editCard.classList.add('card-nav');
    deleteCard.innerText = "Delete card"; 
    deleteCard.classList.add('card-nav');
    cardWindow.appendChild(nextCard);
    cardWindow.appendChild(newCard);
    cardWindow.appendChild(editCard);
    cardWindow.appendChild(deleteCard);
  
    nextCard.addEventListener('click', function(){
        clearFlash();
        if((index < cards.length - 1)){
            clearCardDiv();
            displayCard(cards[++index]);
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
        clearFlash();
        $('#card-window form').remove();
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
                cards.push(json); 
                cardWindow.removeChild(form);
                flash.innerText = "Your card has been successfully created.";
            })
            .catch(error => console.log(error));
          
        })


    })
    editCard.addEventListener('click', function(){
        clearFlash(); 
        $('#card-window form').remove();
        let form = document.createElement('form');
        let frontlabel = document.createElement('p');
        frontlabel.innerText = "Front side:"
        let frontinput = document.createElement('input');
        frontinput.setAttribute('type', 'text');
        frontinput.setAttribute('value', cards[index].front)
        let backlabel = document.createElement('p');
        backlabel.innerText = "Back side:"
        let backinput = document.createElement('input');
        backinput.setAttribute('type', 'text');
        backinput.setAttribute('value', cards[index].back)
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
            let patchconfig = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(patchdata)
            }
            fetch(cardURL(cards[index].id), patchconfig)
            .then(res => res.json())
            .then(function(json){
                cards[index] = json; 
                clearCardDiv();
                cardWindow.removeChild(form);
                displayCard(cards[index]);
                flash.innerText = "Your card has been successfully edited."; 
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
            fetch(cardURL(cards[index].id), delconfig)
            .then(function(res){
                flash.innerText = "Your card has been successfully deleted.";
            })
            .catch(error => console.log(error));    
        }
    })
}

function displayCard(obj){
    let p = document.createElement('h1');
    p.innerText = obj.front;
    
    let isFront = true;
    cardDiv.appendChild(p);
    //add card-front css prop
    cardDiv.classList.remove("card-back");
    cardDiv.classList.add("card-front");

    //changed to if smoeone clicks on flashcard instead of p content
    cardDiv.addEventListener('click', function(){
        isFront = !(isFront);
        if(isFront){
            p.innerText = obj.front;
            // have to remove previous class and add new
            cardDiv.classList.remove("card-back");
            cardDiv.classList.add("card-front");
        }
        else {
            p.innerText = obj.back;
            // have to remove previous class and add new
            cardDiv.classList.remove("card-front");
            cardDiv.classList.add("card-back");
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

//**************************NAVBAR FUNCTIONS********************************/

function createNavBar(){
    if(currentUser.hasOwnProperty('id')) {
        $('#log-in-button')[0].classList.add('hidden');
        $('#sign-up-button')[0].classList.add('hidden');
        $('#my-decks-button')[0].classList.remove('hidden');
        $('#log-out-button')[0].classList.remove('hidden');
        $('#my-profile-button')[0].classList.remove('hidden');
    }
    else {
        $('#my-decks-button')[0].classList.add('hidden');
        $('#log-out-button')[0].classList.add('hidden');
        $('#log-in-button')[0].classList.remove('hidden');
        $('#sign-up-button')[0].classList.remove('hidden');
        $('#my-profile-button')[0].classList.add('hidden');
    }
}