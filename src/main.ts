import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { EmailListComponent } from './app/components/email-list/email-list.component';
import { EmailDetailComponent } from './app/components/email-detail/email-detail.component';
import { Email } from './app/interfaces/email.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, EmailListComponent, EmailDetailComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content">
        <div class="email-section">
          <div class="email-list-container">
            <app-email-list (emailSelected)="onEmailSelected($event)"></app-email-list>
          </div>
          
          <div class="email-detail-container">
            <app-email-detail [selectedEmail]="selectedEmail"></app-email-detail>
          </div>
        </div>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .email-section {
      display: flex;
      height: calc(100vh - 160px);
      gap: 24px;
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    .email-list-container {
      flex: 0 0 420px;
    }

    .email-detail-container {
      flex: 1;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      padding: 32px;
      overflow: hidden;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      .email-section {
        flex-direction: column;
        height: auto;
        padding: 20px;
        gap: 20px;
      }
      
      .email-list-container {
        flex: none;
        max-height: 50vh;
      }
      
      .email-detail-container {
        flex: 1;
        min-height: 400px;
        padding: 24px;
      }
    }
  `]
})
export class App {
  selectedEmail: Email | null = null;

  onEmailSelected(event: { email: Email; action: 'mail' | 'summary' }) {
    this.selectedEmail = event.email;
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});