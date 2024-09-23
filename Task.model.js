const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:String,
    descriptrion: String,
    completed: Boolean
});

module.exports =mongoose.model('Tasks', taskSchema);