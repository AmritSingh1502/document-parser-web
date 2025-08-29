export interface Email {
  id: number;
  subject: string;
  sender: string;
  preview: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}