import React, { Fragment, Component } from "react";
// import SweetAlert from 'sweetalert-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Slider from "react-slick";
import axios from 'axios';

import bg1 from '../../../assets/utils/images/originals/loginpage1.jpg';
import bg2 from '../../../assets/utils/images/originals/loginpage2.jpg';
import bg3 from '../../../assets/utils/images/originals/loginpage3.jpg';
import Logo from '../../../Layout/AppLogo/LogoLogin.png'

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const api = axios.create({
    baseURL: 'http://localhost:1212/v1/app'
})

const MySwal = withReactContent(Swal);

export default class Login extends Component {

    state = {
        status: "",
        message: "",
        unameAdmin: "",
        passAdmin: "",
        dataAdmin: [],
        redirect: false,
        show: false,
        alert: null

    }

    constructor(props) {
        super();
        //this.getCourses();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        localStorage.setItem('loginstatus', 'false');
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event.target.unameAdmin.value)
        // console.log(event.target.passAdmin.value)
        let unameAdmin = event.target.unameAdmin.value;
        let passAdmin = event.target.passAdmin.value;
        // console.log(unameAdmin);
        // console.log(passAdmin);
        // this.setState({ unameAdmin: "" });
        // this.setState({ passAdmin: "" });
        this.postLogin(unameAdmin, passAdmin);
    }

    postLogin = async (unameAdmin, passAdmin) => {

        console.log(unameAdmin);
        console.log(passAdmin);
        // console.log('admin/loginadmin?pass=' + passAdmin + '&uname=' + unameAdmin);

        let data = await api.get('admin/loginadmin?pass=' + passAdmin + '&uname=' + unameAdmin).then(({ data }) => data)

        this.setState({ status: data.status })
        this.setState({ message: data.message })
        this.setState({ dataAdmin: data.dataAdmin })
        console.log(this.state.status);
        console.log(this.state.message);

        // localStorage.setItem('nameAdmin', this.state.dataAdmin.nameAdmin)
        // localStorage.setItem('imageAdmin', this.state.dataAdmin.imageAdmin)
        this.handleLogin(this.state.status);
    }

    handleLogin = (status) => {
        if (status === "fail") {
            console.log('masuk handle gagal');
            console.log(localStorage.getItem('loginstatus'));
            MySwal.fire({
                icon: 'error',
                title: 'Login fail!',
                text: this.state.message,
                // text: 'halo',
                showConfirmButton: false,
                timer: 3000,
                // imageUrl: 'https://unsplash.it/400/200', 
                // imageWidth: 400,
                // imageHeight: 200,
                // imageAlt: 'Custom image',
            })
        } else {
            console.log('masuk handle sukses');
            localStorage.setItem('loginstatus', 'true')
            localStorage.setItem('nameAdmin', this.state.dataAdmin.nameAdmin)
            localStorage.setItem('imageAdmin', this.state.dataAdmin.imageAdmin)
            console.log(localStorage.getItem('loginstatus'));
            this.setState({ show: true })
            MySwal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: this.state.dataAdmin.nameAdmin,
                // text: 'halo',
                showConfirmButton: false,
                timer: 3000,
                // imageUrl: 'https://unsplash.it/400/200', 
                // imageWidth: 400,
                // imageHeight: 200,
                // imageAlt: 'Custom image',
            })
            this.setState({ unameAdmin: "" });
            this.setState({ passAdmin: "" });
            window.location.href = '#/adminpage/bookedlist'
        }
    }

    // renderRedirect = () => {
    //     console.log('masuk redirect');
    //     if (this.state.redirect==true) {
    //       return <Redirect to='/adminpage/bookedlist' />
    //     }
    //   }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    };

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            initialSlide: 0,
            autoplay: true,
            adaptiveHeight: true

        };
        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="4" className="d-none d-lg-block">
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-heavy-rain">
                                        <div className="slide-img-bg"
                                            style={{
                                                backgroundImage: 'url(' + bg1 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3 style={{ color: 'black' }}>Our business is making memories</h3>
                                            <p style={{ color: 'black' }}>
                                                At the end of the day all that matters is love and memories so make sure you give it and make sure you make them.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-vicious-stance">
                                        <div className="slide-img-bg"
                                            style={{
                                                backgroundImage: 'url(' + bg2 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Creating the Best. Day. Ever.</h3>
                                            <p>
                                                Each day is what you  make it, so why not make it the best day ever.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-slick-carbon">
                                        <div className="slide-img-bg opacity-6"
                                            style={{
                                                backgroundImage: 'url(' + bg3 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Turning ideas into action</h3>
                                            <p>
                                                An idea is just an idea, unless action follows to turn the idesa into a reality.
                                            </p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                        <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                <div >
                                    {/* <div className="logo-src"/> */}
                                    <img
                                        src={Logo}
                                        width="auto"
                                        height="100%"
                                        // className="d-inline-block align-left"
                                        alt="Pro Sigmaka Mandiri logo"
                                    />
                                </div>
                                <h4 className="mb-0">
                                    <div>Welcome back,</div>
                                    <span>This is a login page for admin.</span>
                                </h4>
                                <h6 className="mt-3">
                                    Not an admin?{' '}
                                    <a href="#/user/openingpage" className="text-primary">Main Page</a>
                                </h6>
                                <Row className="divider" />
                                <div>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="unameAdmin">Username</Label>
                                                    <Input type="text" name="unameAdmin" id="unameAdmin"
                                                        placeholder="Username here..."
                                                        value={this.state.unameAdmin}
                                                        onChange={this.handleChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input type="password" name="passAdmin" id="examplePassword"
                                                        placeholder="Password here..."
                                                        value={this.state.passAdmin}
                                                        onChange={this.handleChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/* <FormGroup check>
                                            <Input type="checkbox" name="check" id="exampleCheck"/>
                                            <Label for="exampleCheck" check>Keep me logged in</Label>
                                        </FormGroup> */}
                                        <Row className="divider" />
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                {/* <a href="https://colorlib.com/" onClick={(e)=>e.preventDefault()} className="btn-lg btn btn-link">Recover
                                                    Password</a>{' '}{' '} */}
                                                <Button style={{ float: "right", backgroundColor: "#C0D39A", color: "black", border: "none", height: "40px" }} size="lg" type="submit" className="mt-1 btn-shadow btn-wide btn-pill">Login</Button>
                                            </div>
                                            {/* <SweetAlert
                                                title='Welcome!'
                                                confirmButtonColor=""
                                                show={this.state.show}
                                                subtitle={localStorage.getItem('username')}
                                                type="success"
                                                onConfirm={() => this.setState({show: false})} /> */}
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}
