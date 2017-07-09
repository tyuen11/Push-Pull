/**
 * Created by Tim on 5/29/2017.
 */
//to write and read from firebase's database (https://firebase.google.com/docs/database/web/read-and-write)
//var database = firebase.database;


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
    const txtEmail = document.getElementById("email");
    const txtPassword = document.getElementById("password");
    const btnLogin = document.getElementById("Login_Button");
    const btnSignUp = document.getElementById("Register_Button");
    const btnLogout = document.getElementById("Logout");

if (btnLogin) {
    btnLogin.addEventListener("click", e => {
        // get email and password
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        // sign in
        var promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
                window.location.assign("Account_Page.html");
            } else {
                console.log("not logged in");
            }
        });
    });
}

if (btnSignUp) {
    btnSignUp.addEventListener("click", e => {
        // TODO: check if email and password is valid
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        //create
        var promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
}

if (btnLogout) {
    btnLogout.addEventListener("click", e => {
        firebase.auth().signOut();
        window.location.replace("HomePage.html");
    })
}

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log("not logged in");
    }
}); 






