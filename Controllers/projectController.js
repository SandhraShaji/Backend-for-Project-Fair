const projects = require('../Models/projectSchema')

exports.addUserProject = async(req,res)=>{
    console.log("Inside addUserProject");
    //getUserId
    const userId = req.payload
    //get projectImage
    const projectImage = req.file.filename
    //get project details
    const {title,language,github,link,overview}=req.body
    console.log(userId,title,language,github,link,overview,projectImage);
    
    //logic for adding new project
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(404).json("Project already exist")
        }
        else{
            const newProject = new projects({
                title,language,github,link,overview,projectImage,userId
            })
            await newProject.save()//save new project in mongodb
            res.status(200).json(newProject)//response send to client
        }
    }
    catch(error){
        res.status(404).json({message:error.message})
    } 
    // res.status(200).json("Add user project request recieved")
}

//get all projects of a user
exports.getAllUserProjects = async (req,res)=>{
    //get userId
    const userId = req.payload;
    //get all projects of particular user
    try{
        //api call
        const userProject = await projects.find({userId})
        res.status(200).json(userProject) //send all projects to frontend
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//get all users' projects
exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        language:{
            $regex:searchKey, //regular expression
            $options:"i"  //to ignore case sensitivity during search
        }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(201).json(allProjects)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//get projects for display in home
exports.getHomeProject = async(req,res)=>{
    try{
        const homeProject = await projects.find().limit(3)
        res.status(201).json(homeProject)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//update project details
exports.updateProject = async(req,res)=>{
    const {title, language, github, link, overview, projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    userId = req.payload
    const {pid} = req.params
    try{
        //find the particular project and update the project details then save to mongodb
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImage,userId})
        //to save the project details to mongodb
        await updateProject.save()
        //response send back to client
        res.status(200).json(updateProject)
    } 
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}

//delete project
exports.deleteProject = async(req,res)=>{
    const {pid} = req.params;
    try{
        const deleteUserProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteUserProject)
    }
    catch(err){
        res.status(401).json("Internal server error "+err.message)
    }
}