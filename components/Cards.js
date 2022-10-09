import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CARD_STATES } from "../utils";
import { Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

const Card = ({ testID, state, value, onPress, rowIdx, colIdx }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleOnPress = () => {
    onPress(rowIdx, colIdx);
  };

  useEffect(() => {
    if (state === CARD_STATES.RESOLVED) {
      flipToFront();
    } else if (state === CARD_STATES.UP) {
      flipToFront();
    } else {
      flipToBack();
    }
  }, [state]);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      testID={testID}
      accessibilityHint={state}
    >
      <Animated.View
        style={{ ...styles.card, ...styles.back, ...flipToFrontStyle }}
      >
        <Text style={styles.highlight}>?</Text>
      </Animated.View>
      <Animated.View style={{ ...styles.card, ...flipToBackStyle }}>
        <Text style={styles.highlight}>
          {value}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
    fontSize: 40,
    color: "white",
  },
  card: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "teal",
    borderRadius: 6,
    margin: 5,
    width: 100,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
  },
});

Card.propTypes = {
  testID: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  rowIdx: PropTypes.number.isRequired,
  colIdx: PropTypes.number.isRequired,
};

export default Card;
