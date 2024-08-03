import { Injectable } from '@angular/core';
import { Iuser } from '../model/user';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersArray : Array<Iuser> = [
    {
      userName : 'Sachin',
      userId : '1',
      userRole : 'Admin'
    },
    {
      userName : 'Vaibhav',
      userId : '2',
      userRole : 'Candidate'
    },
    {
      userName : 'Shiva',
      userId : '3',
      userRole : 'Admin'
    },
    {
      userName : 'Rupesh',
      userId : '4',
      userRole : 'Candidate'
    }
  ]
  constructor(
    private _snackBar : SnackbarService
  ) { }

  fetchAllUsers(): Iuser[]{
    return this.usersArray
  }

  fetchUser(id : string): Iuser{
    return this.usersArray.find(user => user.userId === id) as Iuser
  }

  updateUser(updatedObj : Iuser){
    let getIndex = this.usersArray.findIndex(user => user.userId === updatedObj.userId)
    let obj = this.usersArray[getIndex]
    this.usersArray[getIndex] = updatedObj

    this._snackBar.openSnackBar(`The user name is ${obj.userName} is changed with ${updatedObj.userName}`)
  }
  addUser(user : Iuser){
    this.usersArray.push(user)
    this._snackBar.openSnackBar(`The user  ${user.userName} is successfully added !!`)
  }

  removeUser(id : string){
    let getConfirm = confirm('Do you want to remove this item');
    if(getConfirm){
      let getIndex = this.usersArray.findIndex(user => user.userId === id);
      let obj = this.usersArray[getIndex]
      this.usersArray.splice(getIndex, 1);
      this._snackBar.openSnackBar(`The user  ${obj.userName} is successfully remove !!`)
    }
  }
}
