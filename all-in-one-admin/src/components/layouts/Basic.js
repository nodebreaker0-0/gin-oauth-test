import { Component } from 'react';
import styled from 'styled-components';
import { media } from '@style'
import AppHeader from './header/header.js'

class BasicLayout extends Component {

    render() {
        return (
            <Layout>
                <AppHeader />
                {this.props.children}
            </Layout>)
    }
}

const Layout = styled.div`
max-width: 850px;
margin: 0 auto;
padding-top: 60px;
text-align: center;
${media.tablet`
    min-width: 722px;
`}
${media.mobile`
    min-width: 375px;
`}

`

export default BasicLayout