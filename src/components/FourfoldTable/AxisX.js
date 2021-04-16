import React from 'react'

const AxisX = ({
  axisWidth = 600,
  axisLabel1 = 'Horizontal Axis Default',
  axisLabel1a = 'Left End Default',
  axisLabel1b = 'Right End Default'
}) => {
  const cellStyle = { fontSize: 20, color: 'grey', fontWeight: 500, height: 40, width: '33.33%' }
  return (
    <table cellpadding='0' cellspacing='0' align='center' style={{ width: axisWidth, margin: 0 }}>
      <tr>
        <td style={{ ...cellStyle, textAlign: 'left' }}>
          {axisLabel1a}
        </td>

        <td style={{ ...cellStyle, textAlign: 'center' }}>
          {axisLabel1}
        </td>

        <td style={{ ...cellStyle, textAlign: 'right' }}>
          {axisLabel1b}
        </td>
      </tr>
    </table>
  )
}
export default AxisX