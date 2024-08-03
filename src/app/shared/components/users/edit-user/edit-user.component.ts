import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId !: string;
  userObj !: Iuser;
 userForm !: FormGroup;
 isinEditMode : boolean = false
 isinEditMode2 : boolean = false
  constructor(
    private _route : ActivatedRoute,
    private _userService : UsersService,
    private _router : Router,
    private _uuidService : UuidService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.userId = this._route.snapshot.params['userId'];
    if(this.userId){
      this.isinEditMode = true;
      this.userObj = this._userService.fetchUser(this.userId);
      this.userForm.patchValue(this.userObj)
      this._route.queryParams
      .subscribe(res => {
        if(res['userRole'] == 'Candidate'){
          this.userForm.disable();
          this.isinEditMode2 = false
        }else{
          this.userForm.enable();
          this.isinEditMode2 = true
        }
      })
    }else{
      this.isinEditMode = false
    }
   
  }

  createUserForm(){
    this.userForm = new FormGroup({
      userName : new FormControl(null, [Validators.required]),
      userRole : new FormControl(null, [Validators.required])
    })
  }

  onUserUpdate(){
    if(this.userForm.valid){
      let updatedObj : Iuser = {...this.userForm.value, userId : this.userId}
      this._userService.updateUser(updatedObj);
      this._router.navigate(['/users'])
    }
  }

  onUserAdd(){
    if(this.userForm.valid){
      let user : Iuser = {...this.userForm.value, userId : this._uuidService.uuid() }
      this._userService.addUser(user);
      this.userForm.reset();
      this._router.navigate(['/users'])
    }
  }

}
