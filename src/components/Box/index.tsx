/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'

export type BoxProps = {
  title?: string
  className?: string
  body?: React.ReactNode
  info?: string
  footer?: React.ReactNode
}

function Box({className, title, body, info, footer}: BoxProps) {
  return (
    <div css={className}>
      <div>hello</div>
    </div>
  )
}

const smallBox = css``
const middleBox = css``
const bigBox = css``

export default Box
