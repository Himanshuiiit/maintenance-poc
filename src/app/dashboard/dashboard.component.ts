import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  posts: any;
  comments: any;
  profile: any;
  underMaintenance = false;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data;
      },
      error: (error: HttpErrorResponse) => {
        if (
          error.status.toString().charAt(0) === '4' ||
          error.status.toString().charAt(0) === '5'
        ) {
          this.underMaintenance = true;
        }
      },
    });
    this.dataService.getComments().subscribe({
      next: (data: any) => {
        this.comments = data;
      },
      error: (error: HttpErrorResponse) => {
        if (
          error.status.toString().charAt(0) === '4' ||
          error.status.toString().charAt(0) === '5'
        ) {
          this.underMaintenance = true;
        }
      },
    });
    this.dataService.getProfiles().subscribe({
      next: (data: any) => {
        this.profile = data;
      },
      error: (error: HttpErrorResponse) => {
        if (
          error.status.toString().charAt(0) === '4' ||
          error.status.toString().charAt(0) === '5'
        ) {
          this.underMaintenance = true;
        }
      },
    });
  }
}
