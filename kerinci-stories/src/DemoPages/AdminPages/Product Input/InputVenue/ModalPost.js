import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, CustomInput
} from 'reactstrap';
import {
    faMapMarkerAlt, faSave, faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


class ModalPostVenue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idVenue: "",
            nameVenue: "",
            location: "",
            ambiance: "",
            capacity: "",
            priceVenue: "",
            detailVenue: "",
            imageVenue: "",
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    initialInput = {
        idVenue: "",
        nameVenue: "",
        location: "",
        ambiance: "",
        capacity: "",
        priceVenue: "",
        detailVenue: "",
        imageVenue: ""
    }
    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        console.log(this.state.selectedFile);
        const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
        if (dataImage) {
            const model = {
                idVenue: this.state.idVenue,
                nameVenue: this.state.nameVenue,
                location: this.state.location,
                ambiance: this.state.ambiance,
                capacity: this.state.capacity,
                priceVenue: this.state.priceVenue,
                detailVenue: this.state.detailVenue,
                imageVenue: dataImage.data.fileName
            }
            this.props.savedata(model);
        }
        this.resetForm();

    }
    resetForm = () => {
        this.setState(() => this.initialInput)
        this.setState({ selectedFile: null })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        //console.log(event.target.files[0])
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const { idVenue, nameVenue, location, ambiance, capacity, priceVenue, detailVenue} = this.state;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>   Input Venue</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm}>
                        <ModalBody>
                            <Input name='idVenue' id="idVenue" value={idVenue} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameVenue">Product Name</Label>
                                <Input type="text" name="nameVenue" id="nameVenue"
                                    placeholder="Enter venue name" autoComplete='off'
                                    value={nameVenue} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="select" name="location" id="location"
                                    placeholder="Enter venue location"
                                    autoComplete='off'
                                    value={location} onChange={this.handleChange}>
                                    <option value=''>Select one</option>
                                    <option value='Jakarta'>Jakarta</option>
                                    <option value='Bandung'>Bandung</option>
                                    <option value='Tangerang Selatan'>Tangerang Selatan</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="ambiance">Ambiance</Label>
                                <Input type="select" name="ambiance" id="ambiance"
                                    placeholder="Enter venue ambiance"
                                    autoComplete='off'
                                    value={ambiance} onChange={this.handleChange}>
                                    <option value=''>Select one</option>
                                    <option value='Indoor'>Indoor</option>
                                    <option value='Outdoor'>outdoor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="capacity">Capacity</Label>
                                <Input type="text" name="capacity" id="capacity"
                                    placeholder="Enter venue capacity"
                                    autoComplete='off'
                                    value={capacity} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="priceVenue">Price</Label>
                                <Input type="text" name="priceVenue" id="priceVenue"
                                    placeholder="Enter venue price"
                                    autoComplete='off'
                                    value={priceVenue} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailVenue">Detail</Label>
                                <Input type="textarea" name="detailVenue" id="detailVenue"
                                    autoComplete='off'
                                    value={detailVenue} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageVenue">Image</Label>
                                <CustomInput type="file" name="imageVenue" id="imageVenue"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {
                                    this.state.selectedFile ?
                                        <img hidden={!this.state.selectedFile} src={url} alt="imageVenue" style={{ width: "160px", height: "90px" }} />
                                        : ""
                                }
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
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

export default ModalPostVenue;
