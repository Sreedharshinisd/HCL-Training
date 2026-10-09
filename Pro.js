
function calculateBMI() {

    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById("result").innerHTML =
            "Please enter valid weight and height.";
        return;
    }

    // Convert height from cm to metres
    let heightInMeters = height / 100;

    // BMI formula
    let bmi = weight / (heightInMeters * heightInMeters);

    let category;

    if (bmi < 18.5) {
        category = "Underweight";
    } 
    else if (bmi < 25) {
        category = "Normal Weight";
    } 
    else if (bmi < 30) {
        category = "Overweight";
    } 
    else {
        category = "Obesity";
    }

    document.getElementById("result").innerHTML =
        "BMI: " + bmi.toFixed(2) + "<br>" +
        "Category: " + category;
}