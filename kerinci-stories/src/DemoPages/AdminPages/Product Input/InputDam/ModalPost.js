import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, CustomInput
} from 'reactstrap';
import axios from 'axios';
import { faSave, faUndo, faTshirt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ModalPostDam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idDam: '',
            nameDam: '',
            styleDam: '',
            priceDam: '',
            detailDam: '',
            imageDam: '',
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }
    initialInput = {
        idDam: '',
        nameDam: '',
        styleDam: '',
        priceDam: '',
        detailDam: '',
        imageDam: ''
    }
    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        )
        const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
        if (dataImage) {
            const model = {
                idDam: this.state.idDam,
                nameDam: this.state.nameDam,
                styleDam: this.state.styleDam,
                priceDam: this.state.priceDam,
                detailDam: this.state.detailDam,
                imageDam: dataImage.data.fileName
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
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const { idDam, nameDam, styleDam, priceDam, detailDam } = this.state;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faTshirt} />
                        <span>   Input Dress, Attire, and Makeup</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idDam' id="idDam" value={idDam} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameDam">Product Name</Label>
                                <Input type="text" name="nameDam" id="nameDam"
                                    placeholder="Enter product's name" autoComplete='off'
                                    value={nameDam} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="styleDam">Style</Label>
                                <Input type="select" name="styleDam" id="styleDam"
                                    autoComplete='off'
                                    value={styleDam} onChange={this.handleChange}>
                                    <option value=''>Select one</option>
                                    <option value='Modern'>Modern</option>
                                    <option value='Traditional'>Traditional</option>
                                    <option value='Hijab'>Hijab</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="priceDam">Price</Label>
                                <Input type="text" name="priceDam" id="priceDam"
                                    placeholder="Enter product's price"
                                    autoComplete='off'
                                    value={priceDam} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailDam">Detail</Label>
                                <Input type="textarea" name="detailDam" id="detailDam"
                                    placeholder="Enter product's detail" autoComplete='off'
                                    value={detailDam} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageDam">Image</Label>
                                <CustomInput type="file" name="imageDam" id="imageDam"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {this.state.selectedFile ?
                                    <img hidden={!this.state.selectedFile} src={url} alt="attire" style={{ width: '20%', height: 'auto' }} />
                                    : ""}
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

export default ModalPostDam;
