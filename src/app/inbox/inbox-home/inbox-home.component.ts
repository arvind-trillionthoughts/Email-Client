import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-inbox-home',
  templateUrl: './inbox-home.component.html',
  styleUrls: ['./inbox-home.component.css']
})
export class InboxHomeComponent implements OnInit {

  constructor(private authService: AuthService,private webSocket: WebSocketService) { 
    this.authService.checkAuth().subscribe(({email})=>{
      this.webSocket.getMessage(email).subscribe((data)=>{
        alert(data)
      })
      this.authService.email = email
    })
    
  }

  ngOnInit(): void {  }

}
