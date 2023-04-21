import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AvatarSVG(props: any) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M8 9.333c2.21 0 4-1.99 4-4.444C12 2.434 10.21.444 8 .444S4 2.434 4 4.89c0 2.454 1.79 4.444 4 4.444zM16 16c0 2.7-4.073 1.778-8 1.778-3.927 0-8 .922-8-1.778s4.073-4.889 8-4.889c3.927 0 8 2.189 8 4.889z" />
    </Svg>
  );
}

export default AvatarSVG;
