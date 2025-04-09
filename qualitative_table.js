const input = document.getElementById('valor');
const enviarBtn = document.querySelector('.save');
const probarBtn = document.querySelector('.ola');
const tableBody = document.querySelector('tbody');

let datos = []; // Arreglo para almacenar los datos ingresados

enviarBtn.addEventListener('click', () => {
  const valor = input.value.trim();
  if (valor === '') return; // Si el campo está vacío, no hacer nada

  datos.push(valor); // Guardar el valor en el arreglo
  input.value = ''; // Limpiar el campo de entrada
});

probarBtn.addEventListener('click', () => {
  if (datos.length === 0) {
    return;
  }
  
  generarTabla();
});

function generarTabla() {
  const frecuencias = {};
  datos.forEach((dato) => {
    frecuencias[dato] = (frecuencias[dato] || 0) + 1;
  });

  const valoresUnicos = Object.keys(frecuencias);
  const total = datos.length;
  let sumaXF = 0;
  let sumaXXF = 0;

  // Asignar un valor numérico a cada valor cualitativo
  const valoresNumericos = valoresUnicos.reduce((acc, val, index) => {
    acc[val] = index + 1; // Asignar números crecientes
    return acc;
  }, {});

  // Ordenar los valores únicos por su número asignado
  valoresUnicos.sort((a, b) => valoresNumericos[a] - valoresNumericos[b]);

  // Limpiar la tabla antes de mostrar nuevos datos
  tableBody.innerHTML = '';

  let totalF = 0;
  let totalXF = 0;
  let totalXXF = 0;

  const media = valoresUnicos.reduce((acc, val) => acc + valoresNumericos[val] * frecuencias[val], 0) / total;

  // Llenar la tabla con los datos
  valoresUnicos.forEach((valor) => {
    const f = frecuencias[valor];
    const x = valoresNumericos[valor];
    const xxf = Math.pow(x - media, 2) * f;
    const xf = x * f;

    totalF += f;
    totalXF += xf;
    totalXXF += xxf;

    const row = `
      <tr>
        <td>${valor}</td>
        <td>${f}</td>
        <td>${(Math.pow(x - media, 2)).toFixed(2)}</td>
        <td>${xxf.toFixed(2)}</td>
        <td>${xf}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });

  // Fila de totales
  const totalRow = `
    <tr>
      <td>Σ</td>
      <td>${totalF}</td>
      <td></td>
      <td>${totalXXF.toFixed(2)}</td>
      <td>${totalXF}</td>
    </tr>
  `;
  tableBody.insertAdjacentHTML('beforeend', totalRow);
}

function exportarExcel() {
    const tabla = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Tabla" });
    XLSX.writeFile(wb, "tabla_datos_cuantitativos.xlsx");
  }