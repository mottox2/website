import React from 'react'
import Content from '../components/Content';
import { Wrapper } from '../templates/PostTemplate';
import styled from 'styled-components'

const ContactPage = () => (
  <Wrapper>
    <h1 style={{fontWeight: 600}}>お問い合わせ</h1>
    <Content>
      <p>
        ご依頼・お問い合わせなどございましたら、下記よりお気軽にご連絡ください。
        Webサービス・アプリ開発とUIデザイン制作を中心にお役に立つことが出来ます。
        常駐などの拘束されるお仕事は基本お断りしています。
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
    <div style={{marginTop: 32}}/>
    <form name="contact" method="POST" data-netlify="true" data-netlify-honeybot="bot-field" action='/'>
      <Hidden>
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </Hidden>
      <p>
        <label>Your Name: <input type="text" name="name" /></label>   
      </p>
      <p>
        <label>Your Email: <input type="email" name="email" /></label>
      </p>
      <p>
        <label>Message: <textarea name="message"></textarea></label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </Wrapper>
)

const Hidden = styled.div`
  display: none;
`

export default ContactPage
