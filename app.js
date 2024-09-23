var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Task = require('./Task.model');

var port = 8080;

mongoose.connect('mongodb://localhost:27017/todolistapp');
app.get('/tasks' ,async(req,res)=>{
    console.log("Getting all tasks");
    let data = await Task.find({})
    console.log(data);
    res.json(data);
});

app.post('/addTask', async(req, res)=> {
    try{
        const newTask = new Task({
            title: 'Compelete CRUD operations',
            description: 'Compelete harrypotter',
            completed: false
        });
        const savedTask = await newTask.save();

        console.log(savedTask);
        res.status(201).json(savedTask);
    } catch (error){
        console.error('Error adding task:', error);
        res.status(500).json({error: 'Failed to add Task'});
    }
});

app.post('/updateTask/:taskId', async (req,res) => {
        const taskId = req.params.taskId;
        try{
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                {completed:true},
                {new : true}
            );

            if(!updatedTask){
                return res.status(404).json({error: 'Task not found'});
            }
            console.log('Task updated:', updatedTask);
            res.status(200).json(updatedTask);
        }
        catch(error)
        {
            console.error('Error updating Task: ', error);
            res.status(500).json({error: 'Failed to update task'});
        }
}

);
app.delete('/deleteTask/:taskId', async(req,res) => {
    const taskId = req.params.taskId;
    try{
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if(!deletedTask){
            return res.status(404).json({message: 'Task not found'});         
        }
        console.log('Task deleted: ', deletedTask);
        res.status(200).json({message: 'Task deleted sucessfully'});
        }
        catch(error)
        {
            console.error('Error deleting task:', error);
            res.status(500).json({error: 'Failed to delete task'});
        }

});





app.listen(port, function(){
    console.log("Apppp listning on port: " + port);

}
)