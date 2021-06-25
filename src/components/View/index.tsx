/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import * as React from 'react'
import LeftSide from '../LeftSide'

import Nav from '../Nav'
import RightSide from '../RightSide'

export type BodyProps = {
  leftNav: React.ReactNode
  rightNav: React.ReactNode
}

export type MainNavBarProps = {
  children: React.ReactNode
}

export type LeftSideProps = {
  children: React.ReactNode
}
export type RightProps = {
  children: React.ReactNode
}

export function MainNav({children}: MainNavBarProps) {
  return <div>{children}</div>
}

export function Body({leftNav, rightNav}: BodyProps) {
  return (
    <div>
      {leftNav}
      {rightNav}
    </div>
  )
}

export function LeftBar({children}: LeftSideProps) {
  return <div>{children}</div>
}

export function RightBar({children}: RightProps) {
  return <div>{children}</div>
}

const ContainerBlock = css``
