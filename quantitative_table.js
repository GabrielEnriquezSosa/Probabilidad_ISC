const valores = [];
const inputValor = document.getElementById("valor");
const btnGuardar = document.querySelector(".save");
const btnGenerar = document.querySelector(".ola");
const tbody = document.querySelector("tbody");

// Guardar valores ingresados
btnGuardar.addEventListener("click", () => {
  const valor = parseFloat(inputValor.value);
  if (!isNaN(valor)) {
    valores.push(valor);
    inputValor.value = "";
    console.log("Valor guardado:", valor);
  }
});

// Función para calcular y generar tabla
btnGenerar.addEventListener("click", () => {
  if (valores.length === 0) return;

  const datos = [...valores].sort((a, b) => a - b);
  const n = datos.length;
  const min = datos[0];
  const max = datos[n - 1];
  const rango = max - min;

  const k = Math.round(1 + 3.322 * Math.log10(n)); // número de clases
  const ancho = Math.ceil(rango / k); // amplitud

  const intervalos = [];
  let li = min;

  for (let i = 0; i < k; i++) {
    const ls = li + ancho - 1;
    intervalos.push({ li, ls, f: 0 });
    li += ancho;
  }

  // Calcular frecuencias
  datos.forEach(valor => {
    for (let i = 0; i < intervalos.length; i++) {
      if (valor >= intervalos[i].li && valor <= intervalos[i].ls) {
        intervalos[i].f++;
        break;
      }
    }
  });

  // Agregar columnas F, fr, xf
  let acumulada = 0;
  let totalF = 0;
  let totalXF = 0;
  intervalos.forEach(obj => {
    acumulada += obj.f;
    obj.F = acumulada;
    obj.fr = (obj.f / n).toFixed(2);
    const x = (obj.li + obj.ls) / 2;
    obj.xf = (x * obj.f).toFixed(2);
    totalF += obj.f;
    totalXF += parseFloat(obj.xf);
  });

  // Limpiar tabla
  tbody.innerHTML = "";

  // Insertar filas
  intervalos.forEach(obj => {
    const row = `
      <tr>
        <td>${obj.li} - ${obj.ls}</td>
        <td>${obj.f}</td>
        <td>${obj.F}</td>
        <td>${obj.fr}</td>
        <td>${obj.xf}</td>
      </tr>`;
    tbody.innerHTML += row;
  });

  // Fila total (Σ)
  tbody.innerHTML += `
    <tr>
      <td>Σ</td>
      <td>${totalF}</td>
      <td>-</td>
      <td>1.00</td>
      <td>${totalXF.toFixed(2)}</td>
    </tr>`;
});



  function exportarExcel() {
    const tabla = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Tabla" });
    XLSX.writeFile(wb, "tabla_datos_cuantitativos.xlsx");
  }