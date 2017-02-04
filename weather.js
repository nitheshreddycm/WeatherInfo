
//function script(){
//document.querySelector("#city").addEventListener("keyup",filtered);
//};

function filtered() { 
    var inputs= document.getElementById("city").value;
        //alert(inputs);

     var countryJson = fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
    
       var countryList;

 countryJson.then(data=>data.json()).then(data2=>put(data2));
 
    function put(z){
        
       countryList=z;
          
          var x = countryList.filter(data => { 
         if (((data.city).toLowerCase()).includes(inputs))
      return data;   
     });
        
               // alert(data);

        //console.log(); 
          var text="<ul>";
          var resultingDom= x.map(data => 
              //var regex=(data.city).replace(" ","");
  data=`<li onclick="resfunction('${data.city}')">${data.city}</li>`
//data='<li onclick="resfunction(\''+data.city+'\')">'+data.city+'</li>'
//data="<li onclick='resfunction(\""+data.city+"\")'>"+data.city+"</li>"
          );
          for(i=0; i<resultingDom.length; i++)
          text += resultingDom[i];
          text+= "</ul>";
    
        document.getElementById("result").innerHTML=text; 
        if (inputs=='') {
document.getElementById("result").style.display = "none";
//location.reload();
    }
    };
};  
    
function resfunction(cityname){
    
    document.getElementById("city").value=cityname;
document.getElementById("result").style.display = "none";
var cityData= fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=ac7e86839ef6024649500d5bf8dfd690');
    
 var cityList;
cityData.then(data=>data.json()).then(data2=>updateDom(data2));

 function updateDom(data) {
  cityList = data;     
     
var resultDom= 
        `City: <span> ${cityList.name}</span><br>
Coordinates: <span> ${cityList.coord.lon}</span><br>
Temperature: <span> ${cityList.main.temp}</span><br>
Pressure: <span> ${cityList.main.pressure}</span><br>
Humidity: <span> ${cityList.main.humidity}</span><br>
Wind Speed: <span> ${cityList.wind.speed}</span><br>
Wind Degrees: <span> ${cityList.wind.deg}</span><br>
Country: <span> ${cityList.sys.country}</span><br>
weather: <span> ${cityList.weather[0].main}</span><br>
Sunrise: <span> ${cityList.sys.sunrise}</span><br>
Sunset: <span> ${cityList.sys.sunset}</span>`;
if(cityname){
    var head="Weather Report";
    document.getElementById("heading").innerHTML=head;
document.getElementById("weatherResult").innerHTML=resultDom;
    if(cityList.weather[0].main=="Clouds"){
        document.body.style.backgroundImage = "url('screenshots/clouds.jpg')";
    }else if(cityList.weather[0].main=="Rain"){
        document.body.style.backgroundImage = "url('screenshots/rain.jpg')";
    }else if(cityList.weather[0].main=="Wind"){
        document.body.style.backgroundImage = "url('screenshots/windy.jpg')";
    }else{
        document.body.style.backgroundImage = "url('screenshots/atlanta_bg.jpeg')";
    }
    }else{
 document.getElementById("weatherResult").style.display = "none";
        
  };
     
      }
    return true;
};

