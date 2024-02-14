import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user/');
  }

  addUser(user: Omit<User, 'id'>): Observable<any>{
    return this.http.post('http://localhost:3000/user/', user);
  } 

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }

  updateUser(user: User, id: number): Observable<any>{
    return this.http.put(`http://localhost:3000/user/${id}`, user);
  }

  search(username: string): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:3000/user/search/${username}`);
  }
}
