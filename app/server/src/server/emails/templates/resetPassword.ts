import Config from '../../config';
import { ResetPasswordToken } from '../../models';

export default function resetPasswordTemplate(
    token: ResetPasswordToken,
    recipientName: string,
    language: 'english' | 'bengali' = 'english',
) {
    const resetUrl = `${Config.baseUrl}/reset-password/${token.id}`;

    if (language === 'bengali') {
        return `
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #444;">প্রিয় ${recipientName},</h2>
                    <p>
                        আমরা আপনার <strong>iArsenic</strong> অ্যাকাউন্টের পাসওয়ার্ড রিসেট করার একটি অনুরোধ পেয়েছি।
                    </p>
                    <p>
                        নিচের বোতামে ক্লিক করে আপনার পাসওয়ার্ড রিসেট করুন:
                    </p>
                    <p>
                        <a href="${resetUrl}"
                           style="background-color: #154734; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            পাসওয়ার্ড রিসেট করুন
                        </a>
                    </p>
                    <p>
                        আপনি যদি পাসওয়ার্ড রিসেটের অনুরোধ না করেন, তাহলে এই ইমেইলটি উপেক্ষা করুন অথবা কোনো উদ্বেগ থাকলে সাপোর্টে যোগাযোগ করুন।
                    </p>
                </body>
            </html>
        `;
    }

    return `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #444;">Hi ${recipientName},</h2>
                <p>
                    We received a request to reset the password for your <strong>iArsenic</strong> account.
                </p>
                <p>
                    You can reset your password by clicking the link below:
                </p>
                <p>
                    <a href="${resetUrl}"
                       style="background-color: #154734; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                </p>
                <p>
                    If you did not request a password reset, please ignore this email or contact support if you have concerns.
                </p>
            </body>
        </html>
    `;
}
