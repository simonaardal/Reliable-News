// @flow

import React, {Component} from "react"
import "./NyhetsContainer.css"
import NyhetCard from "../NyhetCard/NyhetCard";
import {Sak} from "../../service/services"


type NyhetsContainerProps = {
    saker: Sak[]
}

class NyhetsContainer extends Component<NyhetsContainerProps, {}>{

    render(){
        return(
            <div className={"wrapper"}>
                <div className={"nyhetsContainer"}>
                    {this.props.saker.map(sak => (<NyhetCard key={sak.id} id={sak.id} tittel={sak.tittel} url={sak.url}/>))}
                </div>
            </div>
        );
    }
}

export default NyhetsContainer;