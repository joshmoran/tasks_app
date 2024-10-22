// Pending task parent
let taskDiv = document.getElementById('taskList');
// Completed task parent 
let finishedDiv = document.getElementById('completeList');
// Get input element for adding a task
let taskName1 = document.getElementById('taskInput');
// Get the error message element
let errorInput = document.getElementById('error');
// Get the pending counter element
let noOfEl = document.getElementById('amountOfTasks');
// Get the finished counter element 
let noOfFinEl = document.getElementById('amountOfFinishedTasks');

// Get add task button
let addBtn = document.getElementById('addTask');

//  Add function to the add task button
addBtn.addEventListener('click', addTask );

// A function to update event listeners, counters etc
function updateTasks() {
    // Get the amount of pending tasks 
    noOfTasks = document.getElementsByClassName('pendingTask').length;
    // Get the amount of computed tasks 
    noOfCompleteTasks = document.getElementsByClassName('completeTasks').length;
    
    // Set the counter for pending tasks
    noOfEl.textContent = noOfTasks;
    // Set the counter for completed tasks
    noOfFinEl.textContent = noOfCompleteTasks;

    // Get all images in the completed section, so the task can be moved back to pending 
    let undoCompleteBtn = document.getElementsByClassName('complete');
    // Get buttons for when a task is being renamed
    let confirmRenameBtn = document.getElementsByClassName('confirmRename');
    // Get rename buttons
    let renameBtn = document.getElementsByClassName('rename');
    // Get delete buttons
    let deleteBtn = document.getElementsByClassName('delete');     
    // Get images in the pending tasks, so the task can be completed and moved into the completed tasks section
    let completeBtn = document.getElementsByClassName('done');

    // Get the number of rename buttons and cycle through 
    for ( a = 0; a < renameBtn.length; a++ ){
        // Add event listeners to the rename buttons 
        renameBtn[a].addEventListener('click', renameFunction, true );

    }

    // Check the length of confirm buttons greater than 0 
    if (confirmRenameBtn.length > 0 ) {
        // Get the number of when a rename is being confirmed and cycle through 
        for ( b = 0; b < confirmRenameBtn.length; b++ ){
            // Add event listeners to the confirm rename buttons
            confirmRenameBtn[b].addEventListener('click', confirmRenameFunction );

        }
    }

    // Get the length of delete buttons and cycle through them 
    for ( c = 0; c < noOfTasks; c++ ) {
        // Add event listeners to the delete buttons
        deleteBtn[c].addEventListener('click', deleteFunction );    
    }

    // Get the length of completed image buttons and cycle through them
    for( d = 0; d < completeBtn.length; d++ ){    
        // Add event listeners to the completed image buttons
        completeBtn[d].addEventListener('click', taskComplete );
        
    }   

    // Get the length of undo buttons and cycle through them
    for ( e = 0; e < noOfCompleteTasks; e++ ) {
        // Add event listeners to the undo buttons
        undoCompleteBtn[e].addEventListener('click', undoFunction );
    }
}

// A function to create a task div for a un-completed task
function createPendingTask( taskName ) {
    // Create the html for the pending task with the task name inside and the buttons 
    html = '<div class="pendingTask"><div class="left pending"><img class="done" alt="complete task icon" src="img/square-xmark.svg"></div><div class="right"><h2 class="name">' + String(taskName) + '</h2><div class="actions"><button class="rename">Rename</button><button class="delete">Delete</button></div></div></div>';
    // Return the HTML 
    return html;
}

// A function to create a task div for a completed task
function createFinishedTask( taskName ) {
    // Create the html for the completed task with the task name inside 
    html = '<div class="completeTasks"><div class="left"><img class="complete" alt="undo the task icon" src="img/square-xmark.svg"></div><div class="right"><h2 class="strikethrough">' + String(taskName) + '</div></div>';
    // Return the html
    return html; 
}

// Create and setup an error message for the webpage
function createError( message ) {
    // Append the message to the error message
    errorInput.textContent = message;
    // Add 'attention' class to the error message 
    errorInput.classList.add('attention');
    // Set the error message to be shown
    errorInput.style.display = 'flex';
    // Return the function
    return;
}

// Remove any errors messages from the webpage
function removeError( ) {
    // Make the content null
    errorInput.textContent = '';
    // Do not display the error box
    errorInput.style.display = 'none';
    // Remove class from the error box
    errorInput.classList.remove( 'attention' );
} 

// Add a task
function addTask() {
    // Get Value in the input element
    let taskName = taskName1.value;
    
    // Check if the input is empty and null
    if (taskName == '' || taskName == null ) {
        // Insert the error message into the error div
        errorInput.textContent ='Please enter a name';
        // Create an error message and setup the text 
        createError( 'Please enter a task to continue' );
        // Give the add new tasks input element an error display 
        taskName1.classList.add('attention');
    } else {
        // Create new todo, pending task 
        createPendingTask( taskName );
        // Append the task to the pending task list 
        taskDiv.insertAdjacentHTML('beforeend', html);
        // Clear the any error message on the page
        removeError();
        // Remove any colors for an error on the error display 
        taskName1.classList.remove('attention');
        // Clear the input element
        taskName1.value = '';
        // Update tasks 
        updateTasks();
    }
}


