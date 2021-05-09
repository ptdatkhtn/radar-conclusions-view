import React from 'react'

const AxisY = ({
  axisHeight = 600,
  axisLabel2 = 'Vertical Axis Default',
  axisLabel2a = 'Low End Default',
  axisLabel2b = 'High End Default',
  originalHeight
}) => {
  const cellStyle = {
    fontSize: 14,
    color: 'grey',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  }
  return (
    <>
      <table cellPadding='0' cellSpacing='0' style={{ 
        height: +axisHeight + 120, 
        margin: 0, 
        // background: 'rgb(224 222 222)', 
        padding: '77px 0px 93px 0' }}>
        <tbody style={{borderTop: 'none'}}>
          <tr style={{ ...cellStyle }}>
            <td>
              <div style={{ width: 30, writingMode: 'vertical-lr', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', height: originalHeight, textAlign: 'center' }}>{axisLabel2}</div>
            </td>
          </tr>
          
        </tbody>
      </table>

      <table cellPadding='0' cellSpacing='0' style={{ 
        height: +axisHeight + 120, 
        margin: 0, 
        // background: 'rgb(224 222 222)', 
        padding: '77px 0px 93px 0' }}>
        <tbody style={{borderTop: 'none'}}>
          <tr style={{ ...cellStyle }}>
            <td>
              <div style={{ width: 30, writingMode: 'vertical-rl', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', height: originalHeight / 2 - 10, textAlign: 'right' }}>{axisLabel2b}</div>
            </td>
          </tr>

          <tr style={{ ...cellStyle }}>
            <td>
              <div style={{ width: 30, writingMode: 'vertical-rl', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', height: originalHeight / 2 - 10, textAlign: 'left' }}>{axisLabel2a}</div>
            </td>
          </tr>
          
        </tbody>
      </table>
    </>
  )
}
export default AxisY