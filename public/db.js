const firebaseConfig = {
    apiKey: "AIzaSyCcjilyp_onZxHC4RTaYSVLUiV1vk047Lw",
    authDomain: "vue-chat-7c2c5.firebaseapp.com",
    projectId: "vue-chat-7c2c5",
    storageBucket: "vue-chat-7c2c5.appspot.com",
    messagingSenderId: "305375246014",
    appId: "1:305375246014:web:ba198a99e116b45605d0ef",
    measurementId: "G-R9S3LMKP2F",
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({
    ignoreUndefinedProperties: true,
  })
  
 const db = firebase.firestore();
 var dbRef = db.collection("quiz").doc("inigo")

    dbRef.onSnapshot((doc) => {
        $( "#team1" ).html(doc.data().team1)
        $( "#team2" ).html(doc.data().team2)
        $( "#team3" ).html(doc.data().team3)        
        $( "#team4" ).html(doc.data().team4)
    });