import React from 'react'

const AxisX = ({
  axisWidth = 600,
  axisLabel1 = 'Horizontal Axis Default',
  axisLabel1a = 'Left End Default',
  axisLabel1b = 'Right End Default',
  originalWidth
}) => {
  const cellStyle = { fontSize: 14, color: 'rgb(153, 153, 153)', fontWeight: 700, height: 30, whiteSpace: 'nowrap' }
  return (
    <>
      <table cellPadding='0' cellSpacing='0' align='center' style={{ 
        width: axisWidth, 
        margin: 0, 
        // background: 'rgb(224 222 222)' 
        }}>
        <tbody style={{borderTop: 'none'}}>
          <tr>
            <td style={{ ...cellStyle, textAlign: 'left' }}>
              <div style={{ width: originalWidth / 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 400, fontSize: '13px' }}>{axisLabel1a}</div>
            </td>
            <td style={{ ...cellStyle, textAlign: 'right' }}>
              <div style={{ width: originalWidth / 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 400, fontSize: '13px' }}>{axisLabel1b}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table cellPadding='0' cellSpacing='0' align='center' style={{ 
        width: axisWidth, 
        margin: 0, 
        // background: 'rgb(224 222 222)'
         }}>
        <tbody style={{borderTop: 'none'}}>
          <tr>
            <td style={{ ...cellStyle, textAlign: 'center' }}>
              <div style={{ width: originalWidth, overflow: 'hidden', textOverflow: 'ellipsis' }}>{axisLabel1}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default AxisX