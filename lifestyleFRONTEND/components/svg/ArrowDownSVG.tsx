import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDownSVG(props: any) {
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
      <Path d="M11 21.883l-6.235-7.527L4 15l7.521 9L19 15l-.764-.645L12 21.884V0h-1v21.883z" />
    </Svg>
  )
}

export default ArrowDownSVG