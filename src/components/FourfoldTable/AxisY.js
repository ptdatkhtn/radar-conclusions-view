import React from 'react'
import Tooltip from '@mui/material/Tooltip';

const AxisY = ({
  axisHeight = 600,
  axisLabel2 = 'Vertical Axis Default',
  axisLabel2a = 'Low End Default',
  axisLabel2b = 'High End Default',
  originalHeight
}) => {
  const cellStyle = {
    fontSize: 14,
    color: 'rgb(153, 153, 153)', 
    fontWeight: 700,
    whiteSpace: 'nowrap'
  }
  return (
    <>
      <table cellPadding='0' cellSpacing='0' style={{ 
        height: +axisHeight, 
        margin: 0, 
        // background: 'rgb(224 222 222)', 
        padding: '0px 0px 93px 0' }}>
        <tbody style={{borderTop: 'none'}}>
          <tr style={{ ...cellStyle }}>
            <td style={{height: originalHeight }}>
            <Tooltip 
                    placement="right"
                    title={axisLabel2}>
                    <div style={{ width: 30, paddingLeft: '12px', writingMode: 'vertical-lr', transform: 'rotate(180deg)', 
                      // overflow: 'hidden', 
                      textOverflow: 'ellipsis', maxHeight: originalHeight, height: 'fit-content',textAlign: 'center' }}>{axisLabel2}</div>
                  </Tooltip>
            </td>
          </tr>
          
        </tbody>
      </table>

      <table cellPadding='0' cellSpacing='0' style={{ 
        height: +axisHeight, 
        margin: 0, 
        // background: 'rgb(224 222 222)', 
        padding: '0px 0px 93px 0' }}>
        <tbody style={{borderTop: 'none'}}>
          <tr style={{ ...cellStyle }}>
            <td style={{height: originalHeight/2, position:'relative', verticalAlign: 'top' }}>
              <Tooltip
                    placement="top"
                    title={axisLabel2b}>
                    <div style={{
                      width: 30, writingMode: 'vertical-rl', transform: 'rotate(180deg)', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: originalHeight / 2 - 10, height: 'fit-content', textAlign: 'right', fontWeight: 400, fontSize: '13px' }}>{axisLabel2b}</div>
                  </Tooltip>
            </td>
          </tr>

          <tr style={{ ...cellStyle }}>
            <td style={{height: originalHeight/2, position:'relative', verticalAlign: 'bottom' }}>
                <Tooltip 
                    // placement="bottom-start"
                    title={axisLabel2a}>
                      <div style={{
                        // position: 'absolute',
                        // bottom: 0, 
                        width: 30,
                        writingMode: 'vertical-rl', 
                        transform: 'rotate(180deg)', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        maxHeight: originalHeight / 2 - 10, 
                        height: 'fit-content', 
                        textAlign: 'left', 
                        fontWeight: 400, 
                        fontSize: '13px' }}>{axisLabel2a}</div>
                  </Tooltip>
            </td>
          </tr>
          
        </tbody>
      </table>
    </>
  )
}
export default AxisY