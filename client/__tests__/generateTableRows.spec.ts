import generateTableRows from '../src/modules/generateTableRows';
import { getByText } from '@testing-library/dom';
const { mockSuccessData } = require('../__mocks__/api.responses.js');

describe("Testing the movies API", () => {

  document.body.innerHTML = `<table id="container"></table>`;

  test("populates the target HTMLTable", async () => {
    const container = document.getElementById('container')!;
    generateTableRows(mockSuccessData, container);
    expect(getByText(container, '501')).not.toBeNull;
  });
});
