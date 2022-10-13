import { add } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false,

            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender: '',
            position:'',
            role:'',
            avatar:'',

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res =await getAllCodeService('gender')
        //     if(res && res.errCode ===0){
        //         this.setState({
        //             genderArr:res.data
        //         })
        //     }
        // }catch(e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevStave, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr:arrGenders,
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        // position
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions =this.props.positionRedux
            this.setState({
                positionArr:arrPositions,
                position:arrPositions && arrPositions.length > 0 ? arrPositions[0].key :''
            })
        }
        // role
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles =this.props.roleRedux
            this.setState({
                roleArr:arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key :''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender: '',
                position:'',
                role:'',
                avatar:'',
            })
        }
    }

    handelOnChangeImage = (e) => {
       let data = e.target.files;
       let file = data[0]; 
       if (file){
        let objectUrl =URL.createObjectURL(file);
        this.setState({
            previewImgURL : objectUrl,
            avatar:file
        })
       }
       console.log(' check file anh',file);
    }
    openPreviewImage =()=> {
        if(!this.state.previewImgURL){
            return;
        }
        this.setState({
            isOpen : true
        })
    }

    handleSaveUser =() => {
        let isValid= this.checkValidInput()
        if(isValid === false) return;
        
        // fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
    }

    checkValidInput =() =>{
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 
            'address']
            for (let i = 0; i < arrCheck.length; i++){
                if(!this.state[arrCheck[i]]){
                    isValid = false;
                    alert(' this input is required:' +arrCheck[i]);
                    break;
                }
            }
            return isValid;
    }

    onChangeInput = (e, id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
       
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        
        let {email, password, firstName, lastName, phoneNumber, 
            address, gender, position, role, avatar
        }= this.state;
        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux with me
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                               <FormattedMessage id="manage-user.add"/>
                            </div>
                            <div className="col-12 text-center">{isLoadingGender===true ? 'Loading' :""}</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className="form-control" type='email'
                                    value={email}
                                    onChange ={(e)=> this.onChangeInput(e,'email')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type='password'
                                    value={password}
                                    onChange ={(e)=> this.onChangeInput(e,'password')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input className="form-control" type='text'
                                value={firstName}
                                onChange ={(e)=> this.onChangeInput(e,'firstName')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input className="form-control" type='text'
                                value={lastName}
                                onChange ={(e)=> this.onChangeInput(e,'lastName')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input className="form-control" type='text'
                                value={phoneNumber}
                                onChange ={(e)=> this.onChangeInput(e,'phoneNumber')}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className="form-control" type='text'
                                value={address}
                                onChange ={(e)=> this.onChangeInput(e,'address')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control"
                               
                                onChange ={(e)=> this.onChangeInput(e,'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index)=> {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control"
                                 onChange ={(e)=> this.onChangeInput(e,'position')}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index)=> {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control"
                                 onChange ={(e)=> this.onChangeInput(e,'role')}
                                >
                                    {roles && roles.length > 0 &&
                                            roles.map((item, index)=> {
                                                return (
                                                    <option key={index} value={item.key}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        
                                        }
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image"/></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type='file' hidden 
                                    onChange ={(e)=> this.handelOnChangeImage(e)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                        onClick ={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id="manage-user.save"/></button>
                            </div>
                            <div className="col-12 my-3">
                                <TableManageUser/>
                            </div>
                        </div>
                    </div>
                </div>
               
                {this.state.isOpen === true &&
                <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={()=> this.setState({isOpen:false})}
                />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
            getGenderStart: () => dispatch(actions.fetchGenderStart()),
            getPositionStart: () => dispatch(actions.fetchPositionStart()),
            getRoleStart: () => dispatch(actions.fetchRoleStart()),
            createNewUser: (data) => dispatch(actions.createNewUser(data)),
            fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
