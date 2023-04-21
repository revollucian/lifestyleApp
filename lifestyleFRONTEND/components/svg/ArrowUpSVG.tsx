import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowUpSVG(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <Path d="M11 2.206L4.765 9.734 4 9.089l7.521-9 7.479 9-.764.646L12 2.205v21.884h-1V2.206z" />
    </Svg>
  )
}

export default ArrowUpSVG