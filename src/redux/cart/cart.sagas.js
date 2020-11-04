import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionsTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function * clearCartOnSignOut() {
    yield put(clearCart());
}

// Esta acción la emite una saga del user.sagas => signOut();
export function* onSignOutSuccess() {
    yield takeLatest( UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut )
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ])
}