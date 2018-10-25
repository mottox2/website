import React from 'react'
import styled from 'styled-components'
import Content from '../components/Content'
import Layout from '../components/Layout'
import { Wrapper } from '../templates/post'

const ContactPage = ({ location }: any) => (
  <Layout location={location}>
    <Wrapper>
      <h1 style={{ fontWeight: 700 }}>お問い合わせ</h1>
      <Content>
        <p>
          ご依頼・お問い合わせなどございましたら、下記よりお気軽にご連絡ください。<br />
          Webサービス・アプリ開発とUIデザイン制作を中心にお役に立つことが出来ると思います。<br />
        </p>
        {/* <h3>得意なこと</h3>
        <ul>
          <li>新規事業立ち上げ</li>
          <li>フロントエンド周りの技術選定・レビュー</li>
          <li>フロントエンドの実装に配慮したUIデザイン</li>
        </ul>
        <h3>技術スタック</h3>
        <p>
          <b>Webエンジニアリング:</b> React(Redux), Vue(Vuex, Nuxt), React Native, TypeScript, Ruby(Ruby on Rails), Python, Go<br/>
          <b>UIデザイン:</b> Sketch, Photoshop, Illustrator
        </p>  */}
      </Content>
      <div style={{ marginTop: 32 }} />
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeybot="bot-field"
        action="/thanks"
      >
        <Hidden>
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
          <input type="hidden" name="form-name" value="contact" />
        </Hidden>
        <FormItem>
          <label>
            名前: <Input type="text" name="name" placeholder="名前" />
          </label>
        </FormItem>
        <FormItem>
          <label>
            メールアドレス:{' '}
            <Input type="email" name="email" placeholder="メールアドレス" />
          </label>
        </FormItem>
        <FormItem>
          <label>
            メッセージ:{' '}
            <Textarea name="message" placeholder="メッセージ" rows={3} />
          </label>
        </FormItem>
        <p>
          <Submit type="submit">送信</Submit>
        </p>
      </form>
    </Wrapper>
  </Layout>
)

const Hidden = styled.div`
  display: none;
`

const FormItem = styled.div`
  margin: 12px 0;

  label {
    font-size: 14px;
  }
`

const Input = styled.input`
  border: 2px solid #ddd;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 4px;
  border-radius: 3px;
`

const Textarea = Input.withComponent('textarea')

const Submit = styled.button`
  background-color: #4d9abf;
  color: white;
  font-weight: bold;
  display: block;
  width: 100%;
  padding: 8px;
  background-image: linear-gradient(45deg, #4d9abf 0, #00c7b7 100%);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: transform 0.15s ease-in, box-shadow 0.15s ease-in;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    transform: translateY(-1px);
  }
`

export default ContactPage
