import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, CustomInput
} from 'reactstrap';
import axios from 'axios';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import {
 faSave, faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ModalEditDam extends React.Component {
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
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        this.setState({
            idDam: this.props.editdam.idDam,
            nameDam: this.props.editdam.nameDam,
            styleDam: this.props.editdam.styleDam,
            priceDam: this.props.editdam.priceDam,
            detailDam: this.props.editdam.detailDam,
            imageDam: this.props.editdam.imageDam
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
            const model = {
                idDam: this.props.editdam.idDam,
                nameDam: this.state.nameDam ? this.state.nameDam : this.props.editdam.nameDam,
                styleDam: this.state.styleDam ? this.state.styleDam : this.props.editdam.styleDam,
                priceDam: this.state.priceDam ? this.state.priceDam : this.props.editdam.priceDam,
                detailDam: this.state.detailDam ? this.state.detailDam : this.props.editdam.detailDam,
                imageDam: this.state.imageDam ? this.state.imageDam : this.props.editdam.imageDam
            }
            this.props.savedata(model);
            this.reset();
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const model = {
                    idDam: this.props.editdam.idDam,
                    nameDam: this.state.nameDam ? this.state.nameDam : this.props.editdam.nameDam,
                    styleDam: this.state.styleDam ? this.state.styleDam : this.props.editdam.styleDam,
                    priceDam: this.state.priceDam ? this.state.priceDam : this.props.editdam.priceDam,
                    detailDam: this.state.detailDam ? this.state.detailDam : this.props.editdam.detailDam,
                    imageDam: dataImage.data.fileName
                }
                this.props.savedata(model);
                this.reset();
            }
        }
    }

    reset = () => {
        this.setState({
            idDam: '',
            nameDam: '',
            styleDam: '',
            priceDam: '',
            detailDam: '',
            imageDam: '',
            selectedFile: null
        })
    }

    resetForm = () => {
        this.setState({
            idDam: this.props.editdam.idDam,
            nameDam: this.props.editdam.nameDam,
            styleDam: this.props.editdam.styleDam,
            priceDam: this.props.editdam.priceDam,
            detailDam: this.props.editdam.detailDam,
            imageDam: this.props.editdam.imageDam
        })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        //const { idDam, nameDam, styleDam, priceDam, detailDam } = this.state;
        //console.log(this.props.editdam)

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editdam={this.props.editdam}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faTshirt} />
                        <span>   Edit Dress, Attire, and Makeup</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idDam' id="idDam" onChange={this.handleChange}
                                defaultValue={this.props.editdam.idDam} hidden />
                            <FormGroup>
                                <Label for="nameDam">Product Name</Label>
                                <Input type="text" name="nameDam" id="nameDam"
                                    placeholder="Enter product's name" autoComplete='off'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editdam.nameDam} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="styleDam">style</Label>
                                <Input type="select" name="styleDam" id="styleDam"
                                    autoComplete='off' onChange={this.handleChange}
                                    defaultValue={this.props.editdam.styleDam} >
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
                                    autoComplete='off' onChange={this.handleChange}
                                    defaultValue={this.props.editdam.priceDam} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailDam">Detail</Label>
                                <Input type="textarea" name="detailDam" id="detailDam"
                                    autoComplete='off' placeholder="Enter product's detail"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editdam.detailDam} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageDam">Image</Label>
                                <CustomInput type="file" name="imageDam" id="imageDam"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editdam.imageDam}`} alt="coba" style={{ width: "20%", height: "auto" }} />
                                <FormText>
                                    file name :
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editdam.imageDam
                                    }
                                </FormText>
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
                                <span> Submit</span>
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default ModalEditDam;
