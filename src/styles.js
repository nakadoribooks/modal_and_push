import React from 'react';
import styled from 'styled-components';

const sizes = {
  headerHeight: 72
}

// だいたいこのくらい
const animation = {
  page: {
    duration: 600,
    ease: 'cubic-bezier(.17,.71,0,1)'
  },
}
animation.page.transition = `transform ${animation.page.duration}ms ${animation.page.ease}, opacity ${animation.page.duration}ms ${animation.page.ease}`

const colors = {
  primary: "#3880ff",
  secondary: "#0cd1e8",
  border: "#eeeeee",
  white: "#ffffff",
  black: "#000000",
}

const Header = styled.div`
  width: 100%;
  padding:0px 20px;
  position:absolute;
  height: ${sizes.headerHeight}px;
  border-bottom:1px solid ${colors.border};
  background-color:${colors.white};
  padding-top:1px;
  justify-content:space-between;
  display:flex;
  align-items:center;
  box-shadow: 0 2px 2px rgba(200,200,200,.1);

  h1{
    font-size:20px;
  }
`

const HeaderButton = styled.a`
  display:inline-block;
  height:40px;
  font-size:14px;
  line-height:38px;
  border: 1px solid ${colors.primary};
  border-radius:5px;
  color:${colors.primary};
  padding:0px 20px;
  min-width: 100px;
  text-align:center;
  cursor:pointer;
  :hover{
    background-color:${colors.primary};
    color:${colors.white};
  }
`
const HeaderSpace = styled.div`
  width:100px;
`

const RootView = styled.div``

const PageWrapper = styled.div`
  position:fixed;
  top:0px;left:0px;right:0px;bottom:0px;
`

// 後ろにある半透明の黒
const BehindLayer = styled.div`
  background-color:${colors.black};
  opacity: 0;
  position:absolute;
  top:0px;left:0px;right:0px;bottom:0px;
  transition: opacity ${animation.page.duration}ms ease;
  ${(props)=>props.showed && `
    opacity:0.3;
  `}
`

const PageContainer = styled.div`
  height:100%;
  position:relative;
  top:0px;
  transition: ${animation.page.transition};
`

const RootContainer = styled(PageContainer)`

  /* 上にモーダルきた時に少しちっさくなるやつ */
  ${props=>props.modaling && `
    transform: scale(0.99)
  `}

  /* プッシュされた時につこし左に行くやつ */
  ${props=>props.pushing && `
    transform: translateX(-10vh)
  `}
`

const ModalContainer = styled(PageContainer)`
  transform: translateY(100vh);
  ${props=>props.showed && `
    transform: translateY(0vh);
  `}
`

const PushContainer = styled(PageContainer)`
  transform: translateX(50vh);
  opacity: 0;
  ${props=>props.showed && `
    opacity: 1.0;
    transform: translateX(0vh);
  `}
`

const PageContents = styled.div`
  height:calc(100vh - ${sizes.headerHeight}px);
  position:relative;
  top:${sizes.headerHeight}px;
  overflow-y:scroll;
  background-color:${colors.white};
`

const LinkButton = styled.p`
  text-align:center;
  a{
    display:inline-block;
    padding:10px 20px;
    border-radius: 10px;
    border: 1px solid ${colors.border};
    cursor:pointer;
    transition: background-color 300ms ease, transform 300ms ease;
    :hover{
      opacity: 0.7;
    }
  } 

  /* フォーカス残るよう */
  ${props=>props.focus && `
    a{
      background-color:${colors.border};
      transofrm:scale(0.99);
    }
  `}
`

const CenterContainer = styled.div`
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export {
    animation, Header,  HeaderButton, HeaderSpace, RootView, PageWrapper, BehindLayer,
    RootContainer, ModalContainer, PushContainer , PageContents, LinkButton, CenterContainer
}