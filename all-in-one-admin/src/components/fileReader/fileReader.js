import React from 'react';
import './fileReader.css';
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
let currentProviderAddress = null

web3.eth.getAccounts((error,result) => {
  if (error) {
      console.log(error);
  } else {
    currentProviderAddress = String(result[0]);
    console.log('currentProviderAddress', currentProviderAddress)
  }
})

class AddressFileReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFile : false,
      addressData: null,
      modifiedAddressData: null,
      contractAbi: [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawPayment",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                }
            ],
            "name": "withdrawablePayment",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    };
    this.queryRewards = this.queryRewards.bind(this)
    this.withdrawRewards = this.withdrawRewards.bind(this)
  }

  addressFileUpload() {
    document.getElementById('fileid').click()
    // web3.eth.getGasPrice(function(error, result) {
    //   console.log(result.toString(10));
     
    // });
  }
  
  readAddressFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      console.log(e.target.result)
      this.setState({
        isFile: true,
        addressData: e.target.result,
      })
    }
    reader.readAsText(file);
  }

  modifyAddressData() {
    const data = this.state.addressData
    let dataArray = data.split(',')
    const oracle = dataArray.shift().split(':')[1]

    const addresses = dataArray.map((item, index) => {
      return (
      <div key={index} className="Address-list_index">
        <div className="Address-list_index__pair">{item.split(':')[0]}</div>
        <div className="Address-list_index__address">{item.split(':')[1]}</div>
        <div className="Address-list_index__reward" id={'reward_'+ index}><span role="img" aria-label="Question">❓</span> </div>
      </div>
      )
    })

    console.log(addresses)

    return (
    <section className="Address-list">
      <div className="Address-list_oracle"><span>MY ORACLE ADDRESS : </span>{oracle}</div>
      <div className="Address-list_index" style={{backgroundColor:'#ffc35245', fontWeight:'bold'}}>
        <div className="Address-list_index__pair">PAIR</div>
        <div className="Address-list_index__address">ADDRESS</div>
        <div className="Address-list_index__reward">REWARD</div>
      </div>
      <div className="Address-list_pair">{addresses}</div>
      <div className="Address-list_total" id="Address-list_total">TOTAL : </div>
    </section>
    )
  }

  queryRewards() {
    let totalReward = 0   
    let promiseTracker = [] 
    const oracleAddress = this.state.addressData.split(',')[0].split(':')[1]
    const addressData = this.state.addressData.split(',').slice(1)
    
    addressData.forEach((item, index) => {
      const oracleContract = new web3.eth.Contract(this.state.contractAbi, item.split(':')[1].trim())
      const queryingOracleContract = oracleContract.methods.withdrawablePayment(oracleAddress).call().then((res) => {
      let reward =  Number(res)/1000000000000000000    
      
      document.getElementById('reward_' + index).innerText = reward
      totalReward += reward
      console.log(`${item.split(':')[0].trim()} : ${res}`)
      })
      
      promiseTracker.push(queryingOracleContract)
      return ''
    })
    Promise.all(promiseTracker).then((res) => {
      console.log(`TOTAL REWARD : ${totalReward}`)
      document.getElementById('Address-list_total').innerText = `TOTAL : ${totalReward.toFixed(2)} LINK`
    })
  }

  withdrawRewards() {
    const oracleAddress = this.state.addressData.split(',')[0].split(':')[1]
    const addressData = this.state.addressData.split(',').slice(1)
    console.log(web3.eth.getGasPrice().then((res) => {console.log('이더가스 가격', res)}))
    
    if(currentProviderAddress === 'undefined') {
      alert('메타마스크를 연결해주세요!')
      return
    }
    
    let batch = new web3.eth.BatchRequest()
    addressData.forEach((item, index) => {
      const oracleContract = new web3.eth.Contract(this.state.contractAbi, item.split(':')[1].trim())
      // oracleContract.methods.withdrawPayment(oracleAddress, getAccounts(), 100000).call().then((res) => {
      //   console.log(res)
      // }).catch((e) => {
      //   console.log(e)
      // })
    //  oracleContract.methods.withdrawPayment(oracleAddress, currentProviderAddress, '1000000000000000000').estimateGas({'to' : item }).then((res) => {
    //    console.log(res)
    //  }).catch((e) => {
    //    console.log(e)
    //  })

    //  oracleContract.methods.withdrawPayment(oracleAddress, currentProviderAddress, '10000000000000000').send({'from': currentProviderAddress, 'gas':12493680, 'gasPrice': 38850}).then((res) => {
    //   console.log(res)
    // }).catch((e) => {
    //   console.log(e)
    // })
    
    batch.add(oracleContract.methods.withdrawPayment(oracleAddress, currentProviderAddress, '10000000000000000').send.request({'from': currentProviderAddress, 'gas':12493680, 'gasPrice': 388500},function(res) { console.log(res)}))
    
    return '';
  })
  batch.execute()
}
  

  setWeb3FunctionButtons() {
    if(this.state.isFile) {
      return(
        <span>
        <button onClick={this.queryRewards} className="File-button_query u-boxshadow"><span role="img" aria-label="Query">🔍 </span> QUERY</button>
        <button onClick={this.withdrawRewards} className="File-button_withdraw u-boxshadow"><span role="img" aria-label="Withdraw">💰 </span> WITHDRAW</button>
        </span>
      )
    }
  }

  render() {
    return (
      <section className="File-upload">
        <div className="File-upload_infotext">{ this.state.isFile ? this.modifyAddressData() : '주소파일을 업로드해주세요'}</div>
        <input id='fileid' type='file' onChange={this.readAddressFile} hidden/>
        <button onClick={this.addressFileUpload} className="File-button_upload u-boxshadow"><span role="img" aria-label="Query">📔 </span> UPLOAD</button>
        {this.setWeb3FunctionButtons()}
      </section>
    );
  }
}

export default AddressFileReader;