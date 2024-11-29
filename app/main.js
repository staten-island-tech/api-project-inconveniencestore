import "./style.css";
import { validZipcodes } from "./list.js";

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

//put place in a seperate function
//for user input
async function createItems() {
  //DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  console.log("zipcode requested:", zipcode);
  try {
    const items = await getData(zipcode);

    createCards("holder", items);
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

//ADD ONE FORRESET TO DEFAULT
//go back button
function defaultSetup() {
  DOMSelectors.body.innerHTML = `
    
    <div class="w-3/4 flex "><h1 class="">RANDOM INFORMATION BASED ON IP ADDRESS (AMERICA ONLY)</h1></div>
    
    
    <!--input-->
    <div class="control-panel">
      <form action="">
        <div class="input">
          <label for="zipcode" >zipcode: </label>
          <input type="text" id="zipcode" class="">
        </div>
        </form>
        <button type="submit" class="submit">Submit</button>
    </div>
    
      <div class="holder">
      </div> 
  </div>

  <h2 class="flex items-center justify-center">I THINK YOU MIGHT BE INTERSTED IN THESE ZIPCODES</h2>
      <!-- demo zipcodes -->
      <div class="wow-look-at-these flex items-center justify-center"> 

      </div>
    
    <script type="module" src="/main.js"></script>
  `;

  // domSelectors needs to be recalled bc it wiped out the links initially formed
  DOMSelectors.holder = document.querySelector(".holder");
  DOMSelectors.wowLookAtThese = document.querySelector(".wow-look-at-these");
  DOMSelectors.zipcode = document.querySelector("#zipcode");
  const newSubmitButton = document.querySelector("#submit");

  //needs new listener
  newSubmitButton.addEventListener("click", createItems);

  checkTheseOut();
}

//general card creation
//place is now the array, which before was items.
function createCards(selection, items) {
  const element = DOMSelectors[selection];
  const place = items.places[0];

  element.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
        <h2>Place Name: ${place["place name"]}</h1>
        <h3>State: ${place.state}</h3>
        <h4 >Zip Code: ${items["post code"]}</h4>
        <button class="hooray" 
                data-zipcode="${items["post code"]}" >
          Select
        </button>
      </div>`
  );
}

async function putTheSecondCardOntoThePage(zipcode) {
  DOMSelectors.body.innerHTML = "";
  try {
    const items = await getData(zipcode);
    const place = items.places[0];

    try {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400`
      );
      const data = await response.json();
      console.log(data);
      DOMSelectors.body.insertAdjacentHTML(
        "beforeend",
        `<div class="selected-info">
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
          <button type="submit" class="go-back">go back</button>
        </div>`
      );
    } catch {
      console.log("sunset sunrise error");
    }
  } catch (error) {
    console.error("create items error", error);
  }
  const buttons = document.querySelectorAll(".go-back");
  buttons.forEach((button) => {
    //thing that happens when clicked
    button.addEventListener("click", () => {
      defaultSetup();
    });
  });
}

function attachButtonListeners(items) {
  const buttons = document.querySelectorAll(".hooray");
  const place = items.places[0];
  buttons.forEach((button) => {
    //thing that happens when clicked
    button.addEventListener("click", (event) => {
      const zipcode = event.target.getAttribute("data-zipcode");
      putTheSecondCardOntoThePage(zipcode);
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
      attachButtonListeners(items);
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
}
checkTheseOut();
