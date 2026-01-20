/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image as ReactPdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import { Property } from "@/types/property";

interface DrivingDistanceResult {
  label: string;
  value: string;
}

interface PropertyBrochurePDFProps {
  property: Property;
  images: string[];
  descriptionSplit: {
    page1: string;
    page2: string;
    remaining: string;
    hasPage2Content: boolean;
    hasRemainingContent: boolean;
  };
  distances: DrivingDistanceResult[];
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    padding: "0 15px",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
  },
  headerLocation: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  headerLogo: {
    width: 105,
    height: 40,
    objectFit: "contain",
  },
  headerPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#D4A017",
  },
  heroContainer: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    bottom: 25,
    right: 10,
    width: 37,
    height: 50,
    objectFit: "cover",
    border: "3px solid white",
  },
  content: {
    flex: 1,
    padding: "5px 0",
    display: "flex",
    flexDirection: "column",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#1a1a1a",
    flex: 1,
  },
  titleBadge: {
    width: 114,
    height: 40,
    objectFit: "cover",
    marginLeft: 15,
  },
  featuresGrid: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 20,
  },
  featureSection: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    color: "#000",
    textTransform: "uppercase",
  },
  featureItems: {
    fontSize: 11,
    lineHeight: 1.4,
    flexDirection: "row",
    flexWrap: "wrap", 
    gap: 5,
  },
  featureItem: {
    marginBottom: 0,
  },
  featureLabel: {
    color: "#ffffff",
  },
  featureValue: {
    color: "#cccccc",
  },
  distanceItems: {
    fontSize: 10,
    lineHeight: 1.3,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  distanceItem: {
    marginBottom: 0,
  },
  distanceLabel: {
    color: "#000",
  },
  distanceValue: {
    color: "#444444",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.2,
    textAlign: "justify",
    marginBottom: 15,
  },
  notice: {
    fontSize: 8,
    lineHeight: 1.4,
    color: "#666666",
    fontStyle: "italic",
    marginTop: 15,
    paddingTop: 10,
  },
  footer: {
    padding: "15px 0",
  },
  footerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: "2px solid #D4A017",
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  footerOffices: {
    flexDirection: "row",
    gap: 20,
    fontSize: 8,
    lineHeight: 1.4,
  },
  office: {
    flex: 1,
  },
  officeTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  imageGrid: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    padding: "10px 0 20px",
  },
  imageColumn: {
    flex: 1,
    gap: 8,
  },
  gridImage: {
    width: "100%",
    height: 170,
    objectFit: "cover",
  },
  textWithImage: {
    flex: 1,
    gap: 15,
  },
  consultantImage: {
    width: 114,
    height: 40,
    objectFit: "cover",
    alignSelf: "flex-end",
  },
  page2Description: {
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: "justify",
  },
  companyInfo: {
    textAlign: "center",
    padding: "20px 0 0",
  },
  companyDescription: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    fontSize: 11,
    lineHeight: 1.5,
  },
  companyTagline: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  flowingContent: {
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: "justify",
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  textContainer: {
    padding: "20px 0",
    flexGrow: 0,
    flexShrink: 1,
  },
  textOnlyPage: {
    padding: "20px 0",
    flex: 1,
  },
});

// Helper function to split text into chunks that fit on a page
const splitTextIntoPages = (text: string, charsPerPage: number): string[] => {
  if (!text || text.length === 0) return [];

  const pages: string[] = [];
  const words = text.split(" ");
  let currentPage = "";

  for (const word of words) {
    const testPage = currentPage ? `${currentPage} ${word}` : word;

    if (testPage.length <= charsPerPage) {
      currentPage = testPage;
    } else {
      if (currentPage) {
        pages.push(currentPage);
      }
      currentPage = word;
    }
  }

  if (currentPage) {
    pages.push(currentPage);
  }

  return pages;
};

// Company info text
const COMPANY_DESCRIPTION =
  "Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006.";
const COMPANY_TAGLINE = "3 offices to serve you 7 days a week";
// const COMPANY_INFO_CHARS = COMPANY_DESCRIPTION.length + COMPANY_TAGLINE.length;

