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
  info: { fontSize: 10, marginLeft: 10, marginTop: 30 },
  infotext: { marginBottom: 5 },
  philosopher: { fontSize: 10, marginTop: 5, marginLeft: 10 },
  text: { fontSize: 15, marginBottom: 5, marginLeft: 10 },
  color0: { backgroundColor: 'blue' },
})

// Create PDF document
const PDF = (props) => {
  let key
  let philosopher
  let text
  let color

  return (
    <Document>
      <Page size="A4" style={styles.page}>
    
        <View style={styles.header}>
          <Text>{props.title}</Text>
          <Text style={styles.philosopher}>written by {props.user}</Text>
        </View>

        {props.data.map((d) => {
          philosopher = d.name
          text = d.text
          key = uuidv4()
          color = d.color

          return (
            <View key={key} color={color}>
              <Text style={styles.philosopher}>{philosopher}:</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
          )
        })}

        <View style={styles.info}>
          <Text style={styles.infotext}>Tags: {props.tags}</Text>
          <Text style={styles.infotext}>Description: {props.description}</Text>
          <Text style={styles.infotext}>Date: {props.date}</Text>
          <Text style={styles.infotext}>Downloaded from: philomessenger.herokuapp.com</Text>
        </View>

      </Page>
    </Document>
  )
}


export default PDF
