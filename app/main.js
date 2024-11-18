import "./style.css";

//useless facts about places given ip?? or something

async function getData() {
  try {
    const response = await fetch(
      "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400"
    );
    //https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400
    //http://api.zippopotam.us/us/10306
    //https://github.com/robertoduessmann/weather-api
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      document.querySelector("h1").textContent = data.results.sunset;
    }
  } catch (error) {
    console.log(error);
    console.log("ERROR");
  }
}
getData();
