import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComposeEmail, Email, Emails } from '../inbox/email';


@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<Array<Emails>>(
      'http://localhost:4002/emails/emaillist',
      {
        headers: {
          authorization: String(localStorage.getItem('token')),
        },
      }
    );
  }

  getEmail(id: string) {
    return this.http.get<Email>('http://localhost:4002/emails/' + id, {
      headers: {
        authorization: String(localStorage.getItem('token')),
      },
    });
  }

  sendEmail(value: ComposeEmail) {
    return this.http.post('http://localhost:4002/emails/compose', value, {
      headers: {
        authorization: String(localStorage.getItem('token')),
      }
    });
  }
}
