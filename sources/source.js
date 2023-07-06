"use strict";
const taskSpan = Array.from(document.getElementsByClassName("task-span"))
let activeTask = Array.from(document.getElementsByClassName("activeTask"))
const taskImg = document.getElementById("taskImg")
const counter = document.getElementById("counter")
const qRadio = Array.from(document.getElementsByClassName("q-radio"))
const marker = Array.from(document.getElementsByClassName("marker"))
const activeMarker = Array.from(document.getElementsByClassName("activeMarker"))
const greenButton = Array.from(document.getElementsByClassName("answer-button"))[0]
const redButton = Array.from(document.getElementsByClassName("quit-button"))[0]

const arrayOfActiveTasks = ['1']
const arrayOfActiveMarkers = []
// Changing task

taskSpan.forEach(task => {
    task.addEventListener('click', () => {
        changingTask(task)
    });
})

// Changing task answer
marker.forEach(answer => {

    answer.addEventListener('click', () => {
        marker.forEach(answer => {
            if (answer.classList.contains("activeMarker")) {
                answer.classList.remove("activeMarker")
            }
        })
        answer.classList.add("activeMarker")
        activeMarker[0] = answer
        markListener(answer, activeTask[0])
        // buttons(arrayOfActiveTasks, arrayOfActiveMarkers)
        greenButton.innerHTML = "Відповісти"
        redButton.innerHTML = "Завершити тест"
    })
})

function changeTaskImg(task) {
    for (let i = 0; i < ZNO2019.length; i++) {
        if (ZNO2019[i].id == task.id) {
            return (ZNO2019[i].task)
        }
    }
}

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
        console.log(arrayOfActiveTasks.indexOf(currentTask))
        arrayOfActiveTasks.push(currentTask.id)
        console.log(arrayOfActiveTasks)
        if (mark) {
            mark.classList.remove("activeMarker")
        }
    }
}

function markListener(currentMarker, activeTask) {
    arrayOfActiveMarkers[activeTask.id - 1] = currentMarker

}

function buttons(taskId, marker) {
    if (marker[taskId - 1]) {
        greenButton.innerHTML = "Відповісти"
        redButton.innerHTML = "Завершити тест"
    } else {
        greenButton.innerHTML = "Пропустити"
        redButton.innerHTML = "Наступне"
    }
}
function changingTask(someTask) {
    buttons(someTask.id, arrayOfActiveMarkers)
    taskListener(someTask, activeMarker[0])
    activeTask[0].classList.remove("activeTask")
    someTask.classList.add("activeTask")
    activeTask[0] = someTask
    counter.innerHTML = someTask.id
    taskImg.src = changeTaskImg(someTask, activeMarker[0])
}
function nextButton(button) {
    button.addEventListener('click', () => {
        changingTask(taskSpan[activeTask[0].id])
    })
}
nextButton(greenButton)