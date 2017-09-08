import { Injectable } from '@angular/core';
import {UserHttpService} from './user.httpservice';
import {Product} from 'app/models/product.model';


@Injectable()
export class UserService {

  constructor(private userHttpService:UserHttpService) { }

  public getAllProducts(){
    return this.userHttpService.getAllProducts();
  }

  removeAProduct(productObj:Product){
   var status = this.userHttpService.removeAProduct(productObj);
    console.log(status);
  }
  
}
