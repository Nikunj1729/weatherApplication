const path = require('path')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios')
const getGeoCode = require('./utils/getGeoCode')
const getWeatherForecast = require('./utils/getWeather')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
     res.render('index', {title: 'Handlebar', name: 'Nikunj'})
})  

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name: 'Nikunj'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help', name: 'Nikunj'})
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {title: '404', errorMessage: 'Help article not found', name: 'Nikunj'})
}) 

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error : 'No address provided'
        })
    } else {
        getGeoCode(address, (error, location) => {
            if (error) {
                return res.send({
                    error
                })
            } else if (location) {
                console.log(location)
                getWeatherForecast(location, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else if (forecastData) {
                    console.log(forecastData)
                    res.send({ forecast : forecastData, location, address })
                }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
     })
}) 

app.get('*', (req, res) => {
    res.render('404', {title: '404',errorMessage: 'Page not found' , name: 'Nikunj'})
})

app.listen(2020, () => {
    console.log('Server is running')
})