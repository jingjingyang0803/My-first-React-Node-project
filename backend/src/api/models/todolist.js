var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('strictQuery', true);

var TodoListSchema = new Schema(
    {
        todos: { type: Array }
    }
);
// Export model
module.exports = mongoose.model('Todolist', TodoListSchema);//use todolists collection