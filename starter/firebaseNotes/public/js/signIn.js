const acctsRef = firebase.database().ref("Accts");

const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
        window.location = "writeNote.html";
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("THINGS BROKE");
        console.log(errorCode);
        console.log(errorMessage);
  });
}

const signInFireNotes = (event) => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    acctsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let valid = false;
        for(let key in data)
        {
            let acct = data[key];
            if(acct.password == password && acct.username == username)
            {
                valid = true;
                window.location = "writeNote.html";
            }
        }
        if(!valid) alert("Invalid log-in");
    });
}

const createAccount = (event) => {
    const potentialUsername = document.querySelector("#potentialUsername").value;
    const potentialPassword = document.querySelector("#potentialPassword").value;
    acctsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(let key in data)
        {
            let acct = data[key];
            if(acct.password == potentialPassword)
            {
                document.querySelector("#error").innerHTML = "This password is already in use. Please choose a different password.";
                return;
            }
            else if(acct.username == potentialUsername)
            {
                document.querySelector("#error").innerHTML="This username is already in use. Please choose a different username.";
                return;
            }
        }
        addAcct(potentialPassword, potentialUsername);
    });
}

const addAcct = (potentialPassword, potentialUsername) => {
    acctsRef.push({
        password: potentialPassword,
        username: potentialUsername
    });
    alert("Account sucessfully created!");
    window.location = "index.html";
};