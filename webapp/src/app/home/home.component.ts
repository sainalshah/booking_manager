import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { UserService } from "../user.service";
import { Router, NavigationExtras } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'createdBy', 'members'];

  groups: [Group];

  constructor( private groupService: GroupService, private dialog: MatDialog, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadGroups();
  }

  async loadGroups(){
    const user = this.userService.userBS.value;
    this.groups = await this.groupService.getAllGroups(user._id);
    console.log( "groups retrieved", this.groups);
  }

  showBooking(groupId): void {
    console.log("groupid", groupId);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupId: groupId
      }
    }
    this.router.navigate(['booking'], navigationExtras);
  }

  showAddGroup(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(isGroupAdded => {
      console.log('The dialog was closed', isGroupAdded);
      if (isGroupAdded){
        this.loadGroups();
      }
    });
  }

}
