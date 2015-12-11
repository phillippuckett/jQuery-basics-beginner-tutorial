$(document).ready(function () {                  // sets up jQuery.
  
  $('#newTaskForm').hide();  	                    // new task form toggler.  
    
  var advanceTask = function (task) {             // the function serves to.
    var modified = task.innerText.trim()          // TRIM() removes whitespace from both ends of string.
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {           // the list item is modified from its original state.
        if (listo[i].id === 'new') {              // 
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

  var listo = [];                                 // to do's will be pushed into this array.
  var Task = function (task) {                    // the constructor function which with we create tasks. 
    this.task = task;   // referencing the task within the function that equals the task?
    this.id = 'new';    // referencing the tasks id within the function that equals the tasks title?                       
  };

  var addTask = function (task) {                  // how we are going to add tasks to our to do list
    if (task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
      $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
    }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  // opens form
  $('#newListItem').on('click', function () {
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });
  
  //closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });
  
    $(document).on('click', '#item', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
    });

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
  
      $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  
  // $(document).on('click', '#item', function (e) {
  //   e.preventDefault();
  // });


});