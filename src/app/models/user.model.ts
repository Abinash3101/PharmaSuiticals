export class User {
  _id:string;
  id:number;
  fName:string;
  lName:string;
  email: string;
  password: string;
  phone: number;
  isActive:string;
  isAdmin:string;

  constructor(_id:string,id:number,fName:string,lName:string,email:string,password:string,phone:number,isActive:string,isAdmin:string){
     this._id = _id;
     this.id = id;
     this.fName = fName;
     this.lName = lName;
     this.email = email;
     this.password = password;
     this.phone = phone;
     this.isActive = isActive;
     this.isAdmin = isAdmin;
  }
}