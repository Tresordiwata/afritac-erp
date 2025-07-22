import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, fontSize: 14 },
});

export default function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Voici mon document PDF généré avec @react-pdf/renderer !</Text>
        </View>
      </Page>
    </Document>
  );
}