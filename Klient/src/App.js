// @flow

import React, {Component} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import NyhetsContainer from "./Components/NyhetsContainer/NyhetsContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Livefeed from "./Components/Livefeed/Livefeed";
import {Sak, sakService} from "./service/services";

import Footer from "../src/Components/Footer/Footer"

type AppState = {
    kategoriValgt: string,
    saker: Sak[]
}


class App extends Component<{}, AppState> {
    state = {
        kategoriValgt: "",
        saker: []
    };

    render(){
        return(
            <div className="wrapper">
                <Navbar/>
                <Livefeed/>
                <NyhetsContainer saker = {this.state.saker}/>
                <Footer/>
            </div>
        );
    }

    componentDidMount() {
        sakService.getPri1Saker().then(saker => (
            this.setState({
                saker: saker,
            }))).catch(error => console.error(error.message));
    }
}


export default App;
