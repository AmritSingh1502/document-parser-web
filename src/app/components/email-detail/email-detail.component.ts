import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Email } from '../../interfaces/email.interface';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
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
            
            <div *ngIf="selectedEmail.attachments && selectedEmail.attachments.length > 0" class="attachments-section">
              <div class="attachments-header">
                <mat-icon>attach_file</mat-icon>
                <span>Attachments ({{ selectedEmail.attachments.length }})</span>
              </div>
              <div class="attachments-list">
                <div *ngFor="let attachment of selectedEmail.attachments" class="attachment-item">
                  <div class="attachment-icon">
                    <mat-icon>{{ getAttachmentIcon(attachment.type) }}</mat-icon>
                  </div>
                  <div class="attachment-info">
                    <div class="attachment-name">{{ attachment.name }}</div>
                    <div class="attachment-size">{{ attachment.size }}</div>
                  </div>
                  <button mat-icon-button class="download-btn" matTooltip="Download">
                    <mat-icon>download</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div *ngIf="displayType === 'summary'" class="email-summary">
            <div class="summary-header">
              <mat-icon>auto_awesome</mat-icon>
              <span>AI-Generated Summary</span>
            </div>
            <div class="summary-text">{{ selectedEmail.summary }}</div>
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
      overflow-y: auto;
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
      margin-bottom: 24px;
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

    .attachments-section {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-top: 24px;
    }

    .attachments-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      color: #475569;
      font-weight: 700;
      font-size: 18px;
    }

    .attachments-header mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: #667eea;
    }

    .attachments-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .attachment-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .attachment-item:hover {
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
      transform: translateY(-1px);
    }

    .attachment-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .attachment-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .attachment-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .attachment-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 14px;
    }

    .attachment-size {
      color: #64748b;
      font-size: 12px;
      font-weight: 500;
    }

    .download-btn {
      color: #667eea;
      transition: all 0.2s ease;
    }

    .download-btn:hover {
      background-color: rgba(102, 126, 234, 0.1);
      color: #5a67d8;
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

      .attachments-list {
        gap: 8px;
      }

      .attachment-item {
        padding: 12px;
      }
    }
  `]
})
export class EmailDetailComponent {
  @Input() selectedEmail: Email | null = null;
  @Input() displayType: 'mail' | 'summary' = 'mail';

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    // Display type is now controlled by parent component
  }

  showFullMail() {
    this.displayType = 'mail';
  }

  showSummary() {
    this.displayType = 'summary';
  }

  getAttachmentIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'docx':
      case 'doc':
        return 'description';
      case 'xlsx':
      case 'xls':
        return 'table_chart';
      case 'txt':
        return 'text_snippet';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      case 'zip':
      case 'rar':
        return 'archive';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'video_file';
      case 'mp3':
      case 'wav':
        return 'audio_file';
      default:
        return 'insert_drive_file';
    }
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