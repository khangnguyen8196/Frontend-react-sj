import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import { LANGUAGES, CommonUtils } from '../../../utils';
import {createNewSpecialty} from '../../../services/userService';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imageBase64:'',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount (){
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot)  {
     if(this.props.language !== prevProps.language){

        }
    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        })
    }
   
    handleEditorChange =({html,text})=> {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown:text,
        })
    }

    handelOnChangeImage = async(e) => {
        let data = e.target.files;
        let file = data[0]; 
        if (file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64 : base64              
            })
        }
     }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0){
            toast.success('Add new specialty succeed!')
        } else {
            toast.error('Add new specialty errorr!')
        }
        console.log ( '>>> this check state:', this.state)
    }
    render() {
      

        return (
           <div className= "manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className="form-control" type="text" value = {this.state.name}
                            onChange= {(e)=> this.handleOnChangeInput(e, 'name')}
                        />
                             
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input className="form-control-file" type="file"
                            onChange = {(e) => this.handelOnChangeImage(e)}
                        />

                              
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                       <button className="btn-save-specialty"
                           onClick = {() => this.handleSaveNewSpecialty()}
                       >Save </button>
                    </div>
                   
                </div>
               
                
           </div>
        )
    }
           
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