export const PropertyBrochurePDF: React.FC<PropertyBrochurePDFProps> = ({
  property,
  images,
  descriptionSplit,
  distances,
}) => {
  const formattedPrice = property.price.toLocaleString("en-US");

  // Calculate text chunks for page 4 onwards
  const CHARS_PER_PAGE_WITH_IMAGE = 1800; // Characters that fit on page 4 with image
  const CHARS_PER_PAGE_TEXT_ONLY = 3500; // Characters that fit on text-only pages
  const CHARS_RESERVED_FOR_COMPANY_INFO = 500; // Reserve space for company info on last page

  let page4Text = "";
  let remainingAfterPage4 = "";
  let textOnlyPages: string[] = [];
  let showCompanyInfoOnLastTextPage = false;
  let showCompanyInfoOnPage4 = false;

  if (descriptionSplit.hasRemainingContent && descriptionSplit.remaining) {
    // Split for page 4 (has image)
    if (descriptionSplit.remaining.length <= CHARS_PER_PAGE_WITH_IMAGE) {
      page4Text = descriptionSplit.remaining;

      // Check if there's space on page 4 for company info
      const availableSpaceOnPage4 =
        CHARS_PER_PAGE_WITH_IMAGE - page4Text.length;
      if (availableSpaceOnPage4 >= CHARS_RESERVED_FOR_COMPANY_INFO) {
        showCompanyInfoOnPage4 = true;
      }
    } else {
      // Take first portion for page 4
      const words = descriptionSplit.remaining.split(" ");
      let temp = "";
      let remainder = descriptionSplit.remaining;

      for (let i = 0; i < words.length; i++) {
        const testText = temp ? `${temp} ${words[i]}` : words[i];
        if (testText.length <= CHARS_PER_PAGE_WITH_IMAGE) {
          temp = testText;
        } else {
          page4Text = temp;
          remainder = words.slice(i).join(" ");
          break;
        }
      }

      if (!page4Text && temp) {
        page4Text = temp;
        remainder = "";
      }

      remainingAfterPage4 = remainder;

      // Split remaining text into text-only pages
      if (remainingAfterPage4) {
        textOnlyPages = splitTextIntoPages(
          remainingAfterPage4,
          CHARS_PER_PAGE_TEXT_ONLY,
        );

        // Check if last page has room for company info
        if (textOnlyPages.length > 0) {
          const lastPageLength = textOnlyPages[textOnlyPages.length - 1].length;
          const availableSpace = CHARS_PER_PAGE_TEXT_ONLY - lastPageLength;

          // If there's enough space, we'll add company info to the last text page
          if (availableSpace >= CHARS_RESERVED_FOR_COMPANY_INFO) {
            showCompanyInfoOnLastTextPage = true;
          }
        }
      }
    }
  }

  const Header = () => (
    <View style={styles.header} fixed>
      <Text style={styles.headerLocation}>
        Location:{" "}
        <Text style={{ fontWeight: "bold" }}>{property.location.zone}</Text>
      </Text>
      <ReactPdfImage
        src="/images/eav-dark-logo.png"
        style={styles.headerLogo}
      />
      <Text style={styles.headerPrice}>
        <Text style={{ fontWeight: "normal", color: "#1a1a1a" }}>Price:</Text> €{" "}
        {formattedPrice}
      </Text>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer} fixed>
      <View style={styles.footerTop}>
        <Text>exclusivealgarvevillas.com</Text>
        <Text>info@eavillas.com</Text>
      </View>
      <View style={styles.footerOffices}>
        <View style={styles.office}>
          <Text style={styles.officeTitle}>VILAMOURA</Text>
          <Text>Av. Tivoli, Conjunto Varandamar,</Text>
          <Text>Corpo B Bloco 3, R/C Esq.</Text>
          <Text>8125-465 Vilamoura</Text>
          <Text style={{ fontWeight: "bold", marginTop: 3 }}>
            Tel. +351 289 321 276
          </Text>
        </View>
        <View style={styles.office}>
          <Text style={styles.officeTitle}>LAGOA</Text>
          <Text>Rua Ernesto Cabrita,</Text>
          <Text>Edificio Vales Loja A</Text>
          <Text>8400-387 Lagoa</Text>
          <Text style={{ fontWeight: "bold", marginTop: 3 }}>
            Tel. +351 282 353 019
          </Text>
        </View>
        <View style={styles.office}>
          <Text style={styles.officeTitle}>LAGOS</Text>
          <Text>Rua Dr. José Francisco Tello Queiroz,</Text>
          <Text>Edif. Largo do Rossio de S. João Batista</Text>
          <Text>Lote 3 Loja R, 8600-707 Lagos</Text>
          <Text style={{ fontWeight: "bold", marginTop: 3 }}>
            Tel. +351 282 353 019
          </Text>
        </View>
      </View>
    </View>
  );

  const featureItemsData = {
    bedrooms: property.features.bedrooms
      ? { label: "Bedrooms", value: property.features.bedrooms }
      : null,
    bathrooms: property.features.bathrooms
      ? { label: "Bathrooms", value: property.features.bathrooms }
      : null,
    private_area: property.features.private_area
      ? { label: "Area", value: `${property.features.private_area} m²` }
      : null,
    plot_size: property.features.plot_size
      ? { label: "Plot Size", value: `${property.features.plot_size} m²` }
      : null,
    construction_year: property.features.construction_year
      ? { label: "Year", value: property.features.construction_year }
      : null,
    energy_class: property.features.energy_class
      ? { label: "Energy", value: property.features.energy_class }
      : null,
  };

  const featureItems = Object.values(featureItemsData).filter(
    (item) => item !== null,
  );

  return (
    <Document>
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.heroContainer}>
          <ReactPdfImage src={images[0]} style={styles.heroImage} />
          <ReactPdfImage
            src="/images/eav-pdf-awards-1.jpg"
            style={styles.badge}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{property.title}</Text>
            <ReactPdfImage
              src="/images/eav-pdf-awards-2.jpg"
              style={styles.titleBadge}
            />
          </View>

          <View style={styles.featuresGrid}>
            <View
              style={{
                ...styles.featureSection,
                backgroundColor: "#b78900",
                height: "100%",
                padding: "10 8",
              }}
            >
              <Text style={styles.featureTitle}>Main Features</Text>
              <View style={styles.featureItems}>
                {featureItems.map((item, index) => (
                  <Text key={index} style={styles.featureItem}>
                    <Text style={styles.featureLabel}>{item?.label}:</Text>{" "}
                    <Text style={styles.featureValue}>{item?.value}</Text>
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.featureSection}>
              <Text style={styles.featureTitle}>Driving Distances</Text>
              <View style={styles.distanceItems}>
                {distances.map((d, index) => (
                  <Text key={index} style={styles.distanceItem}>
                    <Text style={styles.distanceLabel}>{d.label}:</Text>{" "}
                    <Text style={styles.distanceValue}>{d.value}</Text>
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.description}>{descriptionSplit.page1}</Text>

          <Text style={styles.notice}>
            <Text style={{ fontWeight: "bold" }}>Important notice:</Text> These
            particulars are not an offer or contract, nor part of one. The
            photographs show only certain parts of the property as they appeared
            at the time they were taken. Areas, measurements, layout plans and
            distances are for guidance only and should not be relied upon as a
            statement of fact. All property details have been provided by the
            seller and should not be considered factually accurate about the
            property, its condition or value. Exclusvie Living Mediaçao
            Imobiliaria Lda. holds no responsibility to the accuracy of the
            information and will not be held liable for any errors on any
            representation on the property. A buyer must not rely on this
            information without conducting an inspection or hiring professionals
            for surveys or legal services to verify all details and
            documentation prior to a property purchase.
          </Text>
        </View>
        <Footer />
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.heroContainer}>
          <ReactPdfImage src={images[1]} style={styles.heroImage} />
          <ReactPdfImage
            src="/images/eav-pdf-awards-1.jpg"
            style={styles.badge}
          />
        </View>
        <View style={{ ...styles.imageGrid, gap: 20 }}>
          <View style={styles.imageColumn}>
            <ReactPdfImage src={images[2]} style={styles.gridImage} />
            <ReactPdfImage src={images[3]} style={styles.gridImage} />
          </View>
          {descriptionSplit.hasPage2Content ? (
            <View style={styles.textWithImage}>
              <ReactPdfImage
                src="/images/eav-pdf-awards-2.jpg"
                style={styles.consultantImage}
              />
              <Text style={styles.page2Description}>
                {descriptionSplit.page2}
              </Text>
            </View>
          ) : (
            <View style={styles.imageColumn}>
              <ReactPdfImage
                src={images[10] || images[4]}
                style={styles.gridImage}
              />
              <ReactPdfImage
                src={images[11] || images[5]}
                style={styles.gridImage}
              />
            </View>
          )}
        </View>
        <Footer />
      </Page>

      {/* Page 3 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.heroContainer}>
          <ReactPdfImage src={images[4]} style={styles.heroImage} />
        </View>
        <View style={styles.imageGrid}>
          <View style={styles.imageColumn}>
            <ReactPdfImage src={images[5]} style={styles.gridImage} />
            <ReactPdfImage src={images[6]} style={styles.gridImage} />
          </View>
          <View style={styles.imageColumn}>
            <ReactPdfImage src={images[7]} style={styles.gridImage} />
            <ReactPdfImage src={images[8]} style={styles.gridImage} />
          </View>
        </View>
        <Footer />
      </Page>

      {/* Page 4 - Last page with image + partial text */}
      {descriptionSplit.hasRemainingContent ? (
        <Page size="A4" style={styles.page}>
          <Header />
          <View style={styles.heroContainer}>
            <ReactPdfImage src={images[9]} style={styles.heroImage} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.textContainer}>
              <Text style={styles.flowingContent}>{page4Text}</Text>
              {showCompanyInfoOnPage4 && (
                <View style={{ ...styles.companyInfo, marginTop: 30 }}>
                  <Text style={styles.companyDescription}>
                    {COMPANY_DESCRIPTION}
                  </Text>
                  <Text style={styles.companyTagline}>{COMPANY_TAGLINE}</Text>
                </View>
              )}
            </View>
          </View>
          <Footer />
        </Page>
      ) : (
        <Page size="A4" style={styles.page}>
          <Header />
          <View style={styles.heroContainer}>
            <ReactPdfImage src={images[9]} style={styles.heroImage} />
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyDescription}>{COMPANY_DESCRIPTION}</Text>
            <Text style={styles.companyTagline}>{COMPANY_TAGLINE}</Text>
          </View>
          <Footer />
        </Page>
      )}

      {/* Additional text-only pages */}
      {textOnlyPages.map((pageText, index) => {
        const isLastPage = index === textOnlyPages.length - 1;
        const showCompanyInfo = isLastPage && showCompanyInfoOnLastTextPage;

        return (
          <Page key={`text-page-${index}`} size="A4" style={styles.page}>
            <Header />
            <View style={styles.textOnlyPage}>
              <Text style={styles.flowingContent}>{pageText}</Text>
              {showCompanyInfo && (
                <View style={{ ...styles.companyInfo, marginTop: 30 }}>
                  <Text style={styles.companyDescription}>
                    {COMPANY_DESCRIPTION}
                  </Text>
                  <Text style={styles.companyTagline}>{COMPANY_TAGLINE}</Text>
                </View>
              )}
            </View>
            <Footer />
          </Page>
        );
      })}

      {/* Final page with company info if there wasn't room on last text page */}
      {textOnlyPages.length > 0 &&
        !showCompanyInfoOnLastTextPage &&
        !showCompanyInfoOnPage4 && (
          <Page size="A4" style={styles.page}>
            <Header />
            <View style={styles.companyInfo}>
              <Text style={styles.companyDescription}>
                {COMPANY_DESCRIPTION}
              </Text>
              <Text style={styles.companyTagline}>{COMPANY_TAGLINE}</Text>
            </View>
            <Footer />
          </Page>
        )}
    </Document>
  );
};
