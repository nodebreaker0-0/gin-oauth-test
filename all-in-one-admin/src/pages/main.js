import React, { Component } from 'react';
import styled from 'styled-components';
import OverViewCard from '@card/OverViewCard'
import NodeStatusCard from '@card/NodeStatusCard'
import LoadingDots from '@animation/loading'
import '@config/proto3'

import { connect } from 'react-redux';
import * as actions from '../store/actions/_networkStatus';
import { getIntervalChainData } from '@util/dataHandlers'

class Main extends Component {

    componentDidMount() {
        getIntervalChainData(this.props.setNetworksData)
    }

    createNodeStatusCard(data) {
        let nodeStatusCardArray = []
        for (let item in data) {
            nodeStatusCardArray.push((<NodeStatusCard key={item} data={data[item]} />))
        }
        return nodeStatusCardArray
    }

    MainTableConditionalRender(data) {
        if (true) {
            return (
                [<OverViewCard data={data.main.overview} key={1} />,
                this.createNodeStatusCard(data.main.nodeStatus)]
            )
        } else {
            return (
                <Loading><div>Loading</div><LoadingDots /></Loading>
            )
        }
    }

    render() {
        const { networksData } = this.props;
        return (
            <MainWrapper>
                {this.MainTableConditionalRender(networksData)}
            </MainWrapper>
        )
    }

}

const MainWrapper = styled.div``

const Loading = styled.div`
    text-align:center;
    height: 200px;
    width: 200px;
    line-height: 60px;
    margin: 120px auto 0;
    font-size: 24px;
`

const mapStateToProps = (state) => ({
    networksData: state.networkStatus.networksData,
});

const mapDispatchToProps = (dispatch) => ({
    setNetworksData: (data) => dispatch(actions.setNetworksData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);