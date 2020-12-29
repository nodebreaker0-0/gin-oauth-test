import { Component } from 'react';
import styled from 'styled-components';
import { size, color, media } from '@style'

import BaseTitleCard from '@card/BaseTitleCard'

class NodeStatusCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cosmosBasedChainHeader: ["MONIKER", "CATCH", "HEIGHT"]
        }
    }

    cellFormat(item) {
        const moniker = <CenterDiv>{item.moniker}</CenterDiv>
        const isCatch = <CenterDiv>{String(item.catching_up)}</CenterDiv>
        const height = <CenterDiv>{item.latest_block_height}</CenterDiv>
        const dataFormat = [moniker, isCatch, height]

        return dataFormat
    }

    rowFormat(Row, item) {

        return styled(Row).attrs((isCatch) => ({
            style: {
                backgroundColor: item.catching_up === false ? '' : item.catching_up === 'Loading' ? color.node_status_background_gray : color.node_status_background_red,
                borderLeft: '4px solid ' + (item.catching_up === false ? color.status_green : item.catching_up === 'Loading' ? color.status_gray : color.status_red),
                fontWeight: item.catching_up !== false ? 700 : 400
            }
        }))``
    }

    createCells(data, Cell) {
        return (
            data.map((item, index) => {
                return <Cell key={index}>{item}</Cell>
            })
        )
    }

    createRows(data, originRow, Cell, cellFormat = undefined, rowFormat = undefined) {
        let rowArray = []

        for (let item in data) {
            let Row = rowFormat(originRow, data[item])
            rowArray.push(<Row isCatch={String(data[item].catching_up)} key={item}>{this.createCells(cellFormat(data[item]), Cell)}</Row>)
        }
        return rowArray

    }

    createButtons(data) {
        if (data) {
            return (data.map((item) => {
                return (
                    <URLButton href={item.url} target="_blank" key={item.url}>{item.name}</URLButton>
                )
            }))
        }
    }



    render() {
        return (
            <BaseTitleCard title={this.props.data.name} isSign={this.props.data.isSign} borderColor={this.props.data.isAllOk ? undefined : color.status_red}>
                <ButtonWrapper>{this.createButtons(this.props.data.relatedPages)}</ButtonWrapper>
                <TableWrapper>
                    <TableHeader>
                        {this.createCells(this.state.cosmosBasedChainHeader, TableCell)}
                    </TableHeader>
                    {this.createRows(this.props.data.nodes, TableRow, TableCell, this.cellFormat, this.rowFormat)}
                </TableWrapper>
            </BaseTitleCard>
        )
    }
}



const TableWrapper = styled.div`
    box-shadow:${color.table_box_shadow};
    max-width: 704px;
    overflow-wrap: break-word;
    margin: 0 auto;

    ${media.tablet`
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        overflow-x: scroll;
    `}
`
const TableHeader = styled.div`
    display: flex;
    min-width: 400px;
    font-weight: bold;
    border-left: 4px solid transparent;
`
const TableRow = styled.div`
    position: relative;
    display: flex;
    min-width: 400px;
    min-height: 36px;
    // white-space: pre;
   
    &:last-child{
        div {
            border-bottom: none;
        }
    }
`
const TableCell = styled.div`
    flex: ${({ flex }) => flex || 3};
    position: relative;
    // max-width: 120px;
    min-width: 100px;
    &:nth-child(2) {
        flex: 1
    }
    &:first-child {
        white-space: break-spaces;
    }
    padding: ${size.base_size_x(2.5)};
    &:not(:last-child) {
        border-right: 1px solid ${color.table_border};
    };
    border-bottom: 1px solid ${color.table_border};
`

const CenterDiv = styled.div`
    ${({ flex }) => flex ? flex : 1};
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
`

const ButtonWrapper = styled.div`
margin-top: -10px;
margin-bottom: 20px;
`
const URLButton = styled.a`
background-color:#fbc241;
display:inline-block;
line-height:32px;
border: none;
width: 110px;
border-radius: 4px;
&:not(:last-child) {
    margin-right:8px;
}
height: 32px;
cursor:pointer;
white-space: pre;
&:hover {
    background-color: #9a4e00;
    color:#fff;
}
`

export default NodeStatusCard