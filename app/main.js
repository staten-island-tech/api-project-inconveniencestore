import "./style.css";
import { validZipcodes } from "./list.js";

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

//general card creation
//place is now the array, which before was items.
function createCards(selection, place) {
  const element = DOMSelectors[selection];
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name: ${place["place name"]}</h1>
        <h3 class="text-xl">State: ${place.state}</h3>
        <h3 class="text-xl">Coordinates: (${place.longitude}, ${place.latitude})</h3>
        <h4 class="text-lg">Zip Code: ${place["post code"]}</h4>
        <button class="hooray bg-blue-300" 
                data-zipcode="${place["post code"]}" 
                data-coordinates="${place.longitude},${place.latitude}">
          Select
        </button>
      </div>`
  );
}

function attachButtonListeners() {
  const buttons = document.querySelectorAll(".hooray");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const zipcode = event.target.getAttribute("data-zipcode");
      const coordinates = event.target.getAttribute("data-coordinates");
      console.log(
        `Button clicked for ZIP: ${zipcode}, Coordinates: ${coordinates}`
      );
    });
  });
}

async function checkTheseOut() {
  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random() * 123);
    let randomPlace = validZipcodes[randomNumber];
    console.log("trying zip code:", randomPlace);

    try {
      const items = await getData(randomPlace);
      const place = items.places[0];
      createCards("wowLookAtThese", place);
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
  attachButtonListeners();
}
checkTheseOut();

async function getData(zipcode) {
  try {
    console.log(`getting data for: http://api.zippopotam.us/us/${zipcode}`);
    const response = await fetch(`http://api.zippopotam.us/us/${zipcode}`);
    if (response.status != 200) {
      throw new Error("getData error: ", response);
    } else {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("fetching data error: ", error);
  }
}

async function createItems() {
  DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  try {
    const items = await getData(zipcode);
    const place = items.places[0];

    createCards("holder");
  } catch (error) {
    console.error("create items error", error);
    alert("so close! that isnt a real place <3");
  }
}
