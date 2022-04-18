const ui = new firebaseui.auth.AuthUI(auth);
const login = document.querySelector("#login");
const _signIn = document.querySelector('#signIn_form');
const _signUp = document.querySelector('#signUp_form');
const signIn = document.querySelector('#signIn_typo');
const signUp = document.querySelector('#signUp_typo');


auth.onAuthStateChanged((user) => {
  if (user) {
    // login.style.display = "none";
    console.log(user);
  } else setupLogin();
});

const setupLogin = () => {
  ui.start("#loginUi", {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectURL) {
        console.log(authResult);
        return false;
      },
    },
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  });
};


(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll(".validate");

  // Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();


// 
const switchToSignUp = () => {
  _signIn.style.left = '-110%';
  _signUp.style.left = '0';

  signIn.style.left = '110%';
  signUp.style.left = '0';
}

const switchToSignIn = () => {
  _signIn.style.left = '0';
  _signUp.style.left = '100%';

  signIn.style.left = '0';
  signUp.style.left = '-100%';
}