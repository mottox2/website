import { Link } from 'gatsby'

import styled from '@emotion/styled'

export default styled(Link)`
  display: inline-block;
  background-color: white;
  border: 1px solid #eee;
  color: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  margin-right: 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    border-color: #ccc;
    color: rgba(0, 0, 0, 0.8);
  }
  &:before {
    content: "#";
  }
`
