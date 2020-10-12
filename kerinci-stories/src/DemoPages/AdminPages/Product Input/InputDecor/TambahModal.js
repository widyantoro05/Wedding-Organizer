import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText,CustomInput
} from 'reactstrap';
import {
    faMagic, faSave, faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class TambahModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idDecor: "",
            nameDecor: "",
            styleDecor: "",
            priceDecor: "",
            detailDecor: "",
            imageDecor: "",
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    initialInput = {
        idDecor: "",
        nameDecor: "",
        styleDecor: "",
        priceDecor: "",
        detailDecor: "",
        imageDecor: ""
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
                idDecor: this.state.idDecor,
                nameDecor: this.state.nameDecor,
                styleDecor: this.state.styleDecor,
                priceDecor: this.state.priceDecor,
                detailDecor: this.state.detailDecor,
                imageDecor: dataImage.data.fileName
            }
            this.props.savedata(model);
            this.resetForm();
            // axios.post("http://localhost:1212/v1/app/decor/inputdata", model)
            //     .then(response => {
            //         if (response.data.status === 200) {
            //             alert(response.data.message)
            //         } else {
            //             alert("gagal")
            //         }
            //     })

        }

    }
    resetForm = () => {
        this.setState(() => this.initialInput)
        this.setState({selectedFile:null})
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
        const { idDecor, nameDecor, styleDecor, priceDecor, detailDecor } = this.state;
        const url = this.state.selectedFile? URL.createObjectURL(this.state.selectedFile) :''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faMagic} />
                        <span>  Input Decoration</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idDecor' id="idDecor" value={idDecor} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameDecor">Product Name</Label>
                                <Input type="text" name="nameDecor" id="nameDecor"
                                    placeholder="Enter product name" autoComplete='off'
                                    value={nameDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="styleDecor">Style</Label>
                                <Input type="select" name="styleDecor" id="styleDecor"
                                    autoComplete='off'
                                    value={styleDecor} onChange={this.handleChange}>
                                    <option value=''>Select one</option>
                                    <option value='Modern'>Modern</option>
                                    <option value='Traditional'>Traditional</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="priceDecor">Price</Label>
                                <Input type="text" name="priceDecor" id="priceDecor"
                                    placeholder="Enter product price"
                                    autoComplete='off'
                                    value={priceDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailDecor">Detail</Label>
                                <Input type="textarea" name="detailDecor" id="detailDecor"
                                    autoComplete='off'
                                    value={detailDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageDecor">Image</Label>
                                <CustomInput type="file" name="imageDecor" id="imageDecor"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB</FormText>
                                {
                                    this.state.selectedFile ?
                                        <img hidden={!this.state.selectedFile} src={url} alt="imageDecor" style={{ width: "150px", height: "auto" }} />
                                        : ""
                                }
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="btn-pill btn-lg btn-shadow mt-1" style={{ backgroundColor: "#ffffff", border: "none", color: "currentcolor" }} type="reset">
                                <FontAwesomeIcon icon={faUndo} />
                                <span>Reset</span></Button>
                            <Button  className="btn-pill btn-lg btn-shadow mt-1" style={{ background: "#C0D39A", border: "none", color: "currentcolor" }}
                                type="submit" onClick={this.props.toggle }>
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

export default TambahModal;
