import { Injectable } from '@angular/core';
import {RegistrationHttpService} from './registration.httpservice';
import {User} from 'app/models/user.model';

@Injectable()
export class RegistrationService {

  constructor(private redgHttpService:RegistrationHttpService) { }

  public getAllUsers(){
    return this.redgHttpService.getAllUsers();
  }

  public addUser(userObj:User){
    var status = this.redgHttpService.addUser(userObj);
    console.log(status);
  }

  removeUser(userObj:User){
   var status = this.redgHttpService.removeUser(userObj);
    console.log(status);
  }

} 
