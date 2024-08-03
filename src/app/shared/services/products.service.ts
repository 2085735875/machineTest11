import { Injectable } from '@angular/core';
import { Iproduct } from '../model/product';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsArray : Array<Iproduct> = [
    {
      pname : 'Motorola 40 fusion',
      pid : '111',
      pstatus : 'In_Progress',
      canReturn : 1
    },
    {
      pname : 'Iphone 15',
      pid : '222',
      pstatus : 'Delivered',
      canReturn : 0
    },
    {
      pname : 'Samsung',
      pid : '333',
      pstatus : 'Dispatched',
      canReturn : 1
    },
    {
      pname : 'Lenovo 12',
      pid : '444',
      pstatus : 'In_Progress',
      canReturn : 0
    }
  ]
  constructor(
    private _snackBar : SnackbarService
  ) { }

  fetchAllProducts() : Iproduct[] {
    return this.productsArray
  }

  fetchProduct(id : string) : Iproduct{
    return this.productsArray.find(product => product.pid === id) as Iproduct
  }

  updateProduct(updatedObj : Iproduct){
    let getIndex = this.productsArray.findIndex(prod => prod.pid === updatedObj.pid)
    let obj = this.productsArray[getIndex]
    this.productsArray[getIndex] = updatedObj
    this._snackBar.openSnackBar(`The user name is ${obj.pname} is changed with ${updatedObj.pname}`)
  }

  addProduct(product : Iproduct){
    this.productsArray.push(product);
    this._snackBar.openSnackBar(`The product  ${product.pname} is successfully added !!`)
  }

  removeProduct(id : string){
    let getConfirm = confirm('Do you want to remove this item')
    if(getConfirm){
      let getIndex = this.productsArray.findIndex(prod => prod.pid === id);
      let obj = this.productsArray[getIndex]
      this.productsArray.splice(getIndex, 1)
      this._snackBar.openSnackBar(`The product  ${obj.pname} is successfully remove !!`)
    }
   
  }
}
