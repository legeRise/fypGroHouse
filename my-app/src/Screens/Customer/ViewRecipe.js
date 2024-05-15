import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import BackIcon from '../../Components/BackIcon';
import Search from '../../Components/Search';
import HomeBanner from '../../Components/HomeBanner';
import RecipSearch from '../../Components/RecipSearch';
import { useNavigation } from '@react-navigation/native';

const ViewRecipe = ( {route}) => {
    const [searchTerm, setSearchTerm] = useState(route.params.productName);



  const shakeAnimation = new Animated.Value(0);
const nav=useNavigation()
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    // Start the shaking animation
    const shakeSequence = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      ]).start(() => {
        // Delay before starting the next shake sequence
        setTimeout(shakeSequence, 3000);
      });
    };

    // Start the initial shake sequence
    shakeSequence();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingTop: 10 }}>
        <View style={{ gap: 20, paddingBottom: 20, position: 'relative' }}>
          <HomeIcon />
          <Search onSearch={handleSearch} />
          <HomeBanner />
          <RecipSearch searchTerm={searchTerm} />
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
         nav.navigate('Chatbot');
          
        }}>
        <Animated.Image
          source={require('../../assets/Chatbot.png')} // Replace with your image path
          style={[
            styles.image,
            { transform: [{ translateX: shakeAnimation }] },
          ]}
        />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default ViewRecipe;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 50, // for circular image, adjust as needed
    overflow: 'hidden', // ensure the image is within the specified size
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // adjust how the image fills the container
  },
});
