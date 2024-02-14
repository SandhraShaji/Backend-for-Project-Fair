const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtmiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//create router object of express to define paths
const router = new express.Router()

//register API path
router.post('/register', userController.register)

//login API path
router.post('/login', userController.login)

//add user project API path - https://localhost:4000/project/add
router.post('/project/add',jwtmiddleware, multerConfig.single('projectImage') , projectController.addUserProject)

//get all projects of a user - https://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects', jwtmiddleware, projectController.getAllUserProjects)

//get projects of all users - https://localhost:4000/project/all-project
router.get('/project/all-project', jwtmiddleware, projectController.getAllProjects)

//get home projects - https://localhost:4000/project/home-project
router.get('/project/home-project', projectController.getHomeProject)

//update project - https://localhost:4000/project/update-project/67894820467457297
router.put('/project/update-project/:pid', jwtmiddleware, multerConfig.single('projectImage'), projectController.updateProject)

//delete project - https://localhost:4000/project/delete-project/67894820467457297
router.delete('/project/delete-project/:pid',jwtmiddleware,projectController.deleteProject)

module.exports = router 