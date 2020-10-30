// @flow

import React, {Component} from "react"
import {Kommentar, sakService} from "../../service/services";
import "./Sakside.css"
import Navbar from "../Navbar/Navbar";
import rediger from "../../res/rediger.png"
import slett from "../../res/slett.png"
import fblike from "../../res/fblike.jpg"
import dislike from "../../res/dislike.png"
import Footer from "../Footer/Footer";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";



type SaksideState = {
    sak: any,
    kommentarer: Kommentar[],
    navn: string,
    kommentar:string,
    likes:string,
    dislikes:string,
    synligAlert:boolean,
    synligSlettModal:boolean,
    synligKommentarModal: boolean,
    harLikt: boolean,
    harMislikt: boolean
}

type SaksideProps = {
    match:{params: {id: number}}
}


class Sakside extends Component<SaksideProps, SaksideState>{
    state = {
        sak: {},
        kommentarer: [],
        navn: "",
        kommentar: "",
        likes: "",
        dislikes: "",
        synligAlert: false,
        synligSlettModal: false,
        synligKommentarModal: false,
        harLikt: false,
        harMislikt: false
    };

    render(){
        return(
            <div>
                <Navbar/>
                    <div className={"wrapperSakside"}>
                        <div className={"sakContainer"}>
                            <div className={"bildeContainer"}>
                                <img src={this.state.sak.url} alt={this.state.sak.tittel}/>
                            </div>
                            <div className={"tittel"}>
                                <h1>{this.state.sak.tittel}</h1>
                            </div>
                            <div className={"infoContainer"}>
                                <p><strong>Journalist</strong> {this.state.sak.navn} <br/><br/> <strong>Publisert</strong> {this.state.sak.tidspunkt}</p>
                            </div>
                            <div className={"knapperContainer"}>
                                <div className={"likebuttonsContainer"}>
                                    <button type="button" id={"likeBtn"}  onClick={() => {this.setLikt()}}><img src={fblike} width={"40px"} height={"40px"} alt={"like knapp"}/> </button>
                                    <div className={"rating"}><p>{this.state.likes}</p></div>
                                    <button type="button" id={"dislikeBtn"} onClick={() => {this.setMislikt()}}><img src={dislike} width={"40px"} height={"40px"} alt={"like knapp"}/></button>
                                    <div className={"rating"}><p>{this.state.dislikes}</p></div>

                                </div>
                                <div className={"slettOgEndreContainer"}>
                                    <div id={"endreBtn"}>
                                        <a href={"/#/sak/" + this.state.sak.id + "/endre"}>
                                            <img src={rediger}  width={"40px"} height={"40px"} alt={"endre knapp"}/>
                                        </a>
                                    </div>
                                    <button type={"button"} id={"slettBtn"}  onClick={() => this.setSynligSlettModal()}><img src={slett} width={"40px"} height={"40px"} alt={"slett knapp"} /></button>
                                </div>
                                <Alert variant="danger" show={this.state.synligAlert} onClose={() => this.setSynligAlert()} dismissible>
                                    <p>
                                        Du kan bare like eller mislike en gang per sak!
                                    </p>
                                </Alert>
                            </div>


                            <div className={"saktekst"}>
                                <p>{this.state.sak.tekst}</p>
                            </div>

                            <div className={"kommentarfelt"}>
                                <h2>Kommentarer</h2>
                                <div className={"kommentarer"}>

                                    {this.state.kommentarer.map(kommentar => <div key={kommentar.kommentarID} className={"kommentar"}>
                                                                                <p>{kommentar.pub_tidspunkt}<br/> <strong>{kommentar.navn}</strong>: {kommentar.kommentar}</p>
                                                                            </div>)}

                                </div>
                                <form>
                                    <div className="form-group">
                                        <label>Navn</label>
                                        <input name={"navn"} type="text" value={this.state.navn} onChange={this.handleTextChange.bind(this)} className="form-control" placeholder="Navn..."/>
                                   </div>

                                    <div className="form-group">
                                        <label>Kommentar</label>
                                        <textarea name={"kommentar"} value={this.state.kommentar} className={"form-control"} onChange={this.handleTextChange.bind(this)} placeholder={"Tekst..."} rows={"10"}/>
                                    </div>
                                    <button id={"kommentarKnapp"} type="button" onClick={() => {this.publiserKommentar()}} className="btn btn-primary" disabled={this.state.kommentar === "" || this.state.navn === ""}>Kommenter</button>
                                </form>

                                {/* MODAL FOR TILBAKEMELDING PÅ SLETT*/}

                                <Modal show={this.state.synligSlettModal} onHide={() => {}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Vil du slette?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Er du sikker på at du vil du slette saken din?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => {this.slett()}}>
                                            Ja
                                        </Button>
                                        <Button variant="primary" onClick={() => {this.setSynligSlettModal()}}>
                                            Nei
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* MODAL FOR TILBAKEMELDING PÅ KOMMENTAR */}

                                <Modal show={this.state.synligKommentarModal} onHide={() => {}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Suksess!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Kommentaren din ble publisert!</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => {this.setSynligKommentarModal()}}>
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

    setLikt(){
        if(this.state.harLikt === false) {
            this.handleLike();
            this.setState({
                harLikt: true
            })
        }else{
            this.setSynligAlert();
        }
    }

    setMislikt(){
        if(this.state.harMislikt === false) {
            this.handleDislikes();
            this.setState({
                harMislikt: true
            })
        }else{
            this.setSynligAlert();
        }
    }

    setSynligSlettModal(){
        this.setState({
            synligSlettModal: !this.state.synligSlettModal
        })
    }

    setSynligKommentarModal(){
        this.setState({
            synligKommentarModal: !this.state.synligKommentarModal
        })
    }

    setSynligAlert(){
        this.setState({
            synligAlert: !this.state.synligAlert
        })
    }


    handleLike(){
        let id = this.props.match.params.id;
        sakService.like(id).then(() => {
            sakService.getLikes(id).then(ratingLest => {
                this.setState({
                    likes: ratingLest[0].likes
                })
            }).catch(error => console.log(error.message));
        }).catch(error => console.error(error.message));
    }

    handleDislikes(){
        sakService.dislike(this.props.match.params.id).then(() => {
            sakService.getDislikes(this.props.match.params.id).then(dislikesLest => {
                this.setState({
                    dislikes: dislikesLest[0].dislikes
                })
            }).catch(error => console.log(error.message));
        }).catch(error => console.log(error.message));
    }

    handleTextChange(event: any){
        const name: string = event.target.name;
        const value: string = event.target.value;
        this.setState({
            [name]: value
        })
    }

    publiserKommentar(){
        let idag: Date = new Date();
        let dato: string = idag.getDate()+"-"+(idag.getMonth()+1)+"-"+idag.getFullYear();
        let tid: string = idag.getHours()+":"+idag.getMinutes();
        let datoTidspunkt: string = dato+" " + tid;

        let kommentar: Kommentar = new Kommentar(this.state.kommentar, this.state.navn, datoTidspunkt);
        sakService.publiserKommentar(kommentar, this.props.match.params.id).then(() => {
            this.setSynligKommentarModal();

            this.setState({
                kommentar: "",
                navn: ""
            });

            sakService.getKommentarer(this.props.match.params.id).then(kommentarerLest => {
            this.setState({
                kommentarer: kommentarerLest
            })}).catch(error => console.error(error.message));

        }).catch(error => console.error(error.message));
    }

    slett(){
        sakService.slettSak(this.state.sak.id);
        window.location.href="/";
    }

    componentDidMount() {
        window.scrollTo(0,0);
        sakService.getSak(this.props.match.params.id).then(sak => {
            this.setState({
                sak: sak[0]
            })
        });
        sakService.getKommentarer(this.props.match.params.id).then(kommentarerLest => {
            this.setState({
                kommentarer: kommentarerLest
            })
        });
        sakService.getLikes(this.props.match.params.id).then(ratingLest => {
            this.setState({
                likes: ratingLest[0].likes
            })}).catch(error => console.log(error.message));

        sakService.getDislikes(this.props.match.params.id).then(dislikesLest => {
            this.setState({
                dislikes: dislikesLest[0].dislikes
            })
        }).catch(error => console.log(error.message));
    }
}
export default Sakside;