// Load student records from browser storage
let students = [];

try {
    students = JSON.parse(localStorage.getItem("studentRecords")) || [];
    if (!Array.isArray(students)) students = [];
} catch (error) {
    students = [];
}


// Navigation buttons
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        showPage(button.dataset.page);
    });
});


// Open Add Student from Dashboard
document.getElementById("goToAdd").addEventListener("click", function() {
    showPage("addStudent");
});


// Change page
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    navButtons.forEach(function(button) {
        button.classList.toggle(
            "active",
            button.dataset.page === pageId
        );
    });

    const titles = {
        dashboard: "Dashboard",
        addStudent: "Add Student",
        studentList: "Student List"
    };

    document.getElementById("pageTitle").textContent = titles[pageId];

    if (pageId === "addStudent") {
        document.getElementById("message").textContent = "";
    }

    displayStudents();
}


// Save data in browser storage
function saveData() {
    localStorage.setItem("studentRecords", JSON.stringify(students));
}


// Add student form
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const message = document.getElementById("message");

    if (!name || !roll || !department || !year) {
        message.style.color = "red";
        message.textContent = "Please fill in all the fields.";
        return;
    }

    // Check for duplicate roll number
    const exists = students.some(function(student) {
        return student.roll.toLowerCase() === roll.toLowerCase();
    });

    if (exists) {
        message.style.color = "red";
        message.textContent = "This roll number already exists.";
        return;
    }

    const student = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: name,
        roll: roll,
        department: department,
        year: year
    };

    students.push(student);

    saveData();
    displayStudents();

    document.getElementById("studentForm").reset();

    message.style.color = "green";
    message.textContent = "Student added successfully!";

    // Automatically navigate to the list
    showPage("studentList");
});


// Display students and update the dashboard
function displayStudents() {
    const table = document.getElementById("studentTable");
    const searchValue = document.getElementById("search").value
        .trim().toLowerCase();

    table.innerHTML = "";

    const filteredStudents = students.filter(function(student) {
        return student.name.toLowerCase().includes(searchValue) ||
               student.roll.toLowerCase().includes(searchValue);
    });

    filteredStudents.forEach(function(student) {
        const row = document.createElement("tr");

        [student.roll, student.name, student.department, student.year]
            .forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });

    document.getElementById("emptyMessage").style.display =
        filteredStudents.length === 0 ? "block" : "none";

    document.getElementById("studentCount").textContent = students.length;
}


// Search students
document.getElementById("search").addEventListener("input", function() {
    displayStudents();
});


// Delete student
function deleteStudent(id) {
    const student = students.find(function(item) {
        return item.id === id;
    });

    if (!student) return;

    const confirmed = confirm(
        "Do you want to delete " + student.name + "'s record?"
    );

    if (!confirmed) return;

    students = students.filter(function(item) {
        return item.id !== id;
    });

    saveData();
    displayStudents();
}


// Initial display when page opens
displayStudents();