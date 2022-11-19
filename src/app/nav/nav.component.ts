import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

}
