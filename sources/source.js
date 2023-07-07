"use strict";
const taskSpan = Array.from(document.getElementsByClassName("task-span"))
const activeTask = Array.from(document.getElementsByClassName("activeTask"))
const taskImg = document.getElementById("taskImg")
const counter = document.getElementById("counter")
const qRadio = Array.from(document.getElementsByClassName("q-radio"))
const marker = Array.from(document.getElementsByClassName("marker"))
const activeMarker = Array.from(document.getElementsByClassName("activeMarker"))
const greenButton = Array.from(document.getElementsByClassName("answer-button"))[0]
const redButton = Array.from(document.getElementsByClassName("quit-button"))[0]
const rows = Array.from(document.getElementsByClassName("r"))
const fictionRows = Array.from(document.getElementsByClassName("fictionRow"))
const firstRow = document.getElementById('firstRow')

const arrayOfActiveTasks = ['1']
const arrayOfActiveMarkers = []
// Changing task
function changingTask(someTask) {
    buttons(someTask.id, arrayOfActiveMarkers)
    taskListener(someTask, activeMarker[0])
    activeTask[0].classList.remove("activeTask")
    someTask.classList.add("activeTask")
    activeTask[0] = someTask
    counter.innerHTML = someTask.id
    taskImg.src = changeTaskImg(someTask, activeMarker[0])
    showAnswerRows(activeTask[0].id)
    console.log(arrayOfActiveTasks)
}
function changeTaskImg(task) {
    for (let i = 0; i < ZNO2019.length; i++) {
        if (ZNO2019[i].id == task.id) {
            return (ZNO2019[i].task)
        }
    }
}
taskSpan.forEach(task => {
    task.addEventListener('click', () => {
        changingTask(task)
    });
})

function changingMark(mark) {
    mark.classList.add("activeMarker")
    activeMarker[0] = mark
    markListener(mark, activeTask[0])
    taskSpan[arrayOfActiveMarkers.length - 1].classList.add("alreadyAnswered")
    console.log(arrayOfActiveMarkers)
    console.log(mark)
}
function repetitionChecking(mark){
    if (mark.classList.contains("activeMarker")) {
        mark.classList.remove("activeMarker")
    }
}
// Changing task answer
// rows.forEach( row =>{
//     Array.from(row.children).forEach(row => {
//         console.log(row.children.)
//     })
// })

marker.forEach(answer => {
    answer.addEventListener('click', () => {
        marker.forEach(answer => {
            repetitionChecking(answer)
        })
        changingMark(answer)
        //TODO: button function should be here
        console.log(marker)
        greenButton.innerHTML = "Відповісти"
        redButton.innerHTML = "Завершити тест"
    })
})

function taskListener(currentTask, mark) {
    marker.forEach(answer => {
        if (answer.classList.contains("activeMarker")) {
            answer.classList.remove("activeMarker")
        }
    })
    if (arrayOfActiveTasks.indexOf(currentTask.id) >= 0) {
        arrayOfActiveTasks[arrayOfActiveTasks.indexOf(currentTask.id)] = currentTask.id
        if (arrayOfActiveMarkers[currentTask.id - 1]) {
            arrayOfActiveMarkers[currentTask.id - 1].classList.add("activeMarker")
        }
    } else {
        arrayOfActiveTasks.push(currentTask.id)
        if (mark) {
            mark.classList.remove("activeMarker")
        }
    }
}

function markListener(currentMarker, activeTask) {
    arrayOfActiveMarkers[activeTask.id - 1] = currentMarker

}

//Changes buttons inner text if answered is marked
function buttons(taskId, marker) {
    if (marker[taskId - 1]) {
        greenButton.innerHTML = "Відповісти"
        redButton.innerHTML = "Завершити тест"
    } else {
        greenButton.innerHTML = "Пропустити"
        redButton.innerHTML = "Наступне"
    }
}

function nextButton(button) {
    button.addEventListener('click', () => {
        changingTask(taskSpan[activeTask[0].id])
    })
}
nextButton(greenButton)
function showAnswerRows(currentTaskId) {
    if (currentTaskId > 19 && currentTaskId < 25) {
        rows.forEach(row => {
            row.classList.remove("displayNone")
        })
        fictionRows.forEach(frow => {
            frow.classList.remove("displayNone")
        })
    } else {
        for(let i = 1; i < rows.length; i++){
            rows[i].classList.add("displayNone")
        }
        fictionRows.forEach(frow => {
            frow.classList.add("displayNone")
        })
    }
}  
