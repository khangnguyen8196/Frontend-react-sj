import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { LANGUAGES } from '../../../../utils';
import {postPatientBookAppointment} from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender:'',
            doctorId:'',
            genders: '',
            timeType: '',
        }
    }

    async componentDidMount (){
       this.props.getGenders()
    }

    buildDataGender = (data)=> {
        let result = [];
        let language = this.props.language;
        if(data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot)  {
        if(this.props.language !== prevProps.language){
            this.setState({
                genders:this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders) {
            this.setState({
                genders:this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType:timeType
                })
            }
        }
    }
   
    handleOnchangeInput =(e, id)=> {
        let valueInput = e.target.value;
        let stateCopy ={...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDataPicker = (date) => {
        this.setState({
            birthday:date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender:selectedOption })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        let {language} = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? 
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
            this.capitalizeFirstLetter (moment.unix(+dataTime.date/1000).format('dddd - DD/MM/YYYY'))  
            :
            moment.unix(+dataTime.date/1000).locale('en').format('dddd - DD/MM/YYYY');  

            return `${time} - ${date}`          
        }
        return '';
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? 
            `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            :
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;          
        }
        return '';
    }

    checkValidInput =() =>{
            let isValid = true;
            let arrCheck = ['fullName', 'phoneNumber', 'email', 'address', 'reason', 
                'selectedGender']
                for (let i = 0; i < arrCheck.length; i++){
                    if(!this.state[arrCheck[i]]){
                        isValid = false;
                        alert(' this input is required:' +arrCheck[i]);
                        break;
                    }
                }
                return isValid;
        }

    handleConfirmBooking = async() => {
        
        let isValid= this.checkValidInput()
        if(isValid === false) return;
        let timeString =this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientBookAppointment({
            
            fullName:this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address:this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday:date,
            selectedGender:this.state.selectedGender.value,
            doctorId:this.state.doctorId,
            timeType:this.state.timeType,
            language:this.props.language,
            timeString:timeString,
            doctorName:doctorName,
           
        })
        if (res && res.errCode === 0){
            toast.success('Booking a new appointment succeed')
            this.props.closeBookingClose();
        }else {
            toast.error('Booking a new appointment fail')
        }
        // console.log( ' check state inside booking modal:', this.state)
    }
    render() {
       
        let {isOpenModal, closeBookingClose, dataTime} =this.props;
        let doctorId =''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId;
        }
    //   let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        // console.log (' check datatime:', dataTime)
        return (
            <Modal 
            isOpen={isOpenModal} 
            // toggle={()=>this.toggle()} 
            className={"booking-modal-container"} 
            centered
            size="lg"
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span className="right"
                            onClick ={closeBookingClose}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                            doctorId= {doctorId}
                            isShowDescriptionDoctor={false}
                            isShowPrice={true}
                            isShowLinkDetail={false}
                            dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className="form-control"
                                    value ={this.state.fullName}
                                    onChange= {(e)=> this.handleOnchangeInput(e, 'fullName')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className="form-control"
                                    value ={this.state.phoneNumber}
                                    onChange= {(e)=> this.handleOnchangeInput(e, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className="form-control"
                                    value ={this.state.email}
                                    onChange= {(e)=> this.handleOnchangeInput(e, 'email')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className="form-control"
                                    value ={this.state.address}
                                    onChange= {(e)=> this.handleOnchangeInput(e, 'address')}
                                ></input>
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className="form-control"
                                    value ={this.state.reason}
                                    onChange= {(e)=> this.handleOnchangeInput(e, 'reason')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                               <DatePicker
                                    className="form-control"
                                    value ={this.state.birthday}
                                    onChange= {this.handleOnchangeDataPicker}
                               />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                            onClick ={()=>this.handleConfirmBooking()}
                            
                        >
                            <FormattedMessage id="patient.booking-modal.btn-confirm" />
                        </button>

                        <button className="btn-booking-cancel"
                            onClick ={closeBookingClose}
                        >
                           <FormattedMessage id="patient.booking-modal.btn-cancel" />
                        </button>
                    </div>
                </div>
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
        getGenders: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
