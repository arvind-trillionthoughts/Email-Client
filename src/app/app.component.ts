import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedIn: boolean | null = false;
  username: string = ''
  email:string = ''
  constructor(private authService: AuthService, private webSocket: WebSocketService) {
    this.authService.checkAuth().subscribe(({email})=>{
      this.email = email    
    });
  }

  ngOnInit() {
  

    

    this.authService.signedin$.subscribe((value) => {
      this.signedIn = value;
    });
  }
}
