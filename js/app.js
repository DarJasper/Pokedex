'use strict'

var xhttp = new XMLHttpRequest();
var pokedexURL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
/*An array containing all the country names in the world:*/

var pokemons = [];
var pokedexData;

document.addEventListener('DOMContentLoaded', function(){
    init();
});

function init(){
    autocomplete(document.getElementById("myInput"), pokemons);


    xhttp.open('GET', pokedexURL, true);
    xhttp.send();
    xhttp.addEventListener("readystatechange", function(){
        if ((xhttp.readyState == 4) && (xhttp.status == 200)){
            console.info("Succesful request!");
            pokedexData = JSON.parse(xhttp.responseText);
            console.log(pokedexData);
            displayInfo(pokedexData, 1);
            createListOfPokemonNames(pokedexData);

            var input = document.getElementById("myInput");

            input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById("myBtn").click();
                }
            });

        }
    });
}

function displayInfo2(pokedexData, pokeNumber){
    var n = pokeNumber -1;
    console.log(pokedexData.pokemon[n].name);
    pokemonName.innerHTML = pokedexData.pokemon[n].name;
    pokemonNum.innerHTML = "#" + pokedexData.pokemon[n].num;
    document.getElementById("pokemonPicture").src = pokedexData.pokemon[n].img;
    pokemonHeight.innerHTML = pokedexData.pokemon[n].height;
    pokemonWeight.innerHTML = pokedexData.pokemon[n].weight;
    var x = "";
    for (var i=0; i < pokedexData.pokemon[n].type.length; i++){
      var obj = pokedexData.pokemon[n].type[i];
      x = x + obj + ", " ;
    }
    pokemonType.innerHTML = x.substring(0, x.length-2);
    var y = "";
    for (var j=0; j < pokedexData.pokemon[n].weaknesses.length; j++){
      var obj = pokedexData.pokemon[n].weaknesses[j];
      y = y + obj + ", " ;
    }
    pokemonWeaknesses.innerHTML = y.substring(0, y.length-2);

}

function displayInfo(pokedexData, pokeNumber){
    var n = pokeNumber -1;
    console.log(pokedexData.pokemon[n].name);
    pokemonName.innerHTML = pokedexData.pokemon[n].name;
    pokemonNum.innerHTML = "#" + pokedexData.pokemon[n].num;
    document.getElementById("pokemonPicture").src = pokedexData.pokemon[n].img;
    pokemonHeight.innerHTML = pokedexData.pokemon[n].height;
    pokemonWeight.innerHTML = pokedexData.pokemon[n].weight;
    var element = document.getElementById("div1");
    var element2 = document.getElementById("div2");
    while (element.firstChild){
      element.removeChild(element.firstChild);
    }
    while (element2.firstChild){
      element2.removeChild(element2.firstChild);
    }
    for (var i=0; i < pokedexData.pokemon[n].type.length; i++){
      var obj = pokedexData.pokemon[n].type[i];
      var para = document.createElement("p");
      var node = document.createTextNode(obj);
      para.appendChild(node);
      element.appendChild(para);
    }
    for (var i=0; i < pokedexData.pokemon[n].weaknesses.length; i++){
      var obj = pokedexData.pokemon[n].weaknesses[i];
      var para = document.createElement("p");
      var node = document.createTextNode(obj);
      para.appendChild(node);
      element2.appendChild(para);
    }
    displayEvolutions(n);
}

function createListOfPokemonNames(pokedexData){
  for (var i = 0; i < pokedexData.pokemon.length; i++){
    var obj = pokedexData.pokemon[i];
    // console.log(obj.name);
    pokemons.push(obj.name);
  }
}

function getPokemon(){
  var x = document.getElementById('myInput').value;
  var y = findPokeNumber(pokedexData, x);
  displayInfo(pokedexData, y);

}

