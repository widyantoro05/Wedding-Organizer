import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lightSpeedIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

// import {Animated} from "react-animated-css";

import Anime from 'react-anime';
const styles = {
    lightSpeedIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(lightSpeedIn, 'lightSpeedIn')
    }
}

const UtilitiesAnimations = (props) => {
    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="6">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Animate.css</CardTitle>

                                <p>All Animate.css animations are available if enabled from the <b>/assets/utils/_animate.css</b> file.</p>

                                <div className="text-center">
                                    <StyleRoot>
                                        <div className="test" style={styles.lightSpeedIn}>
                                            <div className="swatch-holder swatch-holder-lg bg-success" />
                                        </div>
                                    </StyleRoot>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>React Anime</CardTitle>
                                <Anime easing="easeOutElastic"
                                    duration={1000}
                                    direction="alternate"
                                    loop={true}
                                    delay={(el, index) => index * 240}
                                    translateX='13rem'
                                    scale={[.75, .9]}>
                                    <div className="swatch-holder bg-primary text-white text-center">1</div>
                                    <div className="swatch-holder bg-success text-white text-center">2</div>
                                    <div className="swatch-holder bg-danger text-white text-center">3</div>
                                </Anime>
                                <div className="divider" />
                                <Anime opacity={[0, 1]} translateY={'1.5em'} delay={(e, i) => i * 1000} loop={true}>
                                    <p>Halo Teman2!! Template architect ui ini aku edit supaya jadi sesimpel mungkin dan lebih mudah dimengerti alur ceritanya.
                                    Sudah ku siapkan page untuk tiap produk di tab Menu ya, silakan di edit di folder yang tersedia, bisa diganti2 komponennya sesuka hati.
                                        </p><br /><p>File2 yang tidak terpakai tersimpan di dalam folder "keep".
                                    Untuk sementara baru ada pages untuk user ya, pages untuk adminnya otw!
                                    </p>
                                    <p>"Good a mast-head as any, sir. Will you mount?"</p>
                                    <p>"That I will, and thank ye very much, my fine fellow; only I wish you fifty feet
                                        taller."</p>
                                </Anime>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CSSTransitionGroup>
        </Fragment>
    );
};

export default UtilitiesAnimations;