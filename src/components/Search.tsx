import axios from 'axios'
import { Link, navigate } from 'gatsby'
import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import { css } from '@emotion/core'
import styled from '@emotion/styled'

interface Item {
  path: string
  number: number
  title: string
  tags: string[]
}

interface Props {
  location: any
}

interface State {
  cursor: number
  filteredData: Item[]
  isActive: boolean
  query: string
}

const keyCodes = {
  DOWN: 40,
  ENTER: 13,
  SLASH: 191,
  UP: 38,
}

export default class Search extends React.Component<Props, State> {
  data: Item[]
  input: React.RefObject<HTMLInputElement>

  constructor(props: any) {
    super(props)
    this.state = {
      cursor: -1,
      filteredData: [],
      isActive: false,
      query: '',
    }
    this.data = []
    this.input = React.createRef()
  }

  async componentDidMount() {
    const res = await axios.get('/search.json')
    this.data = res.data

    window.addEventListener('keydown', e => {
      if (e.keyCode === keyCodes.SLASH && !this.state.isActive) {
        this.focusInput()
        e.preventDefault()
      }
    })
  }

  focusInput = () => {
    if (this.input.current) {
      this.input.current.focus()
    }
  }

  handleInput = e => {
    const rawQuery: string = e.target.value
    const queries = rawQuery
      .trim()
      .toLowerCase()
      .split(' ')

    const filteredData = this.data.filter(item => {
      const itemString = `${item.title} ${item.tags.join('')}`.toLowerCase()
      for (const query of queries) {
        if (!(itemString.indexOf(query) > -1)) {
          return false
        }
      }
      return item.path !== this.props.location.pathname
    })

    this.setState({ query: rawQuery, filteredData, cursor: -1 })
  }

  handleKeyDown = e => {
    const { cursor, filteredData } = this.state
    switch (e.keyCode) {
      case keyCodes.UP:
        this.setState({
          cursor: Math.max(cursor - 1, -1),
        })
        e.preventDefault()
        break
      case keyCodes.DOWN:
        this.setState({
          cursor: Math.min(cursor + 1, filteredData.length - 1),
        })
        e.preventDefault()
        break
      case keyCodes.ENTER:
        if (cursor < 0) {
          return
        }
        const item = filteredData[cursor]
        navigate(item.path)
        break
    }
  }

  render() {
    const { query, isActive, filteredData, cursor } = this.state
    return (
      <Base>
        <input
          css={input}
          type="text"
          onChange={this.handleInput}
          value={query}
          placeholder="Search Posts"
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
          ref={this.input}
        />
        <svg
          onClick={this.focusInput}
          css={icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: isActive ? '#555' : 'white' }}
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <PoseGroup>
          {isActive && query.length > 0 && (
            <Popover key="popover" css={listWrapper}>
              {filteredData.length > 0 ? (
                <ul css={list}>
                  {filteredData.map((matchedItem, index) => {
                    return (
                      <li
                        css={listItem}
                        style={{
                          backgroundColor: cursor === index ? '#eee' : 'white',
                        }}
                        key={matchedItem.number}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <Link
                          to={matchedItem.path}
                          dangerouslySetInnerHTML={{
                            __html: matchedItem.title,
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <ul css={list}>
                  <p css={blankMessage}>結果が見つかりませんでした。</p>
                </ul>
              )}
            </Popover>
          )}
        </PoseGroup>
      </Base>
    )
  }
}

const Base = styled.div`
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  align-items: center;

  display: none;
  @media (min-width: 980px) {
    display: flex;
  }
`

const Popover = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 150 },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 },
    y: 8,
  },
})

const listWrapper = css`
  position: absolute;
  top: 64px;
  right: 0;
  z-index: 10;
  &:before {
    border-color: transparent;
    border-style: solid;
    border-width: 8px;
    border-bottom: 8px solid white;
    content: " ";
    display: block;
    position: absolute;
    top: -15px;
    z-index: 11;
    right: 185px;
    pointer-events: none;
  }
`

const list = css`
  list-style-type: none;
  background-color: white;
  min-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid #eee;
  padding: 4px 0;
  border-radius: 4px;

  /* FIXME: キーボードでスクロールされない */
  z-index: 10;
  max-height: 400px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #fff;
    border-left: solid 1px #ececec;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    box-shadow: inset 0 0 0 2px #fff;
  }
`

const input = css`
  padding: 8px 16px 8px 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.15s;
  outline: none;
  color: rgba(255, 255, 255);
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus,
  &:active {
    background-color: white;
    color: inherit;
    ::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }
  ::placeholder {
    color: rgba(255, 255, 255, 1);
  }
`

const listItem = css`
  border-bottom: 1px solid #eee;
  font-size: 15px;
  &:last-child {
    border-bottom-width: 0;
  }
  > a {
    padding: 6px 12px;
    text-decoration: none;
    color: #333;
    display: block;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`

const blankMessage = css`
  color: #888;
  padding: 12px;
`

const icon = css`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-45%);
  color: white;
  fill: white;
`
