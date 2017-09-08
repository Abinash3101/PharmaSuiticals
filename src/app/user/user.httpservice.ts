import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Product} from 'app/models/product.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserHttpService {

  constructor(private http:Http) { }
  private apiUrl = 'http://localhost:3000/api/products';

  public getAllProducts(){
    return this.http.get(this.apiUrl)
    .map(res=>res.json())
    .catch(error => 'server error');
  }

  removeAProduct(productObj:Product){
    let bodyString = JSON.stringify(productObj);
      let headers=new Headers({'Content-Type':'application/json'});
      let options=new RequestOptions({headers:headers,body:bodyString});
       console.log(bodyString);
      return this.http.delete(this.apiUrl,options)
     .map((res:Response)=>res.json())
     .catch((error:any)=>Observable.throw(error.json().error ||'there is some error in the service')).subscribe();
  }
}
