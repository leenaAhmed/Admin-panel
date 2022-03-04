import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  timeout: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.timeout = true;
      this.router.navigate(['/Home/jobpage/jobtable']);
    }, 3000);
  }
}
