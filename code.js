window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperature=document.querySelector(".temperature-degree");
    let location=document.querySelector(".location-timezone");
    let descriptions=document.querySelector(".temperature-description");
    let feel=document.querySelector(".feels");
    let button=document.querySelector(".btn");
    let precipi=document.querySelector("#rain");
    let humid=document.querySelector("#humid");
    let wind=document.querySelector("#windy");
    let uv=document.querySelector("#uv");
    let press=document.querySelector("#press");
    let visible=document.querySelector("#visible");
    let sunr=document.querySelector("#sunr");
    let suns=document.querySelector("#suns");
    let maximum=document.querySelector(".max");
    let minimum=document.querySelector(".min");
    let days=document.querySelectorAll(".days");
    let temperatures=document.querySelectorAll(".temperatures");
    let inside1=document.querySelectorAll(".inside1");
    let inside2=document.querySelectorAll(".inside2");
    let inside3=document.querySelectorAll(".inside3");
    let inside4=document.querySelectorAll(".inside4");
    let date=document.querySelectorAll(".date");
    let ico=document.querySelectorAll(".icon1");
    let slider1=document.querySelector(".slide1");
    let slider2=document.querySelector(".slide2");
    let firstslot=document.querySelector(".firstslot");
    let secondslot=document.querySelector(".secondslot");
    let first=document.querySelector(".first");
    let second =document.querySelector(".second")
    console.log(inside2);
    let i;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            //console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const api=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${long}?unitGroup=metric&key=3CW3CNQTSW6U5ZSS763LZF98G&contentType=json`
            const api2=`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=87a80562e37d4c4a8549d9f036f93aa6`;

            //async function first(api) {
               fetch(api)
              .then(response=>{
                return response.json();
              })
                  .then(data=>{
                  let space="  ";
                  console.log(data);
                  const{temp,conditions,icon,feelslike,humidity,precip,windspeed,uvindex,pressure,visibility,sunrise,sunset}=data.currentConditions;
                  const{feelslikemax,feelslikemin}=data.days[0];
                  console.log(icon);
                  temperature.innerText=`${temp} C`;

                  descriptions.innerText=`${conditions}`;

                  feel.innerText=`Feels like ${feelslike}`;

                  precipi.innerText=`Precipitation:- ${precip}`;

                  humid.innerText=`Humidity:- ${humidity}%`;

                  wind.innerText=`windspeed:- ${windspeed} kmphs`;

                  if(uvindex>6){
                    uv.innerText=`UV-index:- ${uvindex} \n  High`;
                  }
                  else{
                    uv.innerText=`UV-index:- ${uvindex} \n   Low`;
                  }

                  press.innerText=`Pressure:- ${pressure} mbar`;

                  visible.innerText=`Visibility:- ${visibility} km`;

                  sunr.innerText=`Sunrise:- ${sunrise} am`;

                  suns.innerText=`Sunset:- ${sunset} pm`;

                  maximum.innerText=`${feelslikemax} C`;

                  minimum.innerText=`${feelslikemin} C`;
                 

                  for(i=0;i<=7;i++){
                    date[i].innerText=`${data.days[i+1].datetime.replace(/-/g,"/")}`;
                    temperatures[i].innerText=`${data.days[i+1].temp} C`;
                    inside1[i].innerText=`Max/Min:- ${data.days[i+1].feelslikemax}/${data.days[i+1].feelslikemin}`;
                    inside2[i].innerText=`Precipitation Probability:-${data.days[i+1].precipprob} %`;
                    inside3[i].innerText=`Humdity:-${data.days[i+1].humidity} %` ;
                    inside4[i].innerText=`Windspeed:-${data.days[i+1].windspeed} kmph`;
                    setIcons(data.days[i+1].icon,ico[i]);
                  }
                  setIcons(icon,document.querySelector(".icon"));
                 
                  slider2.addEventListener("click",()=>{
                    firstslot.style.display="none";
                    secondslot.style.display="flex";
                  })

                  slider1.addEventListener("click",()=>{
                    secondslot.style.display="none";
                    firstslot.style.display="flex";
                    
                  })
                  
                  })
           // }
              // first();

            fetch(api2)
              .then(reply=>{
                return reply.json();
              })
                .then(info=>{
                    //console.log(info);
                    const {name}=info.features[0].properties;
                    console.log(name);
                    location.innerText=`${name}`;
                })

                button.addEventListener("click",()=>{
                  let input=document.querySelector(".city").value;
                  let long2=0;
                  let lat2=0;
                  secondslot.style.display="none";
                   firstslot.style.display="flex";
                  //console.log(long2,lat2);
                  //console.log(input);
                  async function callcoords(input,lat2,long2) {
                    const api5=`https://api.geoapify.com/v1/geocode/search?text=${input}&format=json&apiKey=87a80562e37d4c4a8549d9f036f93aa6`
                       await fetch(api5)
                          .then(reply=>{
                            return reply.json();
                          })
                            .then(info=>{
                                //console.log(info);
                                console.log(info);
                                const{lat,lon}=info.results[0];
                                lat2=lat;
                                long2=lon;
                                console.log(lat2,long2);
                            })
                            //console.log("hello");
                            const api3=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat2}%2C${long2}?unitGroup=metric&key=3CW3CNQTSW6U5ZSS763LZF98G&contentType=json`
                            const api4=`https://api.geoapify.com/v1/geocode/reverse?lat=${lat2}&lon=${long2}&apiKey=87a80562e37d4c4a8549d9f036f93aa6`;
                            await fetch(api3)
                              .then(reply=>{
                                return reply.json();
                              })
                                .then(info=>{
                                    //console.log(info);
                                    console.log(info);
                                    const{temp,conditions,icon,feelslike,humidity,precip,windspeed,uvindex,pressure,visibility,sunrise,sunset}=info.currentConditions;
                                    const{feelslikemax,feelslikemin}=info.days[0];
                                    console.log(icon);
                            
                                      temperature.innerText=`${temp} C`;
                                      descriptions.innerText=`${conditions}`;
                                      feel.innerText=`Feels like ${feelslike}`;
                                      precipi.innerText=`Precipitation:- ${precip}`;
                                      humid.innerText=`Humidity:- ${humidity}%`;
                                      wind.innerText=`windspeed:- ${windspeed} kmphs`;
                                      if(uvindex>6){
                                        uv.innerText=`UV-index:- ${uvindex} \n  High`;
                                      }
                                      else{
                                        uv.innerText=`UV-index:- ${uvindex} \n   Low`;
                                      }
                                            press.innerText=`Pressure:- ${pressure} mbar`;
                                            visible.innerText=`Visibility:- ${visibility} km`;
                                            console.log(sunrise);
                                            sunr.innerText=`Sunrise:- ${sunrise} am`;
                                            suns.innerText=`Sunset:- ${sunset} pm`;
                                            maximum.innerText=`${feelslikemax} C`;
                                            minimum.innerText=`${feelslikemin} C`;
                                            //console.log(uvindex);
                                            let i;
                                            for(i=0;i<=7;i++){
                                              date[i].innerText=`${info.days[i+1].datetime.replace(/-/g,"/")}`;
                                              temperatures[i].innerText=`${info.days[i+1].temp} C`;
                                              inside1[i].innerText=`Max/Min:- ${info.days[i+1].feelslikemax}/${info.days[i+1].feelslikemin}`;
                                              inside2[i].innerText=`Precipitation Probability:-${info.days[i+1].precipprob} %`;
                                              inside3[i].innerText=`Humdity:-${info.days[i+1].humidity} %` ;
                                              inside4[i].innerText=`Windspeed:-${info.days[i+1].windspeed} kmph`;
                                              setIcons(info.days[i+1].icon,ico[i]);
                                            }
                                      setIcons(icon,document.querySelector(".icon"));
                                      slider2.addEventListener("click",()=>{
                                        firstslot.style.display="none";
                                        secondslot.style.display="flex";
                                      })
                    
                                      slider1.addEventListener("click",()=>{
                                        secondslot.style.display="none";
                                        firstslot.style.display="flex";
                                        
                                      })
                                    
                                })

                               await fetch(api4)
                                .then(reply=>{
                                  return reply.json();
                                })
                                  .then(info=>{
                                      //console.log(info);
                                      const {name}=info.features[0].properties;
                                      console.log(input);
                                      location.innerText=`${input}`;
                                  })

                  }
                  callcoords(input,lat2,long2);

                }) 

        });

        

       
    }else{
        h1.textContent="not working";
    }

    function setIcons(icon,iconID){
      const skycons=new Skycons({color:"white"});
      const currentIcon=icon.replace(/-/g,"_").toUpperCase();
      skycons.play();
      return skycons.set(iconID,Skycons[currentIcon]);
    }
});