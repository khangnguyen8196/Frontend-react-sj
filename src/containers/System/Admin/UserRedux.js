
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingGender: false,
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
            action:'',

            userEditId:''

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
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        // position
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions =this.props.positionRedux
            this.setState({
                positionArr:arrPositions,
                position:arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap :''
            })
        }
        // role
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles =this.props.roleRedux
            this.setState({
                roleArr:arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap :''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0] : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0] : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0] : '',
                avatar:'',
                action: CRUD_ACTION.CREATE,
                previewImgURL:''
            })
        }
    }

    handelOnChangeImage = async(e) => {
       let data = e.target.files;
       let file = data[0]; 
       if (file){
        let base64 = await CommonUtils.getBase64(file);
        let objectUrl =URL.createObjectURL(file);
        this.setState({
            previewImgURL : objectUrl,
            avatar:base64
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

        let {action} = this.state;
        
        if(action === CRUD_ACTION.CREATE){
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTION.EDIT){
            // fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
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

handleEditUserFromParent = (user) => {
    let imageBase64='';
    if( user.image){
        imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({
        email:user.email,
        password:'hardcode',
        firstName:user.firstName,
        lastName:user.lastName,
        phoneNumber:user.phoneNumber,
        address:user.address,
        gender: user.gender,
        position: user.positionId,
        role: user.roleId,
        avatar:'',
        previewImgURL:imageBase64,
        action: CRUD_ACTION.EDIT,
        userEditId: user.id
    })
}
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        
        let {email, password, firstName, lastName, phoneNumber, 
            address, gender, position, role,avatar
        } = this.state;
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
                            <div className="col-12 text-center">{isLoadingGender===true ? 'Loading' :''}</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className="form-control" type='email'
                                    value={email}
                                    onChange ={(e)=> this.onChangeInput(e,'email')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type='password'
                                    value={password}
                                    onChange ={(e)=> this.onChangeInput(e,'password')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
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
                                value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index)=> {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control"
                                 onChange ={(e)=> this.onChangeInput(e,'position')}
                                 value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index)=> {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control"
                                 onChange ={(e)=> this.onChangeInput(e,'role')}
                                 value={role}
                                >
                                    {roles && roles.length > 0 &&
                                            roles.map((item, index)=> {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>
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
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTION.EDIT ?
                                    <FormattedMessage id="manage-user.edit"/>
                                    :
                                    <FormattedMessage id="manage-user.save"/>
                                    }
                                </button>
                            </div>
                            <div className="col-12 my-3">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.setState.action}
                                />
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
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
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
            editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);