import "./style.css";

//ask for country, then zip code?
//ask for zip code
//try these zip codes and 3 random number

//when search bar clicked, then summon get data

const DOMSelectors = {
  holder: document.querySelector(".holder"),
  wowLookAtThese: document.querySelector(".wow-look-at-these"),
  submit: document.querySelector(".submit"),
  placeholder: document.querySelector(".title"),
  zipcode: document.querySelector("#zipcode"),
};

DOMSelectors.submit.addEventListener("click", createItems);

async function checkTheseOut() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function createDemoZipcards(items) {
    const place = items.places[0];

    DOMSelectors.wowLookAtThese.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name: ${place["place name"]}</h1>
          <h3 class="text-xl">State: ${place.state}</h3>
          <h3 class="text-xl">Coordinates: (${place.longitude}, ${place.latitude})</h3>
          <h4 class="text-lg">Zip Code: ${items["post code"]}</h4>
      </div>`
    );
  }
  let infoAcquired = false;
  while (infoAcquired === false) {
    const randomPlace = getRandomInt(10000, 99950);
    console.log(randomPlace);

    try {
      const items = await getData(randomPlace);
      createDemoZipcards(items);
      infoAcquired = true;
    } catch (error) {
      console.error("createitems error", error);
    }
  }
}
checkTheseOut();

async function getData(zipcode) {
  try {
    console.log(`http://api.zippopotam.us/us/${zipcode}`);
    const response = await fetch(`http://api.zippopotam.us/us/${zipcode}`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    console.log("ERROR");
  }
}

async function createItems() {
  //DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  try {
    const items = await getData(zipcode);
    const place = items.places[0];

    DOMSelectors.holder.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name : ${place["place name"]}</h1>
        <h3 class="text-xl">State: ${place.state}</h3>
        <h3 class="text-xl">coordinates: (${place.longitude}, ${place.latitude})</h2>
      </div>`
    );
  } catch (error) {
    console.error("createitems error", error);
    DOMSelectors.holder.textContent =
      "you don't live there. how do i know? because it isnt even a real place loser";
  }
}
