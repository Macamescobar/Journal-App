import { setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
  logoutFirebase,
} from "../../firebase/providers";
import { loadNotes } from "../../helpers/loadNotes";
import { setNotes, setSaving } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};


export const startLoadingNotes = () => {

  return async ( dispatch, getState ) => {
    const  { uid } = getState().auth;
    if ( !uid ) throw new Error ('El uid del usuario no existe');
    
    const notes = await loadNotes( uid );

    dispatch( setNotes( notes))
  }
}

export const startSaveNote = ( ) => {
  return async( dispatch, getState ) => {

    dispatch( setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id}`);
    await setDoc( docRef, noteToFirestore, { merge: true } );
  }
}