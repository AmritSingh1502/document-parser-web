import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <footer class="footer-toolbar">
      <div class="footer-content">
        <p>&copy; 2025 Executive Mail. All rights reserved.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Support</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-toolbar {
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(20px);
      color: #cbd5e1;
      height: 80px;
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      font-size: 14px;
      padding: 0 24px;
    }

    .footer-links {
      display: flex;
      gap: 24px;
    }

    .footer-link {
      color: #cbd5e1;
      text-decoration: none;
      transition: color 0.2s ease;
      font-weight: 500;
    }

    .footer-link:hover {
      color: #667eea;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}