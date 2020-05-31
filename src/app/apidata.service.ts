import { Injectable } from '@angular/core';
import { getJSON } from "tns-core-modules/http";
import { AsyncSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor() { }
  private weatherData = [
    {details:{name:"No Feed"}, display:false,button:"+",result:false,temp:0,feelsLike:0,temp_min:0,temp_max:0,day:"",time:""},
  {details:{name:"No Feed"},display:false,button:"+",result:false,temp:0,feelsLike:0,temp_min:0,temp_max:0,day:"",time:""},
  {details:{name:"No Feed"},display:false,button:"+",result:false,temp:0,feelsLike:0,temp_min:0,temp_max:0,day:"",time:""},
  {details:{name:"No Feed"}, display:false,button:"+",result:false,temp:0,feelsLike:0,temp_min:0,temp_max:0,day:"",time:""}
];
private retrivedData = new AsyncSubject();
  load()
  {
    return this.weatherData;
  }
  setData(r,panel){
    this.weatherData[panel].temp = Math.round(r.main.temp-273);
    this.weatherData[panel].feelsLike = Math.round(r.main.feels_like-273);
    this.weatherData[panel].temp_min = Math.floor(r.main.temp_min-273.15);
    this.weatherData[panel].temp_max = Math.ceil(r.main.temp_max-273.15);
    this.weatherData[panel].day ="   " + new Date().toDateString().substr(4,6);
    this.weatherData[panel].time = " " + new Date().toTimeString().substr(0,8);
    this.weatherData[panel].details = r ;
    this.weatherData[panel].button = "+";
    this.weatherData[panel].result = true;
  }
  hitApi(panel,city)
  {
    getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11c67480f984b1da7f4e6533da782fc4`).then((r: any) => {
      this.weatherData[panel].button = "+";
      this.weatherData[panel].details.name= "Wrong City";
      this.weatherData[panel].display = false;
      if(city == r.name){
        let data:any = r;
        this.setData(data,panel);
      }
    }, (e) => {
      this.weatherData[panel].details.name= "Wrong City";
      this.weatherData[panel].result = false;
      this.weatherData[panel].button = "+";
    });
  }
  fetchData()
  {
    return this.retrivedData.asObservable();
  }
}
