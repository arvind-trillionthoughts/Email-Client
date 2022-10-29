import { Injectable } from "@angular/core";
import { AsyncValidator,AbstractControl } from '@angular/forms'
import { catchError, map, of } from "rxjs";
import { AuthService } from '../auth.service'
@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator{
    constructor(private authService: AuthService){}

    validate = (control: AbstractControl):any => {
        const { value } = control        
        return this.authService.userEmailAvailable(value)
        .pipe(
            map((value):any=>{                
                if(value.available){
                    return null
                }                
            }),
            catchError(err=>{
                if(err.error.username){
                    return of({ nonUniqueUsername : true })
                } else{
                    return of({ noConnection : true })
                }
            })
        )
    }
}
