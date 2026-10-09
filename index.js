let name = prompt("Enter your name:");
let age = prompt("Enter your age:");
let dept = prompt("Enter your department:");

let data = new Map();

data.set("Name", name);
data.set("Age", age);
data.set("Department", dept);

document.body.innerHTML = `
    <h2>User Data</h2>
    <p>Name: ${data.get("Name")}</p>
    <p>Age: ${data.get("Age")}</p>
    <p>Department: ${data.get("Department")}</p>
`;