import React from 'react';
import styled from 'styled-components';

const sizes = {
  headerHeight: 72
}

const animation = {
  page: {
    duration: 600,
    ease: 'cubic-bezier(.17,.71,0,1)'
  },
}
animation.page.transition = `transform ${animation.page.duration}ms ${animation.page.ease}, opacity ${animation.page.duration}ms ${animation.page.ease}`

const colors = {
  primary: "#3880ff",
  secondary: "#0cd1e8	",
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

const RootView = styled.div`

`

const PageWrapper = styled.div`
  position:fixed;
  top:0px;left:0px;right:0px;bottom:0px;
`

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
  ${props=>props.modaling && `
    transform: scale(0.99)
  `}

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
      transform: scale()(0.90);
    }
  } 

  ${props=>props.focus && `
    a{
      background-color:${colors.border};
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

class ModalPage extends React.Component{

  state = { showed: false }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({showed: true})
    }, 10)
  }

  render = () =>{
    const {showed} = this.state

      return <PageWrapper>
        <BehindLayer showed={showed} />
      <ModalContainer showed={showed}>
        <Header>
          <HeaderButton onClick={this.handleClickClose}>閉じる</HeaderButton>
            <h1>モーダル</h1>
          <HeaderSpace />
        </Header>
        <PageContents>
          <CenterContainer>
            <h1>モーダル</h1>
          </CenterContainer>
          </PageContents>
        </ModalContainer>
      </PageWrapper>
  }

  handleClickClose = (event) => {
    this.setState({showed: false})
    this.props.onClose()  
  }
}

class PushPage extends React.Component{

  state = { showed: false }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({showed: true})
    }, 10)
  }

  render = () =>{
    const {showed} = this.state

      return <PageWrapper>
        <BehindLayer showed={showed} />
      <PushContainer showed={showed}>
        <Header>
          <HeaderButton onClick={this.handleClickClose}>戻る</HeaderButton>
            <h1>プッシュ</h1>
          <HeaderSpace />
        </Header>
        <PageContents>
          <CenterContainer>
            <h1>プッシュ</h1>
          </CenterContainer>
          </PageContents>
        </PushContainer>
      </PageWrapper>
  }

  handleClickClose = (event) => {
    this.setState({showed: false})
    this.props.onBack()  
  }
}

class App extends React.Component{

  state = {
    pushing: false,
    modaling: false,
    showingModal: false,
    showingPush: false
  }

  render = () => {

    const {modaling, pushing, showingModal, showingPush} = this.state

    return <RootView>
      <PageWrapper>
        <RootContainer modaling={modaling} pushing={pushing}>
          <Header><div /><h1>ページ遷移サンプル</h1><div /></Header>
          <PageContents>
            <CenterContainer>
              <div>
                <LinkButton focus={showingModal}><a onClick={this.handleClickModal}>モーダル</a></LinkButton>
                <LinkButton focus={showingPush}><a onClick={this.handleClickPush}>プッシュ</a></LinkButton>
              </div>
            </CenterContainer>
          </PageContents>
        </RootContainer>
      </PageWrapper>

      {showingModal && <ModalPage onClose={this.handleCloseModal} />}
      {showingPush && <PushPage onBack={this.handleBackPush} />}
      
    </RootView>
  }

  handleClickModal = (event) => {
    this.setState({modaling: true, showingModal:true})
  }

  handleClickPush = (event) => {
    this.setState({pushing: true, showingPush: true})
  }

  handleCloseModal = (event) => {
    this.setState({
      modaling: false
    })

    setTimeout(()=>{
      this.setState({showingModal: false})
    }, animation.page.duration)
  }

  handleBackPush = (event) => {
    this.setState({pushing: false})
    setTimeout(()=>{
      this.setState({showingPush: false})
    }, animation.page.duration)
  }
}

export default App;
