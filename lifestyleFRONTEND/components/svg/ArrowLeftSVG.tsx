import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowLeftSVG(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <Path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167L16.67 24 4.5 12.004z" />
    </Svg>
  );
}

export default ArrowLeftSVG;
