import React from 'react';
import './App.css';
import {
    Paper,
    TextField,
    Button,
    IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

import AccessCode from './AccessCode';

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '',
            phoneNumber: '',
            acesssCodeShow: false,
            acesssCode: ''
        };
    }

    _getCode = async() => {
        const e = this.state.code+this.state.phoneNumber;
        await axios.get("http://localhost:8000/validate/CreateNewAccessCode", {
            params: {
                phonenumber: e,
                channel: 'sms'
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    };

    _validateCode = async () => {
        const e = this.state.code+this.state.phoneNumber;
        await axios.get("http://localhost:8000/validate/ValidateAccessCode", {
            params: {
                phonenumber: e,
                code: this.state.acesssCode
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  
    render(){
        return(
            <div className = "App">
                <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60}}>
                    {!this.state.acesssCodeShow ? <h3 style={{marginLeft: 10, color: 'blue'}}>Login Application</h3> : <IconButton onClick={() => {
                        this.setState({acesssCodeShow: false, acesssCode: ''});
                    }} size="small"><ArrowBackIcon /></IconButton>}
                    {!this.state.acesssCodeShow ? <h3>Enter your Phone Number</h3> : <h3>Enter your Access Code</h3> }
                    {this.state.acesssCodeShow ? <p>An Access Code has been sent to your phone number.</p> : null}
                    <div>
                        {!this.state.acesssCodeShow ? <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
                            <div style={{alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10, width: 60}}>
                                <TextField id="code" label="Code" color="secondary" value={this.state.code} onChange={e => {
                                    this.setState({code: e.target.value});
                                }}/>
                            </div>
                            <div>
                                <TextField id="phone" label="Phone" color="secondary" value={this.state.phoneNumber} 
                                onChange={e => {
                                    if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                                        this.setState({phoneNumber: e.target.value});
                                    }
                                }}/>
                            </div>
                        </div> : <AccessCode acesssCode={this.state.acesssCode} setacesssCode={val => this.setState({acesssCode: val})} />}
                        {this.state.acesssCodeShow ? <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
                            Didn't receive an Access Code? <Button onClick={() => this._getCode()} color="primary" style={{textTransform: 'none', fontSize: 15}}>Resend the Access Code</Button>
                        </div> : null }
                        <div className = "ButtonContainer" /*style={{display: 'flex', flexDirection: 'row', marginTop: 20}}*/>
                            <Button 
                                variant="contained" 
                                disabled={(this.state.phoneNumber.length!==10) || (this.state.code===null) || !isNumeric(this.state.phoneNumber) || (this.state.acesssCodeShow && this.state.acesssCode.length!==6)} 
                                color="secondary" 
                                onClick={() => {
                                    if(this.state.acesssCodeShow) {
                                        this._validateCode();
                                    } else {
                                        this._getCode();
                                        this.setState({acesssCodeShow: true});
                                    }
                                }}>
                                Validate
                            </Button>
                        </div>
                        {!this.state.acesssCodeShow ? <p className = "Validating-Sentence">Click Validate to receive an Access Code</p> : null}
                        <div className = "TermsOfService-and-UserAgreement" /*style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}*/>
                            <a href='https://policies.google.com/terms?hl=en-US' style={{textDecoration: 'none', fontSize: 14}}>Terms of service</a>
                            <a href='https://www.linkedin.com/legal/user-agreement' style={{textDecoration: 'none', fontSize: 14, marginLeft: 10}}>User agreement</a>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}