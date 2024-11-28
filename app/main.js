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
};

//for submit zipcode,
DOMSelectors.submit.addEventListener("click", createItems);

//put place in a seperate function
//for user input
async function createItems() {
  //DOMSelectors.holder.innerHTML = "";

  const zipcode = DOMSelectors.zipcode.value;
  try {
    const items = await getData(zipcode);
    //const place = items.places[0];

    createCards("holder", items); //probably return a value for one of these
    attachButtonListeners(items);
  } catch (error) {
    console.error("create items error", error);
    alert("so close! that isnt a real place <3");
  }
}

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

//ADD ONE FORRESET TO DEFAULT
//go back button
function defaultSetup() {
  DOMSelectors.body.innerHTML = "";
  DOMSelectors.body.insertAdjacentHTML(
    "beforeend",
    ` <h1 class="flex items-center justify-center text-8xl p-10">RANDOM INFORMATION BASED ON IP ADDRESS (AMERICA ONLY)</h1>
    
    <!--input-->
    <div class="control-panel flex flex-col items-center justify-center text-center">
      <form action="">
        <div class="input">
          <label for="zipcode" >zipcode: </label>
          <input type="text" id="zipcode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        </form>
        <button type="submit" class="submit bg-blue-300">Submit</button>
    </div>
    
    
    <!-- <div class="holder flex items-center justify-center">
      <div class="flex items-center justify-center h-screen w-screen">
        <div class="selected-info bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-90 max-w-none h-90 m-0">
          <h2 class="text-3xl">SELECTED ZIPCODE: </h2>
          <h3>name of place: </h3>
          <ul>
            <li>sunset time: </li>
            <li>sunrise time: </li>
            <li>state: </li>
            <li>longitude & latitude: </li>
          </ul>
          <button type="submit" class="go-back bg-blue-300">go back</button>
        </div>
      </div> -->

      <!--<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name: ${place["place name"]}</h1>
        <h3 class="text-xl">State: ${place.state}</h3>
        <h4 class="text-lg">Zip Code: ${place["post code"]}</h4>
        <button class="hooray bg-blue-300" 
                data-zipcode="${place["post code"]}" 
                data-coordinates="${place.longitude},${place.latitude}">
          Select
        </button>
      </div>-->
  </div>

  <h2 class="flex items-center justify-center">I THINK YOU MIGHT BE INTERSTED IN THESE ZIPCODES</h2>
      <!-- demo zipcodes -->
      <div class="wow-look-at-these flex items-center justify-center"> 

      </div>
    
    <script type="module" src="/main.js"></script>`
  );
}

//general card creation
//place is now the array, which before was items.
function createCards(selection, items) {
  const element = DOMSelectors[selection];
  const place = items.places[0];
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h2 class="text-3xl">Place Name: ${place["place name"]}</h1>
        <h3 class="text-xl">State: ${place.state}</h3>
        <h4 class="text-lg">Zip Code: ${items["post code"]}</h4>
        <button class="hooray bg-blue-300" 
                data-zipcode="${items["post code"]}" 
                data-coordinates="${place.longitude},${place.latitude}">
          Select
        </button>
      </div>`
  );
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
      const coordinates = event.target.getAttribute("data-coordinates");
      // smite: this only takes the latest information.
      //what i need to do is to put this into a seperate function and then cry! no jk call it seperately, return zipcode and coordinates in an array? or just coordinates? or the whole array??? probaby whole array actuall
      //upon further research the data thingie can only store strings which is soooo lame (joke)
      //new plan: store zipcode, derive everythign else from there
      DOMSelectors.body.innerHTML = "";
      console.log(`zipcode selected: ${zipcode}, coordinates: ${coordinates}`);
      DOMSelectors.body.insertAdjacentHTML(
        "beforeend",
        `<div class="holder flex items-center justify-center">
      <div class="flex items-center justify-center h-screen w-screen">
        <div class="selected-info bg-red-500 flex flex-col items-center justify-around text-center p-12 rounded-lg w-90 max-w-none h-90 m-0">
          <h2 class="text-3xl">SELECTED ZIPCODE: ${items["post code"]}</h2>
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
      //const place = items.places[0];
      createCards("wowLookAtThese", items);
      attachButtonListeners(items);
    } catch (error) {
      console.error("Error creating demo card for zip:", randomPlace, error);
    }
  }
}
checkTheseOut();
