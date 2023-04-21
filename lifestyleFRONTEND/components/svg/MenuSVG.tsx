import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MenuSVG(props: any) {
  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997C22 17.52 17.52 22 12.002 22c-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zM17 15.25a.75.75 0 00-.75-.75h-8.5a.75.75 0 000 1.5h8.5a.75.75 0 00.75-.75zm0-3.248a.75.75 0 00-.75-.75h-8.5a.75.75 0 000 1.5h8.5a.75.75 0 00.75-.75zm0-3.252a.75.75 0 00-.75-.75h-8.5a.75.75 0 000 1.5h8.5a.75.75 0 00.75-.75z"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default MenuSVG