import api from './modules/api';
import populateTable from './modules/populateTable';
import googleMaps from './modules/googleMaps';
import { DataRow } from '../shared.types';

api<DataRow[]>('http://localhost:5000/api/v1/cameras').then((data) => {
  populateTable(data)

  if (document.readyState === "complete") {
    googleMaps(data)
  }
});
