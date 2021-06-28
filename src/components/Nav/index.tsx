/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'
import time from './time.png'

export type NavProps = {}

function Nav({}: NavProps) {
  return <div>hello</div>
}

const NavBlock = css`
  display: flex;
  justify-content: flex-end;
  width: 85%;
  margin: 0 15%;

  .nav__logo {
    flex-grow: 10;
  }
  .nav__items {
    width: 100%;
  }
`

export default Nav
