// @flow

import React, {Component} from "react"
import {Sak, sakService} from "../../service/services";
import Navbar from "../Navbar/Navbar";
import "./EndreSak.css"
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


type EndreSakProps = {
    match: {params: {id: number}};
}

type EndreSakState = {
    navn: string,
    tittel: string,
    tekst: string,
    prioritering: string,
    kategori: string,
    url: string,
    tidspunkt: string,
    synligModal: boolean,
    endret: boolean
}



class EndreSak extends Component<EndreSakProps, EndreSakState>{
    state ={
        navn: "",
        tittel: "",
        tekst: "",
        prioritering: "",
        kategori: "",
        url: "",
        tidspunkt: "",
        synligModal: false,
        endret: false
    };

    render(){
        return(
            <div>
                <Navbar/>
                <div className={"wrapperEndreSak"}>
                    <div className={"endreSakContainer"}>
                        <div className={"bildeContainer"}>
                            <img src={this.state.url} alt={this.state.tittel}/>
                        </div>
                        <div className={"tittel"}>
                            <h1>{this.state.tittel}</h1>
                        </div>
                        <div className={"info"}>
                            <p><strong>Journalist</strong> {this.state.navn} <br/><br/> <strong>Publisert</strong> {this.state.tidspunkt}</p>
                        </div>
                        <div className={"endreOverskrift"}>
                            <h3>Endre sak</h3>
                        </div>

                        {/* INPUT-FELT */}

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
                                    <label>Journalist</label>
                                    <input className={"form-control"}
                                           type={"navn"}
                                           name="navn"
                                           defaultValue={this.state.navn}
                                           onChange={this.handleTextChange.bind(this)}
                                           placeholder={"Journalist..."}/>
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
                                            <input type={"radio"} defaultValue={"prioritering1"}
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
                                        disabled={this.state.endret === false}>Endre sak
                                </button>
                            </form>



                            {/* MODAL */}

                            <Modal show={this.state.synligModal} onHide={() => {}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Suksess!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Saken ble endret</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => {this.setSynligmodal(); window.location.href="/"}}>
                                        Ok
                                    </Button>

                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>

        )
    }

    handleDropdownChange = (event: any) => {
        let value: string = event.target.value;
        this.setState({
            kategori: value,
            endret: true
        });

    };

    handleRadioChange = (event: any) => {
        let value: string = event.target.value;
        this.setState({
            prioritering: value,
            endret: true
        })
    };

    handleTextChange = (event: any) => {
        event.preventDefault();

        const name: string = event.target.name;
        const value: number = event.target.value;

        this.setState({
            [name]: value,
            endret: true
        })
    };

    setSynligmodal(){
        this.setState({
            synligModal: !this.state.synligModal
        })
    };

    onSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let idag: Date = new Date();
        let dato: string = idag.getDate()+"-"+(idag.getMonth()+1)+"-"+idag.getFullYear();
        let tid: string = idag.getHours()+":"+idag.getMinutes();
        let datoTidspunkt: string = dato+" " + tid;
        let sak: Sak = new Sak(this.state.navn, this.state.tittel, this.state.tekst, this.state.prioritering, this.state.kategori, this.state.url, datoTidspunkt);
        sakService.endreSak(sak, this.props.match.params.id).then(() => {this.setSynligmodal()}).catch(error => console.error(error.message));
    };

    componentDidMount() {
        window.scrollTo(0,0);
        sakService.getSak(this.props.match.params.id).then(sak => {
            this.setState({
                navn: sak[0].navn,
                tittel: sak[0].tittel,
                tekst: sak[0].tekst,
                prioritering: sak[0].prioritering,
                kategori: sak[0].kategori,
                url: sak[0].url,
                tidspunkt: sak[0].tidspunkt,
            });
        });
    }
}


export default EndreSak;