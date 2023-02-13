import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( savingNewNote());
        
        const { uid } = getState().auth;
        // uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`));
        //Insertar nota
        const setDocResp = await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( ));
        // dispatch
        // dispatch (newNote)
        //dispatch( activarNote )
    }
}