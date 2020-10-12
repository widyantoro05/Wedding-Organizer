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

class ModalAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idAdmin: "",
            nameAdmin: "",
            unameAdmin: "",
            passAdmin: "",
            imageAdmin: "",
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    initialInput = {
        idAdmin: "",
        nameAdmin: "",
        unameAdmin: "",
        passAdmin: "",
        imageAdmin: ""
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
            const admin = {
                idAdmin: this.state.idAdmin,
                nameAdmin: this.state.nameAdmin,
                unameAdmin: this.state.unameAdmin,
                passAdmin: this.state.passAdmin,
                imageAdmin: dataImage.data.fileName
            }
            this.props.savedata(admin);
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
        const { idAdmin, nameAdmin, unameAdmin, passAdmin } = this.state;
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }} >
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span>   Input Admin Profile</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <ModalBody>
                            <Input name='idAdmin' id="idAdmin" value={idAdmin} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameAdmin">Name</Label>
                                <Input type="text" name="nameAdmin" id="nameAdmin"
                                    placeholder="Insert name" autoComplete="off"
                                    value={nameAdmin} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="unameAdmin">Username</Label>
                                <Input type="text" name="unameAdmin" id="unameAdmin"
                                    placeholder="Insert username" autoComplete="off"
                                    value={unameAdmin} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="passAdmin">Password</Label>
                                <Input type="password" name="passAdmin" id="passAdmin"
                                    placeholder="Insert password" autoComplete="off"
                                    value={passAdmin} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageAdmin">Photo Profile</Label>
                                <CustomInput type="file" name="imageAdmin" id="imageAdmin"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {
                                    this.state.selectedFile ?
                                        <img hidden={!this.state.selectedFile} src={url} alt="imageAdmin" style={{ width: "160px", height: "90px" }} />
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

export default ModalAdmin;
