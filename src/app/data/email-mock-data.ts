import { Email } from '../interfaces/email.interface';

export const MOCK_EMAILS: Email[] = [
  {
    id: 1,
    subject: 'Quarterly Performance Review Meeting',
    sender: 'Sarah Johnson <sarah.johnson@company.com>',
    preview: 'Hi there! I hope this email finds you well. I wanted to schedule our quarterly performance review meeting...',
    content: `Dear Team Member,

I hope this email finds you well. I wanted to schedule our quarterly performance review meeting to discuss your achievements, goals, and development opportunities for the upcoming quarter.

Please review the following agenda items before our meeting:
• Personal achievements and milestones
• Goal completion status
• Areas for improvement
• Professional development interests
• Team collaboration feedback

The meeting is scheduled for next Friday at 2:00 PM in Conference Room A. Please come prepared with any questions or topics you'd like to discuss.

Looking forward to our conversation!

Best regards,
Sarah Johnson
HR Manager`,
    timestamp: new Date('2025-01-10T09:30:00'),
    isRead: false
  },
  {
    id: 2,
    subject: 'Project Alpha - Final Delivery Timeline',
    sender: 'Mike Chen <mike.chen@techcorp.com>',
    preview: 'Following up on our discussion yesterday, I wanted to confirm the final delivery timeline for Project Alpha...',
    content: `Hi Team,

Following up on our discussion yesterday, I wanted to confirm the final delivery timeline for Project Alpha and ensure everyone is aligned on the deliverables.

Key Milestones:
• January 15th - Design mockups approval
• January 22nd - Frontend development completion
• January 29th - Backend integration testing
• February 5th - Final QA and user acceptance testing
• February 12th - Production deployment

Please review your respective tasks and let me know if you foresee any potential blockers. We need to maintain this schedule to meet our client's launch date.

If you have any concerns or need additional resources, please reach out to me directly.

Thanks for your continued hard work on this project!

Best,
Mike Chen
Project Manager`,
    timestamp: new Date('2025-01-09T14:45:00'),
    isRead: true
  },
  {
    id: 3,
    subject: 'Security Update: Two-Factor Authentication Required',
    sender: 'IT Security <security@company.com>',
    preview: 'Important security notice: Starting February 1st, two-factor authentication will be required for all company accounts...',
    content: `Important Security Notice

Dear All Staff,

As part of our ongoing commitment to maintaining the highest security standards, we are implementing mandatory two-factor authentication (2FA) for all company accounts, effective February 1st, 2025.

What you need to do:
1. Download the Microsoft Authenticator app on your mobile device
2. Log into your company account and navigate to Security Settings
3. Follow the setup instructions to enable 2FA
4. Test the authentication process

This change affects:
• Email accounts
• Cloud storage access
• Internal systems and applications
• VPN connections

The IT team will be available to assist with the setup process. Please schedule a brief session if you need help.

For questions, contact the IT Help Desk at ext. 2500.

Thank you for your cooperation in keeping our systems secure.

IT Security Team`,
    timestamp: new Date('2025-01-08T11:20:00'),
    isRead: false
  },
  {
    id: 4,
    subject: 'Team Building Event - Save the Date',
    sender: 'Emma Wilson <emma.wilson@company.com>',
    preview: 'Exciting news! We are organizing a team building event for the entire department on February 20th...',
    content: `Hi Everyone!

Exciting news! We are organizing a team building event for the entire department on February 20th, and we want everyone to participate!

Event Details:
• Date: Saturday, February 20th, 2025
• Time: 10:00 AM - 4:00 PM
• Location: Adventure Park & Conference Center
• Transportation: Chartered buses will be provided

Activities planned:
• Team challenge courses
• Group problem-solving games
• Outdoor activities and sports
• Catered lunch and refreshments
• Awards and recognition ceremony

This is a fantastic opportunity to strengthen our team bonds, have some fun, and celebrate our recent successes. Please mark your calendars and let me know if you have any dietary restrictions or accessibility needs.

RSVP by February 10th to ensure we have accurate headcount for planning.

Looking forward to seeing everyone there!

Cheers,
Emma Wilson
Team Coordinator`,
    timestamp: new Date('2025-01-07T16:15:00'),
    isRead: true
  },
  {
    id: 5,
    subject: 'New Company Policy: Remote Work Guidelines',
    sender: 'David Martinez <david.martinez@company.com>',
    preview: 'We are updating our remote work policy to better support work-life balance and productivity...',
    content: `Dear Team,

We are updating our remote work policy to better support work-life balance and productivity. These changes take effect on February 1st, 2025.

New Remote Work Guidelines:

Eligibility:
• All full-time employees after 90 days
• Part-time employees after 6 months
• Role must be suitable for remote work

Schedule Options:
• Fully remote (with quarterly in-office requirements)
• Hybrid: 2-3 days remote per week
• Flexible hours between 7 AM - 7 PM

Requirements:
• Maintain reliable internet connection
• Participate in daily team check-ins
• Be available during core hours (10 AM - 3 PM)
• Complete monthly productivity assessments

Equipment and Support:
• Company laptop and necessary software
• $500 annual home office stipend
• Technical support for remote setups

Please review the full policy document attached and discuss any questions with your direct manager during your next one-on-one meeting.

Best regards,
David Martinez
Operations Manager`,
    timestamp: new Date('2025-01-06T13:40:00'),
    isRead: false
  }
];