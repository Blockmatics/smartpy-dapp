'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/appController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
   
    };