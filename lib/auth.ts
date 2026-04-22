import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { getResend, RESEND_FROM } from "@/lib/resend";

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "database" },
  pages: {
    signIn: "/admin/signin",
    verifyRequest: "/admin/verify",
  },
  providers: [
    EmailProvider({
      from: RESEND_FROM,
      maxAge: 10 * 60,
      async sendVerificationRequest({ identifier, url }) {
        if (!ADMIN_EMAILS.includes(identifier.toLowerCase())) {
          // Don't reveal whether the email is allowed; just skip sending.
          return;
        }
        const { error } = await getResend().emails.send({
          from: `Tacos & Smash <${RESEND_FROM}>`,
          to: identifier,
          subject: "Connexion à l'admin Tacos & Smash",
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto;padding:24px">
              <h2 style="color:#1a1a1a">Tacos & Smash — Admin</h2>
              <p>Clique sur le lien ci-dessous pour te connecter au dashboard :</p>
              <p style="margin:24px 0">
                <a href="${url}" style="background:#FFD700;color:#1a1a1a;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">Se connecter</a>
              </p>
              <p style="color:#666;font-size:13px">Ce lien expire dans 10 minutes. Si tu n'es pas à l'origine de cette demande, ignore cet email.</p>
            </div>
          `,
        });
        if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      return !!email && ADMIN_EMAILS.includes(email);
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
};

export function isAdminEmail(email?: string | null) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
