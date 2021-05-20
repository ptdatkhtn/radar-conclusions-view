import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import AxisX from './AxisX'
import AxisY from './AxisY'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import {makeStyles} from '@material-ui/core'
import {getPhenomenonUrl} from '../../helpers/contentCard'

const useStyles = makeStyles({
  root: {
    border: 'none',
    padding: 0,
    margin: 0,
    // color: 'black',
    '&$checked': {
      color: '#00C3FF'
    }
  },
  checked: {},
  checkBoxSize: {
    transform: 'scale(1.111111)',
  },
  radioSize: {
    transform: 'scale(1.111111)',
    marginLeft: '16px'
  }
});

const App = ({
  containerWidth = 500,
  containerHeight = 500,
  axisLabel3 = 'BottomLeft',
  axisLabel4 = 'BottomRight',
  axisLabel5 = 'TopLeft',
  axisLabel6 = 'TopRight',
  axisLabel1 = 'Horizontal Axis Default',
  axisLabel1a = 'Left End Default',
  axisLabel1b = 'Right End Default',
  axisLabel2 = 'Vertical Axis Default',
  axisLabel2a = 'Low End Default',
  axisLabel2b = 'High End Default',
  phenomena = [],
  radar
}) => {

  const [visibleDialog, setVisibleDialog] = useState(false)
  const [visibleText, setVisibleText] = useState(true)
  const [appContext, setAppContext] = useState({})
  const { axis, scatterSvg } = appContext
  const [isAverage, setIsAverage] = useState(true)

  const customStyles = {
    content: {
      width: '30%',
      height: '100%',
      top: 0,
      left: 0
    },
    overlay: {
      background: 'transparent'
    }
  }
  const buttonStyles = {
    position: 'fixed',
    top: '50%',
    left: 'calc(30% - 2px)',
    'zIndex': 100,
    width: '66px',
    height: '74px',
    background: 'white',
    borderColor: 'transparent',
    cursor: 'pointer',
    'boxShadow': '1px 1px 1px 0px #887979',
    fontSize: '48px',
    fontWeight: 540,
  }

  const innerTexts = [
    { x: 25, y: 25, title: axisLabel3 },
    { x: 75, y: 25, title: axisLabel4 },
    { x: 25, y: 75, title: axisLabel5 },
    { x: 75, y: 75, title: axisLabel6 }
  ]
  const innerLineData = [
    {
      x1: -1500,
      y1: 50,
      x2: 1500,
      y2: 50
    },
    {
      x1: 50,
      y1: -1500,
      x2: 50,
      y2: 1500
    }
  ]

  const rectNodes = React.useMemo(() => {
    return [
      {
        x: 0,
        y: 100,
        width: containerWidth,
        height: containerHeight
      }
    ]
  }, [containerWidth, containerHeight])

  const setNodeColor = (phenomenon) => {
    let innerStroke = 'transparent'
    let outerStroke = 'rgb(0, 202, 141)'
    let fillSymbol = '#fff'

    if (phenomenon['content-type-alias'] === 'summary') {
      innerStroke = '#fff'
      fillSymbol = 'rgb(0, 202, 141)'
    }

    if (phenomenon['content-type-alias'] === 'rising') {
      innerStroke = 'transparent'
      outerStroke = 'transparent'
      fillSymbol = 'rgb(0, 202, 141)'
    }

    if (phenomenon['content-type-alias'] === 'weaksignal') {
      innerStroke = 'transparent'
      outerStroke = 'transparent'
      fillSymbol = 'rgb(168, 168, 168)'
    }

    if (phenomenon['content-type-alias'] === 'cooling') {
      innerStroke = 'transparent'
      outerStroke = 'transparent'
      fillSymbol = 'rgb(0, 152, 255)'
    }

    if (phenomenon['content-type-alias'] === 'wildcard') {
      innerStroke = 'transparent'
      outerStroke = 'transparent'
      fillSymbol = 'rgb(233, 87, 87)'
    }
    return { innerStroke, outerStroke, fillSymbol }
  }

  const nodeListAsMedian = React.useMemo(() => {
    let nodes = []
    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x'] && phen['rating_y'] && phen['rating_x']['median'] !== null && phen['rating_y']['median'] !== null) {
        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
        node['title'] = String(phen['content']['short_title']) || String(phen['content']['title'])
        node['x'] = phen['rating_x']['median']
        node['y'] = phen['rating_y']['median']
        node['avg'] = false
        console.log('node', node)
        nodes.push(node)
      }
    })
    return nodes
  }, [phenomena])

  const nodeListAsAverage = React.useMemo(() => {
    let nodes = []
    
    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x'] && phen['rating_y'] && phen['rating_x']['avg'] && phen['rating_y']['avg']) {
        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
        node['title'] = String(phen['content']['short_title']) || String(phen['content']['title'])
        node['x'] = phen['rating_x']['avg']
        node['y'] = phen['rating_y']['avg']
        node['avg'] = true

        nodes.push(node)
      }
    })
    return nodes
  }, [phenomena])

  function center(event, target) {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target)
      return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])]
    }
    return [containerWidth / 2, containerHeight / 2]
  }

  const getTextWidth = (text, fontSize = 12, fontFace = 'Roboto') => {
    const canvasAxis = document.getElementById('axis_Conclusion')
    const context = canvasAxis.getContext('2d')
    context.font = fontSize + 'px ' + fontFace
    return context.measureText(text).width
  }

  useEffect(() => {
    if (appContext.axis) {
      axis.width = containerWidth
      axis.height = containerHeight
    }
  }, [appContext.axis])

  useEffect(() => {
    if (!scatterSvg) return
    d3.selectAll('#myTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
    d3.selectAll('#myTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
  }, [scatterSvg, visibleText])

  useEffect(() => {
    if (!scatterSvg) return

    d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
    d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
    if (isAverage) {
      d3.selectAll('#myTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myTextsMedian_Conclusion').style('opacity', 0)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 1)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
    }
    else if (!isAverage) {
      d3.selectAll('#myTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myTextsAvg_Conclusion').style('opacity', 0)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 1)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
    }

  }, [scatterSvg, isAverage])

  // useEffect(() => {
  //   d3.select('#svg-app').attr("viewBox", [0, 0, containerWidth, containerHeight])
  // }, [containerWidth, containerHeight])

  useEffect(() => {
    const svg = d3.select('#svg-app_Conclusion').attr("viewBox", [0, 0, containerWidth, containerHeight])

    const canvasAxis = document.getElementById('axis_Conclusion')
    setAppContext({
      axis: canvasAxis,
      axisContext: canvasAxis.getContext('2d'),
      scatterSvg: svg
    })
  }, [containerWidth])

  useEffect(() => {
    if (phenomena.length < 1 || !scatterSvg) return
    let nodes = [...nodeListAsAverage, ...nodeListAsMedian]

    let data = nodes.map(item => [item.x, item.y])
    data = [...data, ...Array.from({ length: 50 }, () => [100 * Math.random(), 100 * Math.random()])]

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .range([0, containerWidth - 10])
      .nice()
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .range([containerHeight, 0])
      .nice()

    const xAxis = (g, scale) => g
      .attr("transform", `translate(0,${y(0) - 20})`)
      .call(d3.axisBottom(scale).ticks(8))
      .call(g2 => g2.select(".domain").attr("display", "none"))
      .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

    const yAxis = (g, scale) => g
      .attr("transform", `translate(${x(0) + 25},0)`)
      .call(d3.axisLeft(scale).ticks(8))
      .call(g2 => g2.select(".domain").attr("display", "none"))
      .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

    const myWhiteRect = scatterSvg.append('g')
      .selectAll('rect')
      .data(rectNodes)
      .join('rect')
      .attr('fill', 'white')

    const innerText = scatterSvg.append('g')
      .selectAll('text')
      .data(innerTexts)
      .join('text')
      .text(d => d.title)
      .style('fill', 'rgb(224, 222, 222)')
      .style('font-size', '20')
      .style('text-align', 'center')

    const innerLine = scatterSvg.append('g')
      .selectAll("line")
      .data(innerLineData)
      .join('line')
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)

    const gx = scatterSvg.append("g")
    const gy = scatterSvg.append("g")

    const myTextsAvg = scatterSvg.append('g')
      .selectAll('text')
      .data(nodeListAsAverage)
      .join('text')
      .text(d => d.title)
      .style('fill', 'black')
      .attr('id', 'myTextsAvg_Conclusion')
      .attr('font-size', 12)

    const myTextsMedian = scatterSvg.append('g')
      .selectAll('text')
      .data(nodeListAsMedian)
      .join('text')
      .text(d => d.title)
      .style('fill', 'black')
      .attr('id', 'myTextsMedian_Conclusion')
      .attr('font-size', 12)

    const myCircleAvg1 = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsAverage)
      .join('circle')
      .attr('stroke', d => d.type[0].outerStroke)
      .attr('cursor', 'pointer')
      .attr('r', 10)
      .attr('id', 'circleAvg_Conclusion')
      .style('fill', d => d.type[0].fillSymbol)

    const myCircleAvg = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsAverage)
      .join('circle')
      .attr('stroke', d => d.type[0].innerStroke)
      .attr('cursor', 'pointer')
      .attr('r', 7)
      .attr('id', 'circleAvg_Conclusion')
      .style('fill', d => d.type[0].fillSymbol)
      .attr('cursor', 'pointer')

    const myCircleMedian1 = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsMedian)
      .join('circle')
      .attr('stroke', d => d.type[0].outerStroke)
      .attr('cursor', 'pointer')
      .attr('r', 10)
      .attr('id', 'circleMedian_Conclusion')
      .style('fill', d => d.type[0].fillSymbol)

    const myCircleMedian = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsMedian)
      .join('circle')
      .attr('stroke', d => d.type[0].innerStroke)
      .attr('cursor', 'pointer')
      .attr('r', 7)
      .attr('id', 'circleMedian_Conclusion')
      .style('fill', d => d.type[0].fillSymbol)
      .attr('cursor', 'pointer')

    // z holds a copy of the previous transform, so we can track its changes
    let z = d3.zoomIdentity

    // set up the ancillary zooms and an accessor for their transforms
    const zoomX = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [containerWidth, containerHeight]])
    const zoomY = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [containerWidth, containerHeight]])
    const tx = () => d3.zoomTransform(gx.node())
    const ty = () => d3.zoomTransform(gy.node())
    gx.call(zoomX).attr("pointer-events", "none")
    gy.call(zoomY).attr("pointer-events", "none")

    // active zooming
    const zoom = d3.zoom().on("zoom", function (e) {
      try {
        if (e.transform.k < 1) {
          e.transform.k = 1
          return
        }
        if (e.transform.k > 8) {
          e.transform.k = 8
          return
        }
        e.transform.k = Math.min(Math.max(e.transform.k, 1), 8)
  
        const trans = d3.transition().duration(150).ease(d3.easeLinear)
        const t = e.transform
  
        const k = t.k / z.k
        const point = center(e, this)
  
        // is it on an axis? is the shift key pressed?
        const doX = point[0] > x.range()[0]
        const doY = point[1] < y.range()[0]
        const shift = e.sourceEvent && e.sourceEvent.shiftKey
  
        if (k === 1) {
          // pure translation?
          doX && gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0)
          doY && gy.call(zoomY.translateBy, 0, (t.y - z.y) / ty().k)
        } else {
          // if not, we're zooming on a fixed point
          doX && gx.call(zoomX.scaleBy, shift ? 1 / k : k, point)
          doY && gy.call(zoomY.scaleBy, k, point)
        }
  
        z = t
  
        const xr = tx().rescaleX(x)
        const yr = ty().rescaleY(y)
  
        const radius1 = myCircleAvg1.attr('r')
        const radius = myCircleAvg.attr('r')
  
        gx.call(xAxis, xr)
        gy.call(yAxis, yr)
  
        myWhiteRect
          .transition(trans)
          .attr('x', d => xr(d.x))
          .attr('y', d => yr(d.y))
          .attr('width', d => d.width * t.k)
          .attr('height', d => d.height * t.k)
  
        innerText
          .transition(trans)
          .attr('x', d => xr(d.x) - getTextWidth(d.title))
          .attr('y', d => yr(d.y))
  
        innerLine
          .transition(trans)
          .attr("x1", d => xr(d.x1))
          .attr("y1", d => yr(d.y1))
          .attr("x2", d => xr(d.x2))
          .attr("y2", d => yr(d.y2))
  
        myTextsMedian
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 9)
              const minScale = Math.max(scale, 1)
              const fonts = Math.max(12, Math.floor(11 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myTextsMedian.transition(tran2)
                .attr('font-size', fonts)
                .attr('x', d => xr(d.x) - getTextWidth(d.title, fonts) / 2)
                .attr('y', d => yr(d.y) + 10 * 3)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('x', d => {
            const fontS = myTextsMedian.attr('font-size')
            return xr(d.x) - getTextWidth(d.title, fontS) / 2
          })
          .attr('y', d => yr(d.y) + 10 * 3)
  
        myTextsAvg
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 9)
              const minScale = Math.max(scale, 1)
              const fonts = Math.max(12, Math.floor(11 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myTextsAvg.transition(tran2)
                .attr('font-size', fonts)
                .attr('x', d => xr(d.x) - getTextWidth(d.title, fonts) / 2)
                .attr('y', d => yr(d.y) + 10 * 3)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('x', d => {
            const fontS = myTextsAvg.attr('font-size')
            return xr(d.x) - getTextWidth(d.title, fontS) / 2
          })
          .attr('y', d => yr(d.y) + 10 * 3)
  
        myCircleAvg1
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(10, Math.floor(10 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myCircleAvg1.transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('r', radius1)
          .attr('class', 'left')
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
  
        myCircleAvg
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(7, Math.floor(7 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myCircleAvg.transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('r', radius)
          .attr('class', 'left')
          .attr('data-href', d => {
            // console.log('ddd', d)
            return getPhenomenonUrl(radar?.id, d)
          })
  
        myCircleMedian1
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(10, Math.floor(10 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myCircleMedian1.transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('r', radius1)
          .attr('class', 'left')
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
  
        myCircleMedian
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(7, Math.floor(7 + minScale))
              const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              myCircleMedian.transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('r', radius)
          .attr('class', 'left')
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          if (isAverage) {
            d3.selectAll('#myTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
            d3.selectAll('#myTextsMedian_Conclusion').style('opacity', 0)
            d3.selectAll('#circleAvg_Conclusion').style('opacity', 1)
            d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
          }
          else if (!isAverage) {
            d3.selectAll('#myTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
            d3.selectAll('#myTextsAvg_Conclusion').style('opacity', 0)
            d3.selectAll('#circleMedian_Conclusion').style('opacity', 1)
            d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
          }
      } catch (error) {
        console.error(error)
      }
    })
    d3.selectAll('circle').on('click', d => onClickNode(d.id))
    scatterSvg.call(zoom)
      .call(zoom.transform, d3.zoomIdentity.scale(1))
      .node()
    return () => {
      scatterSvg.selectAll("*").remove()
    }
  }, [phenomena, scatterSvg, containerHeight, containerWidth])

  const onClickNode = (id) => {
    setVisibleDialog(true)
  }

  const onCloseDialog = () => {
    setVisibleDialog(false)
  }

  const onToggleTitle = (event) => {
    setVisibleText(!visibleText)
  }

  const onToggleIsAverage = (event) => {
    setIsAverage(true)
  }

  const onToggleIsMedian = (event) => {
    setIsAverage(false)
  }

  const classes = useStyles();

  return (
    <div style={{width: '100%'}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '56px' }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Checkbox
            color='primary'
            className={classes.checkBoxSize}
            classes={{
              root: classes.root,
              checked: classes.checked 
            }}
            checked={!visibleText} 
            onChange={onToggleTitle}
            id="rating-view-tab-cb-id"
          />
          <label style={{ fontSize: "13px", fontWeight: 'unset', paddingLeft: '5px', marginBottom: 0 }} for="rating-view-tab-cb-name"> Hide titles</label><br></br>
        </div>
        <div style={{display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: "13px", margin: 0}}>Show results as: </p>
          <Radio
            color='primary'
            className={classes.radioSize}
            classes={{
              root: classes.root,
              checked: classes.checked 
            }}
            checked={isAverage} 
            onChange={onToggleIsAverage}
            id="rating-view-tab-cb-id"
          />
          {/* <input style={{ width: "20px", height: "20px", cursor: 'pointer', margin: 0, marginLeft: '16px' }} type="radio" label='Show as average' id="rating-view-tab-cb-id" name="rating-view-tab-cb-name" checked={isAverage} onChange={onToggleIsAverage}></input> */}
          <label style={{ fontSize: "13px", fontWeight: 'unset', paddingLeft: '5px', marginBottom: 0 }} for="rating-view-tab-cb-name"> Average </label><br></br>
          <Radio
            color='primary'
            className={classes.radioSize}
            classes={{
              root: classes.root,
              checked: classes.checked 
            }}
            checked={!isAverage} 
            onChange={onToggleIsMedian}
            id="rating-view-tab-cb-id"
          />
          {/* <input style={{ width: "20px", height: "20px", cursor: 'pointer', margin: 0, marginLeft: '16px' }} type="radio" label='Show as median' id="rating-view-tab-cb-id" name="rating-view-tab-cb-name" checked={!isAverage} onChange={onToggleIsMedian}></input> */}
          <label style={{ fontSize: "13px", fontWeight: 'unset', paddingLeft: '5px', marginBottom: 0 }} for="rating-view-tab-cb-name"> Median </label><br></br>
        </div>   
    </div>
    <div className='rating-results-diagram' style={{ display: 'flex', paddingTop: '32px', paddingBottom: '54px' }}>
      <AxisY originalHeight={containerHeight} axisHeight={containerHeight} axisLabel2={axisLabel2} axisLabel2a={axisLabel2a} axisLabel2b={axisLabel2b} />
      <div style={{
        width: containerWidth,
        height: containerHeight + 70,
        padding: '0px 0px 60px 0',
        boxSizing: 'content-box',
        // background: '#e0dede' 
      }}>
        <div style={{ position: 'relative', width: containerWidth, height: containerHeight, background: 'grey' }}>
          <svg id='svg-app_Conclusion' style={{ position: 'absolute' }} />
          <canvas id='axis_Conclusion' />

          {/* {visibleDialog && (
            <Modal style={customStyles} ariaHideApp={false} isOpen={true} contentLabel='Phenomena card label'>
              <Iframe url='http://www.youtube.com/embed/xDMP3i36naA'
                width='100%'
                height='100%'
                id='myId'
                display='initial'
                position='relative' />
            </Modal>
          )} */}
        </div>
        <AxisX originalWidth={containerWidth} axisWidth={containerWidth} axisLabel1={axisLabel1} axisLabel1a={axisLabel1a} axisLabel1b={axisLabel1b} />
      </div>
      {visibleDialog && <button style={buttonStyles} onClick={onCloseDialog}>X</button>}
    </div>
  </div>
  )
}

export default App