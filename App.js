/**
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from "react";
 import {
   generateRandomMatrix,
   cloneMatrix,
   MAX_PAIR,
   CARD_STATES,
 } from "./utils";
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Alert,
 } from "react-native";
 
 import { Colors } from "react-native/Libraries/NewAppScreen";
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
       Alert.prompt("Congratulations", `You won this game by ${step} steps`, [
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
 
   const handleFirstTurn = () => {
     setFirstTurn({ rowIdxFirst: rowIdx, colIdxFirst: colIdx });
     const newMatrix = cloneMatrix(matrix);
     newMatrix[rowIdx][colIdx].state = CARD_STATES.UP;
     setMatrix(newMatrix);
   };
 
   const flipAndContinueNextTurn = () => {
     const newMatrix2 = cloneMatrix(matrix);
     newMatrix[rowIdxFirst][colIdxFirst].state = CARD_STATES.DOWN;
     setFirstTurn(null);
     newMatrix[rowIdx][colIdx].state = CARD_STATES.DOWN;
     setMatrix(newMatrix2);
     setPending(false);
   };
 
   const handleSecondTurn = () => {
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
         flipAndContinueNextTurn();
       }, 1000);
     }
   };
 
   const handlePress = (rowIdx, colIdx) => {
     // TODO: function too big!!
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
       handleFirstTurn();
     } else {
       handleSecondTurn();
     }
   };
 
   const renderRow = () => {
     return matrix.map((row, rowIdx) => {
       return (
         <View style={{ padding: 10, flexDirection: "row" }}>
           <Text onPress={restart}>Restart</Text>
           {row.map((col, colIdx) => {
             return (
               <Text
                 style={{
                   padding: 10,
                   textDecorationLine:
                     col.state === CARD_STATES.RESOLVED
                       ? "line-through"
                       : "none",
                 }}
                 onPress={() => handlePress(rowIdx, colIdx)}
               >
                 {col.state !== CARD_STATES.DOWN ? col.number : "?"}
               </Text>
             );
           })}
         </View>
       );
     });
   };
 
   const isDarkMode = useColorScheme() === "dark";
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar
         barStyle={isDarkMode ? "light-content" : "dark-content"}
         backgroundColor={backgroundStyle.backgroundColor}
       />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}
       >
         <View style={{ flex: 1, padding: 20, flexDirection: "column" }}>
           {renderRow()}
         </View>
         <Text>Step: {step} </Text>
         <Text>Solved: {pairsSolved} </Text>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: "600",
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: "400",
   },
   highlight: {
     fontWeight: "700",
   },
 });
 
 export default App;
 