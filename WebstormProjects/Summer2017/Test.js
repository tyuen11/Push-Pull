/**
 * Created by Tim on 5/29/2017.
 */

(function() {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyBwuBhMX_ydPOg31SuZ5izd90NbwcTKyHA",
        authDomain: "user-push-pull.firebaseapp.com",
        databaseURL: "https://user-push-pull.firebaseio.com",
        projectId: "user-push-pull",
        storageBucket: "user-push-pull.appspot.com",
        messagingSenderId: "1058245797988"
    };
    firebase.initializeApp(config);
// creating variables for elements from html (HomePage.html)
    const txtEmail = document.getElementById("Email");
    const txtPassword = document.getElementById("Password");
    const btnLogin = document.getElementById("Login_Button");

// login event
    btnLogin.addEventListener("click", e => {
        // get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
}());
