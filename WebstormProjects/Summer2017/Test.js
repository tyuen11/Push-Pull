/**
 * Created by Tim on 5/29/2017.
 */
//to write and read from firebase's database (https://firebase.google.com/docs/database/web/read-and-write)




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
    var database  = firebase.database().ref();

// creating variables for elements from html (HomePage.html)
    const txtEmail = document.getElementById("email");
    const txtPassword = document.getElementById("password");
    const btnLogin = document.getElementById("Login_Button");
    const btnSignUp = document.getElementById("Register_Button");
    const btnLogout = document.getElementById("Logout");

// creating variables for elements from html (Account_Page.html)
    const btnItem = document.getElementById("Add_Items");
    const btnCancel = document.getElementById("Cancel");
    const btnAdd = document.getElementById("Add");
    var item_textfield = document.getElementById("item_textfield");

    //start path for all users
    var start = database.child("users");


// Login Event
    if (btnLogin) {
        btnLogin.addEventListener("click", e => {
            // get email and password
            var email = txtEmail.value;
            var pass = txtPassword.value;
            var auth = firebase.auth();
            // sign in
            var promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
            // TODO: make ^^ visible to user (email or password is incorrect)

            // Homepage to User's Page after login
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

// Sign Up Event
if (btnSignUp) {
    btnSignUp.addEventListener("click", e => {
        // TODO: check if email and password is valid
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        //create account
        var promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        // TODO: make ^^ visible to user

        //Homepage to User's page after sign up
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
// Logout Event
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


  // get user's name onto Account_Page.html header
    var user = firebase.auth().currentUser;
        console.log(user.uid);
    var email;
    if (user){
        email = user.email;
        document.getElementById("UserName").innerHTML = email;
        // TODO: show all user's ITEMS


    }
        start.child(user.uid).set({
            UID: user.uid,
            Email: email
        });

    // all in Account_Page.html
     if (btnItem){
        btnItem.addEventListener("click", e => {
           document.getElementById("Add_Item").style.display = "flex";
        })
    }
    if (btnCancel){
        btnCancel.addEventListener("click", e=> {
            document.getElementById("Add_Item").style.display = "none";
        })
    }
    if (btnAdd){
        btnAdd.addEventListener("click", e=> {
            console.log(item_textfield.value);
            adding_to_list(item_textfield.value);
        })
    }

    // adds item to user's node
    function adding_to_list (item_textfield){
        //directs to user uid node in database
        var user_path = start.child(user.uid).child("item");
        user_path.push({
                item: item_textfield
            });
        console.log("Added");
        //TODO: ^^ make visible to user
    }
});








