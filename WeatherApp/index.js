const weatherApiKey = "8275cbf02b5b224a156970c2ed069d74";

const weatherDataEl = document.getElementById("weather-data");

const weatherInputEl = document.getElementById("city-input");
console.log(weatherInputEl.value);

const weatherFormEl = document.querySelector("form");

weatherFormEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const weatherValue = weatherInputEl.value;
    getDataApi(weatherValue);

});
async function getDataApi(weatherValue){
    try{const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherValue}&appid=${weatherApiKey}&units=metric`);
    
    if(!weatherData.ok){
        throw new Error("Network response not ok");
    }
    
    const weatherJsonData = await weatherData.json();
    const temperature = Math.round(weatherJsonData.main.temp);
    const description = weatherJsonData.weather[0].description;
    const icon = weatherJsonData.weather[0].icon;
    
    if(icon.includes('n',2)==true) {
        document.querySelector("body").style.backgroundImage = `url(https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`;
        document.querySelector(".container").style.backgroundImage = `url(https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`;
    }
    else{
        document.querySelector("body").style.backgroundImage = `url(https://wallpaperaccess.com/full/1614312.jpg)`;
        document.querySelector(".container").style.backgroundImage = `url(https://wallpaperaccess.com/full/1614312.jpg)`;
    }
    // else if(icon.includes('d'))
    const details = [`Feels like: ${Math.round(weatherJsonData.main.feels_like)}`,`Humidity: ${Math.round(weatherJsonData.main.humidity)}`,
                    `Wind Speed: ${Math.round(weatherJsonData.wind.speed)}`];
    weatherDataEl.querySelector(".icon").innerHTML= `<img src=http://openweathermap.org/img/wn/${icon}.png alt="weather Icon">`;
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = `<div>${details[0]}°C</div> <div>${details[1]}%</div> <div>${details[2]} m/s</div>`;
}
catch(error){
    weatherDataEl.innerHTML=`
    <div id="weather-data">
        <div class="icon">
            <!-- <img src="http://openweathermap.org/img/wn/01d.png" alt="weather Icon"> -->
        </div>
        <div class="temperature">
            <!-- 35°C  -->
            
        </div>
        <div class="description">
            Hey error occured, Try again
            
        </div> 
        <div class="details">
            <!-- <div>Feels like : 35°C</div>
            <div>Humidity: 50%</div>
            <div>Wind Speed: 5 m/s</div>  -->
        </div>

    </div>
</div>`
}
}