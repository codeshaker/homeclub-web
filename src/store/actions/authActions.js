export const signIn = phoneNumber => {
  console.log("inside signIn action creator");
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "loginButtonId",
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }
    );

    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function(confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
      })
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(function(error) {
        // Error; SMS not sent
        // ...
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();

    return firestore
      .collection("users")
      .doc(state.firebase.auth.uid)
      .set({
        Name: newUser.name,
        Phone: newUser.phone,
        Email: newUser.email,
        Address: newUser.address
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS", newUser });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const trySignUp = () => {
  console.log("Inside stry sign up");
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    console.log(state.firebase.auth.uid);
    firestore
      .collection("users")
      .doc(state.firebase.auth.uid)
      .get();

    return firestore
      .collection("users")
      .doc(state.firebase.auth.uid)
      .get()
      .then(docSnapShot => {
        if (docSnapShot.exists) {
          firestore
            .collection("users")
            .doc(state.firebase.auth.uid)
            .onSnapshot(doc => {
              const newUser = doc.data();
              dispatch({ type: "SIGNUP_SUCCESS", newUser });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
