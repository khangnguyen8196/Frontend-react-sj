import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import {CommonUtils } from '../../../utils';



class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           email:'',
           imgBase64: '',
        }
    }

    async componentDidMount (){
       if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
            })
       }
    }
    async componentDidUpdate (prevProps, prevState, snapshot) {
        if( prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleOnchangeEmail =(e)=> {
        this.setState({
            email: e.target.value,
        })
    }

    handelOnChangeImage = async(e) => {
        let data = e.target.files;
        let file = data[0]; 
        if (file){
         let base64 = await CommonUtils.getBase64(file);
         this.setState({       
            imgBase64:base64
         })
        }
        // console.log(' check file anh',file);
     }

     handleSendRemedy =()=>{
        this.props.sendRemedy(this.state)
     }

    render() {
       
        let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} =this.props;
    
        return (
            <Modal 
            isOpen={isOpenModal} 
            // toggle={()=>this.toggle()} 
            className={"remedy-modal-container"} 
            centered
            size="md"
            >
                <div className="modal-header">
                    <h5 className= "modal-title">Gửi hoá đơn khám bệnh thành công</h5>
                    <button type ="button" className="close" aria-label ="close"
                        onClick= {closeRemedyModal}
                    >
                        <span aria-hidden>x</span>
                    </button>
                </div>
                <ModalBody>
                   <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input type="email" className="form-control" value={this.state.email}
                                onChange ={(e)=> this.handleOnchangeEmail(e)}
                            ></input>
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input type="file" className="form-control-file" 
                                onChange={(e)=> this.handelOnChangeImage(e)}
                            ></input>
                        </div>

                   </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={()=>this.handleSendRemedy()} >Send</Button>{' '}
                    <Button color="secondary" onClick ={closeRemedyModal} >cancel</Button>
                </ModalFooter>
            
            </Modal>
        )
    }
           
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
