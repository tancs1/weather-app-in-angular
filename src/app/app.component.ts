import { Component, OnInit } from '@angular/core';
import {CommonService} from '../app/comman.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  weatherData: any;
  isChangeLocation=false;
  todayDate: Date;


  city='fasialabad'
  constructor(private service:CommonService){
this.todayDate=new Date()
  }
  getlocation(location:any){
    this.getWeather(location);

  }
  ngOnInit(): void {
    this.getWeather('faisalabad');
  }
 
  changeLocation(){
    console.log("button click");
    debugger
this.isChangeLocation=this.isChangeLocation==true?false:true;
  }
// app.component.ts
getWeather(city: string): void {
  this.service.getWeather(city).subscribe((data: any) => {
    console.log('Icon Code:', data.weather[0]?.icon);
    this.weatherData = data;

  });
}

  getWeatherDescription(weatherArray: any[]): string {
    if (weatherArray && weatherArray.length > 0) {
      return weatherArray[0].description;
    }
    return 'N/A';
  }
  getRainValue(data: any): string {
    // Check if 'rain' is present directly or within 'weather'
    if (data.rain) {
      return data.rain['24h'] ? data.rain['24h'] + ' mm' : 'N/A';
    } else if (data.weather && data.weather[0].rain) {
      return data.weather[0].rain['24h'] ? data.weather[0].rain['24h'] + ' mm' : 'N/A';
    }
    return 'N/A';
  }
  getFormattedTime(timestamp: number | undefined): string {
    if (timestamp) {
      const date = new Date(timestamp * 1000); // Convert from Unix timestamp to milliseconds
      return date.toLocaleTimeString();
    }
    return 'N/A';
  }


  
  
}