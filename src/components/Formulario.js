import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { obtenerDiferenciaYear, calcularMarca, calculaPlan } from "../helper";

const Campo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
  // States
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, guardarError] = useState(false);

  // Extraer valores del state
  const { marca, year, plan } = datos;

  // Leer datos del formulario y almacenarlos en el state
  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario envía el formulario
  const cotizarSeguro = (e) => {
    e.preventDefault();

    // Validación: comprobar si alguno de los campos está vacío
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }

    // Se ha pasado la validación

    // Reset en caso de que haya un error previamente
    guardarError(false);

    // Precio base de 2000
    let resultado = 2000;

    // Obtener diferencia entre el año del vehículo y el actual
    const diferencia = obtenerDiferenciaYear(parseInt(year));

    // Por cada año de diferencia hay que restar un 3% del valor
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15% de incremento
    // Asiático 5% de incremento
    // Europeo 30% de incremento
    resultado = calcularMarca(marca) * resultado;

    // Plan básico incremento del 20%
    // Plan completo incrementa el 50%
    resultado = parseFloat(calculaPlan(plan) * resultado).toFixed(2);

    // Cargar spinner
    guardarCargando(true);

    setTimeout(() => {
      // Ocultar spinner
      guardarCargando(false);

      // Guardar datos para que se muestren en el front
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 3000);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}

      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiático</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired,
};

export default Formulario;
