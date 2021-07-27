const notesRef = firebase.database().ref();
const noteTitle = document.querySelector("#noteTitle");
const label = document.querySelector("#label");
const noteText = document.querySelector("#noteText");

window.onload = (event) => {
    console.log("window loaded");
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            console.log(user);
        } else {
            window.location = "index.html";
        }
    })
};

const handleNoteSubmit = (event) => {
    notesRef.push({
        title: noteTitle.value,
        label: label.value,
        text: noteText.value
    });
    noteTitle.value = "";
    label.value = "";
    noteText.value = "";
};