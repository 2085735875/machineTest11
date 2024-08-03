import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/user';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userId !: string;
  userObj !: Iuser 
  constructor(
    private _route : ActivatedRoute,
    private _userService : UsersService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    // this.userId = this._route.snapshot.params['userId']
    // this.userObj = this._userService.fetchUser(this.userId);

    this._route.params
        .subscribe(res => {
          this.userId = res['userId'];
          this.userObj = this._userService.fetchUser(this.userId);
        })
  }

  gotoEditUser(){
    this._router.navigate(['edit'], {
      relativeTo : this._route,
      queryParamsHandling : 'preserve'
    })
  }

  onUserRemove(){
    this._userService.removeUser(this.userId);
    this._router.navigate(['/users'])
  }

}
