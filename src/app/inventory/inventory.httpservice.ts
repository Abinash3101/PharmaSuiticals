import { Injectable } from '@angular/core';
import {Product} from 'app/models/product.model';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class InventoryHttpService {
  private apiUrl = 'http://localhost:3000/api/products';
  private apiUrlgetOne = 'http://localhost:3000/api/product/';
  constructor(private http:Http) { }

  addProduct(productObj:Product){
      console.log("inside InventoryHttpService");
      let bodyString = JSON.stringify(productObj);
      let headers=new Headers({'Content-Type':'application/json'});
      let options=new RequestOptions({headers:headers});
       console.log(bodyString);
      return this.http.post(this.apiUrl,bodyString,options)
     .map((res:Response)=>res.json())
     .catch((error:any)=>Observable.throw(error.json().error ||'there is some error in the service')).subscribe();
  }

  getProductById(prodId){
    return this.http.get(this.apiUrlgetOne+prodId)
    .map(res=>res.json())
    .catch(error => 'server error');
  }

}
