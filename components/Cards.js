import React from "react";
import { CARD_STATES } from "../utils";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const getCardStyles = (state) => {
  return {
    textDecorationLine:
      state === CARD_STATES.RESOLVED ? "line-through" : "none",
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'teal',
    borderRadius: 6,
    margin: 5,
    width: 100,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  };
};

const Card = ({ state, value, onPress }) => {
  return (
    <TouchableOpacity style={getCardStyles(state)} onPress={onPress}>
      <Text style={styles.highlight}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
    fontSize: 40,
    color: 'white',
  },
});

export default Card;
