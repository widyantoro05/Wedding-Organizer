import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText,CustomInput
} from 'reactstrap';
import axios from 'axios';
import {
    faMagic, faSave, faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class ModalEditDecor extends React.Component {
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
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        this.setState({
            idDecor: this.props.editdecor.idDecor,
            nameDecor: this.props.editdecor.nameDecor,
            styleDecor: this.props.editdecor.styleDecor,
            priceDecor: this.props.editdecor.priceDecor,
            detailDecor: this.props.editdecor.detailDecor,
            imageDecor: this.props.editdecor.imageDecor
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
                idDecor: this.props.editdecor.idDecor,
                nameDecor: this.state.nameDecor ? this.state.nameDecor : this.props.editdecor.nameDecor,
                styleDecor: this.state.styleDecor ? this.state.styleDecor : this.props.editdecor.styleDecor,
                priceDecor: this.state.priceDecor ? this.state.priceDecor : this.props.editdecor.priceDecor,
                detailDecor: this.state.detailDecor ? this.state.detailDecor : this.props.editdecor.detailDecor,
                imageDecor: this.state.imageDecor ? this.state.imageDecor : this.props.editdecor.imageDecor
            }
            this.props.savedata(model)
            // axios.post("http://localhost:1212/v1/app/decor/inputdata", model)
            //     .then(response => {
            //         if (response.data.status === 200) {
            //             alert(response.data.message)
            //         } else {
            //             alert("gagal")
            //         }
            //     })

            //console.log(model)
        } else {
            const dataImage = await axios.post("http://localhost:1212/v1/app/uploadFile", formData)
            if (dataImage) {
                const model = {
                    idDecor: this.props.editdecor.idDecor,
                    nameDecor: this.state.nameDecor ? this.state.nameDecor : this.props.editdecor.nameDecor,
                    styleDecor: this.state.styleDecor ? this.state.styleDecor : this.props.editdecor.styleDecor,
                    priceDecor: this.state.priceDecor ? this.state.priceDecor : this.props.editdecor.priceDecor,
                    detailDecor: this.state.detailDecor ? this.state.detailDecor : this.props.editdecor.detailDecor,
                    imageDecor: dataImage.data.fileName
                   
                }
                this.props.savedata(model)
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
    }
    resetForm = () => {
        this.setState({
            idDecor: this.props.editdecor.idDecor,
            nameDecor: this.props.editdecor.nameDecor,
            styleDecor: this.props.editdecor.styleDecor,
            priceDecor: this.props.editdecor.priceDecor,
            detailDecor: this.props.editdecor.detailDecor,
            imageDecor: this.props.editdecor.imageDecor
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
        // const { idDecor, nameDecor, styleDecor, priceDecor, detailDecor, imageDecor } = this.state;
        return(
            < span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} editdecor={this.props.editdecor}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                        <FontAwesomeIcon icon={faMagic} />
                        <span> Edit Decoration</span>
                    </ModalHeader>
                    <Form onReset={this.resetForm} onSubmit={this.submitForm} >
                        <ModalBody>
                            <Input name='idDecor' id="idDecor" defaultValue={this.props.editdecor.idDecor} onChange={this.handleChange} hidden />
                            <FormGroup>
                                <Label for="nameDecor">Product Name</Label>
                                <Input type="text" name="nameDecor" id="nameDecor"
                                    placeholder="Enter product name" autoComplete='off'
                                    defaultValue={this.props.editdecor.nameDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="styleDecor">Style</Label>
                                <Input type="select" name="styleDecor" id="styleDecor"
                                    autoComplete='off'
                                    defaultValue={this.props.editdecor.styleDecor} onChange={this.handleChange}>
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
                                    defaultValue={this.props.editdecor.priceDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="detailDecor">Detail</Label>
                                <Input type="textarea" name="detailDecor" id="detailDecor"
                                    autoComplete='off'
                                    defaultValue={this.props.editdecor.detailDecor} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageDecor">Image</Label>
                                <CustomInput type="file" name="imageDecor" id="imageDecor"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                </FormText>
                                <img src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : `http://localhost:1212/v1/app/downloadFile/${this.props.editdecor.imageDecor}`} alt="coba" style={{ width: "150px", height: "auto" }} />
                                <FormText>
                                    {
                                        this.state.selectedFile ? this.state.selectedFile.name : this.props.editdecor.imageDecor
                                    }
                                </FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="btn-pill btn-lg btn-shadow mt-1"
                                style={{ backgroundColor: "#ffffff", border: "none", color: "currentcolor" }} type="reset">
                                 <FontAwesomeIcon icon={faUndo} />
                                 <span>Reset</span></Button>
                            <Button color="primary" type='submit' className="btn-pill btn-lg btn-shadow mt-1"
                                style={{ background: "#C0D39A", border: "none", color: "currentcolor" }}
                                type="submit" onClick={this.props.toggle}>
                                <FontAwesomeIcon icon={faSave} />
                                <span>Submit</span>
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default ModalEditDecor;
