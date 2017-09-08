import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import {InventoryComponent} from 'app/inventory/inventory.component';
import { APP_BASE_HREF } from '@angular/common';
import { UserComponent } from './user.component';
import {RegistrationComponent} from 'app/registration/registration.component';

const userRoutes: Routes = [
  /*{ path: 'inventory', component: InventoryComponent }*/
  {
  path:'user',
  component:UserComponent,
  children:[
    {
      path:'',
      children:[
        {path:'inventory',component:InventoryComponent},
        {path:'inventory/:id',component:InventoryComponent},
        {path:'register',component:RegistrationComponent}
      ]
    }
  ]
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  declarations: []
})
export class UserModule { }
