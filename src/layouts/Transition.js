import React from 'react'
import { css } from 'react-emotion'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const position = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  width: 100%;
`

const enter = css`
  opacity: 0.01;
  transition: opacity 150ms ease-in 120ms;
`

const enterActive = css`
  opacity: 1;
`

const exit = css`
  ${position} opacity: 1;
  transition: opacity 80ms ease-in 0;
`

const exitActive = css`
  ${position} opacity: 0.01;
`

class TransitionHandler extends React.Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    return this.props.children
  }
}

const Main = ({ children, location }) => (
  <TransitionGroup>
    <CSSTransition
      classNames={{ enter, enterActive, exit, exitActive }}
      timeout={{ enter: 270, exit: 100 }}
      key={location.pathname}
    >
      <TransitionHandler location={location}>{children}</TransitionHandler>
    </CSSTransition>
  </TransitionGroup>
)

export default Main
