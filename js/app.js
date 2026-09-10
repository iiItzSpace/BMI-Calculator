document.getElementById("btn-calculate").addEventListener("click", handleInputs);

document.getElementById("height").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {handleInputs();}
});

document.getElementById("weight").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {handleInputs();}
});

function handleInputs() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");

  const errorMessage = validateInputs(weight, height);
  if (errorMessage) {
    errorDiv.textContent = errorMessage;
    resultDiv.textContent = "";
    return;
  }

  errorDiv.textContent = "";

  const bmi = calculateBMI(weight, height);
  const category = getCategory(bmi);

  resultDiv.innerHTML = `Tu IMC es ${bmi}<br>Tu categoría es: ${category}`;
}

function validateInputs(weight, height) {
  if (isNaN(weight) || isNaN(height)) {
    return "Error. Debes ingresar valores numéricos.";
  }
  if (weight <= 0 || weight > 800) {
    return "Error. Peso no válido.";
  }
  if (height <= 0 || height > 3) {
    return "Error. Altura no válida.";
  }
  return null;
}

const BMI_CATEGORIES = [
  { max: 18.5, label: "Bajo peso." },
  { max: 25, label: "Peso normal." },
  { max: 30, label: "Sobrepeso." },
  { max: 35, label: "Obesidad grado I." },
  { max: 40, label: "Obesidad grado II." },
  { max: Infinity, label: "Obesidad grado III." }
];

function calculateBMI(weight, height) {
  const bmi = weight / (height * height);
  return Math.round((bmi + Number.EPSILON) * 100) / 100;
}

function getCategory(bmi) {
  const category = BMI_CATEGORIES.find(c => bmi < c.max);
  return category.label;
}
