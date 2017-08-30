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
const item_textfield = document.getElementById("item_textfield");
const item_displayer = document.getElementById("item_list");

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
} //END
//---------------------------------------------------------------------------------------------
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
    } //END
    var database_to_show = firebase.database().ref("users");

    start.child(user.uid).update({
            UID: user.uid,
            Email: email,
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
        var user_path = start.child(user.uid).child("items");
        user_path.push({
                item: item_textfield
            });
        console.log("Added");
        //TODO: ^^ make visible to user
    } //END

    //get items
    show();
    function show() {
        database_to_show.on("child_added", function (snapshot, prevChildKey) {

           /*
            var newItem = snapshot.val();
            var item_value = newItem.items;
            console.log(newItem);
            console.log(item_value);
            console.log(snapshot.key); // gets user uid
            //console.log(snapshot.child("item").val()); //same as line 154
            //*/
            //TODO: create a path that goes from user -> uid -> item
            //NOT REALLY SECURITY RULES (TEMPORARY);
            // https://stackoverflow.com/questions/21500946/firebase-how-to-list-user-specific-data
            //https://www.firebase.com/docs/web/guide/structuring-data.html
            //firebase pathing https://www.npmjs.com/package/firebase-path

            if (user.uid === snapshot.key) {
                var newItem = snapshot.val();
                console.log("this shows the user");
                console.log(newItem);
                console.log("this shows the items node");
                console.log(newItem.items);


                //console.log(snapshot.child("item").val()); //same as line 154
                //TODO: create a path that goes from user -> uid -> item


                //displaying items on Account_Page.html
                var node = document.createElement("p");
                var textnode = document.createTextNode(newItem.items);
                node.appendChild(textnode);
                item_displayer.appendChild(node);

            }



           /*
           var node = document.createElement("p");
            var textnode = document.createTextNode(newItem.item);
            node.appendChild(textnode);
            item_displayer.appendChild(node);
            //*/
        });
    }

});






