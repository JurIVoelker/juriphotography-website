export function findSmallestIndex(arr) {
  if (arr.length === 0) {
    return 0; // Return -1 if the array is empty
  }

  let smallestIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[smallestIndex]) {
      smallestIndex = i;
    }
  }
  return smallestIndex;
}
