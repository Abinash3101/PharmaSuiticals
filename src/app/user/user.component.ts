import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {UserHttpService} from './user.httpservice';
import {Product} from 'app/models/product.model';
import { Router } from '@angular/router';
import {ProductPipe} from 'app/pipes/product.pipe';
import {OrderByPipe} from 'app/pipes/order-by.pipe';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService,UserHttpService]
})
export class UserComponent implements OnInit {

public products:Product[]=[];
public showProducts:Boolean;
isDesc: boolean = false;
column: string;
direction: number;
isAdminUser:boolean = false;
  constructor(public userService:UserService,private router: Router) {
    this.showProducts = true;
    this.loadAllProducts(); 
  }

  public addAProduct(){
    this.showProducts = false;
    this.router.navigate(['user/inventory']);
  }

  public editProduct(productId){
    this.showProducts = false;
    this.router.navigate(['/user/inventory',productId]);
  }

  public loadAllProducts(){
    this.userService.getAllProducts()
     .subscribe(data=>{
       this.products=data;
    });
  }

  public deleteAProduct(product:Product){
    this.userService.removeAProduct(product);
    this.loadAllProducts();
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? -1 : 1;
  }

  homeClicked(){
    this.router.navigate(['user']);
    location.reload();
  }

  userMngtClicked(){
    this.showProducts = false;
    this.router.navigate(['user/register']);
  }

  ngOnInit() {
    if(sessionStorage.getItem('isAdmin') && sessionStorage.getItem('isAdmin') == 'Yes'){
       this.isAdminUser = true;
    }
  }

}
