import "./style.css";

//ask for ip

const DOMSelectors = { holder: document.querySelector(".holder") };

function createItems(items) {
  DOMSelectors.holder.innerHTML = "";
  items.forEach((value) =>
    DOMSelectors.holder.insertAdjacentHTML("beforeend", ``)
  );
}

async function getData(lat, lng) {
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
