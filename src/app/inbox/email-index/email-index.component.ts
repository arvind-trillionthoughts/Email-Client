import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import {Emails} from '../email'


@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emailList:Array<Emails> = []
  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.emailService.getEmails().subscribe({
      next:(emails)=>{
        this.emailList = emails  
      },
      error:(err)=>{
        console.log(err.error.message);
        
      }
    })
  }

}
