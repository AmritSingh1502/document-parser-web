import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmailService } from '../../services/email.service';
import { Email } from '../../interfaces/email.interface';

@Component({
  selector: 'app-email-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="email-list-card">
      <div class="list-header">
        <h2 class="list-title">
          <mat-icon>inbox</mat-icon>
          Inbox
          <span class="email-count">({{ emails.length }})</span>
        </h2>
      </div>
      
      <div class="email-list-content">
        <div class="email-list">
          <div 
            *ngFor="let email of emails" 
            class="email-item"
            [class.unread]="!email.isRead"
          >
            <div class="email-info">
              <div class="email-status">
                <div class="status-indicator" [class.unread]="!email.isRead"></div>
              </div>
              <div class="email-subject">{{ email.subject }}</div>
              <div class="email-sender">{{ email.sender }}</div>
              <div class="email-preview">{{ email.preview }}</div>
              <div class="email-timestamp">{{ formatDate(email.timestamp) }}</div>
            </div>
            
            <div class="email-actions">
              <button 
                mat-mini-fab 
                color="primary" 
                class="action-button mail-button"
                (click)="onGetMail(email)"
                matTooltip="View Full Email"
              >
                <mat-icon>mail</mat-icon>
              </button>
              <button 
                mat-mini-fab 
                color="accent" 
                class="action-button summary-button"
                (click)="onGetSummary(email)"
                matTooltip="View Summary"
              >
                <mat-icon>auto_awesome</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .email-list-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .list-header {
      padding: 24px 28px 20px;
      border-bottom: 1px solid #e2e8f0;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    }

    .list-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: #1e293b;
    }

    .email-count {
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      margin-left: 8px;
    }

    .email-list-content {
      padding: 0;
      flex: 1;
      overflow: hidden;
    }

    .email-list {
      height: 100%;
      overflow-y: auto;
    }

    .email-item {
      position: relative;
      padding: 20px 28px;
      border-bottom: 1px solid #f1f5f9;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .email-item:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(4px);
    }

    .email-item.unread {
      background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
      border-left: 4px solid #667eea;
    }

    .email-status {
      display: flex;
      align-items: center;
      padding-top: 2px;
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e2e8f0;
      transition: all 0.2s ease;
    }

    .status-indicator.unread {
      background-color: #667eea;
      box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
    }

    .email-info {
      flex: 1;
      min-width: 0;
    }

    .email-subject {
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
      font-size: 16px;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .email-sender {
      color: #667eea;
      font-size: 14px;
      margin-bottom: 6px;
      font-weight: 500;
    }

    .email-preview {
      color: #64748b;
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .email-timestamp {
      color: #94a3b8;
      font-size: 13px;
      font-weight: 500;
    }

    .email-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      opacity: 0;
      transition: all 0.3s ease;
      transform: translateX(10px);
    }

    .email-item:hover .email-actions {
      opacity: 1;
      transform: translateX(0);
    }

    .action-button {
      width: 44px !important;
      height: 44px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      transition: all 0.2s ease !important;
    }

    .mail-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }

    .summary-button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
    }

    .action-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
    }
  `]
})
export class EmailListComponent implements OnInit {
  @Output() emailSelected = new EventEmitter<{ email: Email; action: 'mail' | 'summary' }>();
  
  emails: Email[] = [];

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });
  }

  onGetMail(email: Email) {
    this.emailService.markAsRead(email.id);
    this.emailSelected.emit({ email, action: 'mail' });
  }

  onGetSummary(email: Email) {
    this.emailService.markAsRead(email.id);
    this.emailSelected.emit({ email, action: 'summary' });
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}