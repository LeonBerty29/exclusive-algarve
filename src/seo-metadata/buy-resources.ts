export const buyResourcesPageMetadata = {
  en: {
    notFoundTitle: "Resource Not Found",
    notFoundDescription: "The requested buying resource could not be found",
    titleSuffix: "| Buy in Algarve",
    classification:
      "Algarve buying guide, Property buying resources, Real estate purchase guides, Investment information",
    category:
      "Buying guide, Property purchase information, Real estate education, Buyer insights",
    dcTitlePrefix: "Algarve Buying Resource",
    audience:
      "Property buyers, Real estate investors, Algarve home seekers, International buyers, First-time buyers",
    articleSection: "Buying Resources & Guides",
  },
  fr: {
    notFoundTitle: "Ressource Non Trouvée",
    notFoundDescription: "La ressource d'achat demandée n'a pas pu être trouvée",
    titleSuffix: "| Acheter en Algarve",
    classification:
      "Guide d'achat Algarve, Ressources d'achat immobilier, Guides d'achat immobilier, Information d'investissement",
    category:
      "Guide d'achat, Information d'achat de propriété, Éducation immobilière, Aperçus acheteur",
    dcTitlePrefix: "Ressource d'Achat Algarve",
    audience:
      "Acheteurs immobiliers, Investisseurs immobiliers, Chercheurs de maison Algarve, Acheteurs internationaux, Premiers acheteurs",
    articleSection: "Ressources et Guides d'Achat",
  },
  de: {
    notFoundTitle: "Ressource Nicht Gefunden",
    notFoundDescription:
      "Die angeforderte Kaufressource konnte nicht gefunden werden",
    titleSuffix: "| Kaufen in Algarve",
    classification:
      "Algarve Kaufführer, Immobilienkaufressourcen, Immobilienkaufführer, Investitionsinformationen",
    category:
      "Kaufführer, Immobilienkaufinformationen, Immobilienbildung, Käufereinblicke",
    dcTitlePrefix: "Algarve Kaufressource",
    audience:
      "Immobilienkäufer, Immobilieninvestoren, Algarve Haussucher, Internationale Käufer, Erstkäufer",
    articleSection: "Kaufressourcen & Leitfäden",
  },
  pt: {
    notFoundTitle: "Recurso Não Encontrado",
    notFoundDescription: "O recurso de compra solicitado não foi encontrado",
    titleSuffix: "| Comprar no Algarve",
    classification:
      "Guia de compra Algarve, Recursos de compra imobiliária, Guias de compra imobiliária, Informação de investimento",
    category:
      "Guia de compra, Informação de compra de propriedade, Educação imobiliária, Insights do comprador",
    dcTitlePrefix: "Recurso de Compra Algarve",
    audience:
      "Compradores de imóveis, Investidores imobiliários, Procuradores de casa Algarve, Compradores internacionais, Compradores de primeira viagem",
    articleSection: "Recursos e Guias de Compra",
  },
  nl: {
    notFoundTitle: "Resource Niet Gevonden",
    notFoundDescription: "De gevraagde koopresource kon niet worden gevonden",
    titleSuffix: "| Kopen in Algarve",
    classification:
      "Algarve koopgids, Vastgoedkoopresources, Vastgoedaankoopgidsen, Beleggingsinformatie",
    category:
      "Koopgids, Vastgoedaankoop informatie, Vastgoedonderwijs, Kopersinzichten",
    dcTitlePrefix: "Algarve Koopresource",
    audience:
      "Vastgoedkopers, Vastgoedbeleggers, Algarve huiszoekers, Internationale kopers, Eerste kopers",
    articleSection: "Koopresources & Gidsen",
  },
  ru: {
    notFoundTitle: "Ресурс Не Найден",
    notFoundDescription: "Запрашиваемый ресурс покупки не найден",
    titleSuffix: "| Покупка в Алгарве",
    classification:
      "Руководство по покупке Алгарве, Ресурсы покупки недвижимости, Руководства по покупке недвижимости, Инвестиционная информация",
    category:
      "Руководство по покупке, Информация о покупке недвижимости, Образование по недвижимости, Инсайты покупателя",
    dcTitlePrefix: "Ресурс Покупки Алгарве",
    audience:
      "Покупатели недвижимости, Инвесторы в недвижимость, Искатели жилья Алгарве, Международные покупатели, Первые покупатели",
    articleSection: "Ресурсы и Руководства по Покупке",
  },
  se: {
    notFoundTitle: "Resurs Hittades Inte",
    notFoundDescription: "Den begärda köpresursen kunde inte hittas",
    titleSuffix: "| Köpa i Algarve",
    classification:
      "Algarve köpguide, Fastighetsköpresurser, Fastighetsköpguider, Investeringsinformation",
    category:
      "Köpguide, Fastighetsköp information, Fastighetsutbildning, Köparinsikter",
    dcTitlePrefix: "Algarve Köpresurs",
    audience:
      "Fastighetsköpare, Fastighetsinvesterare, Algarve hussökare, Internationella köpare, Förstagångsköpare",
    articleSection: "Köpresurser & Guider",
  },
} as const;

export type BuyResourcesPageMetadataLocale = keyof typeof buyResourcesPageMetadata;