import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public values = ['8.2', '2.3', '6.6'];
  constructor() { }

  ngOnInit(): void {
  }

}
