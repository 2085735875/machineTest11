import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersArr : Array<Iuser> = []
  constructor(
    private _usersServices : UsersService
  ) { }

  ngOnInit(): void {
    this.usersArr = this._usersServices.fetchAllUsers()
  }

}
