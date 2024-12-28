import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const MeshGradient = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient id="grad1" cx="30%" cy="30%" r="50%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#ff9a9e" stopOpacity="1" />
            <Stop offset="50%" stopColor="#fad0c4" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#fad0c4" stopOpacity="0.3" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MeshGradient;
