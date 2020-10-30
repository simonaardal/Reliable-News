// @flow

import React, {Component} from "react"
import Navbar from "../Navbar/Navbar";
import Livefeed from "../Livefeed/Livefeed";
import {sakService} from "../../service/services";
import NyhetsContainer from "../NyhetsContainer/NyhetsContainer";
import Footer from "../Footer/Footer";
import {Sak} from "../../../src/service/services"

type KategorisideProps = {
    match: {params: {kategori: string}}
}

type KategorisideState = {
    saker: Sak[]
}

class Kategoriside extends Component<KategorisideProps, KategorisideState>{
    state = {
        saker: []
    };

    render(){
        return(
            <div className={"wrapper"}>
                <Navbar/>
                <Livefeed/>
                <NyhetsContainer saker = {this.state.saker}/>
                <Footer/>
            </div>
        )
    }

    componentDidMount() {
        sakService.getKategori(this.props.match.params.kategori).then(saker => (this.setState({saker: saker}))).catch(error => console.error(error.message));
    }

    componentDidUpdate(prevProps: any){
        if(this.props.match.params.kategori !== prevProps.match.params.kategori){
            window.scrollTo(0,0);
            sakService.getKategori(this.props.match.params.kategori).then(sakerLest => this.setState({saker: sakerLest})).catch(error => console.error(error.message));
        }
    }

}

export default Kategoriside;