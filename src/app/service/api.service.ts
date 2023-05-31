import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  createUser(user: any) {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  updateUser(userId:number, upUser:any){

    return this.http.put(this.BASE_URL+"/users/"+ userId, upUser);
  }

  DeleteUser(userId:number) {

    return this.http.delete(this.BASE_URL+"/users/"+userId);

  }

  getUserById(userId: number) {
    return this.http.get(this.BASE_URL+"/users/"+ userId);
  }

  getAlbumsByUserId(userId: number) {
    return this.http.get(`${this.BASE_URL}/users/${userId}/albums`);
  }

  getPhotosByAlbumId(albumId: number){
    return this.http.get(`${this.BASE_URL}/albums/${albumId}/photos`);
  }
}
