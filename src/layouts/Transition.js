import React from 'react';
import { css } from 'react-emotion';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const position = css`
  left: 50%;
  position: absolute;
`;

const enter = css`
  opacity: 0.01;
`;

const enterActive = css`
  opacity: 1;
  transition: opacity 150ms ease-in;
`;

const exit = css`
  ${position} opacity: 1;
`;

const exitActive = css`
  ${position} opacity: 0.01;
  transition: opacity 250ms ease-out;
`;

class TransitionHandler extends React.Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname;
  }

  render() {
    return this.props.children;
  }
}

const Main = ({ children, location }) => (
  <TransitionGroup>
    <CSSTransition
      classNames={{ enter, enterActive, exit, exitActive }}
      timeout={{ enter: 200, exit: 200 }}
      key={location.pathname}
    >
      <TransitionHandler location={location}>
        {children}
      </TransitionHandler>
    </CSSTransition>
  </TransitionGroup>
);

export default Main;
