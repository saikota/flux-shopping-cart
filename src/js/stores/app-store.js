/**
 * Created by m853684 on 6/24/17.
 */
import {register,dispatch} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';

const CHANGE_EVENT="change_event";
var _catalog=[];

//initialzie:

for(var i=0;i<9;i++){
    _catalog.push({
        id:i,
        cost:i*10,
        name:"widget "+i+1,
        description:"widget desc "+i,
        title:"widget sample title "+i,
        summary:"widget summary "+ i
    })
}

var _cartItems=[];

const _removeItem=(item) =>{
    _cartItems.splice(_cartItems.findIndex(i => i==item),1);
}

const _findCartItem=(item) => {
    return _cartItems.find(cartItem=> cartItem.id===item.id);
}

const _increaseItem = ( item ) => item.qty++;

const _decreaseItem=(item)=>{
    if(item.qty>1){
        item.qty--;
    }
    else{
      _removeItem(item);
    }
}

// const _addItem=(item)=>{
//     const cartItem=_findCartItem(item);
//     if(typeof cartItem ==="undefined"){
//         _cartItems.push(Object.assign({qty:1},item));
//     }else{
//         _increaseItem(cartItem);
//     }
// }


const _addItem = ( item ) => {
    const cartItem = _findCartItem( item );
    if ( !cartItem ) {
        _cartItems.push( Object.assign( {qty: 1}, item ) );
    }
    else {
        _increaseItem( cartItem );
    }
}

const cartTotals=(qty=0,total=0)=>{
    _cartItems.forEach(cartItem=> {
        qty+=cartItem.qty;
        total+=cartItem.qty*cartItem.cost;
    })
    return {qty,total};
}

const AppStore = Object.assign(EventEmitter.prototype,{
 emitChange(){
     this.emit(CHANGE_EVENT);
 },
    addChangeListener(callback){
        this.on(CHANGE_EVENT,callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT,callback);
    },
    getCart(){
        return _cartItems;
    },
    getCartTotals(){
        return cartTotals();
    },
    getCatalog(){
        return _catalog.map((_item)=>{
            return Object.assign({},_item,_findCartItem(_item));
        })
    },
    dispatcherIndex:register(function(action){

        switch(action.actionType){
            case AppConstants.ADD_ITEM:_addItem(action.item);break;

            case AppConstants.REMOVE_ITEM:_removeItem(action.item);break;

            case AppConstants.INCREASE_ITEM:_increaseItem(action.item);break;

            case AppConstants.DECREASE_ITEM:_decreaseItem(item);break;
        }
        AppStore.emitChange();
    })
});

export default AppStore;