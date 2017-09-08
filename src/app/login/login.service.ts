import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/authenticate';

  constructor(private http: Http) { }

  login(userEmail: string, password: string) {
      let headers=new Headers({'Content-Type':'application/json'});
      let options=new RequestOptions({headers:headers});
        return this.http.post(this.apiUrl, JSON.stringify({ userEmail: userEmail, password: password }),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                //console.log(user);
                if (user && user.token) {
                    console.log(JSON.stringify(user.isAdmin));
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    sessionStorage.setItem('isAdmin', user.isAdmin);
                    console.log("user stored in session");
                }
            }).catch((error:any)=>Observable.throw(error.json().error ||'there is some error in the service'));
    }
 
    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }

}
