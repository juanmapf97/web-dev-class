var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var displayedData = []

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      // url: 'http://localhost:3000/todos/' + id,
      url: 'https://exfinal-web.herokuapp.com/todos/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    // url: 'http://localhost:3000/todos',
    url: 'https://exfinal-web.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      displayedData = data;
      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        let list = document.getElementById('unfinished-list');
        let list_fin = document.getElementById('finished-list');
        if (data[i].completed) {
          list_fin.appendChild(createListElement(data[i]._id, data[i].description, data[i].completed));  
        } else {
          list.appendChild(createListElement(data[i]._id, data[i].description));
        }
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      // url: 'http://localhost:3000/todos',
      url: 'https://exfinal-web.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        displayedData.concat(data);
        let list = document.getElementById('unfinished-list');
        list.appendChild(createListElement(data._id, data.description));
        $('#newitem').val("");
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  
}

function selectItem(checkbox) {
  updateTodo(checkbox.value, checkbox.checked);
  let unfinishedList = document.getElementById('unfinished-list');
  let todoList = document.getElementById('finished-list');
  let elemParent = checkbox.parentElement;
  let elementChildren = elemParent.children;
  for (let index = 0; index < elementChildren.length; index++) {
      const element = elementChildren[index];
      if (element.tagName == 'SPAN') {
          if (checkbox.checked) {
              element.classList.add('done');
              todoList.appendChild(elemParent);
          } else {
              element.classList.remove('done');
              unfinishedList.appendChild(elemParent);
          }
      }
  }
}

function createListElement(id, name, completed=false) {
  let check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  check.value = id;
  let liElem = document.createElement('li');
  let span = document.createElement('span');
  if (completed) {
    check.setAttribute('checked', 'checked');
    span.classList.add('done');
  }
  let txtNode = document.createTextNode(name);
  span.appendChild(txtNode);
  liElem.appendChild(check);
  liElem.appendChild(span);
  check.setAttribute('onclick', 'selectItem(this)');
  return liElem;
}

// let entry = document.getElementById('newitem');

// function addNewElement(e) {
//   console.log(e);
//   let list = document.getElementById('unfinished-list');
//   if (e.keyCode == 13) {
//       list.appendChild(createListElement(e.target.value));
//       e.target.value = '';
//   } 
// };