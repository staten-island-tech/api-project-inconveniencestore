import "./style.css";

//ask for country, then zip code?
//ask for zip code

//when search bar clicked, then summon get data

const DOMSelectors = {
  holder: document.querySelector(".holder"),
  submit: document.querySelector(".submit"),
  placeholder: document.querySelector(".title"),
};

DOMSelectors.submit.addEventListener("click", createItems);

async function getData(zipcode) {
  try {
    console.log(`http://api.zippopotam.us/us/${zipcode}`);
    const response = await fetch(`http://api.zippopotam.us/us/${zipcode}`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data.country);
      return data.country;
    }
  } catch (error) {
    console.log(error);
    console.log("ERROR");
  }
}

async function createItems() {
  DOMSelectors.holder.innerHTML = "";

  try {
    const items = await getData("10306");
    DOMSelectors.holder.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-red-600 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
        <h1 class="text-3xl">${items}</h1>
        <h2 class="text-xl">${items}</h2>
      </div>`
    );
    /* items.forEach((item) =>
      DOMSelectors.holder.insertAdjacentHTML(
        "beforeend",
        `<div class="card bg-red-600 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
          <h1 class="text-3xl">${item.title}</h1>
          <h2 class="text-xl">${item.subtitle}</h2>
        </div>`
      )
    ); */
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
