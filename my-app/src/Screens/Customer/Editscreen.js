import { StyleSheet, Text, View,Image,TextInput,Button ,TouchableOpacity,TouchableHighlight,Modal, Position} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import { Ionicons } from '@expo/vector-icons';

const Editscreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const handleSubmit = () => {
    // handle form submission
  };
  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  const handleModalClose = () => {
    setImageModalVisible(false);
  };

  const handleGalleryPress = () => {
    console.log("Gallery pressed");
    handleModalClose();
  };

  const handleCameraPress = () => {
    console.log("Camera pressed");
    handleModalClose();
  };
  return (
    <SafeAreaView  style={styles.container}>
       <View style={{ position: 'absolute', top: 20, left: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <HomeIcon />
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "column",
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 999,
              borderColor: "black",
              borderWidth: 2,
              resizeMode: "cover",
              marginBottom: 20,
            }}
            source={require("../../assets/sign.png")}
          />
          </TouchableOpacity>
         
          <Modal
        animationType="slide"
        transparent={false}
        visible={imageModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select an option</Text>
          <TouchableHighlight
            style={styles.modalButton}
            onPress={handleGalleryPress}
          >
            <Text style={styles.modalButtonText}>Gallery</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.modalButton}
            onPress={handleCameraPress}
          >
            <Text style={styles.modalButtonText}>Camera</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.modalCloseButton}
            onPress={handleModalClose}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={text => setFirstName(text)}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={text => setLastName(text)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
        placeholder="Address"
        multiline
      />
      <Button  title="Submit" onPress={handleSubmit} />
    

    </SafeAreaView>
  )
}

export default Editscreen ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
  },
  userInfoSection: {
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    
  },
});
