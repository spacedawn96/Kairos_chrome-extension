/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'
import {Button, Card, Elevation} from '@blueprintjs/core'

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
      <Card interactive={true} elevation={Elevation.ONE}>
        <h5>
          <a href="#">Card heading</a>
        </h5>
        <p>Card content</p>
        <Button>Submit</Button>
      </Card>
    </div>
  )
}

const smallBox = css``
const middleBox = css``
const bigBox = css``

export default Box
