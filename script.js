let currentPokemon;
let loadedPokemons = [];
let allPokemons = [];
console.log(loadedPokemons);
let limit = 15
let newLimit = 1112
let offset = 0
let loadStatus = true;
let firstList = 'https://pokeapi.co/api/v2/pokemon'

async function inhit() {
    await loadAllPokemon();
}


async function loadAllPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;  // Die Daten aus der variablen nextList ('https://pokeapi.co/api/v2/pokemon') werden geladen
    let response = await fetch(url);
    allPokemon = await response.json(); // Hier werden die Daten in ein JSON umgewandelt




    let namesOfAllPokemon = allPokemon['results']; // Hier lösen wir nach 'results' aus und es bleiben der 'name' und 
    // 'url' der einzelnen Pokemon

    for (let i = 0; i < namesOfAllPokemon.length; i++) { // Wir gehen mit einer Forschleife durch die results
        const urlOfEachPokemon = namesOfAllPokemon[i]['url']; // Definieren eine Variable die sich die URL des Pokemons zieht 
        const pokemon = await fetchPokemonByURL(urlOfEachPokemon); // Hier wird die Funktion ausgeführt, die sich die Daten der URL zieht und der Variablen Pokemon zuordnet
        loadedPokemons.push(pokemon);
        renderPokemon(pokemon, i);
    }
}

async function fetchPokemonByURL(urlOfEachPokemon) {  // Und hier fetchen wir uns alle Daten des Pokemons über die URL.
    let response = await fetch(urlOfEachPokemon);
    let pokemon = await response.json();
    return pokemon;
}

function renderPokemon(pokemon) {

    let type = pokemon['types'][0]['type']['name'];
    let backgroundColor = getColorForType(type);
    let pokemonlist = document.getElementById('pokemonlist');
    let formattedName = formatPokemonName(pokemon.name);

    pokemonlist.innerHTML += `
    <div class="pokemonOverview" onclick="renderPokemonInfo(${loadedPokemons.length - 1})" style="background-color: ${backgroundColor};">
         ${formattedName}
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" class="smallPokePic">
    </div>`;
}

function renderPokemonInfo(i) {


    console.log('Clicked Index:', i);
    console.log('Loaded Pokemons:', loadedPokemons);

    let clickedPokemon = loadedPokemons[i];
    console.log('Clicked Pokemon:', clickedPokemon);
    let type = clickedPokemon['types'][0]['type']['name'];
    let backgroundColor = getColorForType(type);
    let formattedName = formatPokemonName(clickedPokemon['name']);

    document.getElementById('pokemonlist').classList.add('hidden');
    document.getElementById('header').classList.add('hidden');
    document.getElementById('outerFrame').classList.remove('hidden');
    document.getElementById('loadMoreButton').classList.add('hidden');






    let outerFrame = document.getElementById('outerFrame');

    outerFrame.innerHTML = `<div class="outerFrame">
    <div class="outsideFrame">
     <div class="home" onclick="backHome()">home</div>
     <img src="leftArrow.jpeg" onclick="leftArrow(${i})" class="arrow">
    </div>
    <div class="pokemonCard" style="background-color: ${backgroundColor};">
        <div id="pokedex" style="background-color: ${backgroundColor};">
            <h1 id="pokemonName">${formattedName}</h1>
            <img id="pokemonPicture" src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}" height="350px" width="350px">
        </div>
        <div id="info-container" class="info-container">
        </div>
        <div id="buttons" class="buttons">
            <button id="about" class="buttonDesign" onclick=" renderPokemonStats(${i})">About</button>
            <button id="attack" class="buttonDesign" onclick="attack(${i})">Attack</button>
            <button id="stats" class="buttonDesign" onclick=" stats(${i})">Stats</button>

        </div>
        <div id="information" class="info"></div>
    </div>
    <div class="outsideFrame">
     <img src="rightArrow.jpeg" onclick="rightArrow(${i})" class="arrow">
    </div>
    </div>`

    renderPokemonStats(i);

}


function renderPokemonStats(i) {

    let clickedPokemon = loadedPokemons[i];

    let type = clickedPokemon['types']['0']['type']['name'];
    let height = clickedPokemon['height'];
    let weight = clickedPokemon['weight'];

    document.getElementById('information').innerHTML = `<div id="information" class="information">
    <table class="table">
    <tr class="tr">
        <td class="td">Type:</td>
        <td class="td">${type}</td>
    </tr>
    <tr class="tr">
        <td class="td">Height:</td>
        <td class="td">${height} cm</td>
    </tr>
    <tr class="tr">
        <td class="td">Weight:</td>
        <td class="td">${weight} kg</td>
    </tr>
</table>
    </div>`
}

function attack(i) {

    let clickedPokemon = loadedPokemons[i];


    let attack1 = clickedPokemon['moves']['0']['move']['name']
    let attack2 = clickedPokemon['moves']['1']['move']['name']
    let attack3 = clickedPokemon['moves']['2']['move']['name']


    document.getElementById('information').innerHTML = `<div id="information" class="information">
    <table class="table">
     <tr class="tr">
         <td class="td">1:</td>
         <td class="td">${attack1}</td>
     </tr>
     <tr class="tr">
         <td class="td">2:</td>
         <td class="td">${attack2}</td>
     </tr>
     <tr class="tr">
         <td class="td">3:</td>
         <td class="td">${attack3}</td>
     </tr>
    </table>
  </div>`
}