function findPokeNumber(pokedexData, pokename){
  var pokenumber;
  for (var i = 0; i < pokedexData.pokemon.length; i++){
    var obj = pokedexData.pokemon[i];
    if (obj.name.toLowerCase() == pokename.toLowerCase()){
      pokenumber = obj.num;
      console.log("Found the number!");
      console.log(obj.num);
    }
  }
  return pokenumber
}

function randomPokemon(){
  var x = Math.floor(Math.random() * (151-1) + 1) ;
  console.log(x);
  displayInfo(pokedexData, x);
}

function nextPokemon(){
  var currNumber = parseInt(document.getElementById('pokemonNum').innerHTML.substring(1, document.getElementById('pokemonNum').innerHTML.length ));
  var x;
  if (currNumber >= 151){
    x = 151;
  } else {
    x = currNumber+1;
  }
  displayInfo(pokedexData, x);
}

function previousPokemon(){
  var currNumber = parseInt(document.getElementById('pokemonNum').innerHTML.substring(1, document.getElementById('pokemonNum').innerHTML.length ));
  var x;
  if (currNumber <= 1){
    x = 1;
  } else {
    x = currNumber-1;
  }
  displayInfo(pokedexData, x);
}

function displayEvolutios(){
    var div = document.createElement("div");
    div.className = "test";
    var para = document.createElement("p");
    var node = document.createTextNode("HELLO WORLD");
    div.appendChild(para);
    para.appendChild(node);
    prevolutions.appendChild(div);
}

function displayEvolutions(n){
    console.log("----------------------");
    while (prevolutions.firstChild){
        prevolutions.removeChild(prevolutions.firstChild);
    }
    while (nextevolutions.firstChild){
        nextevolutions.removeChild(nextevolutions.firstChild);
    }
    try{
        for (var i = 0; i < pokedexData.pokemon[n].prev_evolution.length; i++){
            var container = document.createElement("div");
            container.className = "evolutions-container";
            var namePara = document.createElement("p");
            var nameNode = document.createTextNode(pokedexData.pokemon[n].prev_evolution[i].name + " #" + pokedexData.pokemon[n].prev_evolution[i].num);
            var imagePara = document.createElement("IMG");
            imagePara.id = "prev_evolutionPicture" + i;
            imagePara.alt = "Image of evolution";
            namePara.appendChild(nameNode);
            container.appendChild(imagePara);
            container.appendChild(namePara);
            prevolutions.appendChild(container);
            var x = parseInt(pokedexData.pokemon[n].prev_evolution[i].num);
            document.getElementById("prev_evolutionPicture" + i).src = pokedexData.pokemon[x-1].img;
        }

    }
    catch(err){
        console.log("No previous evolution found!");
        var nonePara = document.createElement("p");
        var noneNode = document.createTextNode("None");
        nonePara.appendChild(noneNode);
        prevolutions.appendChild(nonePara);
    }
    try{
        for (var i = 0; i < pokedexData.pokemon[n].next_evolution.length; i++){
            var container = document.createElement("div");
            container.className = "evolutions-container";
            var namePara = document.createElement("p");
            var nameNode = document.createTextNode(pokedexData.pokemon[n].next_evolution[i].name + " #" + pokedexData.pokemon[n].next_evolution[i].num);
            var imagePara = document.createElement("IMG");
            imagePara.id = "next_evolutionPicture" + i;
            imagePara.alt = "Image of evolution";
            namePara.appendChild(nameNode);
            container.appendChild(imagePara);
            container.appendChild(namePara);
            nextevolutions.appendChild(container);
            var x = parseInt(pokedexData.pokemon[n].next_evolution[i].num);
            document.getElementById("next_evolutionPicture" + i).src = pokedexData.pokemon[x-1].img;
        }
    }
    catch(err){
        console.log("No next evolution found!");
        var nonePara = document.createElement("p");
        var noneNode = document.createTextNode("None");
        nonePara.appendChild(noneNode);
        nextevolutions.appendChild(nonePara);
    }
    console.log("----------------------");
}
