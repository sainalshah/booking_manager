import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { GroupService } from "../group.service";
import { User } from "../user";
import { Group } from "../group";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  constructor(private userService: UserService, private groupService: GroupService) { }

  newGroup : Group = new Group();
  availableUsers : User[];
  async ngOnInit() {
  	this.availableUsers = await this.userService.getAllUsers();
  }

  addGroup (){  	
    const user = this.userService.userBS.value;
    this.newGroup.createdBy = user._id;
  	console.log("saving new group", this.newGroup);

  	this.groupService.saveGroup(this.newGroup);
  }
}
