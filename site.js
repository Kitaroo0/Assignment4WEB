const limit = 10;
var count = 0;

// Here we add a new task
function addTask() {
    const newTaskText = document.getElementById("newTask").value;
    if(newTaskText){
        // Limit checker
        if (count >= limit) {
            alert("You have reached the limit");
        }
        else{
            const taskList = document.getElementById("task-list");
            const li = document.createElement("li");
            li.className = "task";

            // create checkbox 
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "sq";
            checkbox.addEventListener("change", completeTask);

            // text(task)
            const taskText = document.createElement("span");
            taskText.innerText = newTaskText;

            // X button for delete task
            const deleteBtn = document.createElement("span");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerText = "x";
            deleteBtn.addEventListener("click", deleteTask);

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
            document.getElementById("newTask").value = "";

            count++;
        }
    }
}

// Here we cross out our task
function completeTask() {
    const taskText = this.nextElementSibling;
    if (this.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
}

// Here we delete our task
function deleteTask() {
    this.parentElement.remove();
    count--;
}


let countdown;
        
// starting the countdown
function startTimer() {
    const durationInput = document.getElementById('duration');
    const timerDisplay = document.getElementById('timer');
    const duration = parseInt(durationInput.value);

    // check for validation
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid timer duration.');
        return;
    }

    let startTime = Date.now();
    const endTime = startTime + (duration * 1000);

    updateTimerDisplay(duration, timerDisplay);
    document.getElementById('duration').value="";
    countdown = setInterval(function () {
        const timeLeft = Math.max(0, endTime - Date.now());
        if (timeLeft === 0) {
            clearInterval(countdown);
            alert('Timer expired!');
        } else {
            updateTimerDisplay(Math.ceil(timeLeft / 1000), timerDisplay);
        }
    }, 1000);
}

// converts seconds to minutes
function updateTimerDisplay(seconds, display) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    display.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function allowDrop(event) {
    event.preventDefault();
}

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }

  function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      }
    }
  }

  function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
  }

  ball.onclick = function() {

    let height = field.clientHeight - ball.clientHeight;
    let width = 100;

    animate({
      duration: 2000,
      timing: makeEaseOut(bounce),
      draw: function(progress) {
        ball.style.top = height * progress + 'px'
      }
    });

    animate({
      duration: 2000,
      timing: makeEaseOut(quad),
      draw: function(progress) {
        ball.style.left = width * progress + "px"
      }
    });
  }
let mySound1 = document.getElementById('dragSound1');
let mySound2 = document.getElementById('dragSound2');
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggableElement = document.getElementById(data);
    var category = event.target.closest('.category');

    if (category) {
        category.appendChild(draggableElement);
    }
}

function checkAnswers() {
    var enterCategory = document.getElementById("legs");
    var sportCategory = document.getElementById("hands");

    var enterAnswers = ["choice1", "choice2"];
    var sportAnswers = ["choice3", "choice4"];

    var enterCorrect = checkCategory(enterCategory, enterAnswers);
    var sportCorrect = checkCategory(sportCategory, sportAnswers);

    if (enterCorrect && sportCorrect) {
        document.getElementById("result").innerText = "Answers are correct!";
        mySound2.play()
    } else {
        document.getElementById("result").innerText = "Incorrect. Please try again.";
        mySound1.play()
    }
}

function checkCategory(category, correctAnswers) {
    var draggedElements = category.getElementsByClassName("draggable");
    var draggedIds = Array.from(draggedElements).map(element => element.id);
    return JSON.stringify(draggedIds.sort()) === JSON.stringify(correctAnswers.sort());
}

$(document).ready(function() {
    $("#toggleButton").click(function() {
        $("#toggleText").toggle(); 
    });
});