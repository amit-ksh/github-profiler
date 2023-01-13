import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private service: UserService) {}

  proxyForm = new FormGroup({});

  username = new FormControl('');
  user: any = {
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/octocat',
    name: 'The Octocat',
    company: '@github',
    blog: 'https://github.blog',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: 'A bio',
    twitter_username: 'amit__ksh',
    public_repos: 8,
    public_gists: 8,
    followers: 8037,
    following: 9,
    created_at: '2011-01-25T18:44:36Z',
    updated_at: '2022-12-22T12:13:12Z',
  };

  isLoading = false;

  onSubmit(): void {
    if (!this.username.value) return;

    this.isLoading = true;
    this.service.getUser(`${this.username.value}`).subscribe((response) => {
      this.user = response;
      console.log(this.user);
    });
    this.isLoading = false;
  }
}
