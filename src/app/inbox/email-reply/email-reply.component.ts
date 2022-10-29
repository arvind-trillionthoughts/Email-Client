import { Component, Input, OnInit } from '@angular/core';
import { ComposeEmail, Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  showModal: Boolean = false;
  @Input() email: Email | any;
  
  
  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    
    this.email = {
      ...this.email,
      from: this.email.email,
      to: this.email.fromaddress,
      subject: `RE: ${this.email.subject}`,
      content: `\n\n\n----------${this.email.fromaddress} wrote:\n>${this.email.contents}`
    };
  }
  onSubmit(email: ComposeEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}


