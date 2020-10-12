import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import image1 from '../../assets/utils/images/header4.jpg';
import TitleComponent3 from './PageTitleExamples/Variation3'

class PageTitle extends Component {

    render() {
        let {
            enablePageTitleIcon,
            // enablePageTitleSubheading,
            heading,
            icon,
            // subheading
        } = this.props;

        return (

            <div className="app-page-title" style={{ backgroundColor:"#91C17F", backgroundImage:'url(' + image1 + ')'}}>
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon", {'d-none': !enablePageTitleIcon})} style={{background:"#FAFCF0"}}>
                            <i className={icon} style={{color:"#C0D39A"}}/>
                        </div>
                        <div className="text-white" style={{ fontFamily: "Philosopher, sans-serif", fontSize: "26px", verticalAlign:"center" }}>
                            {heading}
                            {/* <div
                                className={cx("page-title-subheading", {'d-none': !enablePageTitleSubheading})}
                                style={{ fontSize: "15px" }}>
                                {subheading}
                            </div> */}
                        </div>
                    </div>
                    <div className="page-title-actions">
                    <TitleComponent3 heading={heading} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);