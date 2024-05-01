import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIcon from "../../Components/HomeIcon";

const Complete = ({ navigation, route }) => {
  const { order } = route.params;

  const expressDeliveryFee = 30.0;

  const getTotalPrice = () => {
    let totalPrice = 0;
    order.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const totalAmount = parseFloat(getTotalPrice()) + expressDeliveryFee;

  const deleteItem = (index) => {
    let updatedOrder = [...order];
    updatedOrder.splice(index, 1);
    navigation.setParams({ order: updatedOrder });
  };

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.img }}
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            resizeMode: "contain",
          }}
        />
        <View style={{ flex: 1 }}>
          <ListItem.Title
            style={{
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={{ color: "black" }}>Quantity: </Text>
            {item.quantity}
            <Text style={{ color: "black" }}> Each: </Text>
            Rs {item.price.toFixed(2)}
            <Text style={{ color: "black" }}> Total: </Text>
            Rs {(item.price * item.quantity).toFixed(2)}
          </ListItem.Subtitle>
        </View>
        <TouchableOpacity
          style={{ marginTop: -50 }}
          onPress={() => deleteItem(index)}
        >
          <Icon name="delete" type="material" color="red" />
        </TouchableOpacity>
      </ListItem.Content>
    </ListItem>
  );

  const handleConfirmOrder = () => {
    navigation.navigate("Information", {
      order, // Pass order data to Information screen
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        paddingHorizontal: 15,
        backgroundColor: "#ebeef3",
        gap: 10,
      }}
    >
      <HomeIcon />
      <View style={{ flex: 0.8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Order Summary
        </Text>
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "white",
          marginTop: 30,
          gap: 10,
          padding: 10,
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text>Total</Text>
          <Text>Rs {getTotalPrice()}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Delivery Charges</Text>
          <Text>Rs {expressDeliveryFee.toFixed(2)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text>Total</Text>
        <Text>Rs {totalAmount.toFixed(2)}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleConfirmOrder}
          style={{
            backgroundColor: "#2eb24b",
            height: 40,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            Confirm Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Complete;
