import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
//step 1
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import {UserModule} from './user/user.module';
import { ProductPipe } from './pipes/product.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { AlertComponent } from './alert/alert.component';
import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    InventoryComponent,
    ProductPipe,
    OrderByPipe,
    RegistrationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    UserModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
