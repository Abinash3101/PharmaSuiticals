export class Product {
    _id:string;
    prodId:number;
    prodName:string;
    prodQuantity:number;
    prodExpiryDate:Date;

    constructor(_id:string,prodId:number,prodName:string,prodQuantity:number,prodExpiryDate:Date){
        this._id = _id;
        this.prodId = prodId;
        this.prodName = prodName;
        this.prodQuantity = prodQuantity;
        this.prodExpiryDate = prodExpiryDate;
    }
}