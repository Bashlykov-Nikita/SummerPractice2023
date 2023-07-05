const taskSpan = Array.from(document.getElementsByClassName("task-span"))
const activeTask = Array.from(document.getElementsByClassName("activeTask"))
const taskImg = document.getElementById("taskImg")
const counter = document.getElementById("counter")
taskSpan.forEach(task => {
    task.addEventListener('click', () => {
        activeTask[0].classList.remove("activeTask")
        task.classList.add("activeTask")
        activeTask[0] = task
        counter.innerHTML = task.id
        taskImg.src = changeTaskImg(task)
    });
})
function changeTaskImg(task) {
    for (let i = 0; i < ZNO2019.length; i++) {
        if (ZNO2019[i].id == task.id) {
            return (ZNO2019[i].task)
        }
    }
}