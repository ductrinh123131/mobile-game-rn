export const MAX_PAIR = 6;
export const CARD_STATES = {
  DOWN: "down",
  UP: "up",
  RESOLVED: "resolved",
};

export const creatEmptyMatrix = (rowsCount = 4, columnsCount = 3) => {
  const matrix = new Array(rowsCount).fill(null);
  matrix.forEach((_, idx) => {
    matrix[idx] = new Array(columnsCount).fill(null);
  });
  return matrix;
};

export const generateRandomMatrix = () => {
  const matrix = creatEmptyMatrix();
  let list = [];

  // generate 6 unique values from 1 to 100
  while (list.length < MAX_PAIR) {
    const rand = Math.floor(Math.random() * 100 + 1);
    if (list.indexOf(rand) < 0) list.push(rand);
  }
  list = list.map((item) => ({ number: item, count: 2 }));

  // for each cell in matrix, pick a pair from the 6 unique values above
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      let found = false;
      while (!found) {
        const idx = Math.floor(Math.random() * (list.length - 1));
        if (list[idx].count >= 1) {
          matrix[r][c] = { number: list[idx].number, state: CARD_STATES.DOWN };
          list[idx].count = list[idx].count - 1;

          if (list[idx].count == 0) {
            list.splice(idx, 1);
          }
          found = true;
        }
      }
    }
  }
  return matrix;
};

export const matrixToFreq = (matrix) => {
  const hm = {};
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      hm[matrix[r][c].number] = hm[matrix[r][c].number]
        ? hm[matrix[r][c].number] + 1
        : 1;
    }
  }
  return hm;
};

export const cloneMatrix = (matrix) => {
  const newMatrix = creatEmptyMatrix();
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      newMatrix[r][c] = matrix[r][c];
    }
  }
  return newMatrix;
};
