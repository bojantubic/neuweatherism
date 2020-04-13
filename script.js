window.addEventListener("load", () => {
  let lon;
  let lat;
  const currentLoc = document.querySelector(".temperature__city--place");
  const currentTemp = document.querySelector(".temperature__degrees__number");
  const currentMax = document.querySelector(".temperature__degrees__max p");
  const currentMin = document.querySelector(".temperature__degrees__min p");
  const currentDate = document.querySelector(".temperature__city--time");
  const futureMinMax = document.querySelectorAll(".temperature__details__minmax");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=91632573508ff10e943588017e6ef938&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          currentTemp.innerHTML = Math.round(data.current.temp);
          currentMax.innerHTML = Math.round(data.daily[0].temp.max) + "&#176";
          currentMin.innerHTML = Math.round(data.daily[0].temp.min) + "&#176";
          futureMinMax[0].innerHTML = Math.round(data.daily[1].temp.max) + "&#176" + " - " + Math.round(data.daily[1].temp.min) + "&#176";
          futureMinMax[1].innerHTML = Math.round(data.daily[2].temp.max) + "&#176" + " - " + Math.round(data.daily[2].temp.min) + "&#176";
          futureMinMax[2].innerHTML = Math.round(data.daily[3].temp.max) + "&#176" + " - " + Math.round(data.daily[3].temp.min) + "&#176";
          futureMinMax[3].innerHTML = Math.round(data.daily[4].temp.max) + "&#176" + " - " + Math.round(data.daily[4].temp.min) + "&#176";
          futureMinMax[4].innerHTML = Math.round(data.daily[5].temp.max) + "&#176" + " - " + Math.round(data.daily[5].temp.min) + "&#176";
          currentDate.innerHTML = new Date().toLocaleDateString("en", { year: "numeric", day: "2-digit", month: "long" });
        });
    });
  }
});
