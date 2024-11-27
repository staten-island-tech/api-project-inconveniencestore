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
  body: document.body, //to clear body later
};

//for submit zipcode,
DOMSelectors.submit.addEventListener("click", createItems);
//ADD ONE FORRESET TO DEFAULT

//go back button
function defaultSetup() {
  DOMSelectors.body.innerHTML = "";
}

//general card creation
//place is now the array, which before was items.
function createCards(selection, place) {
  const element = DOMSelectors[selection];
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name: ${place["place name"]}</h1>
        <h3 class="text-xl">State: ${place.state}</h3>
        <h4 class="text-lg">Zip Code: ${place["post code"]}</h4>
        <button class="hooray bg-blue-300" 
                data-zipcode="${place["post code"]}" 
                data-coordinates="${place.longitude},${place.latitude}">
          Select
        </button>
      </div>`
  );
}

//not only adds button listeners but also adds adjacent body html.
function attachButtonListeners(place) {
  console.log("place passed on from button:", place);
  const buttons = document.querySelectorAll(".hooray");
  buttons.forEach((button) => {
    //thing that happens when clicked
    button.addEventListener("click", (event) => {
      const zipcode = event.target.getAttribute("data-zipcode");
      const coordinates = event.target.getAttribute("data-coordinates");
      // smite
      DOMSelectors.body.innerHTML = "";
      console.log(`zipcode selected: ${zipcode}, coordinates: ${coordinates}`);

      DOMSelectors.body.insertAdjacentHTML(
        "beforeend",
        `<div class="holder flex items-center justify-center">
      <div class="flex items-center justify-center h-screen w-screen">
        <div class="selected-info bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-90 max-w-none h-90 m-0">
          <h2 class="text-3xl">SELECTED ZIPCODE: </h2>
          <h3>name of place: ${place["place name"]}</h3>
          <ul>
            <li>sunset time: </li>
            <li>sunrise time: </li>
            <li>state: </li>
            <li>longitude & latitude: </li>
          </ul>
          <button type="submit" class="go-back bg-blue-300">go back</button>
        </div>
      </div>`
      );
    });
  });
}

async function checkTheseOut() {
  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random() * 117);
    let randomPlace = validZipcodes[randomNumber];
    console.log("trying zip code:", randomPlace);

    try {
      const items = await getData(randomPlace);
      const place = items.places[0];
      createCards("wowLookAtThese", place);
      attachButtonListeners(place);
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
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

//put place in a seperate function

//for user input
async function createItems() {
  //DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  try {
    const items = await getData(zipcode);
    const place = items.places[0];

    createCards("holder", place);
    attachButtonListeners(place);
  } catch (error) {
    console.error("create items error", error);
    alert("so close! that isnt a real place <3");
  }
}
