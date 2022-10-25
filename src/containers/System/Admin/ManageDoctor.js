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
           contentMarkdown:'',
           contentHTML:'',
           selectedOption:'',
           description:'',
           listDoctors:[],
           hasOldData:false,
        } 
   }

   componentDidMount() {
        this.props.fetchAllDoctors()
   }
   buildDataInputSelect = (inputData) => {
    let result =[];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
            let object ={};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object);
        })
    }
    return result;
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
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
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailInforDoctorService(selectedOption.value)
        if (res && res.errCode ===0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
        //   console.log(`Option selected:`, this.state.selectedOption)
        console.log (' hoi tao di m:',res)
      };

    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        let {hasOldData} =this.state
        return (
                  <div className="manage-doctor-container">
                        <div className="manage-doctor-title">
                           tạo thêm thông tin doctor
                        </div>
                        <div className="more-infor">
                            <div className="content-left form-group">
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="content-right">
                                <label>Thông tin giới thiệu</label>
                                <textarea className="form-control" rows="4"
                                    onChange = {(e)=>this.handleOnChangeDesc(e)}
                                    value={this.state.description}
                                >
                                    aaaaaaaaaa
                                </textarea>
                            </div>
                           
                        </div>
                        <div className="manage-doctor-editor">
                        <MdEditor 
                            style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.contentMarkdown}
                        />
                        </div>
                        <button className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                            onClick={()=>this.handleSaveContentMarkdown()}
                        >
                            {hasOldData === true ?
                            <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                        </button>
                  </div>
            
        )
    }

}
    

const mapStateToProps = state => {
    return {
        allDoctors:state.admin.allDoctors,
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
