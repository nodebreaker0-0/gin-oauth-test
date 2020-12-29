import { Component } from 'react';
import styled from 'styled-components';
import { size, color } from '@style'
class BaseCard extends Component {

    render() {
        return (
            <Card borderColor={this.props.borderColor}>
                <CardTitle>{this.props.title}
                    <DisplayWrapper isExist={this.props.isSign}>Block Sign : <StatusLight isSign={this.props.isSign} /></DisplayWrapper>
                </CardTitle>
                {this.props.children}
            </Card>
        )
    }
}

const Card = styled.section`
    padding: ${size.base_size_x(5)} ${size.base_size_x(5)} ${size.base_size_x(10)};
    margin: ${size.base_size_x(5)} ${size.base_size_x(3)} ${size.base_size_x(10)};
    background-color: ${color.background};
    border: ${({ borderColor }) => borderColor ? '2px' : '1px'} solid ${({ borderColor }) => borderColor ? borderColor : color.border};
`

const CardTitle = styled.h2`
    margin-bottom: ${size.base_size_x(5)}
`


const DisplayWrapper = styled.div`
display: ${({ isExist }) => isExist !== undefined ? "block" : "none"};
font-size: 16px;
line-height: 24px;
margin-top: 2px;
`

const StatusLight = styled.div`
    background-color: ${({ isSign }) => isSign ? color.status_green : color.status_red};
    box-shadow: ${({ isSign }) => isSign ? color.status_green_box_shadow : color.status_red_box_shadow};
    width:12px;
    height:12px;
    display: inline-block;
    margin: 0 0 -2px 4px;
    border-radius: 50%;
    div {
        display :${({ isSign }) => isSign === 'loading' ? 'none' : 'block'};
        position: absolute;
        top: 0;
        transform: translateX(-3px);
    }
`
export default BaseCard