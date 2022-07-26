
const API_KEY = "3b8b00d19ef3b875b28e1b07f844a056";

function getLatAndLon(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let coordinates = {}
            coordinates.lat = position.coords.latitude;
            coordinates.lon = position.coords.longitude;
        
            return coordinates;
        })
        }

}

window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log("bakki",lat,lon)

            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            fetch(base).then((response)=>{
                return response.json()
            }) .then((data)=>{
                const {humidity,pressure,temp,temp_max, temp_min} = data.main ;
                const place = data.name ;
                const countryCode = data.sys.country ;
                const {main, description, icon} = data.weather[0];
                const {speed} = data.wind ;
                
                const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg` ;
                console.log("data",iconUrl)
                const temp_c = Math.floor(temp - 273.15);
                const temp_f = (temp * 9) / 5 + 32 ;
                const place_text = place+", "+countryCode

                const iconImg = document.querySelector(".weather-icon");
                const temp_num = document.querySelector(".num");
                const wind_p = document.querySelector(".wind + p");
                const pressure_p = document.querySelector(".pressure + p");
                const humidity_p = document.querySelector(".humidity + p");
                const place_div = document.querySelector(".location-name");
                const description_div = document.querySelector(".description");
                const des_p = document.createElement("p");
                const des_p1 = document.createElement("p");

                place_div.innerHTML = place_text;
                temp_num.innerHTML = temp_c;
                iconImg.src = iconUrl;
                wind_p.innerHTML = speed + " m/s";
                pressure_p.innerHTML = pressure + " hPa";
                humidity_p.innerHTML = humidity + " %";
                des_p.innerHTML = main;
                des_p1.innerHTML = description;
                description_div.appendChild(des_p);
                description_div.appendChild(des_p1);
        

            })

            const baseUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            fetch(baseUrl).then(response=>response.json()).then(data=>console.log("in the",data))
        })
    }

})

