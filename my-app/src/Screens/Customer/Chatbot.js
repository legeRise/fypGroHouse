import React, { useState } from "react";
import { StyleSheet, Text, View, Platform, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const Your_CHATGPT_API_KEY = "hmm"

  const handleSend = async (newMessages = []) => {
    try {
      // Get user message
      const userMessage = newMessages[0];

      // Add the user's message to the message state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );

      setLoading(true);

      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `You are a helpful assistant that can answer any questions about food and recipes. Answer the user's query: ${userMessage.text}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Your_CHATGPT_API_KEY}`,
          },
        }
      );

      setLoading(false);

      const recipe = response.data.choices[0]?.text?.trim();
      if (recipe) {
        const botmessage = {
          _id: new Date().getTime() + 1,
          text: recipe,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Food Bot",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botmessage)
        );
      } else {
        const botmessage = {
          _id: new Date().getTime() + 1,
          text: "Sorry, I couldn't find an answer for that.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Food Bot",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botmessage)
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const botmessage = {
        _id: new Date().getTime() + 1,
        text: "Oops! Something went wrong. Please try again later.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Food Bot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botmessage)
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <View
        style={{
          backgroundColor: "#0063FF",
          paddingTop: Platform.OS === "ios" ? 40 : 0,
          paddingHorizontal: 20,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Recipe Bot
        </Text>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0063FF" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => handleSend(newMessages)}
          user={{ _id: 1 }}
          placeholder="Type your message here..."
          alwaysShowSend
        />
      </View>
    </SafeAreaView>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
});