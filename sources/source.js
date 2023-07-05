"use strict";
const taskSpan = Array.from(document.getElementsByClassName("task-span"))
let activeTask = Array.from(document.getElementsByClassName("activeTask"))
const taskImg = document.getElementById("taskImg")
const counter = document.getElementById("counter")
const qRadio = Array.from(document.getElementsByClassName("q-radio"))
const marker = Array.from(document.getElementsByClassName("marker"))
const activeMarker = Array.from(document.getElementsByClassName("activeMarker"))

const arrayOfActiveTasks = ['1']
const arrayOfActiveMarkers = []
// Changing task
taskSpan.forEach(task => {
    task.addEventListener('click', () => {
        taskListener(task)
        activeTask[0].classList.remove("activeTask")
        task.classList.add("activeTask")
        activeTask[0] = task
        counter.innerHTML = task.id
        taskImg.src = changeTaskImg(task)

        // console.log(activeTask[0])

    });
})

// Changing task answer
marker.forEach(answer => {
    answer.addEventListener('click', () => {
        activeMarker[0] ? activeMarker[0].classList.remove("activeMarker") : console.log("First One selected")
        answer.classList.add("activeMarker")
        activeMarker[0] = answer
        console.log(answer.id)
        markListener(answer)
    })
})
// qRadio.forEach(answer => {
//     answer.addEventListener('click', () => {
//         console.log(answer)
//         markListener(answer)
//     })
// })


function changeTaskImg(task) {
    for (let i = 0; i < ZNO2019.length; i++) {
        if (ZNO2019[i].id == task.id) {
            return (ZNO2019[i].task)
        }
    }
}

function taskListener(currentTask) {
    arrayOfActiveTasks.push(currentTask.id)
    console.log(arrayOfActiveTasks)
}

function markListener(currentMarker) {
    arrayOfActiveMarkers.push(currentMarker.id)
    console.log(arrayOfActiveMarkers)
}