import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.API_URL;

  constructor(private httpClient: HttpClient) {}


  getUser(username: string) {
    return this.httpClient.get(`${this.url}/${username}`);
  }

  getRepos(username: string, page: number = 1) {
    return this.httpClient.get(
      `${this.url}/${username}/repos?page=${page}`
    );
  }
}