// Rename Button
function renameFunction() {
    // Get the parent container 
    let parentDiv = this.parentNode.parentNode;
    // Create a new input element for the user to type their new task name
    let newEl = document.createElement('input');
    // Give the text to the input
    newEl.innerText = 'taskRename';
    // Give the input element a class of 'attention'
    newEl.classList.add('attention');
    // Give the original task name to the input element 
    newEl.value = this.parentNode.parentNode.firstChild.innerText;
    // Remove the name from the task
    parentDiv.removeChild( parentDiv.firstElementChild);
    // Insert the new input element, allows the user to type their new name
    parentDiv.insertBefore( newEl, parentDiv.children[0] );
    // Remove the 'rename' button
    parentDiv.childNodes[1].removeChild(parentDiv.childNodes[1].firstChild);
    // Create a button for the confirm rename button
    let newRenameBtn = document.createElement('button');
    // Give the button some text
    newRenameBtn.innerText = 'Confirm Rename';
    // Add 'confirmRename' class to the button 
    newRenameBtn.classList.add('confirmRename');
    // Append the 'confirm rename' button into the button container 
    parentDiv.childNodes[1].insertBefore( newRenameBtn, parentDiv.childNodes[1].firstChild);
    // Update tasks 
    updateTasks();
}

// Confirm Rename Button
function confirmRenameFunction()  {
    // Get task name 
    let newTxt = this.parentNode.parentNode.firstChild.value;
    // Check if the task name is null or empty
    if (newTxt == '' || newTxt == null ) {
        // Create a error message
        let html = createError(  'Please rename the task' );
        // Append the message onto the error text
        errorInput.innerHTML(html);
        return false;
    } else {
        // Remove the error message
        removeError();
    }
    // Select the container for the buttons
    let buttonDiv = this.parentNode;
    // Get parent div
    let parentDiv = this.parentNode.parentNode;
    // Get HTML from the parent div
    let parentDivHTML = this.parentNode.parentNode.innerHTML;
    // Slice the parent HTML to get the message 
    let h2El = parentDivHTML.split('<div class', 1);
    // Remove the input element 
    parentDiv.removeChild( parentDiv.firstElementChild);
    // Create new button
    let newRenameBtn = document.createElement('button');
    // Give the button some text
    newRenameBtn.innerText = 'Rename';
    // Add class of 'rename' to the button 
    newRenameBtn.classList.add('rename');
    // Create a H2 element
    let newH2El = document.createElement('h2');
    // Give the new edited name to the heading 
    newH2El.innerHTML = newTxt;
    // Add class of 'name' to the heading
    newH2El.classList.add('name');
    // Add the heading the the task
    parentDiv.insertBefore( newH2El, parentDiv.children[0] );
    // Add the 'rename' button back to the task
    this.parentNode.insertBefore(newRenameBtn, buttonDiv.firstChild);
    // Delete the input element
    parentDiv.childNodes[1].removeChild(parentDiv.childNodes[1].childNodes[1]);
    // Update tasks
    updateTasks();
}

// Delete the task, by the delete button
function deleteFunction() {
    // Get parent Div
    let parentDiv = this.parentNode.parentNode.parentNode;
    // Remove the task from the pending task
    taskDiv.removeChild(parentDiv);
    // Update tasks
    updateTasks();
}

// When a user has completed a task, by clicking on the image
function taskComplete() {
    // Get parent Div
    let parentDiv = this.parentNode.parentNode.childNodes[1].firstChild;
    // Get task name from the pending task
    text = parentDiv.innerText;
    // Create a completed task using the completed task function with the task name in tact
    let html = createFinishedTask( text );
    // Add the task into the completed task div
    finishedDiv.insertAdjacentHTML('beforeend', html);
    // Remove the tasks from the pending task div
    this.parentNode.parentNode.parentNode.removeChild( this.parentNode.parentNode);
    // Update tasks
    updateTasks();
}

// Function to restore a completed task back into the pending section 
function undoFunction() {
    // Get task name
    let undoTitle = this.parentNode.parentNode.childNodes[1].firstChild.innerText;
    // Create a pending task using the pending task function with the task name in tact 
    let newPendingDiv = createPendingTask( undoTitle );
    // Insert the new task element into pending tasks 
    taskDiv.insertAdjacentHTML('beforeend', newPendingDiv);
    // remove the tasks from the completed tasks
    this.parentNode.parentNode.parentNode.removeChild( this.parentNode.parentNode);
    // Update tasks
    updateTasks();
}

// Update tasks 
updateTasks();