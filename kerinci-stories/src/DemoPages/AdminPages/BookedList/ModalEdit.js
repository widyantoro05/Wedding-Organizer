import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input,
} from 'reactstrap';
import axios from 'axios';

import {
    faSave, faUndo, faBook
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: [],
            decor: [],
            dam: [],
            catering: [],
            photo: [],
            wedDate: [],
            idUser: "",
            nameBride: "",
            nameGroom: "",
            email: "",
            noHp: "",
            weddingDate: new Date(),
            guestNumber: "",
            nameVenue: "",
            nameDecor: "",
            nameDam: "",
            nameCatering: "",
            namePhoto: "",
            totalPrice: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.reset = this.reset.bind(this);
        this.disableCustomDt = this.disableCustomDt.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/venue/name")
            .then(response => {
                this.setState({ venue: response.data.data });
            })
        axios.get("http://localhost:1212/v1/app/decor/name")
            .then(response => {
                this.setState({ decor: response.data.data });
            })
        axios.get("http://localhost:1212/v1/app/dam/name")
            .then(response => {
                this.setState({ dam: response.data.data });
            })
        axios.get("http://localhost:1212/v1/app/catering/name")
            .then(response => {
                this.setState({ catering: response.data.data });
            })
        axios.get("http://localhost:1212/v1/app/photo&video/name")
            .then(response => {
                this.setState({ photo: response.data.data });
            })
        axios.get("http://localhost:1212/v1/app/user/date")
            .then(response => {
                this.setState({ wedDate: response.data.data });
            });
        console.log("test")

        this.setState({
            idUser: this.props.bookedlistedit.idUser,
            nameBride: this.props.bookedlistedit.nameBride,
            nameGroom: this.props.bookedlistedit.nameGroom,
            email: this.props.bookedlistedit.email,
            noHp: this.props.bookedlistedit.noHp,
            weddingDate: this.props.bookedlistedit.weddingDate,
            guestNumber: this.props.bookedlistedit.guestNumber,
            nameVenue: this.props.bookedlistedit.nameVenue,
            nameDecor: this.props.bookedlistedit.nameDecor,
            nameDam: this.props.bookedlistedit.nameDam,
            nameCatering: this.props.bookedlistedit.nameCatering,
            namePhoto: this.props.bookedlistedit.namePhoto,
            totalPrice: this.props.bookedlistedit.totalPrice
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        const bookedEdit = {
            idUser: this.props.bookedlistedit.idUser,
            nameBride: this.state.nameBride ? this.state.nameBride : this.props.bookedlistedit.nameBride,
            nameGroom: this.state.nameGroom ? this.state.nameGroom : this.props.bookedlistedit.nameGroom,
            email: this.state.email ? this.state.email : this.props.bookedlistedit.email,
            noHp: this.state.noHp ? this.state.noHp : this.props.bookedlistedit.noHp,
            weddingDate: this.state.weddingDate ? this.state.weddingDate : this.props.bookedlistedit.weddingDate,
            guestNumber: this.state.guestNumber ? this.state.guestNumber : this.props.bookedlistedit.guestNumber,
            nameVenue: this.state.nameVenue ? this.state.nameVenue : this.props.bookedlistedit.nameVenue,
            nameDecor: this.state.nameDecor ? this.state.nameDecor : this.props.bookedlistedit.nameDecor,
            nameDam: this.state.nameDam ? this.state.nameDam : this.props.bookedlistedit.nameDam,
            nameCatering: this.state.nameCatering ? this.state.nameCatering : this.props.bookedlistedit.nameCatering,
            namePhoto: this.state.namePhoto ? this.state.namePhoto : this.props.bookedlistedit.namePhoto,
            totalPrice: this.state.totalPrice ? this.state.totalPrice : this.props.bookedlistedit.totalPrice
        }
        this.props.editdata(bookedEdit);
        this.reset();

    }
    reset = () => {
        this.setState({
            idUser: "",
            nameBride: "",
            nameGroom: "",
            email: "",
            noHp: "",
            weddingDate: new Date(),
            guestNumber: "",
            nameVenue: "",
            nameDecor: "",
            nameDam: "",
            nameCatering: "",
            namePhoto: "",
            totalPrice: "",
        })
    }

    resetForm = () => {
        this.setState(() => this.initialInput)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    disableCustomDt = (current) => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday) && !this.state.wedDate.includes(current.format('YYYY-MM-DD'));
    }

render() {
    const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
    return (
        <span className="d-inline-block mb-2 mr-2">
            <Modal {...this.props}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }} icon="lnr-book">
                    <FontAwesomeIcon icon={faBook} />
                    <span>   Booked List</span>
                </ModalHeader>
                <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                    <ModalBody>
                        <Input name='idUser' id="idUser" onChange={this.handleChange}
                            defaultValue={this.props.bookedlistedit.idUser} hidden />
                        <FormGroup>
                            <Label for="nameBride">Bride's Name</Label>
                            <Input type="text" name="nameBride" id="nameBride"
                                placeholder="Enter bride's name" autoComplete='off'
                                onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameBride} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameGroom">Groom's Name</Label>
                            <Input type="text" name="nameGroom" id="nameGroom"
                                placeholder="Enter groom's name" autoComplete='off'
                                onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameGroom} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" id="email"
                                placeholder="Enter email" autoComplete='off'
                                onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="noHp">No. Handphone</Label>
                            <Input type="text" name="noHp" id="noHp"
                                placeholder="Enter no. handphone" autoComplete='off'
                                onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.noHp} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="weddingDate">Wedding Date</Label>
                            <DatePicker
                                timeFormat={false}
                                isValidDate={this.disableCustomDt}
                                name="weddingDate" id="weddingDate"
                                placeholder="Enter wedding date" autoComplete='off'
                                closeOnSelect={true} onChange={value => this.setState({ weddingDate: value })}
                                defaultValue={this.props.bookedlistedit.weddingDate}>
                            </DatePicker>
                        </FormGroup>
                        <FormGroup>
                            <Label for="guestNumber">Guest Number</Label>
                            <Input type="text" name="guestNumber" id="guestNumber"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.guestNumber} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameVenue">Venue</Label>
                            <Input type="select" name="nameVenue" id="nameVenue"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameVenue}>
                                <option value=''>Select one</option>
                                {this.state.venue ?
                                    this.state.venue.map((option, index) => (
                                        <option value={`${option}`} key={index}>{option}</option>
                                    ))
                                    : ""}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameDecor">Decoration</Label>
                            <Input type="select" name="nameDecor" id="nameDecor"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameDecor}>
                                <option value=''>Select one</option>
                                {this.state.decor ?
                                    this.state.decor.map((option, index) => (
                                        <option value={`${option}`} key={index}>{option}</option>
                                    ))
                                    : ""}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameDam">Dress, Attire, and Makeup</Label>
                            <Input type="select" name="nameDam" id="nameDam"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameDam}>
                                <option value=''>Select one</option>
                                {this.state.dam ?
                                    this.state.dam.map((option, index) => (
                                        <option value={`${option}`} key={index}>{option}</option>
                                    ))
                                    : ""}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameCatering">Catering</Label>
                            <Input type="select" name="nameCatering" id="nameCatering"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.nameCatering} >
                                <option value=''>Select one</option>
                                {this.state.catering ?
                                    this.state.catering.map((option, index) => (
                                        <option value={`${option}`} key={index}>{option}</option>
                                    ))
                                    : ""}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="namePhoto">Photography and Videography</Label>
                            <Input type="select" name="namePhoto" id="namePhoto"
                                autoComplete='off' onChange={this.handleChange}
                                defaultValue={this.props.bookedlistedit.namePhoto} >
                                <option value=''>Select one</option>
                                {this.state.photo ?
                                    this.state.photo.map((option, index) => (
                                        <option value={`${option}`} key={index}>{option}</option>
                                    ))
                                    : ""}
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter className="bg-white">
                        <Button className="btn-pill btn-lg btn-shadow mt-1" type="reset"
                            style={{ float: "left", backgroundColor: "#ffffff", border: "none", color: "currentcolor" }}>
                            <FontAwesomeIcon icon={faUndo} />
                            <span> Reset</span>
                        </Button>
                        <Button className="btn-pill btn-lg btn-shadow mt-1" type="submit" onClick={this.props.toggle}
                            style={{ background: "#C0D39A", border: "none", color: "currentcolor" }}>
                            <FontAwesomeIcon icon={faSave} />
                            <span>   Submit</span>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </span>
    );
}
}

export default ModalEdit;
