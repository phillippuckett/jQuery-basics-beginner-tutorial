$(domcument).ready(function () {
  
  	
  //the to do list
  var listo = [];
  
  // new task form toggler  
  $('#newTaskForm').hide();

  // advanced tasks, removing, etc.
  var advanceTask = function (task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
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

  // a constructor function to create tasks with
  var Task = function (task) {
    this.task = task;
    this.id = 'new';
  }	

  // how we are going to add tasks to our to do list
  var addTask = function (task) {
    if (task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');

      $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

    }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');

  };

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

});