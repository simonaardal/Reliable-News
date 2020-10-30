// @flow

import React, {Component} from "react"
import {sakService, Sak} from "../../service/services.js"
import Navbar from "../Navbar/Navbar";
import "./RegistrationForm.css"
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


type RegistrationFormState = {
    navn: string,
    tittel: string,
    tekst: string,
    prioritering: string,
    kategori: string,
    url: string,
    synligModal: boolean
}

class RegistrationForm extends Component<{}, RegistrationFormState> {
    state = {
        navn: "",
        tittel: "",
        tekst: "",
        prioritering: 'prioritering1',
        kategori: "ingenKategori",
        url: "",
        synligModal: false
    };

    render() {
        return (
            <div>
                <Navbar/>
                <div className={"formContainer"}>
                    <div>
                        <h1 className={"overskrift"}>Registrer en sak</h1>
                    </div>
                    <div>
                        <form>
                            <div className={"form-group"}>
                                <label>Tittel</label>
                                <input className={"form-control"}
                                       type={"tittel"}
                                       name="tittel"
                                       defaultValue={this.state.tittel}
                                       onChange={this.handleTextChange.bind(this)}
                                       placeholder={"Tittel..."}/>
                            </div>

                            <div className={"form-group"}>
                                <label>Navn</label>
                                <input className={"form-control"}
                                       type={"navn"}
                                       name="navn"
                                       defaultValue={this.state.navn}
                                       onChange={this.handleTextChange.bind(this)}
                                       placeholder={"Navn..."}/>
                            </div>


                            <div className={"form-group"}>
                                <label>Tekst</label>
                                <textarea name="tekst" defaultValue={this.state.tekst}
                                          onChange={this.handleTextChange.bind(this)}
                                          className={"form-control"} placeholder={"Tekst..."} rows={"10"}/>
                            </div>


                            <div className={"form-group"}>
                                <label>Prioritering</label>
                                <div className={"radio"}>
                                    <label>
                                        <input type={"radio"} value={"prioritering1"}
                                               checked={this.state.prioritering === "prioritering1"}
                                               onChange={this.handleRadioChange}/>1
                                    </label>
                                </div>
                                <div className={"radio"}>
                                    <label>
                                        <input type={"radio"} value={"prioritering2"}
                                               checked={this.state.prioritering === "prioritering2"}
                                               onChange={this.handleRadioChange}/>2
                                    </label>
                                </div>
                            </div>

                            <div className={"form-group"}>
                                <label>Kategori</label>
                                <select
                                    value={this.state.kategori}
                                    onChange={this.handleDropdownChange}
                                    className={"form-control"}
                                    name={"dropKategori"}>

                                    <option value={"ingenKategori"}>Velg kategori</option>
                                    <option value={"underholdning"}>Underholdning</option>
                                    <option value={"politikk"}>Politikk</option>
                                    <option value={"sport"}>Sport</option>
                                </select>
                            </div>

                            <div className={"form-group"}>
                                <label>Bilde-URL</label>
                                <input className={"form-control"}
                                       type={"url"}
                                       name="url"
                                       value={this.state.url}
                                       onChange={this.handleTextChange.bind(this)}
                                       placeholder={"Bilde-URL..."}/>
                            </div>


                            <button type="button"
                                    id={"submitBtn"}
                                    className="btn btn-primary"
                                    onClick={(event) => this.onSubmit(event)}
                                    disabled={this.state.navn === "ingenKategori" || this.state.tittel === ""
                                    || this.state.tekst === "" || this.state.prioritering === "" || this.state.kategori === ""
                                    || this.state.url === ""}>Legg til sak
                            </button>
                        </form>



                        <Modal show={this.state.synligModal} onHide={() => {this.toggleModal()}}>
                            <Modal.Header closeButton>
                                <Modal.Title>Suksess</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Saken din ble registrert!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => {this.toggleModal(); window.location.href="/"}}>
                                    Ok!
                                </Button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    toggleModal(){
        this.setState({
            synligModal: !this.state.synligModal
        })
    }

    handleDropdownChange = (event:any) => {
        this.setState({
            kategori: event.target.value
        });
    };

    handleRadioChange = (event:any) => {
        this.setState({
            prioritering: event.target.value
        })
    };

    handleTextChange = (event:any) => {
        event.preventDefault();
        const name: string = event.target.name;
        const value: string = event.target.value;

        this.setState({
            [name]: value
        });
    };


    onSubmit = (event:any) => {
        event.preventDefault();
        let idag: Date = new Date();
        let dato: string = idag.getDate()+"-"+(idag.getMonth()+1)+"-"+idag.getFullYear();
        let tid: string = idag.getHours()+":"+idag.getMinutes();
        let datoTidspunkt: string = dato+" " + tid;
        let sak: Sak = new Sak(this.state.navn, this.state.tittel, this.state.tekst, this.state.prioritering, this.state.kategori, this.state.url, datoTidspunkt);
        sakService.opprettSak(sak).then(() => {this.toggleModal()}).catch(error => console.error(error.message));
    }
}

export default RegistrationForm;