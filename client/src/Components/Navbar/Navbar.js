//@flow

import React, {Component} from "react"
import "./Navbar.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
} from 'reactstrap';

import logo from "../../res/logo.png";


type NavbarState = {
    kategoriValgt: string,
    isOpen: boolean
}

class navbar extends Component<{}, NavbarState> {
    state = {
        kategoriValgt: "",
        isOpen: false
    };


    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }



    render() {
        return (
            <div>
                <Navbar style={{backgroundColor: 'white'}} light expand="lg">
                    <a href={"/"}> <img src={logo} width={"300px"} height={"100px"} alt={"reliable news logo"}/></a>
                    <NavbarToggler onClick={this.toggle.bind(this)} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <ul className={"navbar-list"}>
                            <li className={"navbar-list-item"}>
                                <a href={"/#/registrerSak"}>Registrer sak</a>
                            </li>

                            <li className={"navbar-list-item"}>
                                <a href={"/#/saker/politikk"}>Politikk</a>
                            </li>
                            <li className={"navbar-list-item"}>
                                <a href={"/#/saker/underholdning"}>Underholdning</a>
                            </li>
                            <li className={"navbar-list-item"}>
                                <a href={"/#/saker/sport"}>Sport</a>
                            </li>
                        </ul>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default navbar;