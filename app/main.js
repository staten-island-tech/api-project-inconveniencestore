import "./style.css";
import { validZipcodes } from "./list.js";

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
    if (items.status < 200 && items.status > 220) {
      throw new Error("getData error: ", response);
    } else {
      createCards("holder", items); //probably return a value for one of these
      console.log("createcards ran");
      attachButtonListeners(items);
    }
  } catch (error) {
    console.error("create items error", error);
    alert("so close! that isnt a real place");
  }
}

async function getData(zipcode) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
    if (response.status < 200 && response.status > 220) {
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
    `<div class="card flex text-center">
        <h2>Name: ${place["place name"]}</h1>
        <h3>State: ${place.state}</h3>
        <h4 >Zip Code: ${items["post code"]}</h4>
        <button class="hooray" 
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
    if (items.status < 200 && items.status > 220) {
      throw new Error("getData error: ", response);
    } else {
      try {
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${place.latitude}&lng=${place.longitude}`
        );
        if (response.status < 200 && response.status > 220) {
          throw new Error("getData error: ", response);
        } else {
          const data = await response.json();
          console.log(data);
          DOMSelectors.infoHolder.innerHTML = "";
          DOMSelectors.infoHolder.insertAdjacentHTML(
            "beforeend",
            `<div class="selected-info">
            <h2>SELECTED ZIPCODE: ${zipcode}</h2>
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
         
          </div>`
          );
        }
      } catch {
        console.log("sunset sunrise error");
      }
    }
  } catch (error) {
    console.error("create items error", error);
  }
}

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
      if (items.status < 200 && items.status > 220) {
        throw new Error("getData error: ", response);
      } else {
        createCards("wowLookAtThese", items);
      }
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
}
checkTheseOut();
