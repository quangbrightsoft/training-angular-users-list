import { Injectable } from '@angular/core';
import { User, PagedData } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListUrl = `https://localhost:5001/api/user/list`;
  private createUserUrl = `https://localhost:5001/api/user/create`;
  private deleteUserUrl = `https://localhost:5001/api/user/delete`;
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUsers(params: { [param: string]: string | string[]; }): Observable<PagedData<User>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNGE1NzY5Mi00MDA5LTQ2NDYtODRkOS0yZDMzMWI4MTgwYmUiLCJzdWIiOiJkZXZlbG9wZXIuYnJpZ2h0c29mdEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTYyMTYwNTQ2MSwiaXNzIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIiwiYXVkIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIn0.9ix0zQ2lks9zcHvXHHgJGFtNz91FCO7ZXFBzZtr30Fw'
    })
    return this.http.get<PagedData<User>>(this.userListUrl, {
      headers: headers,
      params: params
    });
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNGE1NzY5Mi00MDA5LTQ2NDYtODRkOS0yZDMzMWI4MTgwYmUiLCJzdWIiOiJkZXZlbG9wZXIuYnJpZ2h0c29mdEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTYyMTYwNTQ2MSwiaXNzIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIiwiYXVkIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIn0.9ix0zQ2lks9zcHvXHHgJGFtNz91FCO7ZXFBzZtr30Fw'
    })
    return this.http.post<User>(this.createUserUrl, user, {
      headers: headers
    });
  }
  delete(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNGE1NzY5Mi00MDA5LTQ2NDYtODRkOS0yZDMzMWI4MTgwYmUiLCJzdWIiOiJkZXZlbG9wZXIuYnJpZ2h0c29mdEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTYyMTYwNTQ2MSwiaXNzIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIiwiYXVkIjoiQnJpZ2h0c29mdC5FSGVhcnRCb29raW5nIn0.9ix0zQ2lks9zcHvXHHgJGFtNz91FCO7ZXFBzZtr30Fw'
    })
    return this.http.delete<User>(this.deleteUserUrl, {
      headers: headers,
      params: { id: id }
    });
  }
}
