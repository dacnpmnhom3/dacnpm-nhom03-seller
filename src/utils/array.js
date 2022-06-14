export const combineValFrom2Arrs = (arr1, arr2, action) => {
  const result = []
  arr1.values.forEach((e1, index1) => {
    arr2.values.forEach((e2, index2) => {
      return result.push(action(e1, e2));
    });
  });

  return result
};
