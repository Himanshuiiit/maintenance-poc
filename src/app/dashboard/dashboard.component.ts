import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  data: Observable<any>[] = [];
  underMaintenance = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const dataRef: AngularFireList<any> = this.dataService.getData();
    this.dataService.getValueByKey('maintenance_mode').then((value) => {
        this.underMaintenance = value;
    });

    dataRef.valueChanges().subscribe((data) => {
      next: this.data = data;
      if (this.data.length === 0) {
        this.underMaintenance = true;
      }
      error: (error: HttpErrorResponse) => {
        if (
          error.status.toString().charAt(0) === '4' ||
          error.status.toString().charAt(0) === '5'
        ) {
          this.underMaintenance = true;
        }
      };
    });
  }
}
