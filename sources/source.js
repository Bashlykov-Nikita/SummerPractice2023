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
const arrOfAnswers21_24 = []

const taskTypeSwitch = (taskId) => {
    if (taskId < 21) {
        return (0)
    } else if (taskId < 25) {
        return (1)
    } else {
        return (2)
    }
}
const arrayOfActiveTasks = ['1']
const arrayOfActiveMarkers = []

function sliceIntoRows(arr, rowSize = 5) {
    const res = [];
    for (let i = 0; i < arr.length; i += rowSize) {
        const chunk = arr.slice(i, i + rowSize);
        res.push(chunk);
    }
    return res;
}

const markersByRows = sliceIntoRows(marker)
console.log(markersByRows)
// Changing task
function changingTask(someTask) {
    buttons(someTask.id, arrayOfActiveMarkers)
    taskListener(someTask, activeMarker[0])
    activeTask[0].classList.remove("activeTask")
    someTask.classList.add("activeTask")
    arrOfAnswers21_24.length = 0
    activeTask[0] = someTask
    counter.innerHTML = someTask.id
    taskImg.src = changeTaskImg(someTask, activeMarker[0])
    showAnswerRows(activeTask[0].id)

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
function taskListener(currentTask, mark) {
    //Romoving all previous marks
    markersByRows.forEach(row =>
        row.forEach(answer => {
            if (answer.classList.contains("activeMarker")) {
                answer.classList.remove("activeMarker")
            }
        })
    )
    // If task was already seen
    if (arrayOfActiveTasks.indexOf(currentTask.id) >= 0) {
        arrayOfActiveTasks[arrayOfActiveTasks.indexOf(currentTask.id)] = currentTask.id
        // Put marks down if task was answered previously
        if (arrayOfActiveMarkers[currentTask.id - 1]) {
            switch (taskTypeSwitch(currentTask.id)) {
                case 0:
                    console.log(currentTask.id - 1)
                    console.log(arrayOfActiveMarkers[currentTask.id - 1])
                    arrayOfActiveMarkers[currentTask.id - 1].classList.add("activeMarker")
                    break
                case 1:
                    console.log(currentTask.id - 1)
                    console.log(arrayOfActiveMarkers[currentTask.id - 1])
                    arrayOfActiveMarkers[currentTask.id - 1].forEach(row => {
                        if (row) {
                            row.classList.add("activeMarker")
                        }
                    })
                    break
                case 2:
                    console.log('not made yet')
                    break
            }
        }
        // if it's a new task 
    } else {
        arrayOfActiveTasks.push(currentTask.id)
    }
}

function changingMark(marksArray, mark) {

    marksArray.forEach(answer => {
        if (answer.classList.contains("activeMarker")) {
            answer.classList.remove("activeMarker")
        }
    })
    mark.classList.add("activeMarker")
    activeMarker[0] = mark
    markListener(mark, activeTask[0])
    //TODO: button function here
    greenButton.innerHTML = "Відповісти"
    redButton.innerHTML = "Завершити тест"
    switch (taskTypeSwitch(activeTask[0].id)) {
        case 0:
            console.log(arrayOfActiveMarkers)
            break
        case 1:
            console.log(arrayOfActiveMarkers[activeTask[0].id - 1])
            console.log(arrayOfActiveMarkers)
            break
        case 2:
            console.log('not made yet')
            break
    }
}


markersByRows.forEach(row => {
    row.forEach(answer => {
        answer.addEventListener('click', () => {
            changingMark(row, answer)
        })
    })
})



function markListener(currentMarker, activeTask) {
    //TODO: Change the way how markers works in tasks 21-25
    switch (taskTypeSwitch(activeTask.id)) {
        case 0:
            arrayOfActiveMarkers[activeTask.id - 1] = currentMarker
            taskSpan[activeTask.id - 1].classList.add("alreadyAnswered")
            break
        case 1:
            if (currentMarker.classList.contains('row1')) {
                arrOfAnswers21_24[0] = currentMarker
            } else if (currentMarker.classList.contains('row2')) {
                arrOfAnswers21_24[1] = currentMarker
            } else if (currentMarker.classList.contains('row3')) {
                arrOfAnswers21_24[2] = currentMarker
            } else if (currentMarker.classList.contains('row4')) {
                arrOfAnswers21_24[3] = currentMarker
            }
            let buf = [...arrOfAnswers21_24]
            arrayOfActiveMarkers[activeTask.id - 1] = buf
            taskSpan[activeTask.id - 1].classList.add("alreadyAnswered")
            break
        case 2:
            console.log('not made yet')
            break
    }
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
    switch (taskTypeSwitch(currentTaskId)) {
        case 0:
            for (let i = 1; i < rows.length; i++) {
                rows[i].classList.add("displayNone")
            }
            fictionRows.forEach(frow => {
                frow.classList.add("displayNone")
            })
            break
        case 1:
            rows.forEach(row => {
                row.classList.remove("displayNone")
            })
            fictionRows.forEach(frow => {
                frow.classList.remove("displayNone")
            })
            break
        case 2:
            console.log('not made yet')
            break
    }
}  
