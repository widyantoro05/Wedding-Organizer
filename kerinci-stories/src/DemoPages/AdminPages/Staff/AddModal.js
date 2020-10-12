import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, CustomInput
} from 'reactstrap';
import {
    faSave, faUndo, faUserCircle
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class ModalStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idStaff: "",
            nameStaff: "",
            job: "",
            profile: "",
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    initialInput = {
        idStaff: "",
        nameStaff: "",
        job: "",
        profile: ""
    }

    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
        if (dataImage) {
            const staff = {
                idStaff: this.state.idStaff,
                nameStaff: this.state.nameStaff,
                job: this.state.job,
                profile: dataImage.data.fileName
            }
            this.props.savedata(staff);
        }
        this.resetForm();
    }

    resetForm = () => {
        this.setState(() => this.initialInput)
        this.setState({ selectedFile: null })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    render() {
        const { idStaff, nameStaff, job } = this.state;
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }} >
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span>   Input Staff Profile</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <ModalBody>
                            <Input name='idStaff' id="idStaff" value={idStaff} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameStaff">Staff Name</Label>
                                <Input type="text" name="nameStaff" id="nameStaff"
                                    placeholder="Enter staff name" autoComplete="off"
                                    value={nameStaff} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="job">Job</Label>
                                <Input type="select" name="job" id="job"
                                    value={job} onChange={this.handleChange}>
                                    <option value="">Select one</option>
                                    <option value="Photographer">Photographer</option>
                                    <option value="Videographer">Videographer</option>
                                    <option value="Designer & Stylish">Designer & Stylish</option>
                                    <option value="Makeup Artist">Makeup Artist</option>
                                    <option value="Event Organizer">Event Organizer</option>
                                    <option value="Decorator">Decorator</option>
                                    <option value="Chef">Chef</option>
                                    <option value="Waiter">Waiter</option>
                                    <option value="Waitress">Waitress</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="profile">Photo Profile</Label>
                                <CustomInput type="file" name="profile" id="profile"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {
                                    this.state.selectedFile ?
                                        <img hidden={!this.state.selectedFile} src={url} alt="profile" style={{ width: "150px", height: "auto" }} />
                                        : ""
                                }
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="bg-white">
                            <Button className="btn-pill btn-lg btn-shadow mt-1" style={{ backgroundColor: "#ffffff", border: "none", color: "currentcolor" }} type="reset">
                                <FontAwesomeIcon icon={faUndo} />
                                <span> Reset</span>
                            </Button>
                            <Button className="btn-pill btn-lg btn-shadow mt-1" style={{ background: "#C0D39A", border: "none", color: "currentcolor" }}
                                type="submit" onClick={this.props.toggle}>
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

export default ModalStaff;
