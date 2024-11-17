import "./style.css";
async function getData() {
  try {
    const response = await fetch("http://api.zippopotam.us/us/90210");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      document.querySelector("h1").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    console.log("sorry couldn't find that pocket monster :(");
  } //await only works in async functions. it wil move on to next section even without a response.
}
getData();
