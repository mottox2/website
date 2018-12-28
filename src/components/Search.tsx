import axios from 'axios'
import { Link } from 'gatsby'
import React from 'react'

import { css } from '@emotion/core'
import styled from '@emotion/styled'

interface Item {
  path: string
  number: number
  title: string
}

interface Props {
  location: any
}

interface State {
  filteredData: Item[]
  isActive: boolean
  query: string
}

export default class Search extends React.Component<Props, State> {
  data: Item[]

  constructor(props: any) {
    super(props)
    this.state = {
      filteredData: [],
      isActive: false,
      query: '',
    }
    this.data = []
  }

  async componentDidMount() {
    const res = await axios.get('/search.json')
    this.data = res.data
  }

  handleInput = e => {
    const query = e.target.value

    const filteredData = this.data.filter(item => {
      return (
        item.path !== this.props.location.pathname &&
        JSON.stringify(item).indexOf(query) > 0
      )
    })

    this.setState({ query, filteredData })
  }

  render() {
    const { query, isActive, filteredData } = this.state
    return (
      <Base>
        <input
          css={input}
          type="text"
          onChange={this.handleInput}
          value={query}
          placeholder="Search Posts"
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
        />
        {isActive && filteredData.length > 0 && (
          <ul>
            {filteredData.map(matchedItem => {
              return (
                <li
                  css={listItem}
                  key={matchedItem.number}
                  onMouseDown={e => e.preventDefault()}
                >
                  <Link to={matchedItem.path}>{matchedItem.title}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </Base>
    )
  }
}

const Base = styled.div`
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  ul {
    position: absolute;
    top: 52px;
    right: 0;
    list-style-type: none;
    background-color: white;
    min-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    border: 1px solid #eee;
    padding: 4px 0;
    border-radius: 4px;
    z-index: 10;
  }
`

const input = css`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.15s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus,
  &:active {
    background-color: white;
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
