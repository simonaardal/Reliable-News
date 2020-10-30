// @flow

import React, {Component} from "react"
import "./Footer.css"


class Footer extends Component<{}>{
    render(){
        return(
            <div className={"footerContainer"}>
                <div className={"omContainer"}>
                    <h3>Om</h3>
                    <div>
                        <h6>Sverre Gate 10, <br/> 7012 Trondheim</h6>
                    </div>

                    <div>
                        <h6>+47 5555 2222</h6>
                    </div>

                    <div>
                        <h6>reliablenews@post.com</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;