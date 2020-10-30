import Navbar from "./Components/Navbar/Navbar"
import React from "react";
import ReactDOM from "react-dom";
import EndreSak from "./Components/EndreSak/EndreSak";
import Footer from "./Components/Footer/Footer";
import Kategoriside from "./Components/Kategoriside/Kategoriside";
import NyhetCard from "./Components/NyhetCard/NyhetCard";
import NyhetsContainer from "./Components/NyhetsContainer/NyhetsContainer";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Sakside from "./Components/Sakside/Sakside";
import Livefeed from "./Components/Livefeed/Livefeed";

let props = {
    match: {params: {id: 3}},
};

test("EndreSak rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<EndreSak {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("Footer rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("Kategoriside rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Kategoriside {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("Livefeed rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Livefeed {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("Navbar rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navbar/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("NyhetCard rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<NyhetCard/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

const propsSak = {
    saker: [{id: 1, navn: "Jens Jensen",tittel: "Erna Slutter",tekst: "Lorem ipsum",prioritering: "prioritering1",kategori: "sport",url: "google.com",tidspunkt: "2019-12-12: 13:13"}]

};
test("NyhetsContainer rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<NyhetsContainer {...propsSak}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test("RegistrationForm rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegistrationForm/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

props = {
    match: {params: {id: 3}},
};
test("Sakside rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sakside {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

