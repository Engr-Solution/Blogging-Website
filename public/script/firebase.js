const firebaseConfig = {
    apiKey: "AIzaSyA7qxYeM3-smRd-GoG8B8DlZttBwzl3PRo",
    authDomain: "isolution-blog.firebaseapp.com",
    projectId: "isolution-blog",
    storageBucket: "isolution-blog.appspot.com",
    messagingSenderId: "50336738348",
    appId: "1:50336738348:web:d5691407c17e8fabf53589"
  }

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();

const logout = () => {
  auth.signOut();
  location.reload();
}