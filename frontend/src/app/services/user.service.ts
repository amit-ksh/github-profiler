import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'localhost:4500';

  constructor(private httpClient: HttpClient) {}

  getUser(username: string) {
    return this.httpClient.get(`${this.url}/${username}`);
  }
}
