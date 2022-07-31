const bichoName = document.querySelector(".bicho_name");
const bichoNumero = document.querySelector(".bicho_number");
const bichoImage = document.querySelector(".bicho_image");

const form = document.querySelector('.form_input');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');


const data = {
  bichos: [],
  searchbicho: 1
}

window.onload = async () => {
  await obterBichos();

  renderbicho(data.searchbicho);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderbicho(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (data.searchbicho > 1) {
    data.searchbicho = parseInt(data.searchbicho) - 1;
    renderbicho(data.searchbicho);
  }
});

buttonNext.addEventListener('click', () => {
  if(data.searchbicho < 25){
    data.searchbicho = parseInt(data.searchbicho) + 1;
    renderbicho(data.searchbicho);
  }
});

const renderbicho = (bicho) => {
  if(isNaN(bicho)){
    bichoArray = Object.keys(data.bichos);
    bichoArray.forEach(elemento => {
      if((data.bichos[elemento].nome).toLowerCase() == (bicho).toLowerCase()){
        bichoName.innerHTML = data.bichos[elemento].nome;
        bichoNumero.innerHTML = elemento;
        bichoImage.src = `./assets/bichos/${elemento}.png`;
        data.searchbicho = elemento
      }
    });
  }else{
    bichoName.innerHTML = data.bichos[bicho].nome;
    bichoNumero.innerHTML = bicho;
    bichoImage.src = `./assets/bichos/${bicho}.png`;
    data.searchbicho = bicho;
  }
} 


const obterBichos = async () => {
  const response = await fetch("./bichos.json").then(response => response.json())
  data.bichos = response;
}