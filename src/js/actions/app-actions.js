/**
 * Created by m853684 on 6/23/17.
 */
import {register,dispatch} from "../dispatchers/app-dispatcher";
import  AppConstants from "../constants/app-constants";

export default{
 addItem(item){
     dispatch({actionType:AppConstants.ADD_ITEM,
              item:item});
 }, removeItem(item){
        dispatch({actionType:AppConstants.REMOVE_ITEM,
            item:item});
    },
    increaseItem(item){
        dispatch({actionType:AppConstants.INCREASE_ITEM,
            item:item});
    },
    decreaseItem(item){
        dispatch({actionType:AppConstants.DECREASE_ITEM,
            item:item});
    },

}
