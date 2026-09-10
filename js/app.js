document.getElementById("btn_calcular").addEventListener("click", lecturaEntradas);
document.getElementById("altura").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {lecturaEntradas();}
});
document.getElementById("peso").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {lecturaEntradas();}
});

function lecturaEntradas() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  const div_error = document.getElementById("error");
  const div_resultado = document.getElementById("resultado");

  const mensaje_error = validarEntradas(peso,altura);
  if(mensaje_error) {
    div_error.textContent = mensaje_error;
    div_resultado.textContent = "";
    return;
  }

  div_error.textContent = "";

  const imc = calcularIMC(peso, altura);
  const categoria = obtenerCategoria(imc);

  div_resultado.innerHTML = `Tu IMC es ${imc}<br>Tu categoría es: ${categoria}`;
}

function validarEntradas(peso, altura) {
  if(isNaN(peso) || isNaN(altura)) {
    return "Error. Debes ingresar valores numéricos.";
  }
  if(peso<=0 || peso>800) {
    return "Error. Peso no válido.";
  }
  if(altura<=0 || altura>3) {
    return "Error. Altura no válida."
  }
  return null;
}

const categorias_imc = [
  {max: 18.5, estado: "Bajo peso."},
  {max: 25, estado: "Peso normal."},
  {max: 30, estado: "Sobrepeso."},
  {max: 35, estado: "Obesidad grado I."},
  {max: 40, estado: "Obesidad grado II."},
  {max: Infinity, estado: "Obesidad grado III."}
];

function calcularIMC(peso,altura) {
  const imc = peso / (altura*altura);
  return Math.round((imc + Number.EPSILON) * 100) / 100;
}

function obtenerCategoria(imc) {
const categoria = categorias_imc.find(e => imc < e.max);
return categoria.estado;
}
