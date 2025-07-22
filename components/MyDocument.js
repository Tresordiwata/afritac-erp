// components/MyDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, fontSize: 14 },
});

export default function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Voici un PDF généré avec @react-pdf/renderer et Next.js App Router 🚀</Text>
        </View>
      </Page>
    </Document>
  );
}
