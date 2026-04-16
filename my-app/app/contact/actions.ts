'use server'; // <--- TRÈS IMPORTANT

import { Resend } from 'resend';


// On initialise Resend avec ta clé
const resend = new Resend(process.env.RESEND_API_KEY);

// Il FAUT le mot "export" avant "async function"
export async function sendEmail(formData: FormData) {
  const nom = formData.get('nom');
  const prenom = formData.get('prenom');
  const email = formData.get('email') as string;
  const sujet = formData.get('sujet');
  const message = formData.get('message');

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'teamrafale.chaine@gmail.com', // Mets ton vrai mail ici pour tester
      subject: `Nouveau message de ${prenom} ${nom} sujet ${sujet}`,
      html: `<p>Message : ${message}</p>`,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}