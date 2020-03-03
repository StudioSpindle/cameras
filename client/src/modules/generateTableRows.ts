import { DataRow } from '../shared.types'

export default function (data: DataRow[], destElement: HTMLElement) {
  const template: HTMLTemplateElement = document.createElement('template');

  data.forEach((dataRow: DataRow) => {
    template.innerHTML += `
      <tr>
        <td>
          ${dataRow.Number}
        </td>
        <td>
          ${dataRow.Camera}
        </td>
        <td>
          ${dataRow.Latitude}
        </td>
        <td>
          ${dataRow.Longitude}
        </td>
      </tr>
    `
  })

  destElement.appendChild(template.content);
}
