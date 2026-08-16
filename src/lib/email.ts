import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this if using another service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getEmailTemplate = (content: string, bannerCid: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <div style="background-color: #f1f5f9; padding: 40px 15px; width: 100%; box-sizing: border-box;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); overflow: hidden; border-top: 6px solid #059669;">
        <!-- Banner Image Embedded via CID -->
        <img src="cid:${bannerCid}" alt="Kisan Khata Banner" style="width: 100%; height: auto; display: block;" />
        
        <!-- A4 Document Content Area -->
        <div style="padding: 45px 50px;">
          ${content}
        </div>
        
        <!-- Corporate Footer -->
        <div style="background-color: #0f172a; color: #f8fafc; padding: 35px 50px; text-align: center;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase; color: #10b981;">Kisan Khata</h3>
          <p style="margin: 0; font-size: 13px; color: #94a3b8; letter-spacing: 0.5px;">The Digital Ledger for Modern Agriculture</p>
          <div style="margin: 25px auto; width: 50px; border-top: 1px solid #334155;"></div>
          <p style="margin: 0; font-size: 12px; color: #64748b;">This is an automated official communication. Please do not reply directly to this email.</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 600; color: #cbd5e1;">Contact: kisankhata.official@gmail.com</p>
        </div>
      </div>
    </div>
    <!-- Anti-trimming invisible string -->
    <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;">
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
    <div style="display:none; color:transparent; visibility:hidden; mso-hide:all; opacity:0; font-size:0px; line-height:0px;">
      RefID: ${Date.now()}-${Math.random().toString(36).substring(7)}
    </div>
  </body>
  </html>
`;

export const sendApplicationReceivedEmail = async (toEmail: string, name: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const welcomeBannerAttachment = {
    filename: 'email-banner.png',
    path: path.join(process.cwd(), 'public', 'email-banner.png'),
    cid: 'kisan-khata-welcome-banner'
  };

  const content = `
    <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 30px; font-size: 22px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">Acknowledgment of Application</h2>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">Dear <strong>${name}</strong>,</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">Thank you for expressing your interest in the Agri-Tech Field Operations Internship at Kisan Khata. We are writing to formally acknowledge the receipt of your application.</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 25px;">At Kisan Khata, we are driven by a mission to revolutionize the agricultural landscape by empowering local farming communities through digital innovation. We are always on the lookout for passionate and dedicated individuals who share this vision.</p>
    
    <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; padding: 18px 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;"><strong>Application Status:</strong> Your profile is currently <strong>Under Review</strong>.</p>
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">Our team will carefully evaluate your profile and qualifications against the requirements of the role. Please note that due to the high volume of applications we receive, this comprehensive review process may take some time.</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">We appreciate the time and effort you have invested in applying to join our team. We hope to have the opportunity to work together in the near future. We will notify you of the outcome as soon as a decision has been reached.</p>
    
    <div style="text-align: left; margin: 35px 0;">
      <a href="https://www.kisankhata.co.in/internship" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 15px; font-weight: 600; border-radius: 6px;">Track Application Status</a>
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 30px;">Wishing you all the best in your professional endeavors.</p>
    
    <p style="color: #334155; font-size: 15px; margin-bottom: 5px;">Warm Regards,</p>
    <p style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 0;">Kisan Khata Team</p>
  `;

  const mailOptions = {
    from: `"Kisan Khata Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Application Received - Kisan Khata Internship",
    html: getEmailTemplate(content, welcomeBannerAttachment.cid),
    attachments: [welcomeBannerAttachment]
  };
  await transporter.sendMail(mailOptions);
};

export const sendApprovalEmail = async (toEmail: string, name: string, referralCode: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const congratsBannerAttachment = {
    filename: 'cong banner.png',
    path: path.join(process.cwd(), 'public', 'cong banner.png'),
    cid: 'kisan-khata-congrats-banner'
  };

  const content = `
    <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 30px; font-size: 22px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">Official Selection Notice</h2>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">Dear <strong>${name}</strong>,</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;"><strong>Congratulations!</strong></p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">We are delighted to formally offer you a position as an Agri-Tech Field Operations Intern at Kisan Khata. After carefully reviewing your application, our team was highly impressed by your potential and enthusiasm for transforming the agricultural sector.</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 25px;">Welcome aboard! We are confident that your contributions will be invaluable as we work together to digitize and empower farming communities.</p>
    
    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 25px; margin: 35px 0; border-radius: 8px; text-align: center;">
      <p style="margin: 0 0 10px 0; color: #047857; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Your Official Tracking Code</p>
      <h3 style="margin: 0; color: #064e3b; font-size: 34px; letter-spacing: 4px; font-family: 'Courier New', Courier, monospace;">${referralCode}</h3>
    </div>
    
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">To help you get started, we have generated your Official Referral Code. Please keep this code secure, as you will use it to track your field activities, farmer registrations, and overall performance impact.</p>
    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 30px;">You may now log in to your official internship dashboard using your registered credentials to view your progress and next steps.</p>
    
    <div style="text-align: left; margin: 35px 0;">
      <a href="https://www.kisankhata.co.in/internship/dashboard" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 15px; font-weight: 600; border-radius: 6px;">Access Your Dashboard</a>
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.7; margin-bottom: 30px;">We look forward to a successful and highly rewarding journey with you. We can't wait to see the impact you will make.</p>
    
    <p style="color: #334155; font-size: 15px; margin-bottom: 5px;">Warm Regards,</p>
    <p style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 0;">Kisan Khata Team</p>
  `;

  const mailOptions = {
    from: `"Kisan Khata Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Congratulations! Official Selection Notice - Kisan Khata",
    html: getEmailTemplate(content, congratsBannerAttachment.cid),
    attachments: [congratsBannerAttachment]
  };
  await transporter.sendMail(mailOptions);
};
