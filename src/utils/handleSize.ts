export const getRealSize = (ref: any) => {
  if (ref?.current) {
    console.log('ref', ref);

    const textNode = ref.current;
    const width = textNode.getWidth();
    console.log('width', width);

    const height = textNode.getHeight();
    console.log('height', height);

    return { width, height };
  }
};
