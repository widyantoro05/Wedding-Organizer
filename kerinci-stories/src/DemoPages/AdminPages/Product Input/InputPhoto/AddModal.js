import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, CustomInput
} from 'reactstrap';

import {
    faCamera, faSave, faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class ModalPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idPhoto: "",
            namePhoto: "",
            themePhoto: "",
            pricePhoto: "",
            detailPhoto: "",
            imagePhoto: "",
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    initialInput = {
        idPhoto: "",
        namePhoto: "",
        themePhoto: "",
        pricePhoto: "",
        detailPhoto: "",
        imagePhoto: ""
    }
    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        //console.log(this.state.selectedFile);
        const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
        if (dataImage) {
            const model = {
                idPhoto: this.state.idPhoto,
                namePhoto: this.state.namePhoto,
                themePhoto: this.state.themePhoto,
                pricePhoto: this.state.pricePhoto,
                detailPhoto: this.state.detailPhoto,
                imagePhoto: dataImage.data.fileName
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
        const { idPhoto, namePhoto, themePhoto, pricePhoto, detailPhoto } = this.state;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faCamera} />
                        <span>   Input Photograpy and Videography</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idPhoto' id="idPhoto" value={idPhoto} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="namePhoto">Product Name</Label>
                                <Input type="text" name="namePhoto" id="namePhoto"
                                    placeholder="Enter product name" autoComplete='off'
                                    value={namePhoto} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="themePhoto">Theme</Label>
                                <Input type="select" name="themePhoto" id="themePhoto"
                                    autoComplete='off'
                                    value={themePhoto} onChange={this.handleChange}>
                                    <option value=''>Select one</option>
                                    <option value='Indoor'>Indoor</option>
                                    <option value='Outdoor'>outdoor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="pricePhoto">Price</Label>
                                <Input type="text" name="pricePhoto" id="pricePhoto"
                                    placeholder="Enter product price"
                                    autoComplete='off'
                                    value={pricePhoto} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailPhoto">Detail</Label>
                                <Input type="textarea" name="detailPhoto" id="detailPhoto"
                                    autoComplete='off' placeholder="Add detail"
                                    value={detailPhoto} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imagePhoto">Image</Label>
                                <CustomInput type="file" name="imagePhoto" id="imagePhoto"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {
                                    this.state.selectedFile ?
                                        <img hidden={!this.state.selectedFile} src={url} alt="imagePhoto" style={{ width: "150px", height: "auto" }} />
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

export default ModalPhoto;
