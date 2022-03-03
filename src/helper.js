// Función que devuelve el año actual menos el que le pase el usuario
export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

// Calcula el total a pagar según la marca del vehículo
export function calcularMarca(marca) {
  let incremento;

  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.05;
      break;
    default:
      break;
  }

  return incremento;
}

// Calcula el total a pagar según el plan seleccionado
export function calculaPlan(plan) {
  return plan === "basico" ? 1.2 : 1.5;
}

// Devuelve un texto con la primera letra mayúscula
export function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
