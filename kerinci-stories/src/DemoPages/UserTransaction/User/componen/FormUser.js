import React from 'react';
import {
    Button, Card, CardBody, CardFooter, CardHeader,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import axios from 'axios';

import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from '../../../../assets/utils/images/Capture1.png'
import moment from 'moment';

const MySwal = withReactContent(Swal);

class FormUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            nameBride: '',
            nameGroom: '',
            email: '',
            noHp: '',
            weddingDate: new Date(),
            guestNumber: '',
            bride: true,
            wedDate: [],
            bookedlist: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.disableCustomDt = this.disableCustomDt.bind(this);
    }

    initialInput = {
        idUser: '',
        nameBride: '',
        nameGroom: '',
        email: '',
        noHp: '',
        weddingDate: new Date(),
        guestNumber: '',
        idVenue: '',
        idDecor: '',
        idDam: '',
        idCatering: '',
        idPhoto: '',
        totalPrice: '',
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/user/date")
            .then(response => {
                this.setState({ wedDate: response.data.data });
            });
    }

    submitForm = (event) => {
        event.preventDefault();
        const dam = JSON.parse(localStorage.getItem('dam'))
        const venue = JSON.parse(localStorage.getItem('venue'))
        const photo = JSON.parse(localStorage.getItem('photo'))
        const decor = JSON.parse(localStorage.getItem('decor'))
        const catering = JSON.parse(localStorage.getItem('catering'))
        const dataUser = {
            idUser: this.state.idUser,
            nameBride: this.state.nameBride,
            nameGroom: this.state.nameGroom,
            email: this.state.email,
            noHp: this.state.noHp,
            weddingDate: this.state.weddingDate,
            guestNumber: this.state.guestNumber,
            idVenue: venue ? venue.idVenue : "",
            idDecor: decor ? decor.idDecor : "",
            idDam: dam ? dam.idDam : "",
            idCatering: catering ? catering.idCatering : "",
            idPhoto: photo ? photo.idPhoto : ""
        }
        const difference = +new Date(`${this.state.weddingDate}`) - +new Date();
        const timeLeft = Math.floor(Math.abs(difference / (1000 * 60 * 60 * 24)))

        axios.post("http://localhost:1212/v1/app/user/bookedlist", dataUser)
            .then(response => {
                this.setState({ bookedlist: response.data.data })
                MySwal.fire({
                    icon: 'success',
                    title: `It' is ${timeLeft} days left until your special day!`,
                    text: 'Kindly check your email for further information.',
                    showConfirmButton: true,
                    timer: 5000,
                })
                window.location.href = "#/user/openingpage"
            })
        this.resetForm();
        localStorage.clear();
        localStorage.setItem('loginstatus', false)
    }

    resetForm = () => {
        this.setState(() => this.initialInput)
    }

    disableCustomDt = (current) => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday) && !this.state.wedDate.includes(current.format('YYYY-MM-DD'));
    }

    render() {
        const { idUser, nameBride, nameGroom, email, noHp, weddingDate, guestNumber } = this.state;
        const buttonGroom = this.state.bride ?
            {
                backgroundColor: "#ffffff",
                marginLeft: '1.5em',
                border: "#C0D39A",
                color: "black",
                height: "40px"
            } :
            {
                backgroundColor: "#C0D39A",
                marginLeft: '1.5em',
                border: "#76846A",
                color: "black",
                height: "40px"
            };
        const buttonBride = this.state.bride ?
            {
                backgroundColor: "#C0D39A",
                marginLeft: '1.5em',
                border: "#C0D39A",
                color: "black",
                height: "40px"
            } :
            {
                backgroundColor: "#ffffff",
                marginLeft: '1.5em',
                border: "#C0D39A",
                color: "black",
                height: "40px"
            };
        return (
            <>
                <Card >
                    <CardHeader style={{ borderBottom: 'none', alignSelf: "center", marginTop: "1em" }}>
                        <img src={logo} alt="logo"></img>
                    </CardHeader>
                    <p
                        style={{
                            marginLeft: ".75em",
                            fontSize: "15px",
                            textAlign: "center",
                            fontWeight: "normal",
                            color: "gray",
                            textTransform: "none"
                        }}>
                        Help us give you our best services by telling us a little about you and your wedding plan!
                        </p>
                    <p style={{
                        borderBottom: "5px dotted #C0D39A",
                        marginTop: "-.5em"
                    }} />
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <CardBody style={{ marginTop: "-1em" }}>
                            <Input name='idUser' id="idUser" value={idUser} onChange={this.handleChange} hidden />
                            {this.state.bride ?
                                <FormGroup>
                                    <Label for="nameBride" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                        <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>My name is</span>
                                    </Label>
                                    <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" }}
                                        type="text" name="nameBride" id="nameBrider"
                                        placeholder="Enter bride's name" autoComplete='off'
                                        value={nameBride} onChange={this.handleChange} />
                                </FormGroup>
                                :
                                <FormGroup>
                                    <Label for="nameGroom" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                        <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>My name is</span>
                                    </Label>
                                    <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" }}
                                        type="text" name="nameGroom" id="nameGroom"
                                        placeholder="Enter groom's name" autoComplete='off'
                                        value={nameGroom} onChange={this.handleChange} />
                                </FormGroup>
                            }
                            <>
                                <Label for="nameBride" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                    <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>And I am</span>
                                </Label>
                                <Button
                                    className={"btn-shadow btn-wide btn-pill"}
                                    onClick={() => this.setState({ bride: true })}
                                    style={buttonBride}>The Bride</Button>
                                <Button
                                    className={"btn-shadow btn-wide btn-pill"}
                                    onClick={() => this.setState({ bride: false })}
                                    style={buttonGroom}>The Groom</Button>
                            </>
                            <br />
                            {this.state.bride ?
                                <FormGroup>
                                    <Label for="nameGroom" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                        <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>My partner's name is</span>
                                    </Label>
                                    <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" }}
                                        type="text" name="nameGroom" id="nameGroom"
                                        placeholder="Enter groom's name" autoComplete='off'
                                        value={nameGroom} onChange={this.handleChange} />
                                </FormGroup>
                                :
                                <FormGroup>
                                    <Label for="nameBride" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                        <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>My partner's name is</span>
                                    </Label>
                                    <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" }}
                                        type="text" name="nameBride" id="nameBrider"
                                        placeholder="Enter bride's name" autoComplete='off'
                                        value={nameBride} onChange={this.handleChange} />
                                </FormGroup>
                            }
                            <FormGroup>
                                <Label for="weddingDate" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                    <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>We are getting maried on</span>
                                </Label>
                                <DatePicker
                                    timeFormat={false}
                                    isValidDate={this.disableCustomDt}
                                    name="weddingDate" id="weddingDate"
                                    placeholder="Enter wedding date" autoComplete='off'
                                    closeOnSelect={true}
                                    value={weddingDate} onChange={value => this.setState({ weddingDate: value })}
                                    defaultValue={this.initialInput.weddingDate}
                                    inputProps={{ style: { borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" } }}>
                                </DatePicker>
                            </FormGroup>
                            <FormGroup>
                                <Label for="guestNumber" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                    <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>Guests we are inviting</span>
                                </Label>
                                <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '2em', width: '90%', boxShadow: "none" }}
                                    type="text" name="guestNumber" id="guestNumber"
                                    placeholder="Enter guest number" autoComplete='off'
                                    value={guestNumber} onChange={this.handleChange} />
                            </FormGroup>
                            <Label style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                <span style={{ marginLeft: '1.5em', fontSize: "25px" }}>You can reach me via</span>
                            </Label>
                            <FormGroup>
                                <Label for="email" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                    <span style={{ marginLeft: '3.5em', fontSize: "25px" }}>E-Mail</span>
                                </Label>
                                <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '5em', width: '79%', boxShadow: "none" }}
                                    type="text" name="email" id="email"
                                    placeholder="Enter email" autoComplete='off'
                                    value={email} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="noHp" style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }}>
                                    <span style={{ marginLeft: '3.5em', fontSize: "25px" }}>No. Handphone</span>
                                </Label>
                                <Input style={{ borderBottom: "2.5px solid gray", borderTop: "none", borderLeft: "none", borderRight: 'none', marginLeft: '5em', width: '79%', boxShadow: "none" }}
                                    type="text" name="noHp" id="noHp"
                                    placeholder="Enter no. handphone" autoComplete='off'
                                    value={noHp} onChange={this.handleChange} />
                            </FormGroup>
                        </CardBody>
                        <CardFooter className="d-block">
                            <Button style={{ backgroundColor: "#ffffff", color: "black", borderColor: "#C0D39A", height: "40px" }} type='reset' className="mt-1 btn-wide btn-shadow btn-pill">Reset</Button>
                            <Button style={{ float: "right", backgroundColor: "#C0D39A", color: "black", border: "none", height: "40px" }} type='submit' className="mt-1 btn-shadow btn-wide btn-pill">Book Now</Button>{' '}
                        </CardFooter>
                    </Form>
                </Card>
                <br />
                <br />
                <br />
                <br />
            </>
        );
    }
}

export default FormUser;
