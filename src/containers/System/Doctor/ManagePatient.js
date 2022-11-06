import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';

import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';



class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state={
            currentDate: new Date(),
          
            } 
       }
    
       componentDidMount() {
           
       }

     
      
       componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevProps.allDoctors !== this.props.allDoctors){
          
            }
        }

    handleOnchangeDataPicker = (date) => {
        this.setState({
            currentDate:date[0]
        })
        }
    render() {
    

        return (
            <div className="manage-paitent-container">
                   <div className="m-p-title">
                    Quản lý bệnh nhân khám bệnh
                   </div>
                   <div className="manage-paitent-body row">
                        <div className="col-4 form-group">
                            <label >Chọn ngày khám</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDataPicker}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th colSpan="2">Telephone</th>
                                    </tr>
                                    <tr>
                                        <td>34534534</td>
                                        <td>34534534</td>
                                        <td>345534534</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                   </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language:state.app.language,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
