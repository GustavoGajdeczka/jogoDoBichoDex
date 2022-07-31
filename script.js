const bichoName = document.querySelector(".pokemon_name");
const bichoNumero = document.querySelector(".pokemon_number");
const bichoImage = document.querySelector(".pokemon_image");

const form = document.querySelector('.form_input');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');


const data = {
  bichos: [],
  searchPokemon: 1
}

window.onload = async () => {
  await obterBichos();

  renderPokemon(data.searchPokemon);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (data.searchPokemon > 1) {
    data.searchPokemon -= 1;
    renderPokemon(data.searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  data.searchPokemon += 1;
  renderPokemon(data.searchPokemon);
});

const renderPokemon = (bicho) => {
  if(isNaN(bicho)){
    bichoArray = Object.keys(data.bichos);
    bichoArray.forEach(elemento => {
      if((data.bichos[elemento].nome).toLowerCase() == (bicho).toLowerCase()){
        bichoName.innerHTML = data.bichos[elemento].nome;
        bichoNumero.innerHTML = elemento;
        bichoImage.src = `./assets/bichos/${elemento}.png`;
        data.searchPokemon = elemento
      }
    });
  }else{
    bichoName.innerHTML = data.bichos[bicho].nome;
    bichoNumero.innerHTML = bicho;
    bichoImage.src = `./assets/bichos/${bicho}.png`;
    data.searchPokemon = bicho;
  }
} 


const obterBichos = async () => {
  const response = await fetch("./bichos.json").then(response => response.json())
  data.bichos = response;
}