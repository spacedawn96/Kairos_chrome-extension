/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'
import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from '@blueprintjs/core'

export type RightSideProps = {}

function RightSide({}: RightSideProps) {
  return (
    <div css={RightSideBlock}>
      <div>DashBoard</div>
      <div>History</div>
      <div>Setting</div>
    </div>
  )
}

const RightSideBlock = css`
  position: absolute;
  border: 1px solid red;
  width: 20%;
  margin: 0 80%;
  height: 100%;
`

export default RightSide
