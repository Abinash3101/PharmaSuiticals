import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {User} from 'app/models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RegistrationHttpService {

  constructor(private http:Http) { }
  private apiUrl = 'http://localhost:3000/api/users';

  public getAllUsers(){
    return this.http.get(this.apiUrl)
    .map(res=>res.json())
    .catch(error => 'server error');
  }
  
  addUser(userObj:User){
    let bodyString = JSON.stringify(userObj);
      let headers=new Headers({'Content-Type':'application/json'});
      let options=new RequestOptions({headers:headers});
       console.log(bodyString);
      return this.http.post(this.apiUrl,bodyString,options)
     .map((res:Response)=>res.json())
     .catch((error:any)=>Observable.throw(error.json().error ||'there is some error in the service')).subscribe();
  }

   removeUser(userObj:User){
    let bodyString = JSON.stringify(userObj);
      let headers=new Headers({'Content-Type':'application/json'});
      let options=new RequestOptions({headers:headers,body:bodyString});
       console.log(bodyString);
      return this.http.delete(this.apiUrl,options)
     .map((res:Response)=>res.json())
     .catch((error:any)=>Observable.throw(error.json().error ||'there is some error in the service')).subscribe();
  }
}
