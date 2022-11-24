import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserModule } from './user/user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Colinde';
  constructor(public auth: AuthService) {
    
  }

}
