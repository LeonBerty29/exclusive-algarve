/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image as ReactPdfImage,
  StyleSheet,
  Svg,
  Path,
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

const GOLD_TEXT_COLOR = "#AE8C2F";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    padding: "0 15px",
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    fontWeight: "bold",
    position: "absolute",
    top: 0,
    left: 15,
    right: 15,
  },
  headerLocation: {
    fontSize: 12,
    color: GOLD_TEXT_COLOR,
  },
  headerLogo: {
    width: 105,
    height: 40,
    objectFit: "contain",
  },
  headerPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#424242",
  },
  heroContainer: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
  },
  badge: {
    width: 111.1,
    height: 60.4,
    objectFit: "contain",
  },
  content: {
    flex: 1,
    padding: "5px 0",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
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
    color: "#000",
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
    columnGap: 6,
    rowGap: 6,
    justifyContent: "space-between",
  },
  featureItem: {
    marginBottom: 0,
  },
  featureLabel: {
    color: "#424242",
  },
  featureValue: {
    color: GOLD_TEXT_COLOR,
  },
  distanceItems: {
    fontSize: 10,
    lineHeight: 1.3,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  distanceItem: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    rowGap: 6,
  },
  distanceLabel: {
    color: "#444444",
  },
  distanceValue: {
    color: "#444444",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.2,
    textAlign: "justify",
    marginBottom: 7,
    color: "#2D2D2D",
  },
  notice: {
    fontSize: 8,
    lineHeight: 1.4,
    color: "#666666",
    fontStyle: "italic",
    marginTop: 8,
  },
  footer: {
    padding: "15px 0",
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
    color: "#2D2D2D",
  },
  footerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: "2px solid #AE8C2F",
    fontSize: 11,
    color: GOLD_TEXT_COLOR,
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
    color: GOLD_TEXT_COLOR,
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
    marginLeft: 10,
    color: "#2D2D2D",
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
    color: "#2D2D2D",
  },
  companyTagline: {
    fontSize: 12,
    color: "#2D2D2D",
  },
  flowingContent: {
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: "justify",
    color: "#2D2D2D",
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
});

// Icon components
const RestaurantIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"
      fill="#444444"
    />
  </Svg>
);

const BeachIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M13.127 14.56l1.43-1.43 6.44 6.443L19.57 21zm4.293-5.73l2.86-2.86c-3.95-3.95-10.35-3.96-14.3-.02 3.93-1.3 8.31-.25 11.44 2.88zM5.95 5.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C5.7 14.29 4.65 9.91 5.95 5.98zm.02-.02l-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73c-3.13-3.13-7.01-4.68-10.02-4.3z"
      fill="#444444"
    />
  </Svg>
);

const BusIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"
      fill="#444444"
    />
  </Svg>
);

const AirportIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      fill="#444444"
    />
  </Svg>
);

const HospitalIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"
      fill="#444444"
    />
  </Svg>
);

const ShoppingIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
      fill="#444444"
    />
  </Svg>
);

// Helper function to get icon by label
const getIconByLabel = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("restaurant")) return <RestaurantIcon />;
  if (lowerLabel.includes("beach")) return <BeachIcon />;
  if (lowerLabel.includes("bus")) return <BusIcon />;
  if (lowerLabel.includes("airport")) return <AirportIcon />;
  if (lowerLabel.includes("hospital")) return <HospitalIcon />;
  if (lowerLabel.includes("shop")) return <ShoppingIcon />;
  return null;
};

// Company info text
const COMPANY_DESCRIPTION =
  "Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006.";
const COMPANY_TAGLINE = "3 offices to serve you 7 days a week";

export const PropertyBrochurePDF: React.FC<PropertyBrochurePDFProps> = ({
  property,
  images,
  descriptionSplit,
  distances,
}) => {
  const formattedPrice = property.price.toLocaleString("en-US");

  const Header = () => (
    <View style={styles.header} fixed>
      <Text style={styles.headerLocation}>
        Location{" "}
        <Text style={{ color: "#424242" }}>{property.location.zone}</Text>
      </Text>
      <ReactPdfImage
        src="/images/eav-dark-logo.png"
        style={styles.headerLogo}
      />
      <Text style={styles.headerPrice}>
        <Text style={{ color: GOLD_TEXT_COLOR }}>Price </Text> €{" "}
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
          <Text style={{ marginTop: 3 }}>
            <Text style={{ color: GOLD_TEXT_COLOR }}>Tel.</Text> +351 289 321
            276
          </Text>
        </View>
        <View style={styles.office}>
          <Text style={styles.officeTitle}>LAGOA</Text>
          <Text>Rua Ernesto Cabrita,</Text>
          <Text>Edificio Vales Loja A</Text>
          <Text>8400-387 Lagoa</Text>
          <Text style={{ marginTop: 3 }}>
            <Text style={{ color: GOLD_TEXT_COLOR }}>Tel.</Text> +351 282 353
            019
          </Text>
        </View>
        <View style={styles.office}>
          <Text style={styles.officeTitle}>LAGOS</Text>
          <Text>Rua Dr. José Francisco Tello Queiroz,</Text>
          <Text>Edif. Largo do Rossio de S. João Batista</Text>
          <Text>Lote 3 Loja R, 8600-707 Lagos</Text>
          <Text style={{ marginTop: 3 }}>
            <Text style={{ color: GOLD_TEXT_COLOR }}>Tel.</Text> +351 282 353
            019
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
          <View style={styles.badgeContainer}>
            <ReactPdfImage
              src="/images/eav-pdf-awards-1.png"
              style={styles.badge}
            />
          </View>
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
                backgroundColor: "#C8B175",
                height: "100%",
                padding: "10 16",
              }}
            >
              <Text style={{ ...styles.featureTitle, color: "#424242" }}>
                {property.reference}
              </Text>
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
                  <View key={index} style={styles.distanceItem}>
                    {getIconByLabel(d.label)}
                    <Text>
                      <Text style={styles.distanceLabel}>{d.label} - </Text>
                      <Text style={styles.distanceValue}>{d.value}</Text>
                    </Text>
                  </View>
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

        {/* Page 2 */}
        <View style={styles.heroContainer}>
          <ReactPdfImage src={images[1]} style={styles.heroImage} />
          <View style={styles.badgeContainer}>
            <ReactPdfImage
              src="/images/eav-pdf-awards-1.png"
              style={styles.badge}
            />
          </View>
        </View>
        <View style={{ ...styles.imageGrid, gap: 8 }}>
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

        {/* Page 3 */}
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

        {/* Page 4 - Last page with image + remaining text as single chunk */}
        <View style={styles.heroContainer}>
          <ReactPdfImage src={images[9]} style={styles.heroImage} />
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.textContainer}>
            {descriptionSplit.remaining && (
              <Text style={styles.flowingContent}>
                {descriptionSplit.remaining}
              </Text>
            )}
            <View style={{ ...styles.companyInfo, marginTop: 30 }}>
              <Text style={styles.companyDescription}>
                {COMPANY_DESCRIPTION}
              </Text>
              <Text style={styles.companyTagline}>{COMPANY_TAGLINE}</Text>
            </View>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
};
