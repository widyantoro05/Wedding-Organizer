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

class EditModalStaff extends React.Component {
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
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.reset = this.reset.bind(this);

    }

    componentDidMount() {
        this.setState({
            idStaff: this.props.editstaff.idStaff,
            nameStaff: this.props.editstaff.nameStaff,
            job: this.props.editstaff.job,
            profile: this.props.editstaff.profile
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
            const staff = {
                idStaff: this.props.editstaff.idStaff,
                nameStaff: this.state.nameStaff ? this.state.nameStaff : this.props.editstaff.nameStaff,
                job: this.state.job ? this.state.job : this.props.editstaff.job,
                profile: this.state.profile ? this.state.profile : this.props.editstaff.profile
            }
            this.props.savedata(staff);
            this.reset();
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const staff = {
                    idStaff: this.props.editstaff.idStaff,
                    nameStaff: this.state.nameStaff ? this.state.nameStaff : this.props.editstaff.nameStaff,
                    job: this.state.job ? this.state.job : this.props.editstaff.job,
                    profile: dataImage.data.fileName
                }
                this.props.savedata(staff);
                this.reset();
            }
        }
    }

    reset() {
        this.setState({
            idStaff: "",
            nameStaff: "",
            job: "",
            profile: "",
            selectedFile: null
        })
    }

    resetForm = () => {
        this.setState({
            idStaff: this.props.editstaff.idStaff,
            nameStaff: this.props.editstaff.nameStaff,
            job: this.props.editstaff.job,
            profile: this.props.editstaff.profile,
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
        //const { idStaff, nameStaff, job } = this.state;
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        //console.log(this.props.editstaff)

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editstaff={this.props.editstaff}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span>   Edit Staff Profile</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <ModalBody>
                            <Input name='idStaff' id="idStaffEdit" onChange={this.handleChange}
                                defaultValue={this.props.editstaff.idStaff} hidden />
                            <FormGroup>
                                <Label for="nameStaff">Staff Name</Label>
                                <Input type="text" name="nameStaff" id="nameStaffEdit"
                                    placeholder="Enter staff name" autoComplete="off"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editstaff.nameStaff} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="job">Job</Label>
                                <Input type="select" name="job" id="jobEdit"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editstaff.job}>
                                    {/* <option value="">Select one</option> */}
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
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editstaff.profile}`} alt="profile" style={{ width: "150px", height: "auto" }} />
                                <FormText>
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editstaff.profile
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

export default EditModalStaff;
