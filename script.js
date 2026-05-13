// DOM элементы
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    // Массив задач
    let tasks = [];

    // =========================
    // Загрузка из localStorage
    // =========================

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      tasks = JSON.parse(savedTasks);

      tasks.forEach(task => {
        renderTask(task);
      });
    }

    // =========================
    // Сохранение
    // =========================

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // =========================
    // Отрисовка задачи
    // =========================

    function renderTask(taskText) {

      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = taskText;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Удалить";
      deleteBtn.classList.add("delete");

      // Удаление
      deleteBtn.addEventListener("click", function () {

        li.remove();

        // Удаляем из массива
        tasks = tasks.filter(task => task !== taskText);
        console.log(tasks)

        // Сохраняем
        saveTasks();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    }

    // =========================
    // Добавление задачи
    // =========================

    function addTask() {

      const text = input.value.trim();

      if (text === "") {
        return;
      }

      // Добавляем в массив
      tasks.push(text);
      console.log(tasks)
      // Сохраняем
      saveTasks();

      // Показываем на странице
      renderTask(text);

      // Очищаем input
      input.value = "";
    }

    // Кнопка
    addBtn.addEventListener("click", addTask);

    // Enter
    input.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {
        addTask();
      }

    });
