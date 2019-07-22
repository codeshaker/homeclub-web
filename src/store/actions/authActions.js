export const signIn = phoneNumber => {
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
