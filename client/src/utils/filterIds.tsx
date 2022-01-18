/** @format */

export const getItemsID = (arr: any): string[] => {
  let idsArray = [];
  for (let i = 0; i < arr.length; i++) {
    idsArray.push(arr[i].id);
  }
  return idsArray;
};
