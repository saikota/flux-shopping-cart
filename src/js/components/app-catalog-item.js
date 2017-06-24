import React from "react";
import AppActions from "../actions/app-actions";
import CartButton from "./app-cart-button"

export default (props) => {

    return (
            <div className="col-xs-6 col-sm-4 col-md-4">
                <h3>{props.item.name}</h3>
                <p>{props.item.description}</p>
                <img src="http://placehold.it/250x250" width="100%" className="img-responsive"/>
                <p> cost: {props.item.cost} USD</p>
                <CartButton handler={AppActions.addItem.bind(null,props.item)}
                 text="Add to Cart"/>
            </div>
        )

}

