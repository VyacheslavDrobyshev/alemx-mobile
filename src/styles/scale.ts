import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 360;
// const guidelineBaseHeight = 800;

const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((shortDimension / guidelineBaseWidth) * size);

export default scale;
