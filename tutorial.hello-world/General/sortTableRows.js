/* This piece of code sorts rows in a table according to certain criteria.
*/

function toNumber(row) {
    return row.cells[1].textContent.match(/(?<=Level\s)A+/)[0].length;
}

const table = $0;
const rows = [...table.rows];

const dataSets = rows.map(row => {
  const level = toNumber(row);

  const dataSet = {
    level,
    row,
  };
    
  return dataSet;
});

// Sort `dataSets` accordingly.
dataSets.sort((dataSetA, dataSetB) => dataSetA.level - dataSetB.level);

// For each dataSet `dataSet` in `dataSets`.
for (const dataSet of dataSets) {
  table.append(dataSet.row);
}



