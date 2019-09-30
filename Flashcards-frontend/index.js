//Global Constants
const deckNavigation = document.getElementById('deck-navigation');
const mainWindow = document.getElementById('main-window')
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
    deckNavigation.appendChild(myDecksButton);
    //add event listener for click
    myDecksButton.addEventListener('click', (event) => {
        console.log("'My Decks' button has been clicked");
        clearMainWindow();
        loadDecks(deckData);
    });
};

function loadDecks(deckData) {
    //display view name and instructions
    const myDecksBanner = document.createElement('h1')
    myDecksBanner.innerText = `These are all the decks you've created!`;
    mainWindow.appendChild(myDecksBanner);
    const instructions = document.createElement('h3');
    instructions.innerText = `click on a deck to go into study mode`;
    mainWindow.appendChild(instructions);

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
        const studyDeckButton = document.createElement('button')
        studyDeckButton.innerText = ' Study '
        li.appendChild(studyDeckButton)
        studyDeckButton.addEventListener('click', (event) => {
            console.log('study button has been pushed')
            
            //  PLACEDHOLDER FOR STUDYDECK FUNCTION
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
        mainWindow.appendChild(li);
    }
}

function clearMainWindow() {
    while (mainWindow.hasChildNodes() ) {  
        mainWindow.removeChild(mainWindow.firstChild);
    }
}

//test
fetchDecks();