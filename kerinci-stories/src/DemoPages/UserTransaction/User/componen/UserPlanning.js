import React, { Component, Fragment } from 'react';

import {
    Card, CardBody, Collapse, Col, Row, CardHeader

} from 'reactstrap';

import image from '../../../../assets/utils/images/noorder.png'
import CurrencyFormat from 'react-currency-format';

class UserPlanning extends Component {
    render() {
        const dam = JSON.parse(localStorage.getItem('dam'))
        const venue = JSON.parse(localStorage.getItem('venue'))
        const photo = JSON.parse(localStorage.getItem('photo'))
        const decor = JSON.parse(localStorage.getItem('decor'))
        const catering = JSON.parse(localStorage.getItem('catering'))
        return (
            <Fragment>
                <div className="drawer-section p-0">
                    <div className="todo-box">
                        <Card className="main-card mb-3">
                            <CardHeader style={{ backgroundColor: "#C0D39A", fontSize: "20px", fontWeight: "bolder", textTransform: "none", fontFamily: "Philosopher, sans-serif" }}>
                                Our plans
                            </CardHeader>
                            <CardBody>
                                {venue || decor || dam || catering || photo ?
                                    <>
                                        <Collapse isOpen={true} >
                                            {decor ?
                                                <>
                                                    <Row>
                                                        <Col md={3} style={{ alignSelf: "center" }}>
                                                            <img src={`http://localhost:1212/v1/app/downloadFile/${decor.imageDecor}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover", marginLeft: "20px" }} />
                                                        </Col>
                                                        <Col md={9} style={{ fontSize: "15px", alignSelf: "center" }}>
                                                            <div>
                                                                <p style={{ fontWeight: "bold", marginLeft: "20px" }}>{decor.nameDecor}</p>
                                                                <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Style: {decor.styleDecor}</p>
                                                                <p style={{ textAlign: "right", fontWeight: "bold", marginRight: "20px" }}><CurrencyFormat value={decor.priceDecor} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                </>
                                                : ""}
                                        </Collapse>

                                        <Collapse isOpen={true} >
                                            {photo ?
                                                <>
                                                    <Row>
                                                        <Col md={3} style={{ alignSelf: "center" }}>
                                                            <img src={`http://localhost:1212/v1/app/downloadFile/${photo.imagePhoto}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover", marginLeft: "20px" }} />
                                                        </Col>
                                                        <Col md={9} style={{ fontSize: "15px", alignSelf: "center" }}>
                                                            <>
                                                                <p style={{ fontWeight: "bold", marginLeft: "20px" }}>{photo.namePhoto}</p>
                                                                <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Theme: {photo.themePhoto}</p>
                                                                <p style={{ textAlign: "right", fontWeight: "bold", marginRight: "20px" }}><CurrencyFormat value={photo.pricePhoto} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
                                                            </>
                                                        </Col>
                                                    </Row><br />
                                                </> : ""}
                                        </Collapse>

                                        <Collapse isOpen={true} >
                                            {catering ?
                                                <>
                                                    <Row>
                                                        <Col md={3} style={{ alignSelf: "center" }}>
                                                            <img src={`http://localhost:1212/v1/app/downloadFile/${catering.imageCatering}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover", marginLeft: "20px" }} />
                                                        </Col>
                                                        <Col md={9} style={{ fontSize: "15px", alignSelf: "center" }}>
                                                            <p style={{ fontWeight: "bold", marginLeft: "20px" }}>{catering.nameCatering}</p>
                                                            <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Style: {catering.styleCatering}</p>
                                                            <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Portion: {catering.portionCatering} pax</p>
                                                            <p style={{ textAlign: "right", fontWeight: "bold", marginRight: "20px" }}><CurrencyFormat value={catering.priceCatering} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
                                                        </Col>
                                                    </Row><br />
                                                </> : ""}
                                        </Collapse>

                                        <Collapse isOpen={true} >
                                            {dam ?
                                                <>
                                                    <Row>
                                                        <Col md={3} style={{ alignSelf: "center" }}>
                                                            <img className="d-block" src={`http://localhost:1212/v1/app/downloadFile/${dam.imageDam}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover", marginLeft: "20px" }} />
                                                        </Col>
                                                        <Col md={9} style={{ fontSize: "15px", alignSelf: "center" }}>
                                                            <p style={{ fontWeight: "bold", marginLeft: "20px" }}>{dam.nameDam}</p>
                                                            <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Style: {dam.styleDam}</p>
                                                            <p style={{ textAlign: "right", fontWeight: "bold", marginRight: "20px" }}><CurrencyFormat value={parseInt(dam.priceDam)} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                </> : ""}
                                        </Collapse>

                                        <Collapse isOpen={true} >
                                            {venue ?
                                                <Row>
                                                    <Col md={3} style={{ alignSelf: "center" }}>
                                                        <img src={`http://localhost:1212/v1/app/downloadFile/${venue.imageVenue}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover", marginLeft: "20px" }} />
                                                    </Col>
                                                    <Col md={9} style={{ fontSize: "15px", alignSelf: "center" }}>
                                                        <p style={{ fontWeight: "bold", marginLeft: "20px" }}>{venue.nameVenue}</p>
                                                        <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Location: {venue.location}</p>
                                                        <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Ambiance: {venue.ambiance}</p>
                                                        <p style={{ marginTop: "-1em", marginLeft: "20px" }}>Capacity: {venue.capacity}</p>
                                                        <p style={{ textAlign: "right", fontWeight: "bold", marginRight: "20px" }}><CurrencyFormat value={venue.priceVenue} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
                                                    </Col>
                                                </Row>
                                                : ""}
                                        </Collapse>
                                        <br />
                                        <p style={{
                                            borderBottom: "5px dotted #C0D39A",
                                        }} />
                                        <br/>
                                        <div className="d-block" style={{ fontWeight: "bold", fontSize: "18px" }}>
                                            <span style={{ marginLeft: "20px" }}>Total Payment</span>
                                            <div style={{ float: "right", marginRight: "20px", }}>
                                                <CurrencyFormat value={(decor ? parseInt(decor.priceDecor) : 0)
                                                    + (photo ? parseInt(photo.pricePhoto) : 0)
                                                    + (venue ? parseInt(venue.priceVenue) : 0)
                                                    + (dam ? parseInt(dam.priceDam) : 0)
                                                    + (catering ? parseInt(catering.priceCatering) : 0)} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                            </div>
                                        </div>
                                        <br/>
                                    </>
                                    :
                                    <Collapse isOpen={true}>
                                        <div className="text-center">
                                            <img src={image} style={{ width: '60%', height: 'auto', alignSelf: 'center' }}>
                                            </img>
                                            <p>You have no upcoming plans.</p>
                                        </div>
                                    </Collapse>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserPlanning;