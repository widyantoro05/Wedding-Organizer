import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
} from "reactstrap";
import axios from "axios";
import { faSave, faUndo, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ModalCatering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCatering: "",
      nameCatering: "",
      styleCatering: "",
      portionCatering: "",
      imageCatering: "",
      priceCatering: "",
      detailCatering: "",
      selectedFile: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  initialInput = {
    idCatering: "",
    nameCatering: "",
    styleCatering: "",
    portionCatering: "",
    imageCatering: "",
    priceCatering: "",
    detailCatering: "",
  };
  submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    console.log(this.state.selectedFile);
    const image = await axios.post(
      "http://localhost:1212/v1/app/uploadFile",
      formData
    );
    if (image) {
      const model = {
        idCatering: this.state.idCatering,
        nameCatering: this.state.nameCatering,
        styleCatering: this.state.styleCatering,
        portionCatering: this.state.portionCatering,
        imageCatering: image.data.fileName,
        priceCatering: this.state.priceCatering,
        detailCatering: this.state.detailCatering,
      };
      this.props.savedata(model);
    }
    this.resetForm();
  };
  resetForm = () => {
    this.setState(() => this.initialInput);
    this.setState({ selectedFile: null });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeImage = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.toggle}>
        &times;
      </button>
    );
    const {
      idCatering,
      nameCatering,
      styleCatering,
      portionCatering,
      priceCatering,
      detailCatering,
    } = this.state;

    const url = this.state.selectedFile
      ? URL.createObjectURL(this.state.selectedFile)
      : "";

    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader
            toggle={this.props.toggle}
            close={closeBtn}
            style={{ backgroundColor: "#C0D39A" }}
          >
            <FontAwesomeIcon icon={faUtensils} />
            <span> Input Catering</span>
          </ModalHeader>
          <Form onReset={this.resetForm} onSubmit={this.submitForm}>
            <ModalBody>
              <Input
                name="idCatering"
                id="idCatering"
                value={idCatering}
                onChange={this.handleChange}
                hidden
              />
              <FormGroup>
                <Label for="nameCatering">Catering Name</Label>
                <Input
                  type="text"
                  name="nameCatering"
                  id="nameCatering"
                  placeholder="Catering Name"
                  autoComplete="off"
                  value={nameCatering}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="styleCatering">Style</Label>
                <Input
                  type="select"
                  name="styleCatering"
                  id="styleCatering"
                  autoComplete="off"
                  value={styleCatering}
                  onChange={this.handleChange}
                >
                  <option value="">Select one</option>
                  <option value="Padangnese">Padangnese</option>
                  <option value="Sundanese">Sundanese</option>
                  <option value="Javanese">Javanese</option>
                  <option value="Balinese">Balinese</option>
                  <option value="Western">Western</option>
                  <option value="MiddleEastern">Middle Eastern</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="portionCatering">Portion</Label>
                <Input
                  type="number"
                  name="portionCatering"
                  id="portionCatering"
                  placeholder="Portion"
                  autoComplete="off"
                  value={portionCatering}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="priceCatering">Price</Label>
                <Input
                  type="number"
                  name="priceCatering"
                  id="priceCatering"
                  placeholder="IDR Price"
                  autoComplete="off"
                  value={priceCatering}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="detailCatering">Detail</Label>
                <Input
                  type="textarea"
                  name="detailCatering"
                  id="detailCatering"
                  placeholder="Detail Catering"
                  autoComplete="off"
                  value={detailCatering}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageCatering">Image</Label>
                <CustomInput
                  type="file"
                  name="imageCatering"
                  id="imageCatering"
                  onChange={this.handleChangeImage}
                />
                <FormText color="muted">maximum file size 2 MB</FormText>
                {this.state.selectedFile ? (
                  <img
                    hidden={!this.state.selectedFile}
                    src={url}
                    alt="imageCatering"
                    style={{ width: "150px", height: "auto" }}
                  />
                ) : (
                  ""
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-pill btn-lg btn-shadow mt-1"
                style={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  color: "currentcolor",
                }}
                type="reset"
              >
                <FontAwesomeIcon icon={faUndo} />
                <span> Reset</span>
              </Button>
              <Button
                className="btn-pill btn-lg btn-shadow mt-1"
                style={{
                  background: "#C0D39A",
                  border: "none",
                  color: "currentcolor",
                }}
                type="submit"
                onClick={this.props.toggle}
              >
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

export default ModalCatering;
