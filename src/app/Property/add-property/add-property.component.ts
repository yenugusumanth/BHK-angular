import { Component,ViewChild, Input, OnInit} from '@angular/core';
import { FormGroup, NgForm ,FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IpropertyBase } from 'src/app/model/ipropertyBase';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property'



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit{
 // @ViewChild ('Form') addpropertyForm : NgForm  //In templateDriven Form logic flows from html to ts file
  @ViewChild('formTabs') formTabs:TabsetComponent
  addPropertyForm:FormGroup;
  nextClicked: boolean;
  property = new Property(); //object created from property class


  propertyType:Array<string>=['Housing','Apartment','Duplex']
  furnishingType:Array<string>=['Fully','Semi','Unfurnished']
  DirectionType:Array<string>=['North','South','East','West']

  propertyView: IpropertyBase = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    pType: null,
    fType: null,
    BHK: null,
    builtArea: null,
    city: null,
    RTM: null
    
  };
  constructor(private fb: FormBuilder, 
              private router : Router,
              private alertify : AlertyfyService,
              private housing : HousingService){ }

  ngOnInit(): void {  
    this.createAddPropertyForm();
  }
  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({    
      basicInfo: this.fb.group({
        sellRent: [null , Validators.required],   //To add multiple validators sholud add in array
        BHK: [null, Validators.required],
        pType: [null, Validators.required],
        fType: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required]
      }),

      priceInfo: this.fb.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null],
      }),

      addressInfo: this.fb.group({
        floorNo: [null],
        totalFloor: [null],
        address: [null],
        landMark: [null],
      }),

      otherInfo: this.fb.group({
        RTM: [null],
        possessionOn: [null],
        AOP: [null],
        gated: [null],
        mainEntrance: [null],
        description: [null]
      })
    })
  }

  //---------------------------------
//#region <Getter Methods>
  // #region <FormGroups>
   
  get basicInfo(){
    return this.addPropertyForm.controls['basicInfo'] as FormGroup 
  }
  get priceInfo() {
    return this.addPropertyForm.controls['priceInfo']  as FormGroup;
  }

  get addressInfo() {
    return this.addPropertyForm.controls['addressInfo'] as FormGroup;
  }

  get otherInfo() {
    return this.addPropertyForm.controls['otherInfo']  as FormGroup;
  }
// #endregion

  //#region <Form Controls>
  get sellRent() {
    return this.basicInfo.controls['sellRent'] as FormControl;
  }
  get BHK() {
    return this.basicInfo.controls['BHK'] as FormControl;
  }

  get pType() {
    return this.basicInfo.controls['pType'] as FormControl;
  }

  get fType() {
    return this.basicInfo.controls['fType'] as FormControl;
  }

  get name() {
    return this.basicInfo.controls['name'] as FormControl;
  }

  get city() {
    return this.basicInfo.controls['city']as FormControl;
  }

  get price() {
    return this.priceInfo.controls['price'] as FormControl;
  }

  get builtArea() {
    return this.priceInfo.controls['builtArea'] as FormControl;
  }

  get carpetArea() {
    return this.priceInfo.controls['carpetArea'] as FormControl;
  }

  get security() {
    return this.priceInfo.controls['security'] as FormControl;
  }

  get maintenance() {
    return this.priceInfo.controls['maintenance'] as FormControl;
  }

  get floorNo() {
    return this.addressInfo.controls['floorNo'] as FormControl;
  }

  get totalFloor() {
    return this.addressInfo.controls['totalFloor'] as FormControl;
  }

  get address() {
    return this.addressInfo.controls['address'] as FormControl;
  }

  get landMark() {
    return this.addressInfo.controls['landMark'] as FormControl;
  }

  get RTM() {
    return this.otherInfo.controls['RTM'] as FormControl;
  }

  get possessionOn() {
    return this.otherInfo.controls['possessionOn'] as FormControl;
  }

  get AOP() {
    return this.otherInfo.controls['AOP'] as FormControl;
  }

  get gated() {
    return this.otherInfo.controls['gated'] as FormControl;
  }

  get mainEntrance() {
    return this.otherInfo.controls['mainEntrance'] as FormControl;
  }

  get description() {
    return this.otherInfo.controls['description'] as FormControl;
  }

  //#endregion
//#endregion

  goBack(){
    this.router.navigate(['/']);
  }
  submit(){
    this.nextClicked=true 
    if(this.allTabsValid()){
      this.mapProperty();
      this.housing.addProperty(this.property) //mapped property
      this.alertify.success("successfully Data is submitted")
      console.log(this.addPropertyForm)  
    }else{
      this.alertify.error("Please provide all details")
    }  
   
  }
  mapProperty(): void {
    this.property.id = this.housing.newPropId()
    this.property.sellRent = +this.sellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.pType = this.pType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.fType = this.fType.value;
    this.property.price = this.price.value;
    this.property.security = this.security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.carpetArea = this.carpetArea.value;
    this.property.floorNo = this.floorNo.value;
    this.property.totalFloor = this.totalFloor.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.gated = this.gated.value;
    this.property.mainEntrance = this.mainEntrance.value;
    this.property.possession = this.possessionOn.value;
    this.property.description = this.description.value;
    this.property.postedOn = new Date().toString();
    
  }

  allTabsValid():boolean{
    if(this.basicInfo.invalid){
      this.formTabs.tabs[0].active=true
      return false;
    }
    if(this.priceInfo.invalid){
      this.formTabs.tabs[1].active=true;
      return false;
    }
    if(this.addressInfo.invalid){
      this.formTabs.tabs[2].active=true;
      return false;
    }
    if(this.otherInfo.invalid){
      this.formTabs.tabs[3].active=true;
      return false; 
    }
    return true;
  }
  selectTab(tabId : number, IsCurrentTabValid: boolean){
    this.nextClicked = true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active=true
    }
  }
}
