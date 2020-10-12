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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo, faUtensils } from "@fortawesome/free-solid-svg-icons";

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
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.setState({
      idCatering: this.props.editCatering.idCatering,
      nameCatering: this.props.editCatering.nameCatering,
      styleCatering: this.props.editCatering.styleCatering,
      portionCatering: this.props.editCatering.portionCatering,
      imageCatering: this.props.editCatering.imageCatering,
      priceCatering: this.props.editCatering.priceCatering,
      detailCatering: this.props.editCatering.detailCatering,
    });
  }
  submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    if (this.state.selectedFile === null) {
      const model = {
        idCatering: this.props.editCatering.idCatering,
        nameCatering: this.state.nameCatering
          ? this.state.nameCatering
          : this.props.editCatering.nameCatering,
        styleCatering: this.state.styleCatering
          ? this.state.styleCatering
          : this.props.editCatering.styleCatering,
        portionCatering: this.state.portionCatering
          ? this.state.portionCatering
          : this.props.editCatering.portionCatering,
        imageCatering: this.state.imageCatering
          ? this.state.imageCatering
          : this.props.editCatering.imageCatering,
        priceCatering: this.state.priceCatering
          ? this.state.priceCatering
          : this.props.editCatering.priceCatering,
        detailCatering: this.state.detailCatering
          ? this.state.detailCatering
          : this.props.editCatering.detailCatering,
      };
      this.props.savedata(model);
      this.reset();
    } else {
      const image = await axios.post(
        "http://localhost:1212/v1/app/uploadFile",
        formData
      );
      if (image) {
        const model = {
          idCatering: this.props.editCatering.idCatering,
          nameCatering: this.state.nameCatering
            ? this.state.nameCatering
            : this.props.editCatering.nameCatering,
          styleCatering: this.state.styleCatering
            ? this.state.styleCatering
            : this.props.editCatering.styleCatering,
          portionCatering: this.state.portionCatering
            ? this.state.portionCatering
            : this.props.editCatering.portionCatering,
          imageCatering: image.data.fileName,
          priceCatering: this.state.priceCatering
            ? this.state.priceCatering
            : this.props.editCatering.priceCatering,
          detailCatering: this.state.detailCatering
            ? this.state.detailCatering
            : this.props.editCatering.detailCatering,
        };
        this.props.savedata(model);
        this.reset();
      }
    }
  };
  reset = () => {
    this.setState({
      idCatering: "",
      nameCatering: "",
      styleCatering: "",
      portionCatering: "",
      imageCatering: "",
      priceCatering: "",
      detailCatering: "",
      selectedFile: null,
    });
  };
  resetForm = () => {
    this.setState({
      idCatering: this.props.editCatering.idCatering,
      nameCatering: this.props.editCatering.nameCatering,
      styleCatering: this.props.editCatering.styleCatering,
      portionCatering: this.props.editCatering.portionCatering,
      imageCatering: this.props.editCatering.imageCatering,
      priceCatering: this.props.editCatering.priceCatering,
      detailCatering: this.props.editCatering.detailCatering,
      selectedFile: null,
    });
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

    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          editCatering={this.props.editCatering}
        >
          <ModalHeader
            toggle={this.props.toggle}
            close={closeBtn}
            style={{ backgroundColor: "#C0D39A" }}
          >
            <FontAwesomeIcon icon={faUtensils} />
            <span> Edit Catering</span>
          </ModalHeader>
          <Form onReset={this.resetForm} onSubmit={this.submitForm}>
            <ModalBody>
              <Input
                name="idCatering"
                id="idCateringEdit"
                onChange={this.handleChange}
                defaultValue={this.props.editCatering.idCatering}
                hidden
              />
              <FormGroup>
                <Label for="nameCateringEdit">Catering Name</Label>
                <Input
                  type="text"
                  name="nameCatering"
                  id="nameCateringEdit"
                  placeholder="Catering Name"
                  autoComplete="off"
                  onChange={this.handleChange}
                  defaultValue={this.props.editCatering.nameCatering}
                />
              </FormGroup>
              <FormGroup>
                <Label for="styleCateringEdit">Style</Label>
                <Input
                  type="select"
                  name="styleCatering"
                  id="styleCateringEdit"
                  autoComplete="off"
                  onChange={this.handleChange}
                  defaultValue={this.props.editCatering.styleCatering}
                >
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
                  onChange={this.handleChange}
                  defaultValue={this.props.editCatering.portionCatering}
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
                  onChange={this.handleChange}
                  defaultValue={this.props.editCatering.priceCatering}
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
                  onChange={this.handleChange}
                  defaultValue={this.props.editCatering.detailCatering}
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
                <img
                  src={
                    this.state.selectedFile
                      ? URL.createObjectURL(this.state.selectedFile)
                      : `http://localhost:1212/v1/app/downloadFile/${this.props.editCatering.imageCatering}`
                  }
                  alt="coba"
                  style={{ width: "150px", height: "auto" }}
                />
                <FormText>
                  {this.state.selectedFile
                    ? this.state.selectedFile.name
                    : this.props.editCatering.imageCatering}
                </FormText>
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
