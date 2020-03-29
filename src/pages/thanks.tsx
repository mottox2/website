import React from 'react'
import Content from '../components/Content'
import Layout from '../components/Layout'

import styled from '@emotion/styled'

// FIXME: templatesのWrapperを読もうとするとビルドが失敗する
const Wrapper = styled.div`
  padding: 12px;
  max-width: 42rem;
  margin: 24px auto 48px;
`

const ContactThanksPage = ({ location }: any) => (
  <Layout location={location}>
    <Wrapper>
      <h1
        style={{
          fontWeight: 700,
        }}>
        {' '}
        お問い合わせ{' '}
      </h1>
      <Content>
        {' '}
        <p>
          お問い合わせありがとうございます <br />
          数日以内にお返事いたします。 しばらくお待ち下さい。 <br />
          急ぎの用件でしたらTwitterのDMの方が早いので、
          そちらからも連絡してもらえれば反応します。{' '}
        </p>{' '}
      </Content>{' '}
    </Wrapper>{' '}
  </Layout>
)

export default ContactThanksPage
