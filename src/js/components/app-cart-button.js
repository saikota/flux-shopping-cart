/**
 * Created by m853684 on 6/24/17.
 */

import React from "react";

export default (props) => {
    return(
        <button className="btn"  onClick={props.handler}>
            {props.text}

        </button>
    )

};