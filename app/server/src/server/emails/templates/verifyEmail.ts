import Config from '../../config'
import { VerifyEmailToken } from '../../models'

export default function verifyEmailTemplate(
    token: VerifyEmailToken,
    recipientName: string,
    language: 'english' | 'bengali' = 'english',
) {
    const verifyUrl = `${Config.baseUrl}/verify-email/${token.id}`;

    if (language === 'bengali') {
        return `
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #444;">প্রিয় ${recipientName},</h2>
                    <p>
                        <strong>iArsenic</strong>-এ আপনাকে স্বাগতম! নিচের বোতামে ক্লিক করে আপনার ইমেইল ঠিকানা যাচাই করুন:
                    </p>
                    <p>
                        <a href="${verifyUrl}"
                           style="background-color: #154734; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            ইমেইল ঠিকানা যাচাই করুন
                        </a>
                    </p>
                    <p>
                        মনে রাখবেন, এই লিঙ্কটি ৩০ দিনের জন্য বৈধ।
                    </p>
                    <p>
                        আপনি যদি এটি অনুরোধ না করেন, তাহলে এই ইমেইলটি উপেক্ষা করুন।
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
                    Welcome to <strong>iArsenic</strong>! Please verify your email address by clicking the link below:
                </p>
                <p>
                    <a href="${verifyUrl}"
                       style="background-color: #154734; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Verify Email Address
                    </a>
                </p>
                <p>
                    Note that this link is valid for 30 days.
                </p>
                <p>
                    If you did not request this, please ignore this email.
                </p>
            </body>
        </html>
    `;
}
