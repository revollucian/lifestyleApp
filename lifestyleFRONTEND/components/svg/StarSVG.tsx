import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function StarSVG(props: any) {
  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.322 2.923a.754.754 0 011.356 0l2.65 5.44 6.022.829a.749.749 0 01.419 1.283c-1.61 1.538-4.382 4.191-4.382 4.191l1.069 5.952a.751.751 0 01-1.097.793L12 18.56l-5.359 2.851a.751.751 0 01-1.097-.793l1.07-5.952-4.382-4.191a.75.75 0 01.419-1.283l6.021-.829 2.65-5.44zM12 4.956L9.639 9.748l-5.246.719 3.848 3.643-.948 5.255L12 16.86l4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default StarSVG;
