import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid';

/**
 * Style des PDFs
 * -> muss noch ausgearbeitet werden
 */
const styles = StyleSheet.create({
  page: { backgroundColor: 'lightgrey' },
  header: { fontSize: 20, textAlign: 'center', margin: 30 },
  name: { fontSize: 10, marginTop: 5, marginLeft: 10 },
  text: { fontSize: 15, marginBottom: 5, marginLeft: 10 },
  color0: { backgroundColor: 'blue' },
})

// Create PDF document
const PDF = (props) => {
  let key
  let name
  let text
  let color

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{props.title}</Text>
        </View>

        {props.data.map((d) => {
          name = d.name
          text = d.text
          key = uuidv4()
          color = d.color

          return (
            <View key={key} color={color}>
              <Text style={styles.name}>{name}:</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
          )
        })}
      </Page>
    </Document>
  )
}


export default PDF