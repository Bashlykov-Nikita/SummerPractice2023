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
const lastTasksDescriptions = Array.from(document.getElementsByClassName("description"))[0]
const markDownAnswersP = Array.from(document.getElementsByClassName("p-margin"))[0]
const resaultInfoShow = Array.from(document.getElementsByClassName("blue-block-test-results"))[0]
const taskCard = Array.from(document.getElementsByClassName("task-card"))[0]
const testBal = Array.from(document.getElementsByClassName("test-bal"))[0]
const raitName = Array.from(document.getElementsByClassName("reit-name"))[0]


const arrOfAnswers21_24 = []
const arrOfAnswers25_26 = []

let checkArray = []

const taskTypeSwitch = (taskId) => {
    if (taskId < 21) {
        return (0)
    } else if (taskId < 25) {
        return (1)
    } else if (taskId < 27) {
        return (2)
    } else if (taskId < 31) {
        return (3)
    } else {
        return (4)
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
    for (let i = 0; i < ZNODATA.length; i++) {
        if (ZNODATA[i].id == task.id) {
            return (ZNODATA[i].task)
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
        inputText.forEach(field => {
            if (field.value) {
                field.value = ''
            }
            if (field.placeholder) {
                field.value = ''
            }
        })
        arrayOfActiveTasks.push(currentTask.id)
        if (currentTask.id > 24) {
            Array.from(document.getElementsByClassName('answer'))[0].addEventListener('input', () => {
                console.log(`Current task id is ${currentTask.id}`)
                inputs25_26(arrayOfActiveMarkers, currentTask.id)
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
            markDownAnswersP.classList.remove("displayNone")
            lastTasksDescriptions.classList.add("displayNone")
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
            markDownAnswersP.classList.remove("displayNone")
            lastTasksDescriptions.classList.add("displayNone")
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
            markDownAnswersP.classList.remove("displayNone")
            lastTasksDescriptions.classList.add("displayNone")
            displayNone27_30.forEach(el => el.classList.remove("displayNone"))
            taskAnswerMarkers.classList.add("displayNone")
            taskAnswerText.classList.remove("displayNone")
            // inputs25_26(arrayOfActiveMarkers, currentTaskId)
            break
        case 3:
            markDownAnswersP.classList.remove("displayNone")
            lastTasksDescriptions.classList.add("displayNone")
            taskAnswerMarkers.classList.add("displayNone")
            taskAnswerText.classList.remove("displayNone")
            displayNone27_30.forEach(el => el.classList.add("displayNone"))
            break
        case 4:
            markDownAnswersP.classList.remove("displayNone")
            markDownAnswersP.classList.add("displayNone")
            lastTasksDescriptions.classList.remove("displayNone")
            taskAnswerText.classList.add("displayNone")
            taskAnswerMarkers.classList.add("displayNone")
            break
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
    if (marker[taskId - 1]) {
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
    let finalCounter = 0
    let buf = []
    let buf1 = []
    for (let i = 0; i < 20; i++) {
        if (arrayOfActiveMarkers[i]) {

            if (arrayOfActiveMarkers[i].id == ZNODATA[i].answer) {
                checkArray.push(true)
                finalCounter++
            } else { 
                checkArray.push(false) 
            }
        } else {
            checkArray.push(false)
        }
    }
    for (let i = 20; i < 24; i++) {
        if (arrayOfActiveMarkers[i]) {
            buf = arrayOfActiveMarkers[i].map(el => el ? el.id : undefined)
            for (let j = 0; j < buf.length; j++) {
                if (buf[j] == ZNODATA[i].answer[j]) {
                    buf1.push(true)
                    finalCounter++
                } else {
                    buf1.push(false)
                }
            }
            checkArray.push(buf1)

        } else {
            checkArray.push(false)
        }
    }
    testBal.innerHTML = finalCounter
    if(finalCounter > 10){
        raitName.innerHTML = 100 + (finalCounter -10) * 3
    }
    resaultInfoShow.classList.remove("displayNone")
    taskCard.classList.add("displayNone")
    
    console.log(checkArray)
}
