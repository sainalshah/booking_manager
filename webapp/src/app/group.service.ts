import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Group } from './group';

import {map, catchError} from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http: HttpClient ) {

  }

  // API: POST /groups
  public async saveGroup(group: Group) {
    return await this.http.post<any>(API_URL + '/groups', group).toPromise();
  }

  // API: GET /groups
  public async getAllGroups(userId: string): Promise<[Group]> {
    // will use this.http.get()
    const  params = new  HttpParams().set('userId', userId)
    let groups = await this.http.get<[Group]>( API_URL + '/groups', {params}).toPromise();
    groups.map(group => {
      group.memberList = "";
      group.members.map(member => {
        group.memberList = group.memberList + member.firstName + ", ";
      })

      group.memberList = group.memberList.slice(0, -2);
    });
    console.log(groups);
    return groups;
  }

  public async getByGroupId(groupId: string): Promise<Group> {
    // will use this.http.get()
    const  params = new  HttpParams().set('groupId', groupId)
    let group = await this.http.get<Group>( API_URL + '/groups/byGroupId', {params}).toPromise();
    console.log(group);
    return group;
  }

  // API: POST /groups
  public createGroup(group: Group) {
    // will use this.http.post()
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
