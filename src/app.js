const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
// app.set('views', 'viewsPath');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Not Anyone'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Not Anyone'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: "I'm here to help you out.",
        title: 'Help',
        name: 'Not Anyone'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            return console.log('Error', error);
        }
        forecast(latitude, longitude, (error, Forecast) => {
            if (error){
                return console.log('Error', error);
            }
            res.send({
                address: req.query.address,
                location,
                Forecast,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Not Anyone',
        errorMessage: 'Help page not found' 
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Not Anyone',
        errorMessage: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});