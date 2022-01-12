import React from 'react'
import Tooltip from '@mui/material/Tooltip';

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
        position:'relative',
        // zIndex: 999
        // background: 'rgb(224 222 222)' 
        }}>
        <tbody style={{borderTop: 'none'}}>
          <tr>
            <td style={{ ...cellStyle, textAlign: 'left', width:  originalWidth / 2 }}>
              <Tooltip 
                    placement="bottom-start"
                    title={axisLabel1a}>
                    <div style={{width: 'fit-content', maxWidth: originalWidth / 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 400, fontSize: '13px' }}>{axisLabel1a}</div>
                  </Tooltip>
            </td>
            <td style={{ ...cellStyle, textAlign: 'right', width:  originalWidth / 2 }}>
              <Tooltip 
                    placement="bottom-end"
                    title={axisLabel1b}>
                    <div style={{
                      width: 'fit-content',
                      marginLeft: 'auto',
                      maxWidth: originalWidth / 2, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 400, fontSize: '13px' }}>{axisLabel1b}</div>
                  </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>

      <table cellPadding='0' cellSpacing='0' align='center' style={{ 
        width: axisWidth, 
        margin: 0,
        position:'relative',
        // zIndex: 999
        // background: 'rgb(224 222 222)'
         }}>
        <tbody style={{borderTop: 'none'}}>
          <tr>
            <td style={{ ...cellStyle, textAlign: 'center' }}>
              <Tooltip title={axisLabel1}>
                <div style={{margin: 'auto',
                      maxWidth: originalWidth / 2,
                      width: 'fit-content', overflow: 'hidden', textOverflow: 'ellipsis' }}>{axisLabel1}</div>
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default AxisX