import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMsg = 'We are loggin you in!'
  alertColor = 'blue';
  inSubmission = false;
  constructor(private auth: AngularFireAuth, private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'We are logging you in!'
    this.snackBar.open(this.alertMsg, 'Ok', {duration: 2000})
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      this.snackBar.open(this.alertMsg, 'Ok', { duration: 2000 })
      this.alertColor = 'red'
      console.log(e);
      return
    }
    this.alertMsg = 'Success! You are now logged in!'
    this.alertColor = 'green'
    this.snackBar.open(this.alertMsg, 'Ok', { duration: 2000 })
  }

}
