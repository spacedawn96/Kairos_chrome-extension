/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'

export type LeftSideProps = {}

function LeftSide({}: LeftSideProps) {
  return (
    <div css={LeftSideBlock}>
      <div>DashBoard</div>
      <div>History</div>
      <div>Setting</div>
    </div>
  )
}

const LeftSideBlock = css`
  position: absolute;
  top: 0;
  border: 1px solid red;
  width: 15%;
  height: 100%;
`

export default LeftSide
