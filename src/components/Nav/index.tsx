/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'
import time from './time.png'
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

export type NavProps = {}

function Nav({}: NavProps) {
  return (
    <Navbar css={NavBlock}>
      <Navbar.Group align={Alignment.LEFT} className="nav__items">
        <Navbar.Heading className="nav__logo">Kairos</Navbar.Heading>
        <Navbar.Divider />
        <div>button1</div>
        <div>button2</div>
        <div>Latest Activity</div>
      </Navbar.Group>
    </Navbar>
  )
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
