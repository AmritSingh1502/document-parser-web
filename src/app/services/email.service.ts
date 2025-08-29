import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Email } from '../interfaces/email.interface';
import { MOCK_EMAILS } from '../data/email-mock-data';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emails: Email[] = MOCK_EMAILS;

  getEmails(): Observable<Email[]> {
    return of(this.emails);
  }

  getEmailById(id: number): Observable<Email | undefined> {
    const email = this.emails.find(e => e.id === id);
    return of(email);
  }

  generateSummary(email: Email): string {
    // Simple summary generation - in a real app this would be an API call
    const sentences = email.content.split('. ').filter(s => s.length > 20);
    const summary = sentences.slice(0, 3).join('. ') + '.';
    return `Summary: ${summary}`;
  }

  markAsRead(id: number): void {
    const email = this.emails.find(e => e.id === id);
    if (email) {
      email.isRead = true;
    }
  }
}