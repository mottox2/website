import React from 'react'

import styled from '@emotion/styled'

const Profile = () => {
  return (
    <Base>
      <div className="heading">
        <img
          className="avatar"
          src="https://img.esa.io/uploads/production/teams/6967/icon/thumb_ms_fec180ecca810585b0ad19eb60c24fcc.jpg"
          alt="mottox2"
        />
        <div className="nameArea">
          <h3 className="name">@mottox2</h3>
          <p className="role">WEBエンジニア</p>
        </div>
      </div>
      <div className="description">
        都内でフリーランスエンジニア・デザイナーとしてWebサービスやスマホアプリを作っています。
        <br />
        新規事業の爆速立ち上げや、使いやすいSPAの開発が得意です。
      </div>
    </Base>
  )
}

const Base = styled.div`
  > .heading {
    display: flex;
    align-items: center;
    > .avatar {
      height: 42px;
      width: 42px;
      margin-right: 8px;
      border-radius: 21px;
    }

    > .nameArea {
      > .name {
        font-size: 16px;
        color: #30627a;
        letter-spacing: 0.5px;
      }

      > .role {
        margin-top: 1px;
        font-size: 12px;
        letter-spacing: 0.5px;
      }
    }
  }

  > .description {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 8px;
    line-height: 1.7;
  }
`

export default Profile
