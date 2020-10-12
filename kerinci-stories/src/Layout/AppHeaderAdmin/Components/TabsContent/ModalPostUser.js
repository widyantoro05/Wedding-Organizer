import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import axios from 'axios';

class ModalPostUser extends React.Component {
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
        // const model = {
        //     idDam: this.state.idDam,
        //     nameDam: this.state.nameDam,
        //     styleDam: this.state.styleDam,
        //     priceDam: this.state.priceDam,
        //     detailDam: this.state.detailDam
        // }
        // const damImage = {
        //     imageDam: this.state.imageDam
        // }
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile
        )
        console.log(this.state.selectedFile)
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
            console.log(dataImage)
            console.log(this.state.idDam);
            axios.post("http://localhost:1212/v1/app/dam", model)
            .then(response=>{
                alert(response.data.message)
            })
        }

    }
    resetForm = () => {
        this.setState(() => this.initialInput)
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const { idDam, nameDam, styleDam, priceDam, detailDam, imageDam } = this.state;
        const url = this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : ''

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Modal {...this.props}>
                    <ModalHeader toggle={this.props.toggle} close={closeBtn}>Input Dress, Attire, and Makeup</ModalHeader>
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
                                    <option value='Moder'>Modern</option>
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
                                <Input type="file" name="imageDam" id="imageDam"
                                    onChange={this.handleChangeImage} />
                                <FormText color="muted">
                                    maximum file size 2 MB
                                                </FormText>
                                <img hidden={!this.state.selectedFile} src={url} alt="image" style={{ width: '20%', height: 'auto' }} />
                                <FormText color="muted">
                                    file name: this.state.selectedFile.name
                                </FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" type='reset' className="mt-1">Reset</Button>
                            <Button color="primary" type='submit' className="mt-1" onClick={this.props.toggle}>Submit</Button>{' '}
                        </ModalFooter>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default ModalPostUser;
