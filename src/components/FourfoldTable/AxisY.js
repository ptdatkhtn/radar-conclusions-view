import React from 'react'

const AxisY = ({
  axisHeight = 600,
  axisLabel2 = 'Vertical Axis Default',
  axisLabel2a = 'Low End Default',
  axisLabel2b = 'High End Default'
}) => {
  const cellStyle = { 
    transform: 'rotate(-90.0deg)', 
    fontSize: 20, 
    color: 'grey', 
    fontWeight: 500, 
    height: '33.33%',
    wordBreak: 'break-word'
  }
  return (
    <table cellpadding='0' cellspacing='0' align='center' style={{ height: axisHeight, margin: 0, padding: '78px 0px 42px 0' }}>
      <tr style={{ textAlign: 'right' }}>
        <td width='70' style={{ ...cellStyle }}>
          {axisLabel2a}
        </td>
      </tr>
      <tr style={{ textAlign: 'center' }}>
        <td width='70' style={{ ...cellStyle }}>
          {axisLabel2}
        </td>
      </tr>
      <tr style={{ textAlign: 'left' }}>
        <td width='70' style={{ ...cellStyle }}>
          {axisLabel2b}
        </td>
      </tr>
    </table>
  )
}
export default AxisY