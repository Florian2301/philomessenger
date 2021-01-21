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
  user: { fontSize: 10, marginTop: 5},
  info: { fontSize: 10, marginBottom: 30, textAlign: 'center', marginTop: 30 },
  infotext: { marginBottom: 5, marginTop: 5},
  philosopher: { fontSize: 10, marginTop: 5, marginLeft: 30 },
  text: { fontSize: 15, marginBottom: 5, marginLeft: 30 },
})

// Create PDF document
const PDF = (props) => {
  let key
  let philosopher
  let text

  return (
    <Document>
      <Page size="A4" style={styles.page}>
    
        <View style={styles.header}>
          <Text>{props.title}</Text>
          <Text style={styles.user}>written by {props.user}</Text>
        </View>

        {props.data.map((d) => {
          philosopher = d.name
          text = d.text
          key = uuidv4()

          return (
            <View key={key}>
              <Text style={styles.philosopher}>{philosopher}:</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
          )
        })}

        <View style={styles.info}>
          <Text style={styles.infotext}>Chat published: {props.date} on philomessenger.herokuapp.com</Text>
        </View>

      </Page>
    </Document>
  )
}


export default PDF
