interface NewsletterConfirmMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  classification: string;
  category: string;
  dcTitle: string;
}

export const newsletterConfirmMetadata: Record<
  string,
  NewsletterConfirmMetadata
> = {
  en: {
    title: "Newsletter Confirmation",
    description:
      "Confirm your newsletter subscription to receive exclusive updates and offers.",
    keywords: [
      "newsletter confirmation",
      "email confirmation",
      "subscribe",
      "newsletter",
      "email verification",
    ],
    ogTitle: "Confirm Your Newsletter Subscription",
    ogDescription:
      "Complete your newsletter subscription to stay updated with our latest news.",
    classification: "Newsletter Confirmation",
    category: "Newsletter",
    dcTitle: "Newsletter Email Confirmation",
  },
  pt: {
    title: "Confirmação de Newsletter",
    description:
      "Confirme sua inscrição na newsletter para receber atualizações e ofertas exclusivas.",
    keywords: [
      "confirmação newsletter",
      "confirmação email",
      "subscrever",
      "newsletter",
      "verificação email",
    ],
    ogTitle: "Confirme Sua Inscrição na Newsletter",
    ogDescription:
      "Complete sua inscrição na newsletter para se manter atualizado com nossas últimas notícias.",
    classification: "Confirmação de Newsletter",
    category: "Newsletter",
    dcTitle: "Confirmação de Email da Newsletter",
  },
  fr: {
    title: "Confirmation de Newsletter",
    description:
      "Confirmez votre abonnement à la newsletter pour recevoir des mises à jour et offres exclusives.",
    keywords: [
      "confirmation newsletter",
      "confirmation email",
      "s'abonner",
      "newsletter",
      "vérification email",
    ],
    ogTitle: "Confirmez Votre Abonnement à la Newsletter",
    ogDescription:
      "Complétez votre abonnement à la newsletter pour rester informé de nos dernières nouvelles.",
    classification: "Confirmation de Newsletter",
    category: "Newsletter",
    dcTitle: "Confirmation Email de la Newsletter",
  },
  es: {
    title: "Confirmación de Newsletter",
    description:
      "Confirma tu suscripción al boletín para recibir actualizaciones y ofertas exclusivas.",
    keywords: [
      "confirmación newsletter",
      "confirmación email",
      "suscribirse",
      "boletín",
      "verificación email",
    ],
    ogTitle: "Confirma tu Suscripción al Boletín",
    ogDescription:
      "Completa tu suscripción al boletín para mantenerte actualizado con nuestras últimas noticias.",
    classification: "Confirmación de Newsletter",
    category: "Newsletter",
    dcTitle: "Confirmación de Email del Boletín",
  },
  de: {
    title: "Newsletter-Bestätigung",
    description:
      "Bestätigen Sie Ihr Newsletter-Abonnement, um exklusive Updates und Angebote zu erhalten.",
    keywords: [
      "newsletter bestätigung",
      "email bestätigung",
      "abonnieren",
      "newsletter",
      "email verifizierung",
    ],
    ogTitle: "Bestätigen Sie Ihr Newsletter-Abonnement",
    ogDescription:
      "Vervollständigen Sie Ihr Newsletter-Abonnement, um über unsere neuesten Nachrichten informiert zu bleiben.",
    classification: "Newsletter-Bestätigung",
    category: "Newsletter",
    dcTitle: "Newsletter-Email-Bestätigung",
  },
};
