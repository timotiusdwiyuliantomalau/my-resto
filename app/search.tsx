import React from "react";
import { View, Button, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const App = () => {
  const { width, height } = Dimensions.get("window");
  let position = useSharedValue(-width); // Menggunakan SharedValue untuk nilai animasi

  const moveBox = () => {
    // Gunakan withTiming untuk animasi berbasis waktu
    position.value = withTiming(0, { duration: 1000 });
  };
  const clearBox = () => {
    // Gunakan withTiming untuk animasi berbasis waktu
    position.value = withTiming(-width, { duration: 1000 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[ styles.box,animatedStyle]} >
        <Pressable style={{backgroundColor:"red",width:"100%",height:"100%",zIndex:100}} onPress={clearBox}></Pressable>
      </Animated.View>
      <Button title="Move Box" onPress={moveBox} />
      <Button title="Clear Box" onPress={clearBox} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "100%",
    backgroundColor: "skyblue",
    position: "absolute",
  },
});

export default App;
