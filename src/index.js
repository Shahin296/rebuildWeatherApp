
const city = document.getElementById("city");
const submitBtn = document.getElementById("submitBtn");
const showWeather = document.getElementById("showWeather");
const feelsLike = document.getElementById("feelsLike");
const icon = document.getElementById("icon")
const image = document.createElement("img");


let cityName;
city.addEventListener("change", ()=>{
    cityName = city.value
})


submitBtn.addEventListener('click', ()=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0ec50091bc2d3e6450cc9437d4f7987e&units=metric`)
    .then(res => {
        if(res.ok){
            document.getElementById('error').innerHTML = ''
            return res.json()
        } else if(!res.ok){
                document.getElementById('error').innerHTML = "<h6>Nothing is found please check the spelling of your city's name!</h6>";
                showWeather.innerHTML = '';
                icon.innerHTML = '';
                feelsLike.innerHTML = '';
        }
    })
    .then(data => checkWeather(data))

    
})

function checkWeather(data){
    
    const temperature = data.main.temp;
    const iconData = data.weather[0].icon;
    const feelsLikeData = data.main.feels_like;
    showWeather.innerHTML = `Temperature: ${temperature}° C in ${cityName}`;
    feelsLike.innerHTML = `Feels Like:  ${feelsLikeData}° C`;
    image.setAttribute("src", `https://openweathermap.org/img/wn/${iconData}@2x.png`);
    icon.appendChild(image)
    city.value = ""
}


 