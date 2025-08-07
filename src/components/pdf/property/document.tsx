/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import PropertyWatermark from "./watermark";
import { IconText } from "./icons";
import { PropertyData } from "./types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 40,
    paddingBottom: 30,
    fontSize: 10,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    objectFit: "cover",
  },
  mainImagePlaceholder: {
    width: "100%",
    height: 400,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    border: "1px solid #e5e7eb",
  },
  propertyId: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 5,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 10,
  },
  location: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1f2937",
  },
  priceContainer: {
    borderWidth: 2,
    borderColor: "#1f2937",
    padding: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
  },
  shortDescription: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  sectionTitleLeft: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "left",
    marginBottom: 15,
    marginTop: 20,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  featureItem: {
    width: "23%",
    alignItems: "center",
  },
  featureValue: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  featureLabel: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  gridImage: {
    width: "100%",
    height: 300,
    marginBottom: 15,
    objectFit: "cover",
  },
  gridImagePlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    border: "1px solid #e5e7eb",
  },
  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  // Updated driving distances styles for horizontal flow:
  drivingContainer: {
    flexDirection: "row", // horizontal layout
    justifyContent: "flex-start",
    flexWrap: "wrap", // allow wrapping to next line if overflow
    marginBottom: 25,
  },

  drivingItem: {
    flexDirection: "row", // icon and text inline
    alignItems: "center",
    marginRight: 15, // horizontal spacing between items
    marginBottom: 8, // vertical spacing if wrapped
    minWidth: 100, // optional: minimum width to help spacing
  },

  fullDescription: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 25,
  },
  contactSection: {
    backgroundColor: "#f9fafb",
    padding: 15,
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contactOffice: {
    width: "30%",
  },
  officeTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  officeAddress: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 1.3,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contactItem: {
    fontSize: 10,
    color: "#6b7280",
  },
  notice: {
    marginTop: 15,
  },
  noticeText: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#6b7280",
    textAlign: "justify",
  },
  noticeTitle: {
    fontWeight: "bold",
    color: "#059669",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#9ca3af",
  },
});

type PropertyBrochureDocumentProps = {
  propertyData: PropertyData;
  title?: string;
};

export const PropertyBrochureDocument: React.FC<
  PropertyBrochureDocumentProps
> = ({ propertyData, title }) => {
  return (
    <Document
      author="Exclusive Algarve Villas"
      title={title || `Property Brochure - ${propertyData.title}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>EXCLUSIVE ALGARVE VILLAS</Text>

        {/* Main Property Image */}
        {propertyData.mainImage ? (
          <Image src={propertyData.mainImage} style={styles.mainImage} />
        ) : (
          <View style={styles.mainImagePlaceholder}>
            <Text style={{ fontSize: 12, color: "#6b7280" }}>
              [Main Property Image]
            </Text>
          </View>
        )}

        {/* Property Information */}
        <Text style={styles.propertyId}>{propertyData.id}</Text>
        <Text style={styles.propertyTitle}>{propertyData.title}</Text>
        <Text style={styles.location}>{propertyData.location}</Text>

        {/* Description and Price */}
        <Text style={styles.description}>
          Modern Villa near Gale beach and Salgados Golf for sale Algarve
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{propertyData.price}</Text>
        </View>

        <Text style={styles.shortDescription}>
          {propertyData.shortDescription}
        </Text>

        {/* Property Features */}
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>{propertyData.bedrooms}</Text>
              <Text style={styles.featureLabel}>Bedrooms</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>{propertyData.bathrooms}</Text>
              <Text style={styles.featureLabel}>Bathrooms</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>
                {propertyData.constructionYear}
              </Text>
              <Text style={styles.featureLabel}>Built Year</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>
                {propertyData.privateArea}m²
              </Text>
              <Text style={styles.featureLabel}>Private area</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>{propertyData.plotSize}m²</Text>
              <Text style={styles.featureLabel}>Plot size</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>
                {propertyData.constructionArea}m²
              </Text>
              <Text style={styles.featureLabel}>Construction area</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>
                {propertyData.energyClass}
              </Text>
              <Text style={styles.featureLabel}>Energy Class</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureValue}>
                {propertyData.propertyType}
              </Text>
              <Text style={styles.featureLabel}>Property Type</Text>
            </View>
          </View>
        </View>

        {/* Additional Property Images */}
        {propertyData.additionalImages &&
        propertyData.additionalImages.length > 0
          ? propertyData.additionalImages.map((imageUrl, index) => (
              <Image key={index} src={imageUrl} style={styles.gridImage} />
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={styles.gridImagePlaceholder}>
                <Text style={{ fontSize: 8, color: "#9ca3af" }}>
                  [Image {index + 1}]
                </Text>
              </View>
            ))}

        {/* Driving Distances (Horizontal Layout) */}
        <Text style={styles.sectionTitleLeft}>DRIVING DISTANCE</Text>
        <View style={styles.drivingContainer}>
          {propertyData.drivingDistances.map((item, index) => (
            <View key={index} style={styles.drivingItem}>
              <IconText
                icon={item.icon as any}
                text={`${item.destination} - ${item.minutes} min`}
                size={11}
              />
            </View>
          ))}
        </View>

        {/* Property Description */}
        <Text style={styles.fullDescription}>
          {propertyData.fullDescription}
        </Text>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <View style={styles.contactRow}>
            <View style={styles.contactOffice}>
              <Text style={styles.officeTitle}>LAGOA</Text>
              <Text style={styles.officeAddress}>
                Rua Ernesto Cabrita, Edificio Vales L/A{"\n"}
                8400-387 Lagoa - Algarve
              </Text>
            </View>
            <View style={styles.contactOffice}>
              <Text style={styles.officeTitle}>VILAMOURA</Text>
              <Text style={styles.officeAddress}>
                Avenida Tivoli, B, Bloco 3, R/C Esq{"\n"}
                8125-465 Vilamoura - Algarve
              </Text>
            </View>
            <View style={styles.contactOffice}>
              <Text style={styles.officeTitle}>LAGOS</Text>
              <Text style={styles.officeAddress}>
                R. Dr. José Francisco Tello Queiroz, L 3, R{"\n"}
                Loja R, 8600-707 Lagos
              </Text>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>Tel.: +351 282 353 019</Text>
            <Text style={styles.contactItem}>Mobile: +351 918 024 082</Text>
            <Text style={styles.contactItem}>
              Email: info@exclusive-algarve.com
            </Text>
          </View>
        </View>

        {/* Important Notice */}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            <Text style={styles.noticeTitle}>Important notice: </Text>
            These particulars are not an offer or contract, nor part of one. The
            photographs show only certain parts of the property as they appeared
            at the time they were taken. Areas, measurements, layout plans and
            distances are for guidance only and should not be relied upon as a
            statement of fact. All property details have been provided by the
            seller and should not be considered factually accurate about the
            property, its condition or value. Exclusive Living Mediacao
            Imobiliaria Lda. holds no responsibility to the accuracy of the
            information and will not be held liable for any errors on any
            representation on the property.
          </Text>
        </View>

        <PropertyWatermark />

        <Text
          fixed
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          style={styles.pageNumber}
        />
      </Page>
    </Document>
  );
};