function stats(i) {

    let clickedPokemon = loadedPokemons[i];

    let hp = clickedPokemon['stats']['0']['base_stat']
    let attack = clickedPokemon['stats']['1']['base_stat']
    let defense = clickedPokemon['stats']['2']['base_stat']
    let specialAttack = clickedPokemon['stats']['3']['base_stat']
    let specialDefense = clickedPokemon['stats']['4']['base_stat']
    let speed = clickedPokemon['stats']['5']['base_stat']


    document.getElementById('information').innerHTML = `<div id="information" class="information">
    <div class= statsName>HP:</div>
    <div class="progress" role="progressbar" aria-label="HP" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-hp" style="width: ${hp}%">${hp}%</div>
    </div>
    <div class= statsName>Attack:</div>
    <div class="progress" role="progressbar" aria-label="Attack" aria-valuenow="${attack}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-attack" style="width: ${attack}%">${attack}%</div>
    </div>
    <div class= statsName>Defense:</div>
    <div class="progress" role="progressbar" aria-label="Defense" aria-valuenow="${defense}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-defense" style="width: ${defense}%">${defense}%</div>
    </div>
    <div class= statsName>Special-Attack:</div>
    <div class="progress" role="progressbar" aria-label="Special Attack" aria-valuenow="${specialAttack}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-specialAttack" style="width: ${specialAttack}%">${specialAttack}</div>
    </div> 
    <div class= statsName>Special-Defense:</div>
    <div class="progress" role="progressbar" aria-label="Special Defense" aria-valuenow="${specialDefense}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-specialDefense" style="width: ${specialDefense}%">${specialDefense}</div>
    </div> 
    <div class= statsName>Speed:</div>
    <div class="progress" role="progressbar" aria-label="Speed" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-speed" style="width: ${speed}%">${speed}</div>
    </div>
    </div>
    `
}

function rightArrow(i) {

    if (i < loadedPokemons.length - 1) {
        i++
    } else {
        i = 0
    }
    renderPokemonInfo(i)
}

function leftArrow(i) {

    if (i < loadedPokemons.length - 1) {
        i--
    } else {
        i = 0
    }
    renderPokemonInfo(i)
}

function backHome() {

    document.getElementById('pokemonlist').classList.remove('hidden');
    document.getElementById('header').classList.remove('hidden');
    document.getElementById('outerFrame').classList.add('hidden');
    document.getElementById('loadMoreButton').classList.remove('hidden');

}

async function loadMorePokemon() {
    if (loadStatus == true) {
        offset += 15;
        let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        let response = await fetch(url);
        let newPokemonData = await response.json();

        for (let i = 0; i < newPokemonData.results.length; i++) {
            const urlOfEachPokemon = newPokemonData.results[i].url;
            const pokemon = await fetchPokemonByURL(urlOfEachPokemon);
            loadedPokemons.push(pokemon);
            allPokemons.push(pokemon);  // Füge das neue Pokémon auch zur Liste aller Pokémon hinzu
            renderPokemon(pokemon);
        }
    }
}


function getColorForType(type) {
    if (type === 'normal') {
        return '#A8A77A';
    } else if (type === 'fire') {
        return '#EE8130';
    } else if (type === 'water') {
        return '#6390F0';
    } else if (type === 'electric') {
        return '#F7D02C';
    } else if (type === 'grass') {
        return '#7AC74C';
    } else if (type === 'ice') {
        return '#96D9D6';
    } else if (type === 'fighting') {
        return '#C22E28';
    } else if (type === 'poison') {
        return '#A33EA1';
    } else if (type === 'ground') {
        return '#E2BF65';
    } else if (type === 'flying') {
        return '#A98FF3';
    } else if (type === 'psychic') {
        return '#F95587';
    } else if (type === 'bug') {
        return '#A6B91A';
    } else if (type === 'rock') {
        return '#B6A136';
    } else if (type === 'ghost') {
        return '#735797';
    } else if (type === 'dragon') {
        return '#6F35FC';
    } else if (type === 'dark') {
        return '#705746';
    } else if (type === 'steel') {
        return '#B7B7CE';
    } else if (type === 'fairy') {
        return '#D685AD';
    } else {
        return 'grey'; // Wenn der Typ nicht in der Liste ist, wird standardmäßig 'grey' zurückgegeben
    }
}

function formatPokemonName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// ...

async function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${newLimit}`;

    let response = await fetch(url);
    let allPokemon = await response.json();
    let eachPokemon = allPokemon['results'];

    // Lösche vorherige Suchergebnisse
    document.getElementById('pokemonlist').innerHTML = '';

    let pokemonCount = 0; // Zählvariable für die gefundenen Pokemon

    for (let i = 0; i < eachPokemon.length; i++) {
        const pokemonUrl = eachPokemon[i]['url'];
        const urlOfThisPokemon = await getPokemonByUrl(pokemonUrl);

        let name = urlOfThisPokemon.name.toLowerCase();
        if (name.startsWith(search)) {
            loadedPokemons.push(urlOfThisPokemon);
            renderPokemon(urlOfThisPokemon); // Hier wird der Index korrekt verwendet
            pokemonCount++;

            // Überprüfe, ob die maximale Anzahl erreicht ist
            if (pokemonCount >= 30) {
                break; // Stoppe die Schleife, wenn die maximale Anzahl erreicht ist
            }
        }
    }
}

async function getPokemonByUrl(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let urlOfThisPokemon = await response.json();
    return urlOfThisPokemon;
}




