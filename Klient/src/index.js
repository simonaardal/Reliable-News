// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./App.css";
import {HashRouter, Route} from 'react-router-dom';
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sakside from "../src/Components/Sakside/Sakside"
import Kategoriside from "./Components/Kategoriside/Kategoriside"
import EndreSak from "./Components/EndreSak/EndreSak";

const root: HTMLElement | null = document.getElementById("root");
if(root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path={"/"} component={App}/>
                <Route exact path={"/registrerSak"} component={RegistrationForm}/>
                <Route exact path={"/sak/:id"} component={Sakside}/>
                <Route exact path={"/saker/:kategori"} component={Kategoriside}/>
                <Route exact path={"/sak/:id/endre"} component={EndreSak}/>
            </div>
        </HashRouter>,
        root
    );


