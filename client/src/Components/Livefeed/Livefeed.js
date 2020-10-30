// @flow

import React, {Component} from "react"
import {sakService} from "../../service/services.js"
import "./Livefeed.css"
import {Sak} from "../../../src/service/services"

type LivefeedState = {
    pri2Saker: Sak[]
}

class Livefeed extends Component<{}, LivefeedState>{
    state = {
        pri2Saker: []
    };

    render(){
        return(
            <div className={"livefeedWrapper"}>
                <div className={"siste"}>
                    <h4>SISTE</h4>
                </div>
                <div className={"livefeedContainer"}>
                    <ul className={"livefeedSaker"}>
                        {this.state.pri2Saker.map(sak =>
                            (<li key={sak.id} className={"livefeedSak"}>
                                <div className={"sak"}><a href={"/#/sak/" + sak.id}><h6>{sak.tittel}</h6> <p>{sak.tidspunkt}</p></a></div>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        sakService.getPri2Saker().then(saker => {this.setState({pri2Saker: saker})}).catch(error => console.error(error.message));
    }
}

export default Livefeed;