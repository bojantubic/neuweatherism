window.addEventListener("load", () => {
  let lon;
  let lat;

  const currentLoc = document.querySelector(".temperature__city--place");
  const currentTemp = document.querySelector(".temperature__degrees__number");
  const currentMax = document.querySelector(".temperature__degrees__max p");
  const currentMin = document.querySelector(".temperature__degrees__min p");
  const currentDate = document.querySelector(".temperature__city--time");
  const currentIcon = document.querySelector(".temperature__degrees__upper");

  const futureMinMax = document.querySelectorAll(".temperature__details__minmax");
  const futureIcon = document.querySelectorAll(".temperature__details__icon");
  const futureDay = document.querySelectorAll(".temperature__details__day");

  // DISPLAY DAYS OF THE WEEK
  const newDate = new Date();
  const today = newDate.getDay();

  function displayDays(num, order, day) {
    if (num + order === 1 || num + order === 8) {
      day.innerHTML = "mon";
    } else if (num + order === 2 || num + order === 9) {
      day.innerHTML = "tue";
    } else if (num + order === 3 || num + order === 10) {
      day.innerHTML = "wed";
    } else if (num + order === 4 || num + order === 11) {
      day.innerHTML = "thu";
    } else if (num + order === 5 || num + order === 12) {
      day.innerHTML = "fri";
    } else if (num + order === 6 || num + order === 13) {
      day.innerHTML = "sat";
    } else if (num + order === 7 || num + order === 14) {
      day.innerHTML = "sun";
    }
  }

  // DISPLAY ICONS
  const ChooseIcon = (icon, id) => {
    if (id >= 200 && id <= 232) {
      icon.innerHTML = '<i class="wi wi-day-storm-showers"></i>';
    } else if (id >= 300 && id <= 321) {
      icon.innerHTML = '<i class="wi wi-day-sleet"></i>';
    } else if (id >= 500 && id <= 531) {
      icon.innerHTML = '<i class="wi wi-day-rain"></i>';
    } else if (id >= 600 && id <= 622) {
      icon.innerHTML = '<i class="wi wi-snow-wind"></i>';
    } else if (id >= 700 && id <= 781) {
      icon.innerHTML = '<i class="wi wi-fog"></i>';
    } else if (id >= 800 && id <= 800) {
      icon.innerHTML = '<i class="wi wi-day-sunny"></i>';
    } else if (id >= 801 && id <= 804) {
      icon.innerHTML = '<i class="wi wi-cloudy"></i>';
    }
  };
  // DETERMINE GEOLOCATION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const mainAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=91632573508ff10e943588017e6ef938&units=metric`;
      const placeAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91632573508ff10e943588017e6ef938`;

      fetch(placeAPI)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          currentLoc.innerHTML = data.city.name;
        });

      fetch(mainAPI)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          displayDays(today, 1, futureDay[0]);
          displayDays(today, 2, futureDay[1]);
          displayDays(today, 3, futureDay[2]);
          displayDays(today, 4, futureDay[3]);
          displayDays(today, 5, futureDay[4]);

          ChooseIcon(currentIcon, data.current.weather[0].id);
          ChooseIcon(futureIcon[0], data.daily[1].weather[0].id);
          ChooseIcon(futureIcon[1], data.daily[2].weather[0].id);
          ChooseIcon(futureIcon[2], data.daily[3].weather[0].id);
          ChooseIcon(futureIcon[3], data.daily[4].weather[0].id);
          ChooseIcon(futureIcon[4], data.daily[5].weather[0].id);

          currentTemp.innerHTML = Math.round(data.current.temp);
          currentMax.innerHTML = Math.round(data.daily[0].temp.max) + "&#176";
          currentMin.innerHTML = Math.round(data.daily[0].temp.min) + "&#176";

          futureMinMax[0].innerHTML = Math.round(data.daily[1].temp.max) + "&#176" + " - " + Math.round(data.daily[1].temp.min) + "&#176";
          futureMinMax[1].innerHTML = Math.round(data.daily[2].temp.max) + "&#176" + " - " + Math.round(data.daily[2].temp.min) + "&#176";
          futureMinMax[2].innerHTML = Math.round(data.daily[3].temp.max) + "&#176" + " - " + Math.round(data.daily[3].temp.min) + "&#176";
          futureMinMax[3].innerHTML = Math.round(data.daily[4].temp.max) + "&#176" + " - " + Math.round(data.daily[4].temp.min) + "&#176";
          futureMinMax[4].innerHTML = Math.round(data.daily[5].temp.max) + "&#176" + " - " + Math.round(data.daily[5].temp.min) + "&#176";

          currentDate.innerHTML = new Date().toLocaleDateString("en", { year: "numeric", day: "2-digit", month: "long" });

          // DISPLAY CHART
          const canvas = document.querySelector(".temperature__details__today canvas");
          let barChart = new Chart(canvas, {
            type: "bar",
            data: {
              labels: ["", "", "", "", ""],
              datasets: [
                {
                  data: [Math.round(data.daily[1].temp.max), Math.round(data.daily[2].temp.max), Math.round(data.daily[3].temp.max), Math.round(data.daily[4].temp.max), Math.round(data.daily[5].temp.max)],
                  backgroundColor: "rgba(226, 96, 98,1)",
                },
                {
                  data: [Math.round(data.daily[1].temp.min), Math.round(data.daily[2].temp.min), Math.round(data.daily[3].temp.min), Math.round(data.daily[4].temp.min), Math.round(data.daily[5].temp.min)],
                  backgroundColor: "rgba(105, 182, 234,1)",
                },
              ],
            },
            options: {
              legend: {
                display: false,
              },
              tooltips: {
                enabled: false,
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false,
                      offsetGridLines: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    display: false,
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                    },
                    gridLines: {
                      display: true,
                      offsetGridLines: false,
                      drawOnChartArea: true,
                      drawBorder: false,
                    },
                  },
                ],
              },
            },
          });
        });
    });
  }
});
