import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CameraSVG(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <Path d="M5 5H2V4h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15H0V6h5.93c.669 0 1.293-.334 1.664-.891L9 3h8l1.406 2.109c.371.557.995.891 1.664.891H24zM5 10a1 1 0 10-2 0 1 1 0 002 0zm13 3a5 5 0 10-10.001.001A5 5 0 0018 13z" />
    </Svg>
  );
}

export default CameraSVG;
