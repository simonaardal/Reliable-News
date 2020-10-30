import React, {Component} from "react"
import "./NyhetCard.css"
//import {Link} from "react-router-dom";



type NyhetCardProps = {
    url: string
}

class NyhetCard extends Component<NyhetCardProps, {}>{
    render(){
        return(
            <div className="card border-light mb-3">
                <img src={this.props.url} className="card-img-top card-bilde" alt={this.props.tittel}/>
                    <div className="card-body">
                        <a href={"/#/sak/" + this.props.id}><h5>{this.props.tittel}</h5></a>
                    </div>
            </div>
        )
    }
}

export default NyhetCard;