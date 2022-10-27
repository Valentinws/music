import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

}
