const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokeName = document.getElementById('pokeName');
const butonSearch = document.getElementById('searchPokemon');
const appNode = document.getElementById('app');

butonSearch.addEventListener("click", insertPokemon);
butonSearch.addEventListener("click", deletePokemons);


async function insertPokemon(){
    const res = await fetch(`${baseURL}${pokeName.value.toLocaleLowerCase()}`)
    .then(res=>{
        if(res.status != "200"){
            console.log(res);
            pokeImage("./Img/noExiste.gif");
            deletePokemons();
        } else{
            return res.json();
        }
    })
    .then(data=>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        console.log(pokeImg);
        pokeImage(pokeImg);

    })
    try {
        const res = await fetch(`${baseURL}${pokeName.value.toLocaleLowerCase()}`)
        const pokemonDataJSON = await res.json()
    
        const allItems = [];
        const result = [];
    
        for (let pokemonInfo in pokemonDataJSON) {
          result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
        }
    
        console.table(result);

    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`;

    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`;
    hp.classList.add('pokemonStats');

    const attack = document.createElement('p');
    attack.innerText = `Attack: ${result[15][1][1].base_stat}`;
    attack.classList.add('pokemonStats');

    const defense = document.createElement('p');
    defense.innerText = `Defense: ${result[15][1][2].base_stat}`;
    defense.classList.add('pokemonStats');

    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Special Attack: ${result[15][1][3].base_stat}`;
    specialAttack.classList.add('pokemonStats');

    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Special Defense: ${result[15][1][4].base_stat}`; 
    specialDefense.classList.add('pokemonStats');

    const speed = document.createElement('p');
    speed.innerText = `Speed: ${result[15][1][5].base_stat}`; 
    speed.classList.add('pokemonStats');

    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    const container = document.createElement('div');
    container.append(pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);
    
    }  catch {
        alert("Ese Pokemon no existe :´c");
    }
} 

const pokeImage = (baseURL) =>{
    const pokeImage = document.getElementById("pokeImg");
    pokeImage.src=baseURL;
}

function deletePokemons() {
    let allPokemon = appNode.childNodes;
    allPokemon = Array.from(allPokemon);
  
    allPokemon.forEach(pokeName => {
    pokeName.remove(pokeName);
    });
}

