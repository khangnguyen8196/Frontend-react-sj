import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về trận thua của GAM trước RGE
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400" 
                            src="https://www.youtube.com/embed/TIyKGJjnRwM" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>Sau 2 ngày thi đấu vòng bảng đại diện đến từ VN vẫn chữa tìm được bàn thắng của mình. Các tuyển thủ cần chấn chỉnh lại tâm lý để có thể chiến thắng trong những trận đấu sắp tới Fighting !</p>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
