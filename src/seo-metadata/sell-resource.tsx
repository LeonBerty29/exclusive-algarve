export const sellResourcesPageMetadata = {
  en: {
    notFoundTitle: "Resource Not Found",
    notFoundDescription: "The requested selling resource could not be found",
    titleSuffix: "| Sell in Algarve",
    classification:
      "Algarve selling guide, Property selling resources, Real estate sales guides, Seller information",
    category:
      "Selling guide, Property sale information, Real estate education, Seller insights",
    dcTitlePrefix: "Algarve Selling Resource",
    audience:
      "Property sellers, Real estate owners, Algarve homeowners, International sellers, Property investors",
    articleSection: "Selling Resources & Guides",
  },
  fr: {
    notFoundTitle: "Ressource Non Trouvée",
    notFoundDescription: "La ressource de vente demandée n'a pas pu être trouvée",
    titleSuffix: "| Vendre en Algarve",
    classification:
      "Guide de vente Algarve, Ressources de vente immobilière, Guides de vente immobilière, Information vendeur",
    category:
      "Guide de vente, Information de vente de propriété, Éducation immobilière, Aperçus vendeur",
    dcTitlePrefix: "Ressource de Vente Algarve",
    audience:
      "Vendeurs immobiliers, Propriétaires immobiliers, Propriétaires Algarve, Vendeurs internationaux, Investisseurs immobiliers",
    articleSection: "Ressources et Guides de Vente",
  },
  de: {
    notFoundTitle: "Ressource Nicht Gefunden",
    notFoundDescription:
      "Die angeforderte Verkaufsressource konnte nicht gefunden werden",
    titleSuffix: "| Verkaufen in Algarve",
    classification:
      "Algarve Verkaufsführer, Immobilienverkaufsressourcen, Immobilienverkaufsführer, Verkäuferinformationen",
    category:
      "Verkaufsführer, Immobilienverkaufsinformationen, Immobilienbildung, Verkäufereinblicke",
    dcTitlePrefix: "Algarve Verkaufsressource",
    audience:
      "Immobilienverkäufer, Immobilieneigentümer, Algarve Hausbesitzer, Internationale Verkäufer, Immobilieninvestoren",
    articleSection: "Verkaufsressourcen & Leitfäden",
  },
  pt: {
    notFoundTitle: "Recurso Não Encontrado",
    notFoundDescription: "O recurso de venda solicitado não foi encontrado",
    titleSuffix: "| Vender no Algarve",
    classification:
      "Guia de venda Algarve, Recursos de venda imobiliária, Guias de venda imobiliária, Informação do vendedor",
    category:
      "Guia de venda, Informação de venda de propriedade, Educação imobiliária, Insights do vendedor",
    dcTitlePrefix: "Recurso de Venda Algarve",
    audience:
      "Vendedores de imóveis, Proprietários de imóveis, Proprietários Algarve, Vendedores internacionais, Investidores imobiliários",
    articleSection: "Recursos e Guias de Venda",
  },
  nl: {
    notFoundTitle: "Resource Niet Gevonden",
    notFoundDescription: "De gevraagde verkoopresource kon niet worden gevonden",
    titleSuffix: "| Verkopen in Algarve",
    classification:
      "Algarve verkoopgids, Vastgoedverkoopresources, Vastgoedverkoopgidsen, Verkopersinformatie",
    category:
      "Verkoopgids, Vastgoedverkoop informatie, Vastgoedonderwijs, Verkopersinzichten",
    dcTitlePrefix: "Algarve Verkoopresource",
    audience:
      "Vastgoedverkopers, Vastgoedeigenaren, Algarve huiseigenaren, Internationale verkopers, Vastgoedbeleggers",
    articleSection: "Verkoopresources & Gidsen",
  },
  ru: {
    notFoundTitle: "Ресурс Не Найден",
    notFoundDescription: "Запрашиваемый ресурс продажи не найден",
    titleSuffix: "| Продажа в Алгарве",
    classification:
      "Руководство по продаже Алгарве, Ресурсы продажи недвижимости, Руководства по продаже недвижимости, Информация продавца",
    category:
      "Руководство по продаже, Информация о продаже недвижимости, Образование по недвижимости, Инсайты продавца",
    dcTitlePrefix: "Ресурс Продажи Алгарве",
    audience:
      "Продавцы недвижимости, Владельцы недвижимости, Домовладельцы Алгарве, Международные продавцы, Инвесторы в недвижимость",
    articleSection: "Ресурсы и Руководства по Продаже",
  },
  se: {
    notFoundTitle: "Resurs Hittades Inte",
    notFoundDescription: "Den begärda försäljningsresursen kunde inte hittas",
    titleSuffix: "| Sälja i Algarve",
    classification:
      "Algarve försäljningsguide, Fastighetsförsäljningsresurser, Fastighetsförsäljningsguider, Säljarinformation",
    category:
      "Försäljningsguide, Fastighetsförsäljning information, Fastighetsutbildning, Säljarinsikter",
    dcTitlePrefix: "Algarve Försäljningsresurs",
    audience:
      "Fastighetssäljare, Fastighetsägare, Algarve husägare, Internationella säljare, Fastighetsinvesterare",
    articleSection: "Försäljningsresurser & Guider",
  },
} as const;

export type SellResourcesPageMetadataLocale = keyof typeof sellResourcesPageMetadata;