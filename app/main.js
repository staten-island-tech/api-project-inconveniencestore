import "./style.css";

//ask for ip

const DOMSelectors = { holder: document.querySelector(".holder") };
createItems();

function createItems() {
  DOMSelectors.holder.innerHTML = "";
  items.forEach((value) =>
    DOMSelectors.holder.insertAdjacentHTML(
      "beforeend",
      `<div class="flex items-center justify-center h-screen bg-yellow-300">
  <div class="card bg-red-200 flex flex-col items-center justify-around text-center p-12 rounded-lg w-80 max-w-lg h-80 m-8">
      <h1 class="text-3xl">item one</h1>
      <h2 class="text-xl">item two</h2>
  </div>
</div>`
    )
  );
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
