import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { ComposeEmail, Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal: boolean = false
  email: Email = {
    id:'',
    subject:'',
    content:'',
    email:'',
    fromaddress: ''
  }
  constructor(private authService: AuthService,private emailService:EmailService,private webSocket: WebSocketService) {
   }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(({email})=>{
      this.email.email = email
    })
  }
  onSubmit(email: ComposeEmail){    
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false
      alert("Message sent successfully")
      
      this.webSocket.sendMessage({from:email.fromaddress,to:email.toaddress})
    })
  }
}
