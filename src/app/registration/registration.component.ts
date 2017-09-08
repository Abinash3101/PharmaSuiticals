import { Component, OnInit } from '@angular/core';
import {RegistrationService} from 'app/registration/registration.service';
import {RegistrationHttpService} from 'app/registration/registration.httpservice';
import {User} from 'app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {OrderByPipe} from 'app/pipes/order-by.pipe';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[RegistrationService,RegistrationHttpService]
})
export class RegistrationComponent implements OnInit {

public users:User[]=[];
showAllUser:boolean;
showUserRedgForm:boolean;
userForm: FormGroup;
user:User;
isDesc: boolean = false;
column: string;
direction: number;
  constructor(public redgService:RegistrationService,private fb: FormBuilder) { 
    this.showAllUser = true;
    this.showUserRedgForm = false;
    this.prepareUserForm();
  }

  prepareUserForm(){
    this.userForm = this.fb.group({
      '_id':[],
      'id':[],
      'fName':[null, Validators.required],
      'lName':[null, Validators.required],
      'email':[null,Validators.compose([Validators.required,Validators.email])],
      'password':[null, Validators.required],
      'phone':[null, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'isActive':['Yes'],
      'isAdmin':['Yes']
    });
  }

  editUser(user:User){
    this.userForm = this.fb.group({
      '_id':[user._id],
      'id':[user.id],
      'fName':[user.fName, Validators.required],
      'lName':[user.lName, Validators.required],
      'email':[user.email,Validators.compose([Validators.required,Validators.email])],
      'password':[user.password, Validators.required],
      'phone':[user.phone, Validators.compose([Validators.required,Validators.pattern('\\d+')])],
      'isActive':[user.isActive],
      'isAdmin':[user.isAdmin]
    });
    this.showUserRedgForm = true;
    this.showAllUser =  false;
  }

  public loadAllUsers(){
    this.redgService.getAllUsers()
     .subscribe(data=>{
       this.users=data;
       console.log(this.users);
    });
  }

  addUserClicked(){
    this.prepareUserForm();
    this.showAllUser =  false;
    this.showUserRedgForm = true;
  }

  backToShowAllUser(){
    this.showUserRedgForm = false;
    this.showAllUser =  true;
  }

  adduserForm(value: any) {
    console.log(value);
    this.user = value;
    for (var i = 0; i < this.users.length; i++) {
      if (this.user.id && this.users[i].id === this.user.id) {
        this.users.splice(i, 1);
      }
    }
    this.redgService.addUser(this.user);
    this.users.push(this.user);
    this.backToShowAllUser();
  }

  deActivateUser(user:User){
    user.isActive = "No";
    this.redgService.removeUser(user);
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? -1 : 1;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

}
