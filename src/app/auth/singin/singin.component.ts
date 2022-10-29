import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/web-socket.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  signin = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/.+@.+\..+/)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  })
  constructor(private authService:AuthService,private router:Router,private webSocket: WebSocketService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.signin.invalid){
      return
    }
    const values = this.signin.value
    
    this.authService.signin(values).subscribe({
      next:()=>{
        this.authService.checkAuth().subscribe(({email})=>{
          this.authService.email = email
          this.webSocket.joinRoom(email)
        })
        this.router.navigateByUrl('/inbox')
      },
      error:({ error })=>{
        if(error.username || error.password){
          this.signin.setErrors({ credentials: true })
        }
      }
    })
  }
}
