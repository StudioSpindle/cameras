import generateTableRows from './generateTableRows';
import { DataRow } from '../shared.types';

const divisableBy3 = (number: number): boolean => (number % 3 === 0);
const divisableBy5 = (number: number): boolean => (number % 5 === 0);

const column3: HTMLElement = document.getElementById('column3')!;
const column5: HTMLElement = document.getElementById('column5')!;
const column3and5: HTMLElement = document.getElementById('column15')!;
const columnRemainder: HTMLElement = document.getElementById('columnOther')!;

export default function (cameras: DataRow[]) {
  let camerasDivisableBy3: DataRow[] = [];
  let camerasDivisableBy5: DataRow[] = [];
  let camerasDivisableBy3and5: DataRow[] = [];
  let remainder: DataRow[] = [];

  for (let i = 1; i < cameras.length; i++) {
    const { Number } = cameras[i];
    if (divisableBy3(+Number) && divisableBy5(+Number)) {
      camerasDivisableBy3and5.push(cameras[i]);
    }
    if (divisableBy3(+Number)) {
      camerasDivisableBy3.push(cameras[i]);
    }
    if (divisableBy5(+Number)) {
      camerasDivisableBy5.push(cameras[i]);
    }
    if (!divisableBy3(+Number) || !divisableBy5(+Number)) {
      remainder.push(cameras[i])
    }
  }

  generateTableRows(camerasDivisableBy3, column3);
  generateTableRows(camerasDivisableBy5, column5);
  generateTableRows(camerasDivisableBy3and5, column3and5);
  generateTableRows(remainder, columnRemainder);
}
