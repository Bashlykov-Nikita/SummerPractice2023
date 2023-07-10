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
const taskAnswerMarkers = Array.from(document.getElementsByClassName("task-answer-markers"))[0]
const taskAnswerText = Array.from(document.getElementsByClassName("task-answer-text"))[0]
const inputText = Array.from(document.getElementsByClassName("inptext"))
const firstTextInputfield = Array.from(document.getElementsByClassName("firstTextInputfield"))[0]
const secendTextInputfield = Array.from(document.getElementsByClassName("secendTextInputfield"))[0]
const displayNone27_30 = Array.from(document.getElementsByClassName("displayNone27-30"))
//
const arrOfAnswers21_24 = []
const arrOfAnswers25_26 = []

let checkArrayfor1_20 = []

const taskTypeSwitch = (taskId) => {
    if (taskId < 21) {
        return (0)
    } else if (taskId < 25) {
        return (1)
    } else if (taskId < 27) {
        return (2)
    } else if (taskId < 31) {
        return (3)
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
// Changing task
function changingTask(someTask) {
    taskListener(someTask, activeMarker[0])
    activeTask[0].classList.remove("activeTask")
    someTask.classList.add("activeTask")
    arrOfAnswers21_24.length = 0
    arrOfAnswers25_26.length = 0
    activeTask[0] = someTask
    counter.innerHTML = someTask.id
    taskImg.src = changeTaskImg(someTask, activeMarker[0])
    showAnswerRows(activeTask[0].id)
    // inputs25_26(arrayOfActiveMarkers, activeTask[0].id)
    buttons(someTask.id, arrayOfActiveMarkers)
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
    //Removing all previous marks
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
        console.log(currentTask.id - 1)
        buttons(currentTask.id, arrayOfActiveMarkers)

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
                            console.log(row)
                            row.classList.add("activeMarker")
                        }
                    })
                    break
                case 2:
                    console.log(currentTask.id - 1)
                    console.log(arrayOfActiveMarkers)
                    console.log(arrayOfActiveMarkers[currentTask.id - 1][0])
                    firstTextInputfield.value = arrayOfActiveMarkers[currentTask.id - 1][0]
                    secendTextInputfield.value = arrayOfActiveMarkers[currentTask.id - 1][1]
                    break
                case 3:
                    console.log(currentTask.id - 1)
                    console.log(arrayOfActiveMarkers)
                    console.log(arrayOfActiveMarkers[currentTask.id - 1][0])
                    firstTextInputfield.value = arrayOfActiveMarkers[currentTask.id - 1][0]
                    secendTextInputfield.value = arrayOfActiveMarkers[currentTask.id - 1][1]
                    break
            }
        }
        // if it's a new task 
    } else {

        arrayOfActiveTasks.push(currentTask.id)
        if (currentTask.id > 24) { 
            console.log(`Current task id is ${currentTask.id }`)
            inputText.forEach(field => {
                field.addEventListener('input', () => {       
                    inputs25_26(arrayOfActiveMarkers, currentTask.id)
                })
            })
            inputText.forEach(field => {
                if (field.value) {
                    field.value = ''
                }
                if (field.placeholder) {
                    field.value = ''
                }
            })
        }
    }
}
markersByRows.forEach(row => {
    row.forEach(answer => {
        answer.addEventListener('click', () => {
            changingMark(row, answer)
        })
    })
})

function changingMark(marksArray, mark) {

    marksArray.forEach(answer => {
        if (answer.classList.contains("activeMarker")) {
            answer.classList.remove("activeMarker")
        }
    })
    mark.classList.add("activeMarker")
    activeMarker[0] = mark
    markListener(mark, activeTask[0])


    switch (taskTypeSwitch(activeTask[0].id)) {
        case 0:
            console.log(arrayOfActiveMarkers)
            break
        case 1:
            console.log(arrayOfActiveMarkers[activeTask[0].id - 1])
            console.log(arrayOfActiveMarkers)
            break
        case 2:
            console.log(arrayOfActiveMarkers[activeTask[0].id - 1])
            console.log(arrayOfActiveMarkers)
            break
    }
}

