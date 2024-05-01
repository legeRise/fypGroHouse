import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const BackIcon = () => {
  const nav=useNavigation()
  return (
    <View style={{}}>
    <TouchableOpacity onPress={() => nav.goBack()} style={{ position: 'absolute',marginTop: 5}}>
      <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 4 }}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default BackIcon ;