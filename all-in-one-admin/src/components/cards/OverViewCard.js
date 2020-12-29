import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { size, color, media } from '@style'

import BaseTitleCard from '@card/BaseTitleCard'

class OverViewCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            overViewHeader: ['NETWORK', 'STATUS', 'BALANCE', 'GOV', 'VOTE'],
        }
    }

    cellDataFormat(item) {
        const name = <CenterDiv><a href={'#' + item.name}>{item.name}</a></CenterDiv>
        const status = <CenterDiv><StatusLight error={item.error} ><div>⏳</div></StatusLight></CenterDiv>
        const balance = <CenterDiv>-</CenterDiv>
        const gov = <CenterDiv>-</CenterDiv>
        const vote = <CenterDiv>-</CenterDiv>

        const dataFormat = [name, status, balance, gov, vote]

        return dataFormat

        // const balance = <CenterDiv>Balance : {item.balanceInfo.balance}<br />Profit : {item.balanceInfo.profit}</CenterDiv>
        // const gov = <CenterDiv>{item.gov}</CenterDiv>
        // const vote = <CenterDiv>{item.vote}</CenterDiv>
    }

    createCells(data, Cell) {
        return (
            data.map((item, index) => {
                return <Cell key={index}>{item}</Cell>
            })
        )
    }

    createRows(data, Row, Cell, cellFormat) {
        let rowArray = []

        for (let item in data) {
            rowArray.push(<Row isCatch={data[item].isCatch} key={item}>{this.createCells(cellFormat(data[item]), Cell)}</Row>)
        }

        return rowArray
    }

    render() {
        return (
            <BaseTitleCard title={'Network Overview'}>
                <TableWrapper>
                    <TableHeader>
                        {this.createCells(this.state.overViewHeader, TableCell)}
                    </TableHeader>
                    {this.createRows(this.props.data.networks, TableRow, TableCell, this.cellDataFormat)}
                </TableWrapper>
            </BaseTitleCard>
        )
    }
}

const TableWrapper = styled.div`
    box-shadow:${color.table_box_shadow};
    overflow-wrap: break-word;
    max-width: 704px;
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
`
const TableRow = styled.div`
    position: relative;
    display: flex;
    min-width: 375px;
    min-height: 36px;
    &:not(:first-child) {
        // border-top: 1px solid ${color.table_border};
    }
    &:last-child{
        div {
            border-bottom: none;
        }
    }
`
const TableCell = styled.div`
    flex: ${({ flex }) => flex || 1};
    // max-width: 120px;
    min-width: 102px;
    padding: ${size.base_size_x(2.5)};
    &:not(:last-child) {
        border-right: 1px solid ${color.table_border};
    };
    border-bottom: 1px solid ${color.table_border};
`
const StatusLight = styled.div`
    background-color: ${({ error }) => error ? (error === 'loading' ? '' : color.status_red) : color.status_green};
    box-shadow: ${({ error }) => error ? (error === 'loading' ? '' : color.status_red_box_shadow) : color.status_green_box_shadow};
    width:12px;
    height:12px;
    display: inline-block;
    margin : 0 auto;
    border-radius: 50%;
    div {
        display :${({ error }) => error === 'loading' ? 'block' : 'none'};
        position: absolute;
        top: 0;
        transform: translateX(-3px);
    }
`
const CenterDiv = styled.div`
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
`

export default React.memo(OverViewCard)