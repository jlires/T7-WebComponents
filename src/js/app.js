////////////////////////////////////////////////////////////////////////////////
//*                             DOM elements                                 *//
////////////////////////////////////////////////////////////////////////////////
const contentBlock = document.getElementById('content-block');
const loginBlock = document.getElementById('login-block');
const signWithGoogleButton = document.getElementById('signWithGoogleButton');
const signOutWithGoogleButton = document.getElementById('signOutWithGoogleButton');


////////////////////////////////////////////////////////////////////////////////
//*                             Page interactions                            *//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//*                             Firebase                                     *//
////////////////////////////////////////////////////////////////////////////////
const config = {
  apiKey: "AIzaSyDOvscv3-mq8t-JwfiPKLcpyxJ3EiXcuaA",
  authDomain: "board-games-web.firebaseapp.com",
  databaseURL: "https://board-games-web.firebaseio.com",
  projectId: "board-games-web",
  storageBucket: "board-games-web.appspot.com",
  messagingSenderId: "233256098415",
  appId: "1:233256098415:web:d9e0eaa81b9985d33d0b9a"
};

// Initialize Firebase
firebase.initializeApp(config);

var userName;

////////////////////////////////////////////////////////////////////////////////
//*                 Firebase Authentication with Google                      *//
////////////////////////////////////////////////////////////////////////////////
const auth = firebase.auth();

const signWithGoogle = () =>{
    const googleProvider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(googleProvider)
    .then(function() {
        console.log("- - - Loggeado - - - - ");
    })
    .catch(function(e) {
        console.log(e);
    })
}

const signOutWithGoogle = () =>{
    auth.signOut().then(function() {
        name = '';
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}

signWithGoogleButton.addEventListener('click', signWithGoogle);
//signOutWithGoogleButton.addEventListener('click', signOutWithGoogle);

const verification = () => {
    console.log("Verificando usuario");
    if (auth.currentUser === null) {
        console.log('No hay usuario actualmente');
        loginBlock.style.display = 'block';
        contentBlock.style.display = 'none';
    }
    else {
        console.log("Usuario actual: ", auth.currentUser.displayName);
        loginBlock.style.display = 'none';
        contentBlock.style.display = 'block';
    }
};

auth.onAuthStateChanged((user) => {
    console.log("-- Auth state changed ...");
    verification();
    if (user) {
      console.log("Usuario  Loggeado!");
    } else {
      console.log("No hay nadie loggeado!");
    }
});

////////////////////////////////////////////////////////////////////////////////
//*                    Firebase Firestore configuration                      *//
////////////////////////////////////////////////////////////////////////////////

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

firebase.firestore()
.enablePersistence()
.catch(function(err) {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        console.log("failed-precondition");
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        console.log("unimplemented");
    }
});

////////////////////////////////////////////////////////////////////////////////
//*                              Get Games                                   *//
////////////////////////////////////////////////////////////////////////////////

const storage = firebase.storage();
const storageRef = storage.ref();

db.collection("games")
.orderBy('date', 'asc')
.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            console.log("Added post: ", change.doc.data());
            createChildren(change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified post: ", change.doc.data());
            createChildren(change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed post: ", change.doc.data());
        }
    });
});

const addGame = (data) => {
    if (data) {
        ///
    };
};
