const input = document.querySelector("#input");
const add = document.querySelector("#add");

const el = document.createElement("ul");
document.body.appendChild(el);

async function loadTasks() {
    const res = await fetch("http://localhost:10000/users/tasks"); 
    const tasks = await res.json();

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function createTaskElement(task) {
    const li = document.createElement("li");

    li.textContent = task.task;
    li.dataset.id = task.id;  

    el.appendChild(li);

    li.addEventListener("click", async () => {
        const id = li.dataset.id;

        await fetch(`http://localhost:10000/users/tasks/${id}`, { 
            method: "DELETE"
        });

        li.remove();
    });
}

add.addEventListener("click", async (event) => {
    event.preventDefault();

    const taskText = input.value;

    if (taskText.length < 1) return;

    try {
        const res = await fetch("http://localhost:10000/users/tasks", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: taskText })
        });

        const data = await res.json();  

        createTaskElement(data);

        input.value = "";

    } catch (err) {
        console.log("помилка:", err);
    }
});

loadTasks();
