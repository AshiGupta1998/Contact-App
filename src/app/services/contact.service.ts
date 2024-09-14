import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://localhost:44351/api/Contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getContact(id: number): Observable<Contact> {
    return this.http
      .get<Contact>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.apiUrl, contact)
      .pipe(catchError(this.handleError));
  }

  updateContact(contact: Contact): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${contact.id}`, contact)
      .pipe(catchError(this.handleError));
  }

  deleteContact(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError('Something went wrong. Please try again later.');
  }
}
