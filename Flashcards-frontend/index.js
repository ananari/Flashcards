fetch('http://localhost:3000/cards')
.then(res => res.json())
.then(function(json){
    test = document.querySelector('#test');
    test.innerText = `${json[0].front} - ${json[0].back}`;
})
.catch(error => console.log(error));