const timestamp = Math.floor(Date.now() / 1000).toString();
console.log(timestamp);
const apiKey = '41898cab376a7b14c3de50ca402c5d09';
const privateKey = '5d57e340de71c73f10d3a4294ea80a655a7ee489';
const data = `${timestamp}${privateKey}${apiKey}`;
console.log(data);
const md5 = CryptoJS.MD5(data).toString();
console.log(md5);
// const apiURL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=20`;
const apiURL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=48`;

fetch(apiURL)
  .then((response) => response.json())
  .then((jsonParsed) => {
    const divHero = document.querySelector('#herois');
    const arrayJson = jsonParsed.data.results;

    console.log(arrayJson);

    for(let i = 0; i < arrayJson.length; i++) {
      const element = arrayJson[i];
      if (element.thumbnail.path.substr(44,64) === 'image_not_available') {
        continue;
      }
      const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension;
      const nameHero = element.name;

      createDivHero(srcImage, nameHero, divHero);
    }
    
    console.log(jsonParsed)
  });

function createDivHero(srcImage, nameHero, divToAppend) {
  const divPai = document.createElement('div');
  const divFilho = document.createElement('div');
  const textName = document.createElement('text');
  const img = document.createElement('img');

  textName.textContent = nameHero;
  img.src = srcImage;

  divFilho.appendChild(img);
  divFilho.appendChild(textName);
  divPai.appendChild(divFilho);
  divToAppend.appendChild(divPai);

  divPai.classList.add("personagem");
}