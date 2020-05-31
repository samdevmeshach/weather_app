import { Component, OnInit } from "@angular/core";
import { ApidataService } from "../apidata.service";
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls:['./home.component.css'] 
})
export class HomeComponent implements OnInit {
    degree:string='\xB0';
    speed:string=' m/s';
    pressure:string = '  Pa';
    feels:string="Feels like ";
    divide:string='/';
    city ="";
    data = [];
    constructor(private details: ApidataService){}
    change(index)
    {   this.city = "";
        this.details.clear(index);
        this.details.fetchData().subscribe((value)=>{
            this.data.push(value);
        })
        if(!this.data[index].display)
        {
            this.data[index].display = true;
            this.data[index].button = "-";
            this.data[index].details.name = "";
            this.data[index].result = false;
        }
        else
        {
            this.data[index].display = false;
            this.data[index].button = "+";
            this.data[index].details.name = "No Feed";
        }
    }
    search(index)
    {
        if(this.city!=""){
        this.details.hitApi(index,this.city);
        this.details.fetchData().subscribe((value)=>{
            this.data.push(value);
        })
        }
    }
    ngOnInit(): void {
        this.data = this.details.load();
    }
}