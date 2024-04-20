import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit{
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public propertyId : number;  
  properties = new Property()  //defined class property in model/property file  , created object here

  constructor(private route : ActivatedRoute ,
            private router : Router,
            private housingService : HousingService){}


  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];  //getting the id after clicking 

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
        this.housingService.getProperty(this.propertyId).subscribe( //passing the id to getProperty method
          (data: Property) => { //getting the data in JSON format through Property interface file
            this.properties = data;
          }
        );
      }
    );
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
     
    ];

    this.galleryImages = [
      {
        small: 'assets/images/Internal-1.jpg',
        medium: 'assets/images/Internal-1.jpg',
        big: 'assets/images/Internal-1.jpg',
      },
      {
        small: 'assets/images/Internal-2.jpg',
        medium: 'assets/images/Internal-2.jpg',
        big: 'assets/images/Internal-2.jpg',
      },
      {
        small: 'assets/images/Internal-3.jpg',
        medium: 'assets/images/Internal-3.jpg',
        big: 'assets/images/Internal-3.jpg',
      },{
        small: 'assets/images/Internal-4.jpg',
        medium: 'assets/images/Internal-4.jpg',
        big: 'assets/images/Internal-4.jpg',
      },
    ];
  }
      
}


  // onSelectNext(){
    //   this.propertyId +=1
    //   this.router.navigate(['property-detail',this.propertyId])
    // }
    // goPrevious(){
    //   this.propertyId -=1
    // }
