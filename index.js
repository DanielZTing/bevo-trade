const express = require('express')
const cors = require('cors')
const firebase = require('firebase');
require('firebase/firestore');
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/list', (req, res) => {
    requests = [];
    db.collection('requests').orderBy('time').get().then(query => {
        query.forEach(document => {
            let request = document.data();
            request.id = document.id;
            requests.push(request);
        });
        res.send(requests);
    });
});

app.post('/request', (req, res) => {
    db.collection('requests').add({
        time: req.body.time,
        place: req.body.place,
        description: req.body.description,
        bid: req.body.bid,
    });
    res.send();
});

app.post('/bid', (req, res) => {
    db.collection('requests').doc(req.body.id).update({
        bid: req.body.bid,
    });
    res.send();
});

app.listen(3000, () => {
    console.log('Starting server...');
});

firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: 'bevo-trade.firebaseapp.com',
    projectId: 'bevo-trade',
    storageBucket: 'bevo-trade.appspot.com',
    messagingSenderId: '796401217626',
    appId: '1:796401217626:web:d6bc2d5d129f863d3d2863',
});
const db = firebase.firestore();
