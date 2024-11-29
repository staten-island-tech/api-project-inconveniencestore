import "./style.css";
import { validZipcodes } from "./list.js";

//ideas to make the button actually work
//when button clicked, store with each card an array of zipcodes
//number each button

//how about onclick

//when search bar clicked, then summon get data

const DOMSelectors = {
  holder: document.querySelector(".holder"),
  wowLookAtThese: document.querySelector(".wow-look-at-these"),
  submit: document.querySelector(".submit"),
  placeholder: document.querySelector(".title"),
  zipcode: document.querySelector("#zipcode"),
  body: document.body, //to clear body later
  infoHolder: document.querySelector(".info-holder"),
};

//for submit zipcode,
DOMSelectors.submit.addEventListener("click", createItems);

//put place in a seperate function
//for user input
async function createItems() {
  //DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  console.log("zipcode requested:", zipcode);
  try {
    const items = await getData(zipcode);
    //const place = items.places[0];

    createCards("holder", items); //probably return a value for one of these
    console.log("createcards ran");
    attachButtonListeners(items);
  } catch (error) {
    console.error("create items error", error);
    alert("so close! that isnt a real place <3");
  }
}

async function getData(zipcode) {
  try {
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

//general card creation
//place is now the array, which before was items.
function createCards(selection, items) {
  const element = DOMSelectors[selection];
  const place = items.places[0];

  element.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-100 max-w-120 h-120 max-h-150 m-8">
        <h2>Place Name: ${place["place name"]}</h1>
        <h3>State: ${place.state}</h3>
        <h4 >Zip Code: ${items["post code"]}</h4>
        <button class="hooray bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                data-zipcode="${items["post code"]}" >
          Select
        </button>
      </div>`
  );
  attachButtonListeners(items);
}

async function putTheSecondCardOntoThePage(zipcode) {
  try {
    const items = await getData(zipcode);
    const place = items.places[0];

    try {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400`
      );
      const data = await response.json();
      console.log(data);
      DOMSelectors.infoHolder.innerHTML = "";
      DOMSelectors.infoHolder.insertAdjacentHTML(
        "beforeend",
        `<div class="holder flex items-center justify-center">
      <div class="flex items-center justify-center h-screen w-screen">
        <div class="selected-info bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-90 max-w-none h-90 m-0">
          <h3>SELECTED ZIPCODE: ${zipcode}</h3>
          <h3>name of place: ${place["place name"]}</h3>
          <ul>
            <li>sunrise time: ${data.results.sunrise}</li>
            <li>sunset time: ${data.results.sunset}</li>
            <li>day length:  ${data.results.day_length}</li>
            <li>solar noon:  ${data.results.solar_noon}</li>
            <li>nautical twilight begins at: ${data.results.nautical_twilight_begin}</li>
            <li>nautical twilight ends at: ${data.results.nautical_twilight_end}</li>
            <li>civil twilight begins at: ${data.results.civil_twilight_begin}</li>
            <li>civil twilight ends at: ${data.results.civil_twilight_end}</li>
          </ul>
          <ul>
            <li>longitude & latitude: ${place.longitude}, ${place.latitude}</li>
            <li>state: ${place.state}</li>
          </ul>
       
        </div>
      </div>`
      );
    } catch {
      console.log("sunset sunrise error");
    }
  } catch (error) {
    console.error("create items error", error);
  }
}

//not only adds button listeners but also adds adjacent body html.
//also the information is being correctly formatted.... but the insertadjacent html i think is only looking at the last thingie
function attachButtonListeners(items) {
  const buttons = document.querySelectorAll(".hooray");
  const place = items.places[0];
  buttons.forEach((button) => {
    //thing that happens when clicked
    button.addEventListener("click", (event) => {
      const zipcode = event.target.getAttribute("data-zipcode");
      if (zipcode === items["post code"]) {
        putTheSecondCardOntoThePage(zipcode);
      }
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
      //const place = items.places[0];
      createCards("wowLookAtThese", items);
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
}
checkTheseOut();
