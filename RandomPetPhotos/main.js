import './style.css'

const dog = document.querySelector('#dog');
const cat = document.querySelector('#cat');
const surprise = document.querySelector('#surprise');
const img = document.querySelector('#img');

const dogAPI = 'https://dog.ceo/api/breeds/image/random';

const catAPI = 'https://api.thecatapi.com/v1/images/search';

img.src = 'dogAndCat.jpg'


function fetchAPIDog(api) {
  return fetch(api)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } 
    throw new Error ('Dog API request failed');
  })
  .then((data) => {
    img.src = data.message;
  })
  .catch((error) => {
    console.error(error);
  });
}

function fetchAPICat(api) {
  return fetch(api)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } 
    throw new Error ('Cat API request failed');
  })
  .then((data) => {
    img.src = data[0].url;
  })
  .catch((error) => {
    console.error(error);
  });
}

dog.addEventListener('click', () => {
  fetchAPIDog(dogAPI);
})

cat.addEventListener('click', () => {
  fetchAPICat(catAPI);
})

surprise.addEventListener('click', () => {
  const dogPromise = fetchAPIDog(dogAPI);
  const catPromise = fetchAPICat(catAPI);

  Promise.race([dogPromise, catPromise])
  .then((imageInfo) => {
    img.src = imageInfo;
  })
  .catch((error) => {
    console.log(error);
  });
});