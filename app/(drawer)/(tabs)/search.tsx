// import React from "react";
// import {
//   View,
//   Button,
//   StyleSheet,
//   Dimensions,
//   Pressable,
//   Text,
// } from "react-native";
// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
//   Swipeable,
// } from "react-native-gesture-handler";
// import Animated, {
//   Easing,
//   withTiming,
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
// } from "react-native-reanimated";

// const App = () => {
//   const { width, height } = Dimensions.get("window");
//   let position = useSharedValue(-width); // Menggunakan SharedValue untuk nilai animasi

//   const moveBox = () => {
//     // Gunakan withTiming untuk animasi berbasis waktu
//     position.value = withTiming(0, { duration: 300 });
//   };
//   const clearBox = () => {
//     // Gunakan withTiming untuk animasi berbasis waktu
//     position.value = withTiming(-width, { duration:300 });
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: position.value }],
//     };
//   });

//   const ItemDrawer = () => (
//     <View
//       style={{
//         backgroundColor: "white",
//         width: "100%",
//         height: "100%",
//       }}
//     >
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <Animated.View style={[styles.box, animatedStyle]}>
//         <Pressable
//           style={{
//             backgroundColor: "red",
//             width: "100%",
//             height: "100%",
//             zIndex: 100,
//           }}
//           onPress={clearBox}
//         ></Pressable>
//       </Animated.View>
//       <Button title="Move Box" onPress={moveBox} />
//       <Button title="Clear Box" onPress={clearBox} /> */}
//       <View style={{backgroundColor:"red",zIndex:10,opacity:0.5}}>
//       <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, ipsa.</Text>
//       </View>
//       <GestureHandlerRootView style={{width:"80%",height:"100%",position:"absolute"}}>
//         <Swipeable containerStyle={{height:"100%"}} renderLeftActions={ItemDrawer}>
//           <View
//             style={{ width: "100%", height: "100%",backgroundColor:"gray"}}
//           >
//             <View style={{gap:15,left:"-100%"}}>
//             <Text style={{color:"red"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quam. dsfsdfdsfsd</Text>
//             <Text style={{color:"red"}}>Ini adalah sebuah ceritaaaaaaaa</Text>
//             </View>
//           </View>
//         </Swipeable>
//       </GestureHandlerRootView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:"gray"
//   },
//   box: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "skyblue",
//     position: "absolute",
//   },
// });

import React from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 2.5; // 80% of the screen width

export default function CustomDrawer() {
  const translateX = useSharedValue(-DRAWER_WIDTH); // Initially hidden off-screen
  const [isSLide, setIsSlide] = React.useState(false);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const mainStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [-DRAWER_WIDTH, 0],
          [0, DRAWER_WIDTH * 0.3] // Slight parallax effect
        ),
      },
    ],
  }));

  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;
    setIsSlide(true);
    // Prevent over-scrolling
    translateX.value = Math.min(
      0,
      Math.max(-DRAWER_WIDTH, translateX.value + translationX)
    );
  };

  const onGestureEnd = () => {
    if (translateX.value > -DRAWER_WIDTH / 2) {
      // Open drawer
      translateX.value = withTiming(0, { duration: 800 });
    } else {
      // Close drawer
      translateX.value = withTiming(-DRAWER_WIDTH, { duration: 800 }); // 500ms duration
      setIsSlide(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Drawer */}
      <Animated.View style={[styles.drawer, drawerStyle]}>
        <Text style={styles.drawerText}>Drawer Content</Text>
      </Animated.View>

      {/* Main Content */}
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
        <Animated.View
          style={[
            styles.mainContent,
            {
              backgroundColor: isSLide ? "gray" : "white",
              width: isSLide ? "100%" : 50,
              height: isSLide ? "100%" : 50,
            },
            mainStyle,
          ]}
        >
          <Pressable onPress={() => {}}>
            <Text style={styles.mainText}>Main Screen</Text>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  drawer: {
    position: "absolute",
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#6200ea",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  drawerText: {
    color: "#fff",
    fontSize: 18,
  },
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
