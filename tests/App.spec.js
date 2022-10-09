import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "../App";
import { generateRandomMatrix, matrixToFreq, CARD_STATES } from '../utils'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test("App can render 12 cards", () => {
  render(<App />);
  const cards = screen.getAllByTestId('card')
  expect(cards.length).toBe(12)
});

test("Card will flip when click", () => {
  render(<App />);
  const cards = screen.getAllByTestId('card')
  expect(cards.length).toBe(12)
  fireEvent.press(cards[0])
  const flipped = screen.getByAccessibilityHint(CARD_STATES.UP)
  expect(flipped).toBeTruthy()
});

test("App can generate random matrix", () => {
  const matrix = generateRandomMatrix()
  expect(matrix.length).toBe(4)
  expect(matrix[0].length).toBe(3)
  expect(matrix[0][0].state).toBe('down')
  expect(typeof matrix[0][0].number).toBe('number')
});

test("random matrix are divided into 6 random unique pairs", () => {
  let pairs
  let uniqueNumbers

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)

  pairs = matrixToFreq(generateRandomMatrix())
  uniqueNumbers = Object.keys(pairs)
  expect(new Set(uniqueNumbers).size).toBe(6)
  expect(uniqueNumbers.every(number => pairs[number] === 2)).toBe(true)
});

