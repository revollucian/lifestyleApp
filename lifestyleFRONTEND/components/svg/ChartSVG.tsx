import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChartSVG(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <Path d="M7 19H1V8h6v11zm8-18H9v18h6V1zm8 11h-6v7h6v-7zm1 9H0v2h24v-2z" />
    </Svg>
  );
}

export default ChartSVG;
