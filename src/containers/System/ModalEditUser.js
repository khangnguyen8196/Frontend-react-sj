import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
class ModalEditUser extends Component {

   constructor(props) {
        super(props);
        this.state = {
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
        
   }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user &&  !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email:user.email,
                password:'hardcode',
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
            })
        }

    } 

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] =e.target.value;
        this.setState({
            ...copyState
        })
        
    }
    checkValidInput =() => {
        let isValid = true;
        let arrInput =['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check inside loop',this.state[arrInput[i]], arrInput[i])
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if(isValid === true) {
            //call api create modal
            this.props.editUser(this.state)
        }
    }
    render() {
        return (
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>this.toggle()} 
            className={"modal-user-container"} 
            size="lg"
            >
                <ModalHeader toggle={()=>this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" 
                                onChange={(e) => this.handleOnChangeInput(e, "email")}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" 
                                onChange={(e) => this.handleOnChangeInput(e, "password")} 
                                value={this.state.password}
                                disabled                         
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text" 
                                onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>  
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text" 
                                onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>  
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" 
                                onChange={(e) => this.handleOnChangeInput(e, "address")}
                                value={this.state.address}
                            />
                        </div> 
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className="px-3" 
                    onClick={()=>this.handleSaveUser()}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={()=>this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



    