import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserEmailAvailableResponse {
  available: boolean;
  message: string;
}
interface SignupDetails {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  location: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}
interface SingupResponse {
  message: string;
}

interface SigninDetails {
  email: string | null;
  password: string | null;
}
interface SigninResponse {
  message: string;
  token: string;
}

interface SignedinResponse {
  authenticated: boolean;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject<boolean | null>(null);
  email: string = '';
  rootUrl: string = 'http://localhost:4002';
  bearer_token: string = '';

  constructor(private http: HttpClient) {}

  userEmailAvailable(value: string) {
    return this.http.get<UserEmailAvailableResponse>(
      this.rootUrl + '/users/' + value);
  }

  signup(values: Partial<SignupDetails>) {
    return this.http
      .post<SingupResponse>(this.rootUrl + '/auth/signup', values)
      .pipe(
        tap((value) => {
          alert(value.message + 'Please login in again to enter...');
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(this.rootUrl + '/auth/signedin', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: String(localStorage.getItem("token"))
        },
      })
      .pipe(
        tap(({ authenticated, email }) => {
          this.signedin$.next(authenticated);
          this.email = email
        })
      );
  }

  signout() {
    return this.http
      .post(
        'https://api.angular-email.com/auth/signout',
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.signedin$.next(false);
        })
      );
  }
  signin(values: Partial<SigninDetails>) {
    return this.http
      .post<SigninResponse>(this.rootUrl + '/auth/signin', values)
      .pipe(
        tap((response) => {
          this.bearer_token = response.token;
          localStorage.setItem('token', this.bearer_token);
          this.signedin$.next(true);
        })
      );
  }
}
