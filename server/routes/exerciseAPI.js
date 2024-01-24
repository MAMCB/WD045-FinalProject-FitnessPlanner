const express = require('express');
const options = require('./APIOptions');

const exerciseAPIRouter = express.Router();

exerciseAPIRouter.get('/:limit', async (req, res) => {
    const limit = req.params.limit;
    const apiOptions = options[0];
    try{
        if(limit)
        {
            apiOptions.params.limit = limit;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get('/name/:name/:limit', async (req, res) => {
    const name = req.params.name;
    const limit = req.params.limit;
    const apiOptions = options[1];
    try{
        if(name)
        {
            apiOptions.url = `https://exercisedb.p.rapidapi.com/exercises/name/${name}`;
        }
        if(limit)
        {
            apiOptions.params.limit = limit;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get('/exercise/:id', async (req, res) => {
    const id = req.params.id;
    const apiOptions = options[2];
    try{
        if(id)
        {
            apiOptions.url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
}); 

exerciseAPIRouter.get('/target/:target/:limit', async (req, res) => {
    const target = req.params.target;
    const limit = req.params.limit;
    const apiOptions = options[3];
    try{
        if(target)
        {
            apiOptions.url = `https://exercisedb.p.rapidapi.com/exercises/target/${target}`;
        }
        if(limit)
        {
            apiOptions.params.limit = limit;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get('/equipment/:equipment/:limit', async (req, res) => {
    const equipment = req.params.equipment;
    const limit = req.params.limit;
    const apiOptions = options[4];
    try{
        if(equipment)
        {
            apiOptions.url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`;
        }
        if(limit)
        {
            apiOptions.params.limit = limit;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get('/targetList', async (req, res) => {      
    const apiOptions = options[5];
    try{
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get('/equipmentList', async (req, res) => {
    const apiOptions = options[6];
    try{
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get("/bodyPartList", async (req, res) => {
    const apiOptions = options[7];
    try{
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});

exerciseAPIRouter.get("/bodyPart/:bodyPart/:limit", async (req, res) => {
    const bodyPart = req.params.bodyPart;
    const limit = req.params.limit;
    const apiOptions = options[8];
    try{
        if(bodyPart)
        {
            apiOptions.url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
        }
        if(limit)
        {
            apiOptions.params.limit = limit;
        }
        const apiResponse = await axios.request(apiOptions);
        res.status(200).json(apiResponse.data);
    }
    catch(error){
        console.log(error);
    }
});



module.exports = exerciseAPIRouter;