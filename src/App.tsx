/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'

import Nav from './components/Nav'
import * as React from 'react'
import {Body, MainNav, RightBar, LeftBar} from './components/View/index'
import RightSide from './components/RightSide'
import LeftSide from './components/LeftSide'

function App() {
  return (
    <div>
      <MainNav>
        <Nav />
      </MainNav>
      <Body
        leftNav={
          <LeftBar>
            <LeftSide />
          </LeftBar>
        }
        rightNav={
          <RightBar>
            <RightSide />
          </RightBar>
        }
      ></Body>
    </div>
  )
}

export default App
