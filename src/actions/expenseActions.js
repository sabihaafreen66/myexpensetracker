import { auth, db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const ACTIVATE_PREMIUM = 'ACTIVATE_PREMIUM';


// The rest of your actions code...


export const fetchExpenses = () => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userEmail = user.email;

    const q = query(collection(db, 'expenses'), where('userId', '==', userEmail));
    const querySnapshot = await getDocs(q);
    const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: SET_EXPENSES, payload: expensesData });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};

export const addExpense = (expense) => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userEmail = user.email;

    const docRef = await addDoc(collection(db, 'expenses'), {
      ...expense,
      userId: userEmail
    });
    dispatch({ type: ADD_EXPENSE, payload: { id: docRef.id, ...expense } });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'expenses', id));
    dispatch({ type: DELETE_EXPENSE, payload: id });
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export const updateExpense = (id, updatedExpense) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'expenses', id), updatedExpense);
    dispatch({ type: UPDATE_EXPENSE, payload: { id, ...updatedExpense } });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const activatePremium = () => ({
  type: ACTIVATE_PREMIUM
});

