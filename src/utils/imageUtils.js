export function scaleToHeight(width, height, newHeight = 500) {
  // Calculate the aspect ratio
  const aspectRatio = width / height;

  // Calculate the new width maintaining the aspect ratio
  const newWidth = newHeight * aspectRatio;

  // Return the scaled dimensions as an object
  return {
    width: newWidth,
    height: newHeight,
  };
}
