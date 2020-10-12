import React, { Fragment } from 'react';
import { Form, FormGroup, Label, FormText, CustomInput, Button } from 'reactstrap';
import axios from 'axios';

export default class Coba extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameStaff: "",
            selectedFile: null,
            photo:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange = (event) => {
        this.setState({ nameStaff: event.target.value })
    }

    handleChangeImage = (event) => {
        this.setState({ selectedFile: event.target.files })
    }

    submitForm = async (event) => {
        event.preventDefault();
        const data = new FormData();
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('files',this.state.selectedFile[x])
        }
        const dataImage= await axios.post("http://localhost:1212/v1/app/uploadMultipleFiles", data)
        console.log(dataImage);
        console.log(dataImage.data[0].fileName)
        this.setState({photo: dataImage.data});
    }
    render() {
        return (
            <Fragment>
                <Form onSubmit={this.submitForm}>
                    <FormGroup>
                        <Label for="profile">Photo Profile</Label>
                        <CustomInput type="file" name="profile" id="profile" multiple
                            onChange={this.handleChangeImage} />
                        <FormText color="muted">
                            maximum file size 2 MB</FormText>
                    </FormGroup>
                    <Button className="btn-pill btn-lg btn-shadow mt-1" style={{ background: "#C0D39A", border: "none", color: "currentcolor" }}
                        type="submit">
                        Submit
                    </Button>
                </Form>

                {
                    this.state.photo.map((pho,index)=>(
                        <img key={index} alt="coba" src={`http://localhost:1212/v1/app/downloadFile/${pho.fileName}`}></img>
                    ))
                }
            </Fragment>
        )
    }
}