import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Email } from '../../interfaces/email.interface';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="email-detail-container">
      <div *ngIf="!selectedEmail" class="empty-state">
        <div class="empty-illustration">
          <mat-icon class="empty-icon">drafts</mat-icon>
          <div class="empty-glow"></div>
        </div>
        <h2 class="empty-title">Select an email to view</h2>
        <p class="empty-subtitle">Choose an email from the list to see its content or summary</p>
      </div>

      <div *ngIf="selectedEmail" class="email-content">
        <div class="email-header">
          <div class="subject-container">
            <h1 class="email-subject">{{ selectedEmail.subject }}</h1>
            <div class="view-type-badge" [class.summary-mode]="displayType === 'summary'">
              <mat-icon>{{ displayType === 'mail' ? 'mail' : 'auto_awesome' }}</mat-icon>
              {{ displayType === 'mail' ? 'Full Email' : 'Summary View' }}
            </div>
          </div>
          <div class="email-meta">
            <div class="sender-info">
              <div class="meta-icon">
                <mat-icon>person</mat-icon>
              </div>
              <div class="meta-content">
                <span class="meta-label">From</span>
                <span class="meta-value">{{ selectedEmail.sender }}</span>
              </div>
            </div>
            <div class="timestamp-info">
              <div class="meta-icon">
                <mat-icon>schedule</mat-icon>
              </div>
              <div class="meta-content">
                <span class="meta-label">Received</span>
                <span class="meta-value">{{ formatDateTime(selectedEmail.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="email-body">
          <div *ngIf="displayType === 'mail'" class="email-full-content">
            <div class="content-text">{{ selectedEmail.content }}</div>
          </div>
          
          <div *ngIf="displayType === 'summary'" class="email-summary">
            <div class="summary-header">
              <mat-icon>auto_awesome</mat-icon>
              <span>AI-Generated Summary</span>
            </div>
            <div class="summary-text">{{ getSummaryText() }}</div>
          </div>
        </div>

        <div class="email-actions">
          <button 
            mat-flat-button 
            color="primary"
            (click)="showFullMail()"
            [class.active]="displayType === 'mail'"
          >
            <mat-icon>mail</mat-icon>
            View Full Email
          </button>
          <button 
            mat-flat-button 
            (click)="showSummary()"
            [class.active]="displayType === 'summary'"
            [class.summary-btn]="displayType !== 'summary'"
          >
            <mat-icon>auto_awesome</mat-icon>
            View Summary
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .email-detail-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      position: relative;
    }

    .empty-illustration {
      position: relative;
      margin-bottom: 32px;
    }

    .empty-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #cbd5e1;
      position: relative;
      z-index: 2;
    }

    .empty-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      z-index: 1;
    }

    .empty-title {
      font-size: 24px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 12px;
    }

    .empty-subtitle {
      font-size: 16px;
      color: #64748b;
      font-weight: 500;
    }

    .email-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .email-header {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }

    .subject-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      gap: 20px;
    }

    .email-subject {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      line-height: 1.3;
      flex: 1;
    }

    .view-type-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .view-type-badge.summary-mode {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);
    }

    .view-type-badge mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .email-meta {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
    }

    .sender-info, .timestamp-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .meta-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 10px;
      color: #667eea;
    }

    .meta-icon mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .meta-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .meta-label {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-value {
      font-size: 14px;
      color: #475569;
      font-weight: 500;
    }

    .email-body {
      flex: 1;
      margin-bottom: 28px;
    }

    .content-text {
      white-space: pre-line;
      line-height: 1.7;
      color: #334155;
      font-size: 16px;
      padding: 24px;
      background: #fafbfc;
      border-radius: 12px;
      border: 1px solid #f1f5f9;
    }

    .email-summary {
      background: linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%);
      border: 2px solid #f3e8ff;
      border-radius: 16px;
      padding: 28px;
      position: relative;
      overflow: hidden;
    }

    .email-summary::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .summary-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      color: #a855f7;
      font-weight: 700;
      font-size: 18px;
    }

    .summary-header mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .summary-text {
      color: #581c87;
      line-height: 1.7;
      font-size: 16px;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.6);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(168, 85, 247, 0.1);
    }

    .email-actions {
      display: flex;
      gap: 16px;
      padding-top: 24px;
      border-top: 2px solid #f1f5f9;
    }

    .email-actions button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      border-radius: 25px !important;
      transition: all 0.3s ease !important;
      text-transform: none !important;
      letter-spacing: 0.5px !important;
    }

    .email-actions button.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
      transform: translateY(-2px) !important;
    }

    .summary-btn {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
      color: #a855f7 !important;
      border: 2px solid #f3e8ff !important;
    }

    .summary-btn:hover {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
      color: white !important;
      border-color: transparent !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4) !important;
    }

    @media (max-width: 768px) {
      .subject-container {
        flex-direction: column;
        gap: 16px;
      }
      
      .email-meta {
        flex-direction: column;
        gap: 16px;
      }
      
      .email-actions {
        flex-direction: column;
      }
      
      .email-subject {
        font-size: 24px;
      }
    }
  `]
})
export class EmailDetailComponent {
  @Input() selectedEmail: Email | null = null;
  displayType: 'mail' | 'summary' = 'mail';

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    if (this.selectedEmail) {
      this.showFullMail();
    }
  }

  showFullMail() {
    this.displayType = 'mail';
  }

  showSummary() {
    this.displayType = 'summary';
  }

  getSummaryText(): string {
    if (!this.selectedEmail) return '';
    
    // Get first 100 characters of the email content
    const summary = this.selectedEmail.content.substring(0, 100);
    return summary + (this.selectedEmail.content.length > 100 ? '...' : '');
  }

  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}