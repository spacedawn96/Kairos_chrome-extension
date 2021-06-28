/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'

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
