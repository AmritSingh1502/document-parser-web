export interface Email {
  id: number;
  subject: string;
  sender: string;
  preview: string;
  content: string;
  summary: string;
  attachments?: EmailAttachment[];
  timestamp: Date;
  isRead: boolean;
}

export interface EmailAttachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url?: string;
}