import React from 'react';

import {
  animation, Header,  HeaderButton, HeaderSpace, RootView, PageWrapper, BehindLayer,
  RootContainer, ModalContainer, PushContainer , PageContents, LinkButton, CenterContainer
} from './styles'

class ModalPage extends React.Component{

  state = { showed: false }

  componentDidMount(){
    // アニメーションで表示
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
    // アニメーションで表示
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
          <Header><div /><h1>ページ遷移サンプルaa</h1><div /></Header>
          <PageContents>
            <CenterContainer>
              <div>
                {/* 戻ってきた時に分かりやすいようにフォーカスを残す */}
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
