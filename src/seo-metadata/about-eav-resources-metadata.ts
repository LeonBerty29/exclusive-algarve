export const resourcesPageMetadata = {
  en: {
    notFoundTitle: "Resource Not Found",
    notFoundDescription: "The requested resource could not be found",
    titleSuffix: "| Algarve Resources",
    classification:
      "Algarve information, Real estate resources, Property guides, Investment information",
    category:
      "Resource article, Information guide, Real estate education, Property insights",
    dcTitlePrefix: "Algarve Resource",
    audience:
      "Property buyers, Real estate investors, Algarve residents, International buyers, Relocation clients",
    articleSection: "Resources & Guides",
  },
  fr: {
    notFoundTitle: "Ressource Non Trouvée",
    notFoundDescription: "La ressource demandée n'a pas pu être trouvée",
    titleSuffix: "| Ressources Algarve",
    classification:
      "Information Algarve, Ressources immobilières, Guides de propriété, Information d'investissement",
    category:
      "Article de ressource, Guide d'information, Éducation immobilière, Aperçus de propriété",
    dcTitlePrefix: "Ressource Algarve",
    audience:
      "Acheteurs immobiliers, Investisseurs immobiliers, Résidents Algarve, Acheteurs internationaux, Clients en relocalisation",
    articleSection: "Ressources et Guides",
  },
  de: {
    notFoundTitle: "Ressource Nicht Gefunden",
    notFoundDescription:
      "Die angeforderte Ressource konnte nicht gefunden werden",
    titleSuffix: "| Algarve Ressourcen",
    classification:
      "Algarve Information, Immobilienressourcen, Immobilienführer, Investitionsinformationen",
    category:
      "Ressourcenartikel, Informationsleitfaden, Immobilienbildung, Immobilieneinblicke",
    dcTitlePrefix: "Algarve Ressource",
    audience:
      "Immobilienkäufer, Immobilieninvestoren, Algarve Bewohner, Internationale Käufer, Umzugskunden",
    articleSection: "Ressourcen & Leitfäden",
  },
  pt: {
    notFoundTitle: "Recurso Não Encontrado",
    notFoundDescription: "O recurso solicitado não foi encontrado",
    titleSuffix: "| Recursos Algarve",
    classification:
      "Informação Algarve, Recursos imobiliários, Guias de propriedade, Informação de investimento",
    category:
      "Artigo de recurso, Guia de informação, Educação imobiliária, Insights de propriedade",
    dcTitlePrefix: "Recurso Algarve",
    audience:
      "Compradores de imóveis, Investidores imobiliários, Residentes Algarve, Compradores internacionais, Clientes em realocação",
    articleSection: "Recursos e Guias",
  },
  nl: {
    notFoundTitle: "Resource Niet Gevonden",
    notFoundDescription: "De gevraagde resource kon niet worden gevonden",
    titleSuffix: "| Algarve Resources",
    classification:
      "Algarve informatie, Vastgoedresources, Vastgoedgidsen, Beleggingsinformatie",
    category:
      "Resource artikel, Informatiegids, Vastgoedonderwijs, Vastgoedinzichten",
    dcTitlePrefix: "Algarve Resource",
    audience:
      "Vastgoedkopers, Vastgoedbeleggers, Algarve bewoners, Internationale kopers, Verhuisklanten",
    articleSection: "Resources & Gidsen",
  },
  ru: {
    notFoundTitle: "Ресурс Не Найден",
    notFoundDescription: "Запрашиваемый ресурс не найден",
    titleSuffix: "| Ресурсы Алгарве",
    classification:
      "Информация Алгарве, Ресурсы по недвижимости, Руководства по недвижимости, Инвестиционная информация",
    category:
      "Статья ресурса, Информационное руководство, Образование по недвижимости, Инсайты недвижимости",
    dcTitlePrefix: "Ресурс Алгарве",
    audience:
      "Покупатели недвижимости, Инвесторы в недвижимость, Жители Алгарве, Международные покупатели, Клиенты по переезду",
    articleSection: "Ресурсы и Руководства",
  },
  se: {
    notFoundTitle: "Resurs Hittades Inte",
    notFoundDescription: "Den begärda resursen kunde inte hittas",
    titleSuffix: "| Algarve Resurser",
    classification:
      "Algarve information, Fastighetsresurser, Fastighetsguider, Investeringsinformation",
    category:
      "Resursartikel, Informationsguide, Fastighetsutbildning, Fastighetsinsikter",
    dcTitlePrefix: "Algarve Resurs",
    audience:
      "Fastighetsköpare, Fastighetsinvesterare, Algarve invånare, Internationella köpare, Flyttkunder",
    articleSection: "Resurser & Guider",
  },
} as const;

export type ResourcesPageMetadataLocale = keyof typeof resourcesPageMetadata;
