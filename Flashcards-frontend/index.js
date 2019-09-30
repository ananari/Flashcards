let carddiv = document.querySelector('#card');
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
        document.body.appendChild(next);
        
        next.addEventListener('click', function(){
            if(card_index < shuffled.length - 1){
                carddiv.innerHTML = "";
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
    carddiv.appendChild(p);
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

displayDeck(1);


