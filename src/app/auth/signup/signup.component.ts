import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern(/.+@.+\..+/)
    ], [this.uniqueUsername.validate]),
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),
    phone: new FormControl('',[
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    location: new FormControl('',[
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  },
  { validators: [this.matchPassword.validate] }
  )
  constructor(
    private  matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.signup.invalid){
      return
    }
    const values = this.signup.value
    console.log(values);
    
    this.authService.signup(values).subscribe({
      next:() => {
        this.router.navigateByUrl('/')
      },
      error:(err) => {
        if(err.status == 0){
        this.signup.setErrors({ noConnection : true })
      }else{
        this.signup.setErrors({ unknownError : true })
      }
      }
    })
    
  }
}
