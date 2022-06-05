export const combineValFrom2Arrs = (arr1, arr2, action) => {
  return arr1.values.map((e1, index1) => {
    return arr2.values.map((e2, index2) => {
      return action(e1, e2);
    });
  });
};
