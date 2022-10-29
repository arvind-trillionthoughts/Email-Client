import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]):Observable<boolean | null> {
    return this.authService.signedin$.pipe(
      skipWhile(value => {
        return value === null}
        ),
      take(1),
      tap((authenticated)=>{
        if(!authenticated){
          this.router.navigateByUrl('/')
        }
      })
    )
  }
}
