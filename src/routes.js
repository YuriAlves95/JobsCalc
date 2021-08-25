const express = require('express')
const rota = express.Router()
const profileController = require("./controllers/ProfileController.js")
const jobController = require("./controllers/JobController.js")
const dashBoardController = require("./controllers/DashboardController.js")

rota.get('/', dashBoardController.index)
rota.get('/index', dashBoardController.index)

rota.get('/job', jobController.create)
rota.post('/job', jobController.save)

rota.get('/job/:id', jobController.show)
rota.post('/job/:id', jobController.update)
rota.post('/job/delete/:id', jobController.delete)

rota.get('/profile', profileController.index)
rota.post('/profile', profileController.update)

module.exports = rota
