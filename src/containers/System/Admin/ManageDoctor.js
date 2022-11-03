import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import {getDetailInforDoctorService} from '../../../services/userService';




const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

   constructor(props){
    super(props);
    this.state={
        // save ti Markdown table
           contentMarkdown:'',
           contentHTML:'',
           selectedOption:'',
           description:'',
           listDoctors:[],
           hasOldData:false,

        // save ti doctor_infor table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            listClinic:[],
            listSpecialty:[],

            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectedClinic:'',
            selectedSpecialty:'',
            nameClinic:'',
            addressClinic:'',
            note:'',
            clinicId:'',
            specialtyId:'',


        } 
   }

   componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
   }
   buildDataInputSelect = (inputData, type) => {
    let result =[];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
        if( type ==='USERS'){
            inputData.map((item, index) => {
                let object ={};
                let labelVi =`${item.lastName} ${item.firstName}`;
                let labelEn =`${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        if (type === 'PRICE' ){
            inputData.map((item, index) => {
                let object ={};
                let labelVi =`${item.valueVi}`;
                let labelEn =`${item.valueEn} USD`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        if(type === 'PAYMENT' || type === 'PROVINCE'){
            inputData.map((item, index) => {
                let object ={};
                let labelVi =`${item.valueVi}`;
                let labelEn =`${item.valueEn}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.keyMap;
                result.push(object);
            }) 
        }
        if(type ==='SPECIALTY'){
            inputData.map((item, index) => {
                let object ={};
                let labelVi =`${item.name}`;
                let labelEn =`${item.name}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        
    }
    return result;
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince, resSpecialty}= this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

           
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
                listSpecialty:dataSelectSpecialty
            })
        }
        if (prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let {resPayment, resPrice, resProvince,resSpecialty}= this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                listDoctors: dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince,
                listSpecialty:dataSelectSpecialty
            })
        }
   }

    handleEditorChange=({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note,
            specialtyId:this.state.selectedSpecialty.value,
            clinicId:this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value :''
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let {listPayment, listPrice, listProvince, listSpecialty} = this.state;
        let res = await getDetailInforDoctorService(selectedOption.value)
        if (res && res.errCode ===0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic ='', nameClinic = '', note = '', paymentId = '',
            priceId ='', provinceId = '', specialtyId ='', selectedPayment = '', selectedPrice = '',
            selectedProvince = '', selectedSpecialty ='';

            if (res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note =res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;

                selectedPayment = listPayment.find(item =>{
                    return item && item.value === paymentId 
                })
                selectedPrice = listPrice.find(item =>{
                    return item && item.value === priceId 
                })
                selectedProvince = listProvince.find(item =>{
                    return item && item.value === provinceId 
                })
                selectedSpecialty = listSpecialty.find(item =>{
                    return item && item.value === specialtyId
                })
                
                
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic:addressClinic,
                nameClinic:nameClinic,
                note:note,
                selectedPayment:selectedPayment,
                selectedPrice:selectedPrice,
                selectedProvince:selectedProvince,
                selectedSpecialty:selectedSpecialty,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic:'',
                nameClinic: '',
                note:'',
            })
        }
        //   console.log(`Option selected:`, this.state.selectedOption)
        console.log (' hoi tao di m:',res)
      };

    handleChangeSelectDoctorInfor =async (selectedOption, name)=>{
        let stateName =name.name;
        let copyState = {...this.state};
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState,
        })
        // console.log( ' hoi tao di channel check new select on change', selectedOption , stateName)
    }

    handleOnChangeText = (e, id) => {
        let copyState = {...this.state};
        copyState[id] =e.target.value;
        this.setState({
            ...copyState,
        })
    }

    render() {
        let {hasOldData} =this.state;
        // console.log(' hoi tao di check state:', this.state)
        return (
                  <div className="manage-doctor-container">
                        <div className="manage-doctor-title">
                            <FormattedMessage id="admin.manage-doctor.title"/>
                        </div>
                        <div className="more-infor">
                            <div className="content-left form-group">
                                <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                                />
                            </div>
                            <div className="content-right">
                                <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                                <textarea className="form-control"
                                    onChange = {(e)=>this.handleOnChangeText(e, 'description')}
                                    value={this.state.description}
                                >
                                </textarea>
                            </div>
                           
                        </div>

                        <div className="more-infor-extra row">
                            <div className="col-4 form-group">
                                <label> <FormattedMessage id="admin.manage-doctor.price"/></label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPrice}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                                    name={'selectedPrice'}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label> <FormattedMessage id="admin.manage-doctor.payment"/></label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPayment}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                                    name={'selectedPayment'}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label> <FormattedMessage id="admin.manage-doctor.province"/></label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listProvince}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                                    name={'selectedProvince'}
                                />
                            </div>

                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                                <input className="form-control"
                                    onChange = {(e)=>this.handleOnChangeText(e, 'nameClinic')}
                                    value={this.state.nameClinic}
                                ></input>                          
                            </div> <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                                <input className="form-control"
                                    onChange = {(e)=>this.handleOnChangeText(e, 'addressClinic')}
                                    value={this.state.addressClinic}
                                ></input>    
                            </div> <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                                <input className="form-control"
                                    onChange = {(e)=>this.handleOnChangeText(e, 'note')}
                                    value={this.state.note}
                                ></input>                           
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.specialty"/></label>
                                <Select
                                     value={this.state.selectedSpecialty}
                                     onChange={this.handleChangeSelectDoctorInfor}
                                     options={this.state.listSpecialty}
                                     placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>}
                                     name={'selectedSpecialty'}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.select-clinic"/></label>
                                <Select
                                     value={this.state.selectedClinic}
                                     onChange={this.handleChangeSelectDoctorInfor}
                                     options={this.state.listClinic}
                                     placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic"/>}
                                     name={'selectedClinic'}
                                />
                            </div>
                        </div>
                        <div className="manage-doctor-editor">
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.contentMarkdown}
                        />
                        </div>
                       
                        <button className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                            onClick={()=>this.handleSaveContentMarkdown()}
                        >
                            {hasOldData === true ?
                            <span><FormattedMessage id="admin.manage-doctor.save"/></span>
                             : 
                            <span><FormattedMessage id="admin.manage-doctor.add"/></span>}
                        </button>
                  </div>
            
        )
    }

}
    

const mapStateToProps = state => {
    return {
        allDoctors:state.admin.allDoctors,
        language:state.app.language,
        allRequiredDoctorInfor:state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
