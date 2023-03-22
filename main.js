let tareaInput = document.getElementById("nueva-tarea"); //Add a new tarea.
let addButton = document.getElementsByTagName("button")[0]; //first button
let incompletetareaHolder = document.getElementById("tareas-incompletas"); //ul of #tareas-incompletas
let tareacompletasHolder = document.getElementById("tareas-completas"); //tareas-completas


let crearNuevaTarea = function(tareaString) {

    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editarInput = document.createElement("input");
    let editarButton = document.createElement("button");
    let borrarButton = document.createElement("button");
    label.innerText = tareaString;
    checkBox.type = "checkbox";
    editarInput.type = "text";
    editarButton.innerText = "editar";
    editarButton.className = "editar";
    borrarButton.innerText = "borrar";
    borrarButton.className = "borrar";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editarInput);
    listItem.appendChild(editarButton);
    listItem.appendChild(borrarButton);
    return listItem;
}



let agregartarea = function() {
    console.log("Agregar tarea...");
    let listItem = crearNuevaTarea(tareaInput.value);

    incompletetareaHolder.appendChild(listItem);
    bindtareaEvents(listItem, tareacompletada);

    tareaInput.value = "";

}

let editartarea = function() {
    console.log("editar tarea...");
    console.log("Change 'editar' to 'save'");


    let listItem = this.parentNode;

    let editarInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editarMode");
    if (containsClass) {
        label.innerText = editarInput.value;
    } else {
        editarInput.value = label.innerText;
    }

    listItem.classList.toggle("editarMode");
}




//borrar tarea.
let borrartarea = function() {
    console.log("borrar tarea...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Marcar tarea completa
let tareacompletada = function() {
    console.log("Complete tarea...");

    //Append the tarea list item to the #tareas-completas
    let listItem = this.parentNode;
    tareacompletasHolder.appendChild(listItem);
    bindtareaEvents(listItem, tareaIncompleta);

}


let tareaIncompleta = function() {
    console.log("tarea incompleta...");
    let listItem = this.parentNode;
    incompletetareaHolder.appendChild(listItem);
    bindtareaEvents(listItem, tareacompletada);
}



let ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.onclick = agregartarea;
addButton.addEventListener("click", agregartarea);
addButton.addEventListener("click", ajaxRequest);


let bindtareaEvents = function(tareaListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    let checkBox = tareaListItem.querySelector("input[type=checkbox]");
    let editarButton = tareaListItem.querySelector("button.editar");
    let borrarButton = tareaListItem.querySelector("button.borrar");


    editarButton.onclick = editartarea;
    borrarButton.onclick = borrartarea;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompletetareaHolder.children.length; i++) {

    bindtareaEvents(incompletetareaHolder.children[i], tareacompletada);
}

for (let i = 0; i < tareacompletasHolder.children.length; i++) {
    bindtareaEvents(tareacompletasHolder.children[i], tareaIncompleta);
}