function markListener(currentMarker, activeTask) {
    switch (taskTypeSwitch(activeTask.id)) {
        case 0:
            arrayOfActiveMarkers[activeTask.id - 1] = currentMarker
            taskSpan[activeTask.id - 1].classList.add("alreadyAnswered")
            buttons(activeTask.id, arrayOfActiveMarkers)
            //console.log(true)
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
            let buf21_24 = [...arrOfAnswers21_24]
            arrayOfActiveMarkers[activeTask.id - 1] = buf21_24
            buttons(activeTask.id, arrayOfActiveMarkers)
            taskSpan[activeTask.id - 1].classList.add("alreadyAnswered")
            break
        case 2:
            console.log(true)
            // arrayOfActiveMarkers[activeTask.id - 1] = inputs25_26()
            // taskSpan[activeTask.id - 1].classList.add("alreadyAnswered")
            break
    }
}


function inputs25_26(arrOfAnswers, currentTaskId) {
    

    console.log(arrOfAnswers25_26)
    console.log(currentTaskId)
    // console.log(true)

    arrOfAnswers25_26[0] = firstTextInputfield.value
    arrOfAnswers25_26[1] = secendTextInputfield.value
    console.log(arrOfAnswers25_26)
    let buf25_26 = [...arrOfAnswers25_26]
    arrOfAnswers[currentTaskId - 1] = buf25_26
    taskSpan[currentTaskId - 1].classList.add("alreadyAnswered")

}










function showAnswerRows(currentTaskId) {
    switch (taskTypeSwitch(currentTaskId)) {
        case 0:
            taskAnswerText.classList.add("displayNone")
            taskAnswerMarkers.classList.remove("displayNone")
            for (let i = 1; i < rows.length; i++) {
                rows[i].classList.add("displayNone")
            }
            fictionRows.forEach(frow => {
                frow.classList.add("displayNone")
            })
            break
        case 1:
            taskAnswerText.classList.add("displayNone")
            taskAnswerMarkers.classList.remove("displayNone")
            rows.forEach(row => {
                row.classList.remove("displayNone")
            })
            fictionRows.forEach(frow => {
                frow.classList.remove("displayNone")
            })
            break
        case 2:
            displayNone27_30.forEach(el => el.classList.remove("displayNone"))
            taskAnswerMarkers.classList.add("displayNone")
            taskAnswerText.classList.remove("displayNone")
            // inputs25_26(arrayOfActiveMarkers, currentTaskId)
            break
        case 3:
            taskAnswerMarkers.classList.add("displayNone")
            taskAnswerText.classList.remove("displayNone")
            displayNone27_30.forEach(el => el.classList.add("displayNone"))

        // inputs25_26(arrayOfActiveMarkers, currentTaskId)
    }
}

//Changes buttons inner text if answered is marked
function nextButton() {
    changingTask(taskSpan[activeTask[0].id])
    console.log(activeTask[0].id)
}


greenButton.addEventListener('click', () => {
    nextButton()
})
//nextButton(greenButton)
// nextButton(redButton)

function buttons(taskId, marker) {
    if (marker[taskId -1]){ 
        console.log(marker[taskId])
        greenButton.innerHTML = "Відповісти"
        redButton.innerHTML = "Завершити тест"
    } else {
        // console.log(taskId)
        greenButton.innerHTML = "Пропустити"
        redButton.innerHTML = "Наступне"
    }
}
function endButton(button) {
    button.addEventListener('click', () => {
        if (button.innerHTML == "Завершити тест") {
            console.log("end")
            end()
        } else {
            nextButton()
        }
    })
}

buttons(activeTask[0].id - 1, arrayOfActiveMarkers)
endButton(redButton)

function end() {
    for (let i = 0; i < 20; i++) {
        if (arrayOfActiveMarkers[i]) {
            checkArrayfor1_20.push(arrayOfActiveMarkers[i].id)
            // console.log(arrayOfActiveMarkers[i].id)
        } else {
            console.log(undefined)
        }
    }
    for (let i = 20; i < 25; i++) {
        if (arrayOfActiveMarkers[i]) {
            for(let j = 0; j < 4; j++){
                if(arrayOfActiveMarkers[i][j]){
                    // console.log(arrayOfActiveMarkers[i][j].id)
                    checkArrayfor1_20.push(arrayOfActiveMarkers[i].id)
                }else{
                    console.log(undefined)
                }
            }
            //console.log(arrayOfActiveMarkers[i])
        } else {
            console.log(undefined)
        }
    }
    console.log(checkArrayfor1_20)
}