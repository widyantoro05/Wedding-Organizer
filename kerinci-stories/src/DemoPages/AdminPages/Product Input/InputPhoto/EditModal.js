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
            idPhoto: '',
            namePhoto: '',
            themePhoto: '',
            pricePhoto: '',
            detailPhoto: '',
            imagePhoto: '',
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.reset=this.reset.bind(this);
        
    }
    componentDidMount() {
        this.setState({
            idPhoto: this.props.editphoto.idPhoto,
            namePhoto: this.props.editphoto.namePhoto,
            themePhoto: this.props.editphoto.themePhoto,
            pricePhoto: this.props.editphoto.pricePhoto,
            detailPhoto: this.props.editphoto.detailPhoto,
            imagePhoto: this.props.editphoto.imagePhoto
        })
    }
    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        //console.log(this.state.selectedFile);
        if (this.state.selectedFile === null) {
            //console.log(this.state)
            const model = {
                idPhoto: this.props.editphoto.idPhoto,
                namePhoto: this.state.namePhoto ? this.state.namePhoto : this.props.editphoto.namePhoto,
                themePhoto: this.state.themePhoto ? this.state.themePhoto : this.props.editphoto.themePhoto,
                pricePhoto: this.state.pricePhoto ? this.state.pricePhoto : this.props.editphoto.pricePhoto,
                detailPhoto: this.state.detailPhoto ? this.state.detailPhoto : this.props.editphoto.detailPhoto,
                imagePhoto: this.state.imagePhoto ? this.state.imagePhoto : this.props.editphoto.imagePhoto
            }
            this.props.savedata(model);
            this.reset();
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const model = {
                    idPhoto: this.props.editphoto.idPhoto,
                    namePhoto: this.state.namePhoto ? this.state.namePhoto : this.props.editphoto.namePhoto,
                    themePhoto: this.state.themePhoto ? this.state.themePhoto : this.props.editphoto.themePhoto,
                    pricePhoto: this.state.pricePhoto ? this.state.pricePhoto : this.props.editphoto.pricePhoto,
                    detailPhoto: this.state.detailPhoto ? this.state.detailPhoto : this.props.editphoto.detailPhoto,
                    imagePhoto: dataImage.data.fileName
                }
                this.props.savedata(model);
                this.reset();
            }
        }

    }
    reset(){
        this.setState({
            idPhoto: '',
            namePhoto: '',
            themePhoto: '',
            pricePhoto: '',
            detailPhoto: '',
            imagePhoto: '',
            selectedFile: null
        })
    }

    resetForm = () => {
        this.setState({
            idPhoto: this.props.editphoto.idPhoto,
            namePhoto: this.props.editphoto.namePhoto,
            themePhoto: this.props.editphoto.themePhoto,
            pricePhoto: this.props.editphoto.pricePhoto,
            detailPhoto: this.props.editphoto.detailPhoto,
            imagePhoto: this.props.editphoto.imagePhoto,
            selectedFile: null
        })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //console.log(event.target.value)
    }
    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        //console.log(event.target.files[0])
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        //const { idPhoto, namePhoto, themePhoto, pricePhoto, detailPhoto } = this.state;
        //console.log(this.props.editphoto)

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editphoto={this.props.editphoto}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faCamera} />
                        <span>   Edit Photograpy and Videography</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idPhoto' id="idPhotoEdit" onChange={this.handleChange}
                                defaultValue={this.props.editphoto.idPhoto} hidden />
                            <FormGroup>
                                <Label for="namePhotoEdit">Product Name</Label>
                                <Input type="text" name="namePhoto" id="namePhotoEdit"
                                    placeholder="Enter product name" autoComplete='off'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.editphoto.namePhoto} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="themePhotoEdit">Theme</Label>
                                <Input type="select" name="themePhoto" id="themePhotoEdit"
                                    autoComplete='off' onChange={this.handleChange}
                                    defaultValue={this.props.editphoto.themePhoto} >
                                    {/* <option value=''>Select one</option> */}
                                    <option value='Indoor'>Indoor</option>
                                    <option value='Outdoor'>outdoor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="pricePhotoEdit">Price</Label>
                                <Input type="text" name="pricePhoto" id="pricePhotoEdit"
                                    placeholder="Enter product price"
                                    autoComplete='off' onChange={this.handleChange}
                                    defaultValue={this.props.editphoto.pricePhoto} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailPhotoEdit">Detail</Label>
                                <Input type="textarea" name="detailPhoto" id="detailPhotoEdit"
                                    autoComplete='off' onChange={this.handleChange}
                                    defaultValue={this.props.editphoto.detailPhoto} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imagePhotoEdit">Image</Label>
                                <CustomInput type="file" name="imagePhoto" id="imagePhotoEdit"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editphoto.imagePhoto}`} alt="coba" style={{ width: "150px", height: "auto" }} />
                                <FormText>
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editphoto.imagePhoto
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
