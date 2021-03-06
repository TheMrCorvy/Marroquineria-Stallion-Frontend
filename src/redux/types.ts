import { ProductCardProps, User, Address, ShippingOption } from "../misc/types";

/*********************************************************************************** carrito */
export const INITIALIZE_CART = "INITIALIZE_CART";

export const SET_CART_COUNT = "SET_CART_COUNT";

export const TOGGLE_CART_MODAL = "TOGGLE_CART_MODAL";

export const ADD_TO_CART = "ADD_TO_CART";

export const ADD_OR_SUBSTRACT_UNITS = "ADD_OR_SUBSTRACT_UNITS";

export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";

export const CLEAR_CART = "CLEAR_CART";

type ProductsOnCart = {
    product: ProductCardProps;
    units: number;
};

export interface CartState {
    cart: {
        count: number;
        open: boolean;
        products: [] | ProductsOnCart[];
    };
}

export interface CartCountItemsAction {
    type: typeof SET_CART_COUNT;
    payload: number;
}

export interface CartOpenAction {
    type: typeof TOGGLE_CART_MODAL;
    payload: boolean;
}

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: {
        product: ProductCardProps;
        units: number;
    };
}

export interface AddOrSubstractUnitAction {
    type: typeof ADD_OR_SUBSTRACT_UNITS;
    payload: {
        action: "+1" | "-1";
        product: ProductCardProps;
    };
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_ITEM_FROM_CART;
    payload: number;
}

export interface InitializeCartAction {
    type: typeof INITIALIZE_CART;
    payload: CartState;
}

export interface ClearCartAction {
    type: typeof CLEAR_CART;
}

export type CartAction =
    | CartCountItemsAction
    | CartOpenAction
    | AddToCartAction
    | AddOrSubstractUnitAction
    | RemoveFromCartAction
    | InitializeCartAction
    | ClearCartAction;

/*********************************************************************************** Products */

export const SET_PRODUCT_TO_DISPLAY = "SET_PRODUCT_TO_DISPLAY";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";

export interface ProductState {
    product: ProductCardProps | null;
}

export interface DisplayProductAction {
    type: typeof SET_PRODUCT_TO_DISPLAY;
    payload: ProductCardProps;
}

export interface ClearProductAction {
    type: typeof CLEAR_PRODUCT;
    payload: null;
}

export type ProductActions = DisplayProductAction | ClearProductAction;

/*********************************************************************************** User Checkout */

export const LOAD_USERS_BILLING_INFO = "LOAD_USERS_BILLING_INFO";
export const LOAD_USERS_SHIPPING_INFO = "LOAD_USERS_SHIPPING_INFO";

export interface LoadUsersBillingInfoAction {
    type: typeof LOAD_USERS_BILLING_INFO;
    payload: {
        name: string;
        email: string;
        phoneNumber: string;
        dniOrCuil: string;
        billingAddress: Address;
    };
}

export interface LoadUsersShippingAction {
    type: typeof LOAD_USERS_SHIPPING_INFO;
    payload: {
        send: boolean;
        shippingAddress: Address | null;
        shippingOption: ShippingOption | null;
    };
}

export type UserState = User;

export type UserAction = LoadUsersBillingInfoAction | LoadUsersShippingAction;

/*********************************************************************************** Select Category */
export const SELECT_CATEGORY = "SELECT_CATEGORY";

export interface SelectCategoryAction {
    type: typeof SELECT_CATEGORY;
    payload: string;
}

export type CategoryState = {
    category: string;
};
