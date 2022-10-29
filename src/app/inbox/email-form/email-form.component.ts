import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() email: Email | any
  emailForm: FormGroup | any
  @Output() emailSubmit = new EventEmitter

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    const { email,fromaddress,subject,content } = this.email
    this.emailForm = new FormGroup({
      toaddress: new FormControl(fromaddress,[Validators.required,Validators.email]),
      fromaddress: new FormControl({ value: email, disabled: false }),
      subject: new FormControl(subject,[Validators.required]),
      content: new FormControl(content,[Validators.required])
    })
  }
  onSubmit(){
    if(this.emailForm.invalid){
      return
    }
    
    this.emailSubmit.emit(this.emailForm.value)
  }
}
