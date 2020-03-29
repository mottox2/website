import axios from 'axios'
import { Link, navigate } from 'gatsby'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  style: React.CSSProperties
  className: string
  isMobileShow: boolean
}

const keyCodes = {
  DOWN: 40,
  ENTER: 13,
  SLASH: 191,
  UP: 38,
}

const listWrapper = css`
  position: absolute;
  top: 44px;
  right: 0;
  z-index: 10;
  &:before {
    border-color: transparent;
    border-style: solid;
    border-width: 8px;
    border-bottom: 8px solid white;
    content: ' ';
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
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid #eee;
  padding: 4px 0;
  border-radius: 4px;

  @media screen and (min-width: 600px) {
    min-width: 400px;
  }

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

  /* for mobile */
  height: 34px;
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

const usePrevious = (value: any) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const filterPosts = (posts: any[], rawQuery: string, pathname: string) => {
  const queries = rawQuery.trim().toLowerCase().split(' ')

  return posts.filter((item) => {
    const itemString = `${item.title} ${item.tags.join('')}`.toLowerCase()
    for (const query of queries) {
      if (!(itemString.indexOf(query) > -1)) {
        return false
      }
    }
    return item.path !== pathname
  })
}

const variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  invisible: {
    opacity: 0,
    y: 8,
  },
}

const Search: React.FC<Props> = (props: any) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [cursor, updateCursor] = useState(-1)
  const [isActive, updateIsActive] = useState(false)
  const [query, updateQuery] = useState('')
  const [posts, updatePosts] = useState<Item[]>([])

  const prevMobileShow = usePrevious(props.isMobileShow)
  if (prevMobileShow !== props.isMobileShow && inputEl.current) {
    window.setTimeout(() => {
      inputEl.current.focus()
    }, 10)
  }

  useEffect(() => {
    axios.get('/search.json').then((res) => {
      updatePosts(res.data)
    })
    return undefined
  }, [])

  useEffect(() => {
    const focusShortcut = (e: KeyboardEvent) => {
      if (e.keyCode === keyCodes.SLASH && !isActive) {
        inputEl.current.focus()
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', focusShortcut)
    return () => {
      window.removeEventListener('keydown', focusShortcut)
    }
  })

  const pathname = props.location.pathname
  const filteredPosts = useMemo(() => filterPosts(posts, query, pathname), [
    posts,
    query,
    pathname,
  ])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value)
    if (cursor !== -1) {
      updateCursor(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case keyCodes.UP:
        updateCursor(Math.max(cursor - 1, -1))
        e.preventDefault()
        break
      case keyCodes.DOWN:
        updateCursor(Math.min(cursor + 1, filteredPosts.length - 1))
        e.preventDefault()
        break
      case keyCodes.ENTER:
        if (cursor < 0) {
          return
        }
        navigate(filteredPosts[cursor].path)
        break
    }
  }

  return (
    <Base className={props.className} style={props.style}>
      <input
        css={input}
        type="text"
        onChange={handleInput}
        value={query}
        placeholder="Search Posts"
        onKeyDown={handleKeyDown}
        onFocus={() => updateIsActive(true)}
        onBlur={() => updateIsActive(false)}
        ref={inputEl}
      />
      <svg
        onClick={() => inputEl.current && inputEl.current.focus()}
        css={icon}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: isActive ? '#555' : 'white' }}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <AnimatePresence>
        {isActive && query.length > 0 && (
          <motion.div
            key="popover"
            css={listWrapper}
            variants={variants}
            initial="invisible"
            animate="visible"
            exit="invisible"
            transition={{ duration: 0.15 }}>
            {filteredPosts.length > 0 ? (
              <ul css={list}>
                {filteredPosts.map((matchedItem, index) => {
                  return (
                    <li
                      css={listItem}
                      style={{
                        backgroundColor: cursor === index ? '#eee' : 'white',
                      }}
                      key={matchedItem.number}
                      onMouseDown={(e) => e.preventDefault()}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </Base>
  )
}

export default React.memo(Search)

const Base = styled.div`
  margin-left: auto;
  align-items: center;
  position: relative;
`
