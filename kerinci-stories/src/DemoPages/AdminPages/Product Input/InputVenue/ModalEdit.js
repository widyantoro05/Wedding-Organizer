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

class ModalEditVenue extends React.Component {
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
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        this.setState({
            idVenue: this.props.editVenue.idVenue,
            nameVenue: this.props.editVenue.nameVenue,
            location: this.props.editVenue.location,
            ambiance: this.props.editVenue.ambiance,
            capacity: this.props.editVenue.capacity,
            priceVenue: this.props.editVenue.priceVenue,
            detailVenue: this.props.editVenue.detailVenue,
            imageVenue: this.props.editVenue.imageVenue
        })
    }
    submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        );
        // console.log(this.state.selectedFile);
        if (this.state.selectedFile === null) {
            // console.log(this.state)
            const model = {
                idVenue: this.props.editVenue.idVenue,
                nameVenue: this.state.nameVenue ? this.state.nameVenue : this.props.editVenue.nameVenue,
                location: this.state.location ? this.state.location : this.props.editVenue.location,
                ambiance: this.state.ambiance ? this.state.ambiance : this.props.editVenue.ambiance,
                capacity: this.state.capacity ? this.state.capacity : this.props.editVenue.capacity,
                priceVenue: this.state.priceVenue ? this.state.priceVenue : this.props.editVenue.priceVenue,
                detailVenue: this.state.detailVenue ? this.state.detailVenue : this.props.editVenue.detailVenue,
                imageVenue: this.state.imageVenue ? this.state.imageVenue : this.props.editVenue.imageVenue
            }
            this.props.savedata(model);
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const model = {
                    idVenue: this.props.editVenue.idVenue,
                    nameVenue: this.state.nameVenue ? this.state.nameVenue : this.props.editVenue.nameVenue,
                    location: this.state.location ? this.state.location : this.props.editVenue.location,
                    ambiance: this.state.ambiance ? this.state.ambiance : this.props.editVenue.ambiance,
                    capacity: this.state.capacity ? this.state.capacity : this.props.editVenue.capacity,
                    priceVenue: this.state.priceVenue ? this.state.priceVenue : this.props.editVenue.priceVenue,
                    detailVenue: this.state.detailVenue ? this.state.detailVenue : this.props.editVenue.detailVenue,
                    imageVenue: dataImage.data.fileName
                }
                this.props.savedata(model);
            }
        }

    }
    resetForm = () => {
        this.setState({
            idVenue: this.props.editVenue.idVenue,
            nameVenue: this.props.editVenue.nameVenue,
            location: this.props.editVenue.location,
            ambiance: this.props.editVenue.ambiance,
            capacity: this.props.editVenue.capacity,
            priceVenue: this.props.editVenue.priceVenue,
            detailVenue: this.props.editVenue.detailVenue,
            imageVenue: this.props.editVenue.imageVenue
        })
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

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editphoto={this.props.editVenue}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>   Edit Venue</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idVenue' id="idVenue" value={this.state.idVenue} defaultValue={this.props.editVenue.idVenue}
                                onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameVenue">Product Name</Label>
                                <Input type="text" name="nameVenue" id="nameVenue"
                                    placeholder="Enter venue name" autoComplete='off'
                                    value={this.state.nameVenue} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.nameVenue} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="select" name="location" id="location"
                                    placeholder="Enter venue location"
                                    autoComplete='off'
                                    value={this.state.location} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.location}>
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
                                    value={this.state.ambiance} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.ambiance} >
                                    <option value='Indoor'>Indoor</option>
                                    <option value='Outdoor'>outdoor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="capacity">Capacity</Label>
                                <Input type="text" name="capacity" id="capacity"
                                    placeholder="Enter venue capacity"
                                    autoComplete='off'
                                    value={this.state.capacity} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.capacity} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="priceVenue">Price</Label>
                                <Input type="text" name="priceVenue" id="priceVenue"
                                    placeholder="Enter venue price"
                                    autoComplete='off'
                                    value={this.state.priceVenue} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.priceVenue} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailVenue">Detail</Label>
                                <Input type="textarea" name="detailVenue" id="detailVenue"
                                    autoComplete='off'
                                    value={this.state.detailVenue} onChange={this.handleChange}
                                    defaultValue={this.props.editVenue.detailVenue} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageVenueEdit">Image</Label>
                                <CustomInput type="file" name="imageVenue" id="imageVenueEdit"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editVenue.imageVenue}`} alt="coba" style={{ width: "160px", height: "90px" }} />
                                <FormText>
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editVenue.imageVenue
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

export default ModalEditVenue;
