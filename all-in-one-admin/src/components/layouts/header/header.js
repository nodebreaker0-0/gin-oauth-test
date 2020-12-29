
import React from 'react';
import './header.css';
import logo from '../../../assets/favicon.png'
import { NavLink } from 'react-router-dom';
const Web3 = require("web3");

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    ethEnabled() {
        window.web3.eth.getAccounts((err, accounts) => {
            if (err != null) console.error("An error occurred: " + err);
            else if (Number(accounts.length) === 0) {
                console.log("User is not logged in to MetaMask");
                if (window.ethereum) {
                    window.web3 = new Web3(window.ethereum);
                    window.ethereum.enable().then((res) => {
                        window.location.reload()
                    }).catch((e) => {
                        console.log(e)
                    })
                    return true;
                }
                return false;
            } else {
                console.log("User is logged in to MetaMask");
                alert('이미 연결되어있습니다.')
            }
        });

    }

    setConnectionStatusLight() {

    }


    render() {
        return (
            <header className="App-header">

                <img className="App-logo" src={logo} alt="" />
                <div className="link-wrapper">
                    <NavLink className="link" exact to="/" activeStyle={{ borderBottom: "1px solid #ffaf29" }}>DashBoard</NavLink>
                    <NavLink className="link" exact to="/chainlink" activeStyle={{ borderBottom: "1px solid #ffaf29" }}>ChainLink</NavLink>
                </div>
                <button onClick={this.ethEnabled} className="App-header_connect">CONNECT</button>
            </header>
        );
    }
}

export default AppHeader;