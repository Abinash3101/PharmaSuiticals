import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Product} from 'app/models/product.model';
import {UserComponent} from 'app/user/user.component';
import {InventoryService} from './inventory.service';
import {InventoryHttpService} from './inventory.httpservice';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers:[InventoryService,InventoryHttpService]
})
export class InventoryComponent implements OnInit {
 productForm: FormGroup;
 product:Product;
 prodObj:Product;
 private prodIdToedit:string;
 private subs:any;
 private isProdIdReadOnlyinForm:boolean = false;
  constructor(private fb: FormBuilder,private userComponent:UserComponent,
               private inventoryService:InventoryService,private router: Router,private route:ActivatedRoute) {
    this.productForm = fb.group({
      '_id':[],
      'prodId':[null, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'prodName':[null, Validators.required],
      'prodQuantity':[null, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'prodExpiryDate':[null, Validators.required]
    });
   }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params=>{
       this.prodIdToedit = params['id'];
    });
    if(this.prodIdToedit){
      this.populateValuesInProdForm();
    }
  }

  addProductForm(value: any){
    this.product = value;
    this.inventoryService.addProduct(this.product);
    this.userComponent.products.push(this.product );
    this.backToUser();
    this.userComponent.showProducts = true;
  }

  backToUser(){
    this.router.navigate(['user']);
    location.reload();
  }

  private populateValuesInProdForm(){
    this.inventoryService.getProductById(this.prodIdToedit)
    .subscribe(data=>{
       this.prodObj=data;
       console.log(this.prodObj);
       this.productForm = this.fb.group({
         '_id':[this.prodObj._id],
      'prodId':[this.prodObj.prodId, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'prodName':[this.prodObj.prodName, Validators.required],
      'prodQuantity':[this.prodObj.prodQuantity, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'prodExpiryDate':[this.prodObj.prodExpiryDate, Validators.required]
    });
  });
  this.isProdIdReadOnlyinForm = true;
  }
}
