import api from './api';
import generateTableRows from './generateTableRows';
import { DataRow } from './shared.types'

const divisableBy3 = (number: number) => (number % 3 === 0);
const divisableBy5 = (number: number) => (number % 5 === 0);

const column3 = document.getElementById('column3');
const column5 = document.getElementById('column5');
const column3and5 = document.getElementById('column15');
const columnRemainder = document.getElementById('columnOther');

async function populateTable() {
  const data = await api<DataRow[]>('http://localhost:5000/api/v1/cameras');

  let camerasDivisableBy3: DataRow[] = [];
  let camerasDivisableBy5: DataRow[] = [];
  let camerasDivisableBy3and5: DataRow[] = [];
  let remainder: DataRow[] = [];

  for (let i = 1; i < data.length; i++) {
    const { Number } = data[i];
    if (divisableBy3(+Number) && divisableBy5(+Number)) {
      camerasDivisableBy3and5.push(data[i]);
    }
    if (divisableBy3(+Number)) {
      camerasDivisableBy3.push(data[i]);
    }
    if (divisableBy5(+Number)) {
      camerasDivisableBy5.push(data[i]);
    }
    if (!divisableBy3(+Number) || !divisableBy5(+Number)) {
      remainder.push(data[i])
    }
  }

  generateTableRows(camerasDivisableBy3, column3!);
  generateTableRows(camerasDivisableBy5, column5!);
  generateTableRows(camerasDivisableBy3and5, column3and5!);
  generateTableRows(remainder, columnRemainder!);
}

populateTable()
