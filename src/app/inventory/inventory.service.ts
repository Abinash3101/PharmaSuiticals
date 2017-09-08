import { Injectable } from '@angular/core';
import {Product} from 'app/models/product.model';
import {InventoryHttpService} from './inventory.httpservice';

@Injectable()
export class InventoryService {

  constructor(private inventoryHttpService:InventoryHttpService) { }

  addProduct(productObj:Product){
    var status = this.inventoryHttpService.addProduct(productObj);
    console.log(status);
  }

  getProductById(prodId){
   return this.inventoryHttpService.getProductById(prodId);
  }

}
