import React, { useEffect, useState } from "react";
import {
  generateRandomMatrix,
  cloneMatrix,
  MAX_PAIR,
  CARD_STATES,
} from "./utils";

import Card from "./components/Cards";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from "react-native";

let CARD_PAIRS_VALUE = generateRandomMatrix();

const App = () => {
  const [matrix, setMatrix] = useState(CARD_PAIRS_VALUE);
  const [firstTurn, setFirstTurn] = useState(null);
  const [pending, setPending] = useState(false);
  const [step, setStep] = useState(0);
  const [pairsSolved, setPairsSolved] = useState(0);

  useEffect(() => {
    // end of round
    if (pairsSolved === MAX_PAIR) {
      Alert.alert("Congratulations", `You won this game by ${step} steps`, [
        {
          text: "Restart game",
          onPress: restart,
        },
      ]);
    }
  }, [pairsSolved]);

  const restart = () => {
    setMatrix(generateRandomMatrix());
    setStep(0);
    setPairsSolved(0);
  };

  const handleFirstTurn = (rowIdx, colIdx) => {
    setFirstTurn({ rowIdxFirst: rowIdx, colIdxFirst: colIdx });
    const newMatrix = cloneMatrix(matrix);
    newMatrix[rowIdx][colIdx].state = CARD_STATES.UP;
    setMatrix(newMatrix);
  };

  const flipAndContinueNextTurn = (rowIdx, colIdx, newMatrix) => {
    const { rowIdxFirst, colIdxFirst } = firstTurn;
    const newMatrix2 = cloneMatrix(matrix);
    newMatrix[rowIdxFirst][colIdxFirst].state = CARD_STATES.DOWN;
    setFirstTurn(null);
    newMatrix[rowIdx][colIdx].state = CARD_STATES.DOWN;
    setMatrix(newMatrix2);
    setPending(false);
  };

  const handleSecondTurn = (rowIdx, colIdx) => {
    const { rowIdxFirst, colIdxFirst } = firstTurn;
    if (
      // matched!
      matrix[rowIdx][colIdx].number === matrix[rowIdxFirst][colIdxFirst].number
    ) {
      const newMatrix = cloneMatrix(matrix);
      newMatrix[rowIdx][colIdx].state = CARD_STATES.RESOLVED;
      newMatrix[rowIdxFirst][colIdxFirst].state = CARD_STATES.RESOLVED;
      setMatrix(newMatrix);
      setFirstTurn(null);
      setPairsSolved(pairsSolved + 1);
    } else {
      // did not match 1st turn
      const newMatrix = cloneMatrix(matrix);
      newMatrix[rowIdx][colIdx].state = CARD_STATES.UP;
      setMatrix(newMatrix);
      setPending(true);

      setTimeout(() => {
        flipAndContinueNextTurn(rowIdx, colIdx, newMatrix);
      }, 1000);
    }
  };

  const handlePress = (rowIdx, colIdx) => {
    if (pending || matrix[rowIdx][colIdx].state === CARD_STATES.RESOLVED)
      return;
    if (
      firstTurn &&
      firstTurn.rowIdxFirst === rowIdx &&
      firstTurn.colIdxFirst === colIdx
    )
      return;

    setStep(step + 1);
    if (!firstTurn) {
      handleFirstTurn(rowIdx, colIdx);
    } else {
      handleSecondTurn(rowIdx, colIdx);
    }
  };

  const renderRow = () => {
    return matrix.map((row, rowIdx) => {
      return (
        <View style={styles.row} key={rowIdx}>
          {row.map((col, colIdx) => {
            return (
              <Card
                key={colIdx}
                state={col.state}
                value={col.number}
                onPress={handlePress}
                rowIdx={rowIdx}
                colIdx={colIdx}
              />
            );
          })}
        </View>
      );
    });
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.backgroundColor}
      />
      <View style={styles.textContainer}>
        <Text style={styles.restart} onPress={restart}>
          Restart
        </Text>
        <Text style={styles.highlight}>Steps: {step} </Text>
      </View>
      <View style={{ ...styles.backgroundColor, ...styles.center }}>
        <View style={styles.sectionContainer}>{renderRow()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  highlight: {
    fontWeight: "700",
    fontSize: 30,
    color: "white",
  },
  restart: {
    fontWeight: "600",
    color: "#147efb",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
  },
  backgroundStyle: {
    backgroundColor: "#696969",
    flex: 1,
  },
});

export default App;
