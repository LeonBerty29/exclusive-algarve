export const ownResourcesPageMetadata = {
  en: {
    notFoundTitle: "Resource Not Found",
    notFoundDescription: "The requested property ownership resource could not be found",
    titleSuffix: "| Own in Algarve",
    classification:
      "Algarve property ownership, Homeowner resources, Property management guides, Owner information",
    category:
      "Ownership guide, Property management information, Real estate education, Owner insights",
    dcTitlePrefix: "Algarve Ownership Resource",
    audience:
      "Property owners, Algarve homeowners, Real estate investors, International property owners, Landlords",
    articleSection: "Ownership Resources & Guides",
  },
  fr: {
    notFoundTitle: "Ressource Non Trouvée",
    notFoundDescription: "La ressource de propriété demandée n'a pas pu être trouvée",
    titleSuffix: "| Propriété en Algarve",
    classification:
      "Propriété Algarve, Ressources propriétaire, Guides de gestion immobilière, Information propriétaire",
    category:
      "Guide de propriété, Information de gestion immobilière, Éducation immobilière, Aperçus propriétaire",
    dcTitlePrefix: "Ressource de Propriété Algarve",
    audience:
      "Propriétaires immobiliers, Propriétaires Algarve, Investisseurs immobiliers, Propriétaires internationaux, Bailleurs",
    articleSection: "Ressources et Guides de Propriété",
  },
  de: {
    notFoundTitle: "Ressource Nicht Gefunden",
    notFoundDescription:
      "Die angeforderte Eigentümerressource konnte nicht gefunden werden",
    titleSuffix: "| Eigentum in Algarve",
    classification:
      "Algarve Immobilieneigentum, Eigentümerressourcen, Immobilienverwaltungsführer, Eigentümerinformationen",
    category:
      "Eigentümerführer, Immobilienverwaltungsinformationen, Immobilienbildung, Eigentümereinblicke",
    dcTitlePrefix: "Algarve Eigentümerressource",
    audience:
      "Immobilieneigentümer, Algarve Hausbesitzer, Immobilieninvestoren, Internationale Eigentümer, Vermieter",
    articleSection: "Eigentümerressourcen & Leitfäden",
  },
  pt: {
    notFoundTitle: "Recurso Não Encontrado",
    notFoundDescription: "O recurso de propriedade solicitado não foi encontrado",
    titleSuffix: "| Propriedade no Algarve",
    classification:
      "Propriedade Algarve, Recursos do proprietário, Guias de gestão imobiliária, Informação do proprietário",
    category:
      "Guia de propriedade, Informação de gestão imobiliária, Educação imobiliária, Insights do proprietário",
    dcTitlePrefix: "Recurso de Propriedade Algarve",
    audience:
      "Proprietários de imóveis, Proprietários Algarve, Investidores imobiliários, Proprietários internacionais, Senhorios",
    articleSection: "Recursos e Guias de Propriedade",
  },
  nl: {
    notFoundTitle: "Resource Niet Gevonden",
    notFoundDescription: "De gevraagde eigendomsresource kon niet worden gevonden",
    titleSuffix: "| Eigendom in Algarve",
    classification:
      "Algarve vastgoedeigendom, Eigenaar resources, Vastgoedbeheer gidsen, Eigenaar informatie",
    category:
      "Eigendomsgids, Vastgoedbeheer informatie, Vastgoedonderwijs, Eigenaarsinzichten",
    dcTitlePrefix: "Algarve Eigendomsresource",
    audience:
      "Vastgoedeigenaren, Algarve huiseigenaren, Vastgoedbeleggers, Internationale eigenaren, Verhuurders",
    articleSection: "Eigendomsresources & Gidsen",
  },
  ru: {
    notFoundTitle: "Ресурс Не Найден",
    notFoundDescription: "Запрашиваемый ресурс владения не найден",
    titleSuffix: "| Владение в Алгарве",
    classification:
      "Владение недвижимостью Алгарве, Ресурсы владельца, Руководства по управлению недвижимостью, Информация владельца",
    category:
      "Руководство по владению, Информация об управлении недвижимостью, Образование по недвижимости, Инсайты владельца",
    dcTitlePrefix: "Ресурс Владения Алгарве",
    audience:
      "Владельцы недвижимости, Домовладельцы Алгарве, Инвесторы в недвижимость, Международные владельцы, Арендодатели",
    articleSection: "Ресурсы и Руководства по Владению",
  },
  se: {
    notFoundTitle: "Resurs Hittades Inte",
    notFoundDescription: "Den begärda äganderesursen kunde inte hittas",
    titleSuffix: "| Ägarskap i Algarve",
    classification:
      "Algarve fastighetsägande, Ägarresurser, Fastighetsförvaltningsguider, Ägarinformation",
    category:
      "Ägarguide, Fastighetsförvaltning information, Fastighetsutbildning, Ägarinsikter",
    dcTitlePrefix: "Algarve Äganderesurs",
    audience:
      "Fastighetsägare, Algarve husägare, Fastighetsinvesterare, Internationella ägare, Hyresvärdar",
    articleSection: "Äganderesurser & Guider",
  },
} as const;

export type OwnResourcesPageMetadataLocale = keyof typeof ownResourcesPageMetadata;