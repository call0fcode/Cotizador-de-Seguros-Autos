import React, { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Resumen from "./components/Resumen";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import styled from "@emotion/styled";

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

const App = () => {
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: "",
      year: "",
      plan: "",
    },
  });

  const [cargando, guardarCargando] = useState(false);

  const { datos, cotizacion } = resumen;

  return (
    <Contenedor>
      <Header titulo="Cotizador de Seguro de Automóviles" />

      <ContenedorFormulario>
        <Formulario
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />
        {cargando ? <Spinner /> : null}
        <Resumen datos={datos} />
        {
          // El componente solo se muestra si no se está cargando (spinner)
          !cargando ? <Resultado cotizacion={cotizacion} /> : null
        }
      </ContenedorFormulario>
    </Contenedor>
  );
};

export default App;
