import "./style.css";

//ask for country, then zip code?
//ask for zip code
//try these zip codes and 3 random number

//when search bar clicked, then summon get data

const DOMSelectors = {
  holder: document.querySelector(".holder"),
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

    DOMSelectors.holder.insertAdjacentHTML(
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
      DOMSelectors.holder.textContent = "error, trying again";
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
  DOMSelectors.holder.innerHTML = "";

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
    DOMSelectors.holder.textContent = "ERROR YOU SUCK AT CODING HAHAHHAHA";
  }
}

/*async function getData(lat, lng) {
  try {
    const response = await fetch(
      //"https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng
      "http://api.zippopotam.us/us/10306"
    );
    //https://api.sunrise-sunset.org/json?lat=${lat}&lng=-4.4203400
    //http://api.zippopotam.us/us/10306 can get name, place, long and lat given ip address
    //https://github.com/robertoduessmann/weather-api
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      document.querySelector(".title").textContent = data.results.sunset;
    }
  } catch (error) {
    console.log(error);
    console.log("ERROR");
  }
}
getData();
*/
