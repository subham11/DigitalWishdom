// src/components/ScrollableText.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';

const messages = [
  "Get extra 2% off on all prepaid orders",
  "Limited time offer: ",
  "Free shipping on orders above $50",
  "New arrivals just dropped! Check them out now",
  "Flash Sale! Get up to 40% off for the next 24 hours",
];

const ScrollableText = () => {
  const screenWidth = Dimensions.get('window').width;
  const animatedValue = useRef(new Animated.Value(screenWidth)).current;
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const startScrolling = () => {
      animatedValue.setValue(screenWidth); // Reset to start from the right
      Animated.timing(animatedValue, {
        toValue: -screenWidth, // Move completely left off screen
        duration: 6000, // Adjust speed of scrolling
        useNativeDriver: true,
      }).start(() => {
        // Move to the next message after scrolling finishes
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);

        // Restart scrolling after a short delay
        setTimeout(startScrolling, 1250); // 1-second pause before next message
      });
    };

    startScrolling(); // Start scrolling on mount

    return () => animatedValue.stopAnimation(); // Cleanup animation on unmount
  }, []); // Empty dependency array to prevent infinite re-renders

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.text, { transform: [{ translateX: animatedValue }] }]}
      >
        {messages[currentMessageIndex]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E5242', // Match the color from your image
    paddingVertical: 10,
    overflow: 'hidden', // Prevent text from appearing outside boundaries
    width: '100%',
    height: 30, // Adjust height as needed
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute', // Allows smooth right-to-left movement
    whiteSpace: 'nowrap', // Ensures text is in a single line
  },
});

export default ScrollableText;