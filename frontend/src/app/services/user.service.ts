import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'localhost:4500';

  constructor(private httpClient: HttpClient) {}

  user: any = null

  getUser(username: string) {
    return this.httpClient.get(`http://${this.url}/${username}`);
  }

  getRepos(username: string) {
    return this.httpClient.get(`http://${this.url}/${username}/repos`);
  }
}
