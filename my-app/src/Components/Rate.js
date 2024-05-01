import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'

const Rate = () => {
  return (
    <View style={{flex:1,marginTop:10,flexDirection:"row",alignItems: "center",justifyContent:"space-between"}}>
      <Text style={{fontSize: 20,fontWeight: "bold"}}>Rating :  </Text>
      <Rating 
      style={{}}
      
      fractions={1}
      jumpValue={0.1}
      onFinishRating={rating => console.log(`Rating finished ${rating}`)}
      imageSize={24}
      
      />
    </View>
  )
}

export default Rate ;

const styles = StyleSheet.create({})