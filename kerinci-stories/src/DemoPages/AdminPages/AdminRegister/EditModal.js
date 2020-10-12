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

class EditModalAdmin extends React.Component {
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
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        this.setState({
            idAdmin: this.props.editAdmin.idAdmin,
            nameAdmin: this.props.editAdmin.nameAdmin,
            passAdmin: this.props.editAdmin.passAdmin,
            unameAdmin: this.props.editAdmin.unameAdmin,
            imageAdmin: this.props.editAdmin.imageAdmin
        })
    }

    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        if (this.state.selectedFile === null) {
            const admin = {
                idAdmin: this.props.editAdmin.idAdmin,
                nameAdmin: this.state.nameAdmin ? this.state.nameAdmin : this.props.editAdmin.nameAdmin,
                unameAdmin: this.state.unameAdmin ? this.state.unameAdmin : this.props.editAdmin.unameAdmin,
                passAdmin: this.state.passAdmin ? this.state.passAdmin : this.props.editAdmin.passAdmin,
                imageAdmin: this.state.imageAdmin ? this.state.imageAdmin : this.props.editAdmin.imageAdmin
            }
            this.props.savedata(admin);
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const admin = {
                    idAdmin: this.props.editAdmin.idAdmin,
                    nameAdmin: this.state.nameAdmin ? this.state.nameAdmin : this.props.editAdmin.nameAdmin,
                    unameAdmin: this.state.unameAdmin ? this.state.unameAdmin : this.props.editAdmin.unameAdmin,
                    passAdmin: this.state.passAdmin ? this.state.passAdmin : this.props.editAdmin.passAdmin,
                    imageAdmin: dataImage.data.fileName
                }
                this.props.savedata(admin);
            }
        }
    }

    resetForm = () => {
        this.setState({
            idAdmin: this.props.editAdmin.idAdmin,
            nameAdmin: this.props.editAdmin.nameAdmin,
            unameAdmin: this.props.editAdmin.unameAdmin,
            passAdmin: this.props.editAdmin.passAdmin,
            imageAdmin: this.props.editAdmin.imageAdmin,
            selectedFile: null
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        //console.log(event.target.files[0])
    }

    render() {
        //const { idAdmin, nameAdmin, unameAdmin } = this.state;
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        //console.log(this.props.editAdmin)

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editAdmin={this.props.editAdmin}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span>   Edit Admin Profile</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <ModalBody>
                            <Input name='idAdmin' id="idAdminEdit" onChange={this.handleChange}
                                defaultValue={this.props.editAdmin.idAdmin} hidden />
                            <FormGroup>
                                <Label for="nameAdmin">Name</Label>
                                <Input type="text" name="nameAdmin" id="nameAdminEdit"
                                    placeholder="Insert name" autoComplete="off"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editAdmin.nameAdmin} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="unameAdmin">Username</Label>
                                <Input type="text" name="unameAdmin" id="unameAdminEdit"
                                    placeholder="Insert user name" autoComplete="off"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editAdmin.unameAdmin} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="passAdmin">Password</Label>
                                <Input type="password" name="passAdmin" id="passAdminEdit"
                                    placeholder="Insert password" autoComplete="off"
                                    onChange={this.handleChange} 
                                    defaultValue={this.props.editAdmin.passAdmin}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageAdmin">Photo Profile</Label>
                                <CustomInput type="file" name="imageAdmin" id="imageAdmin"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editAdmin.imageAdmin}`} alt="imageAdmin" style={{ width: "20%", height: "auto" }} />
                                <FormText>
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editAdmin.imageAdmin
                                    }
                                </FormText>
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

export default EditModalAdmin;
