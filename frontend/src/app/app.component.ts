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
  repos: any = [];

  totalPages = 0;
  curPageNo = 1;
  isLoading = false;

  getTotalPages() {
    return Array(this.totalPages).fill(1);
  }

  getRepos(page: number): void {
    if (this.curPageNo === page) return;
    this.isLoading = true;
    this.service
      .getRepos(`${this.username.value}`, page)
      .subscribe((res: any) => (this.repos = res.data));

    this.curPageNo = page;
    this.isLoading = false;
  }

  onSubmit(): void {
    if (!this.username.value) return;

    this.isLoading = true;
    this.service.getUser(`${this.username.value}`).subscribe((res: any) => {
      this.user = res.data;
      this.totalPages = Math.ceil(this.user.totalRepos / 10);
    });
    this.service
      .getRepos(`${this.username.value}`)
      .subscribe((res: any) => (this.repos = res.data));

    this.isLoading = false;
  }
}
