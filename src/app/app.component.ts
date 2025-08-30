import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailDetailComponent } from './components/email-detail/email-detail.component';
import { Email } from './interfaces/email.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    EmailListComponent,
    EmailDetailComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <div class="main-content">
        <div class="email-section">
          <div class="email-list-container">
            <app-email-list 
              (emailSelected)="onEmailSelected($event)">
            </app-email-list>
          </div>
          
          <div class="email-detail-container">
            <app-email-detail 
              [selectedEmail]="selectedEmail"
              [displayType]="displayType">
            </app-email-detail>
          </div>
        </div>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  selectedEmail: Email | null = null;
  displayType: 'mail' | 'summary' = 'mail';

  onEmailSelected(event: { email: Email; action: 'mail' | 'summary' }) {
    this.selectedEmail = event.email;
    this.displayType = event.action;
  }
}