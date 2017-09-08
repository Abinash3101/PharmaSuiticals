import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from 'app/models/user.model';
import {LoginService} from './login.service';
import {AlertService} from 'app/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,AlertService]
})
export class LoginComponent implements OnInit{
  public title:string;
  loginForm: FormGroup;
  authenticated: boolean
  profile: Object;
  user: User;
  loading = false;
  returnUrl: string;
  constructor(fb: FormBuilder, 
              public http: Http,
              private router: Router,
              private route: ActivatedRoute,
              private loginService:LoginService,
              private alertService: AlertService) {
    this.title="Please Log in";
    this.loginForm = fb.group({
      'email': [null,Validators.compose([Validators.required,Validators.email])],
      'password': [null, Validators.required],
    })
  }

   ngOnInit() {
        // reset login status
        this.loginService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  submitForm(value: any) {
    this.loading = true;
    this.user = value;
    this.loginService.login(this.user.email,this.user.password)
      .subscribe(
                data => {
                  if (sessionStorage.getItem('currentUser')) {
                    this.router.navigate(["user"]);
                  }else{
                    this.router.navigate(["login"]);
                    alert("Wrong email or password!");
                    this.loading = false;
                  }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        //this.router.navigate(['user']);
     //this.router.parent.navigate('/about');
  }
}
