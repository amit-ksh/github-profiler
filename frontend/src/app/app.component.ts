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
  user: any = null;

  repos: any = []

  isLoading = false;

  onSubmit(): void {
    if (!this.username.value) return;

    this.isLoading = true;
    this.service
      .getUser(`${this.username.value}`)
      .subscribe((res: any) => this.user = res.data);
    this.service
      .getRepos(`${this.username.value}`)
      .subscribe((res: any) => this.repos = res.data);
    this.isLoading = false;
  }
}
