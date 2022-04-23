import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import AxisX from './AxisX'
import AxisY from './AxisY'
import { getPhenomenonUrl } from '../../helpers/contentCard'
import { requestTranslation } from '@sangre-fp/i18n'
import CustomDropdown from '../CustomDropdown/CustomDropdown'
import { DataContext } from '../../store/GlobalState';
import { Add, Remove, Fullscreen } from '@mui/icons-material'

const NODE_RADIUS = 10
const SPECIAL_NODE_RADIUS = 6

// const fullscreenChartModeStyles = {
//   // eslint-disable-next-line no-restricted-globals
//   width: screen?.width * 80/100,
//   // eslint-disable-next-line no-restricted-globals
//   height: screen?.height * 80/100,
// }

const App = ({
  containerWidth = 800,
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
  // const isNotInFullScreen = (!document.fullScreenElement) &&    // alternative standard method  
  //   (!document.mozFullScreen) && (!document.webkitIsFullScreen) && (!document.msRequestFullscreen);

  // console.log('1111', phenomena)
  const { state: { keyAvgMedian, keyMode } } = useContext(DataContext)

  const [visibleDialog, setVisibleDialog] = useState(false)
  const [visibleText, setVisibleText] = useState(true)
  const [appContext, setAppContext] = useState({})
  const { axis, scatterSvg } = appContext
  const [isRelative, setIsRelative] = useState(true)
  const [isAverage, setIsAverage] = useState(true)
  //handle select dropdown
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [menuModeIsOpen, setMenuModeIsOpen] = useState(false)
  const [decreaseLevel, setDecreaseLevel] = useState(1)
  const [openFullScreenMode, setOpenFullScreenMode] = useState(false)
  const decreaseLevelRef = useRef(1)
  const zoomRef = useRef({ k: 1, x: 0, y: 0})
  const zoomFuncRef = useRef(null)

  const wrapperChartForFullscreenMode = document?.getElementById('wrapper-chart-1_ConclusionRadarView')
  const uA = navigator.userAgent;
  const vendor = navigator.vendor;
  const isSafari = (/Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA))
  const prefixes = !!isSafari ? 'webkit' : ''
  const isFullScreen = ( )=>  {
    return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
  }
  const  isFullScreenInSafari = () => {
    // eslint-disable-next-line no-restricted-globals
    return Math.abs(screen.width - window.innerWidth) < 10; 
    }
  const fullscreenchanged = () => {
   if ( (!isFullScreen() || !isFullScreenInSafari()
    ) 
    && !!openFullScreenMode ) {
    closeFullScreenModeHandle()
   }
  }
  document.addEventListener(prefixes + 'fullscreenchange', fullscreenchanged);
 
  const handleFullscreenMode = () => {
    decreaseLevelRef.current = 1
    try {
      if (wrapperChartForFullscreenMode.requestFullscreen) {
        wrapperChartForFullscreenMode.requestFullscreen();
      }
      else if (wrapperChartForFullscreenMode.mozRequestFullScreen) {
        wrapperChartForFullscreenMode.mozRequestFullScreen();
      }
      else if (wrapperChartForFullscreenMode.webkitRequestFullScreen) {
        wrapperChartForFullscreenMode.webkitRequestFullScreen();
      }
      else if (wrapperChartForFullscreenMode.msRequestFullscreen) { /* IE11 */
        wrapperChartForFullscreenMode.msRequestFullscreen();
      }
    } catch (error) {

    }
  }
  const handleExitFullScreenMode = () => {
    decreaseLevelRef.current = 1
    try {
      closePopupLeftfs()
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      } else if (document.cancelFullScreen) { /* Safari */
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) { /* Safari */
        document.mozCancelFullScreen();
      } else if (document.cancelFullScreen) { /* Safari */
        document.cancelFullScreen();
      } else if (document.webkitCancelFullScreen) { /* Safari */
        document.webkitCancelFullScreen();
      }
    } catch (error) {

    }
  }

  const openFullScreenModeHandle = () => {
    handleFullscreenMode()
    setOpenFullScreenMode(true)
  }
  const closeFullScreenModeHandle = () => {
    handleExitFullScreenMode()
    setOpenFullScreenMode(false)
  }
  const openMenuHandle = () => setMenuIsOpen(!menuIsOpen)
  const openMenuModeHandle = () => setMenuModeIsOpen(!menuModeIsOpen)


  const truncateLongString = (myString) => {
    const maxStrLength = 70
    const truncatedString = myString.length > maxStrLength ? `${myString.substring(0, maxStrLength)}...` : myString
    return truncatedString
  }

  const setNodeColor = (phenomenon) => {
    let innerStroke = 'transparent'
    let outerStroke = 'transparent'
    let fillSymbol = 'rgb(0, 202, 141)'

    if (phenomenon['content-type-alias'] === 'summary') {
      innerStroke = '#fff'
    }

    if (phenomenon['content-type-alias'] === 'rising') {
      innerStroke = 'transparent'
    }

    if (phenomenon['content-type-alias'] === 'weaksignal') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(168, 168, 168)'
    }

    if (phenomenon['content-type-alias'] === 'cooling') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(0, 152, 255)'
    }

    if (phenomenon['content-type-alias'] === 'wildcard') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(233, 87, 87)'
    }
    return { innerStroke, outerStroke, fillSymbol }
  }

  const nodeSpacing = useMemo(() => {
    return 10
  }, [])

  const relativeSpace = useMemo(() => {
    return nodeSpacing * decreaseLevel
  }, [decreaseLevel, nodeSpacing])

  const margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  }

  const fpIconSize = 25
  const innerTexts = [
    { x: 25, y: 25, title: axisLabel3, gutter: -margin.left / 2 },
    { x: 75, y: 25, title: axisLabel4, gutter: margin.left / 2 },
    { x: 25, y: 75, title: axisLabel5, gutter: -margin.left / 2 },
    { x: 75, y: 75, title: axisLabel6, gutter: margin.left / 2 }
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

  const maxTextWidth = 120

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

  const checkNodesOverlap = (node1, node2) => {
    const veryClose = NODE_RADIUS // in px
    const distanceX = containerWidth / 100
    const distanceY = containerHeight / 100
    return Math.abs(node1.x - node2.x) * distanceX < veryClose && Math.abs(node1.y - node2.y) * distanceY < veryClose
  }

  const modifyValueNodesInRelativeMode = React.useCallback((nodes) => {
    // if (!isRelative) return nodes

    const radius = NODE_RADIUS / 6
    const listAround = (countAround = 16) => {
      let result = []
      for (let i = 0; i < countAround; i++) {
        const angle = (i / countAround) * Math.PI * 2
        result.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius })
      }
      return result
    }
    
    let duplicates = []
    let sameAreas = []
    let groupedSameArea = []

    let modifiedNodes = nodes.map(node => {
      let newNode = node
      for (let i = 0; i < duplicates.length; i++) {
        const isSameArea = checkNodesOverlap(node, duplicates[i])
        if (isSameArea) {
          sameAreas.push({ x: Number(node.x), y: Number(node.y), title: node.title })
        }
      }
      duplicates.push({ x: node.x, y: node.y })
      return newNode
    })
    if (sameAreas.length > 0) {
      groupedSameArea.push({ p: sameAreas[0], count: 0, around: listAround() })
      let same = true
      for (let i = 1; i < sameAreas.length; i++) {
        for (let j = 0; j < groupedSameArea.length; j++) {
          const isSameArea = checkNodesOverlap(sameAreas[i], groupedSameArea[j].p)
          if (!isSameArea) {
            same = false
            break
          }
        }
        if (!same) {
          groupedSameArea.push({ p: sameAreas[i], count: 0, around: listAround() })
        }
      }
    }

    if (groupedSameArea.length > 0) {
      modifiedNodes = modifiedNodes.map(node => {
        let newNode = node
        for (let i = 0; i < groupedSameArea.length; i++) {
          const isSameArea = checkNodesOverlap(node, groupedSameArea[i].p)
          if (isSameArea) {
            groupedSameArea[i].count++
          }
        }
        return newNode
      })

      groupedSameArea = groupedSameArea.map(item => {
        return {
          ...item,
          count: 0,
          around: listAround(item.count)
        }
      })

      modifiedNodes = modifiedNodes.map(node => {
        let newNode = node
        for (let i = 0; i < groupedSameArea.length; i++) {
          const isSameArea = checkNodesOverlap(node, groupedSameArea[i].p)
          if (isSameArea) {
            newNode = { ...node, x: Number(node.x) + groupedSameArea[i].around[groupedSameArea[i].count].x, y: Number(node.y) + groupedSameArea[i].around[groupedSameArea[i].count].y }
            groupedSameArea[i].count++
          }
        }
        return newNode
      })
    }

    const sortFn = (a, b) => {
      return Number(a.y) - Number(b.y)
    }
    return modifiedNodes?.sort(sortFn)

  }, [phenomena, decreaseLevel])

  const nodeListAsMedian = React.useMemo(() => {
    let nodes = []

    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['median'] !== null && phen['rating_y']['median'] !== null) {
        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']

        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
            // undefined types
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          }
          node['isFP'] = true
        }
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
          node['isFP'] = false
        }

        node['title'] = truncateLongString(String(phen['content']['short_title']) || String(phen['content']['title']))
        node['x'] = phen['rating_x']['median']
        node['y'] = phen['rating_y']['median']
        node['avg'] = false

        nodes?.push(node)
      }
    })
    // return modifyValueNodes(nodes)
    return nodes
  }, [phenomena, decreaseLevel])

  const nodeListAsMedianInRelativeMode = React.useMemo(() => {
    let nodes = []

    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['median'] !== null && phen['rating_y']['median'] !== null) {
        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']

        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
            // undefined types
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          }
          node['isFP'] = true
        }
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
          node['isFP'] = false
        }

        node['title'] = truncateLongString(String(phen['content']['short_title']) || String(phen['content']['title']))
        node['x'] = phen['rating_x']['median']
        node['y'] = phen['rating_y']['median']
        node['avg'] = false

        nodes?.push(node)
      }
    })
    return modifyValueNodesInRelativeMode(nodes)
  }, [phenomena, decreaseLevel])

  const nodeListAsAverage = React.useMemo(() => {
    let nodes = []

    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['avg'] && phen['rating_y']['avg']) {

        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']
        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
            // undefined types
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          }
          node['isFP'] = true
        }
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
          node['isFP'] = false
        }
        node['title'] = truncateLongString(String(phen['content']['short_title']) || String(phen['content']['title']))
        node['x'] = phen['rating_x']['avg']
        node['y'] = phen['rating_y']['avg']
        node['avg'] = true

        nodes?.push(node)
      }
    })
    // return modifyValueNodes(nodes)
    return nodes
  }, [phenomena, decreaseLevel])

  const nodeListAsAverageInRelativeMode = React.useMemo(() => {
    let nodes = []

    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['avg'] && phen['rating_y']['avg']) {

        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']
        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
            // undefined types
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          }
          node['isFP'] = true
        }
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
          node['isFP'] = false
        }
        node['title'] = truncateLongString(String(phen['content']['short_title']) || String(phen['content']['title']))
        node['x'] = phen['rating_x']['avg']
        node['y'] = phen['rating_y']['avg']
        node['avg'] = true

        nodes.push(node)
      }
    })
    return modifyValueNodesInRelativeMode(nodes)
  }, [phenomena, decreaseLevel])

  function center(event, target) {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target)
      return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])]
    }
    return [containerWidth / 2, containerHeight / 2]
  }

  const getTextWidth = (text, fontSize = 10, fontFace = 'Roboto') => {
    const canvasAxis = document.getElementById('axis')
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

    d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
    // d3.selectAll('#circleAvgInThirdMode').style('opacity', 0)
    // d3.selectAll('#circleMedianInThirdMode').style('opacity', 0)

    d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
    // d3.selectAll('#myNewTextsAvgInThirdMode').style('opacity', 0)
    // d3.selectAll('#myNewTextsMedianInThirdMode').style('opacity', 0)

    d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 0)
    // d3.selectAll('#fpIconMedianInThirdMode').style('opacity', 0)
    // d3.selectAll('#fpIconAverageInThirdMode').style('opacity', 0)

    if (keyMode === 1) {
      if (keyAvgMedian === 1) {
        d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 1)
      }
      else if (keyAvgMedian === 2) {
        d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 1)
      }
    } else if (keyMode === 2) {
      if (keyAvgMedian === 1) {
        d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 1)
      }
      else if (keyAvgMedian === 2) {
        d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
      }
    }
  }, [scatterSvg, visibleText, keyMode])

  useEffect(() => {
    if (!scatterSvg) return

    d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
    // d3.selectAll('#circleAvgInThirdMode').style('opacity', 0)
    // d3.selectAll('#circleMedianInThirdMode').style('opacity', 0)

    d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)

    d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
    d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 0)

    if (keyMode === 1) {
      if (keyAvgMedian === 1) {
        d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 1)
      }
      else if (keyAvgMedian === 2) {
        d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 1)
      }
    } else if (keyMode === 2) {
      if (keyAvgMedian === 1) {
        d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 1)
      }
      else if (keyAvgMedian === 2) {
        d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
        d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
        d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
      }
    }
  }, [scatterSvg, keyAvgMedian, keyMode])

  useEffect(() => {
    const svg = d3.select('#svg-app_ConclusionRadarView').attr("viewBox", [0, 0, containerWidth, containerHeight])

    const canvasAxis = document.getElementById('axis_ConclusionRadarView')
    decreaseLevelRef.current = 1
    setAppContext({
      axis: canvasAxis,
      axisContext: canvasAxis.getContext('2d'),
      scatterSvg: svg
    })
  }, [containerWidth, containerHeight])

  const getX = (data) => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .nice()
      .rangeRound([margin.left, containerWidth - margin.right])
  }

  const getY = (data) => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .nice()
      .rangeRound([containerHeight - margin.bottom, margin.top])
  }

  const nodeData = useMemo(() => {
    let nodes = [...nodeListAsAverage, ...nodeListAsAverageInRelativeMode, ...nodeListAsMedian, ...nodeListAsMedianInRelativeMode,
      // ...nodeListAsAverageInThirdMode, 
      // ...nodeListAsMedianInThirdMode
    ]

    let data = nodes.map(item => [item.x, item.y])
    data = [...data, ...Array.from({ length: 50 }, () => [100 * Math.random(), 100 * Math.random()])]
    return !phenomena ? [] : data
  }, [phenomena])

  useEffect(() => {

    try {
      if (phenomena.length < 1 || !scatterSvg) return

      const x = getX(nodeData)
      const y = getY(nodeData)

      const xAxis = (g, scale) => g
        .attr("transform", `translate(0,${y(0) + 10})`)
        .style('opacity', 0)
        .call(d3.axisBottom(scale).ticks(8))
        .call(g2 => g2.select(".domain").attr("display", "none"))
        .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

      const yAxis = (g, scale) => g
        .attr("transform", `translate(${x(0) - 5},0)`)
        .style('opacity', 0)
        .call(d3.axisLeft(scale).ticks(8))
        .call(g2 => g2.select(".domain").attr("display", "none"))
        .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

      const myWhiteRect = scatterSvg.append('g')
        .selectAll('rect')
        .data(rectNodes)
        .join('rect')
        .attr('fill', 'white')

      const innerText = scatterSvg.append('g').selectAll('foreignObject').data(innerTexts).join('foreignObject')
      innerText
        .attr('width', containerWidth / 2)
        .attr('height', 60)
        .style('fill', 'rgb(224, 222, 222)')
        .style('font-style', 'italic')
        .style('font-weight', '700')
        .style('font-family', 'L10')
        .style('font-size', '18')
        .style('text-align', 'center')
        .style('color', 'rgb(224, 222, 222)')
        .append("xhtml:div")
        .html(d => d.title)

      const innerLine = scatterSvg.append('g')
        .selectAll("line")
        .data(innerLineData)
        .join('line')
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1)

      const myForeignObjectsAvg = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsAverage).join('foreignObject')
      myForeignObjectsAvg
        .attr('id', 'myNewTextsAvg_ConclusionRadarView')
        .attr('width', maxTextWidth * decreaseLevelRef.current)
        .attr('height', 200)
        .attr('style', "overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto;")
        .style('transition', 'font-size 0.2s')
        .style('transition-timing-function', 'linear')
        .style('text-align', 'center')
        .append("xhtml:div")
        .html(d => d.title)
      const myForeignObjectsAvgInRelativeMode = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsAverageInRelativeMode).join('foreignObject')
      myForeignObjectsAvgInRelativeMode
        .attr('id', 'myNewTextsAvgInRelativeMode_ConclusionRadarView')
        .attr('width', maxTextWidth * decreaseLevelRef.current)
        .attr('height', 200)
        .attr('style', "overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto;")
        .style('transition', 'font-size 0.2s')
        .style('transition-timing-function', 'linear')
        .style('text-align', 'center')
        .append("xhtml:div")
        .html(d => d.title)

      const myForeignObjectsMedian = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsMedian).join('foreignObject')
      myForeignObjectsMedian
        .attr('id', 'myNewTextsMedian_ConclusionRadarView')
        .attr('width', maxTextWidth * decreaseLevelRef.current)
        .attr('height', 200)
        .attr('style', "overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto;")
        .style('transition', 'font-size 0.2s')
        .style('transition-timing-function', 'linear')
        .style('text-align', 'center')
        .append("xhtml:div")
        .html(d => d.title)
      const myForeignObjectsMedianInRelativeMode = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsMedianInRelativeMode).join('foreignObject')
      myForeignObjectsMedianInRelativeMode
        .attr('id', 'myNewTextsMedianInRelativeMode_ConclusionRadarView')
        .attr('width', maxTextWidth * decreaseLevelRef.current)
        .attr('height', 200)
        .attr('style', "overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto;")
        .style('transition', 'font-size 0.2s')
        .style('transition-timing-function', 'linear')
        .style('text-align', 'center')
        .append("xhtml:div")
        .html(d => d.title)

      nodeListAsAverage?.forEach(item => {
        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => {
            return d.type[0].outerStroke
          })
          .attr('cursor', 'pointer')
          .attr('class', d => {
            return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) 
              ? 'outer_special_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') 
              : 'outer_normal_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs')
          })
          .attr('id', 'circleAvg_ConclusionRadarView')
          .style('fill', d => {
            return d.type[0].fillSymbol
          })

        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => {
            return d.type[0].innerStroke
          })
          .attr('cursor', 'pointer')
          .attr('class', d => { return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) 
            ? 'inner_special_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') 
            : 'inner_normal_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') })
          .attr('id', 'circleAvg_ConclusionRadarView')
          .style('fill', d => {
            if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
              return 'white'
            }

            return d.type[0].fillSymbol
          })
          .attr('cursor', 'pointer')

        scatterSvg.append('g')
          .selectAll('image')
          .data([item])
          .join('image')
          .attr('id', 'fpIconAverage_ConclusionRadarView')
          .attr('xlink:href', 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2')
          .attr('height', fpIconSize * decreaseLevelRef.current)
          .attr('width', fpIconSize * decreaseLevelRef.current)
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
          .attr('cursor', 'pointer')
          .attr('class', (!openFullScreenMode ? 'left' : 'left-fs'))
      })

      nodeListAsMedian?.forEach(item => {
        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => d.type[0].outerStroke)
          .attr('cursor', 'pointer')
          .attr('id', 'circleMedian_ConclusionRadarView')
          .attr('class', d => {
            return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) 
              ? 'outer_special_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' 
              : 'left-fs') : 'outer_normal_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs')
          })
          .style('fill', d => d.type[0].fillSymbol)

        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => d.type[0].innerStroke)
          .attr('cursor', 'pointer')
          .attr('id', 'circleMedian_ConclusionRadarView')
          .attr('class', d => { return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) ? 'inner_special_circle_median_rating_result_ConclusionRadarView' + (!openFullScreenMode ? 'left' : 'left-fs') : 'inner_normal_circle_median_rating_result_ConclusionRadarView' + (!openFullScreenMode ? 'left' : 'left-fs') })
          .style('fill', d => {
            if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
              return 'white'
            }

            return d.type[0].fillSymbol
          })
          .attr('cursor', 'pointer')

        scatterSvg.append('g')
          .selectAll('image')
          .data([item])
          .join('image')
          .attr('id', 'fpIconMedian_ConclusionRadarView')
          .attr('xlink:href', 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2')
          .attr('height', fpIconSize * decreaseLevelRef.current)
          .attr('width', fpIconSize * decreaseLevelRef.current)
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
          .attr('cursor', 'pointer')
          .attr('class', (!openFullScreenMode ? 'left' : 'left-fs'))
      })

      nodeListAsAverageInRelativeMode?.forEach(item => {
        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => {
            return d.type[0].outerStroke
          })
          .attr('cursor', 'pointer')
          .attr('class', d => {
            return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) 
              ? 'outer_special_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' 
              : 'left-fs') : 'outer_normal_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs')
          })
          .attr('id', 'circleAvgInRelativeMode_ConclusionRadarView')
          .style('fill', d => {
            return d.type[0].fillSymbol
          })

        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => {
            return d.type[0].innerStroke
          })
          .attr('cursor', 'pointer')
          .attr('class', d => { return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) ? 'inner_special_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') : 'inner_normal_circle_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') })
          .attr('id', 'circleAvgInRelativeMode_ConclusionRadarView')
          .style('fill', d => {
            if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
              return 'white'
            }

            return d.type[0].fillSymbol
          })
          .attr('cursor', 'pointer')

        scatterSvg.append('g')
          .selectAll('image')
          .data([item])
          .join('image')
          .attr('id', 'fpIconAverageInRelativeMode_ConclusionRadarView')
          .attr('xlink:href', 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2')
          .attr('height', fpIconSize * decreaseLevelRef.current)
          .attr('width', fpIconSize * decreaseLevelRef.current)
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
          .attr('cursor', 'pointer')
          .attr('class', (!openFullScreenMode ? 'left' : 'left-fs'))
      })

      nodeListAsMedianInRelativeMode?.forEach(item => {
        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => d.type[0].outerStroke)
          .attr('cursor', 'pointer')
          .attr('id', 'circleMedianInRelativeMode_ConclusionRadarView')
          .attr('class', d => {
            return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) ? 'outer_special_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') : 'outer_normal_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs')
          })
          .style('fill', d => d.type[0].fillSymbol)

        scatterSvg.append('g')
          .selectAll('circle')
          .data([item])
          .join('circle')
          .attr('stroke', d => d.type[0].innerStroke)
          .attr('cursor', 'pointer')
          .attr('id', 'circleMedianInRelativeMode_ConclusionRadarView')
          .attr('class', d => { return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) ? 'inner_special_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') : 'inner_normal_circle_median_rating_result_ConclusionRadarView ' + (!openFullScreenMode ? 'left' : 'left-fs') })
          .style('fill', d => {
            if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
              return 'white'
            }

            return d.type[0].fillSymbol
          })
          .attr('cursor', 'pointer')

        scatterSvg.append('g')
          .selectAll('image')
          .data([item])
          .join('image')
          .attr('id', 'fpIconMedianInRelativeMode_ConclusionRadarView')
          .attr('xlink:href', 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2')
          .attr('height', fpIconSize * decreaseLevelRef.current)
          .attr('width', fpIconSize * decreaseLevelRef.current)
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))
          .attr('cursor', 'pointer')
          .attr('class', (!openFullScreenMode ? 'left' : 'left-fs'))
      })

      d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
      //   d3.selectAll('#circleAvgInThirdMode').style('opacity', 0)
      //   d3.selectAll('#circleMedianInThirdMode').style('opacity', 0)

      d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)

      d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
      d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 0)

      if (keyMode === 1) {
        if (keyAvgMedian === 1) {
          d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
          d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 1)
          d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#fpIconAverage_ConclusionRadarView').style('opacity', 1)
        }
        else if (keyAvgMedian === 2) {
          d3.selectAll('#myNewTextsMedian_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
          d3.selectAll('#myNewTextsAvg_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#circleMedian_ConclusionRadarView').style('opacity', 1)
          d3.selectAll('#circleAvg_ConclusionRadarView').style('opacity', 0)

          d3.selectAll('#fpIconMedian_ConclusionRadarView').style('opacity', 1)
        }
      } else if (keyMode === 2) {
        if (keyAvgMedian === 1) {
          d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
          d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 1)
          d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView').style('opacity', 1)
        }
        else if (keyAvgMedian === 2) {
          d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView').style('opacity', visibleText ? 1 : 0)
          d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#circleMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
          d3.selectAll('#circleAvgInRelativeMode_ConclusionRadarView').style('opacity', 0)
          d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView').style('opacity', 1)
        }
      }
      // z holds a copy of the previous transform, so we can track its changes
      let z = d3.zoomIdentity

      const gx = scatterSvg.append("g")
      const gy = scatterSvg.append("g")

      // set up the ancillary zooms and an accessor for their transforms
      const zoomX = d3.zoom().scaleExtent([1, 50]).translateExtent([[0, 0], [containerWidth, containerHeight]])
      const zoomY = d3.zoom().scaleExtent([1, 50]).translateExtent([[0, 0], [containerWidth, containerHeight]])
      const tx = () => d3.zoomTransform(gx.node())
      const ty = () => d3.zoomTransform(gy.node())
      gx.call(zoomX).attr("pointer-events", "none")
      gy.call(zoomY).attr("pointer-events", "none")

      const inner_normal_circle = d3.selectAll('.inner_normal_circle_rating_result_ConclusionRadarView')
      const outer_normal_circle = d3.selectAll('.outer_normal_circle_rating_result_ConclusionRadarView')
      const outer_special_circle = d3.selectAll('.outer_special_circle_rating_result_ConclusionRadarView')
      const inner_special_circle = d3.selectAll('.inner_special_circle_rating_result_ConclusionRadarView')

      const outer_normal_circle_median = d3.selectAll('.outer_normal_circle_median_rating_result_ConclusionRadarView')
      const outer_special_circle_median = d3.selectAll('.outer_special_circle_median_rating_result_ConclusionRadarView')
      const inner_normal_circle_median = d3.selectAll('.inner_normal_circle_median_rating_result_ConclusionRadarView')
      const inner_special_circle_median = d3.selectAll('.inner_special_circle_median_rating_result_ConclusionRadarView')

      const myNewTextsMedianID = d3.selectAll('#myNewTextsMedian_ConclusionRadarView')
      const myNewTextsAvgID = d3.selectAll('#myNewTextsAvg_ConclusionRadarView')
      const myNewTextsMedianIDInRelativeMode = d3.selectAll('#myNewTextsMedianInRelativeMode_ConclusionRadarView')
      const myNewTextsAvgIDInRelativeMode = d3.selectAll('#myNewTextsAvgInRelativeMode_ConclusionRadarView')
      // const myNewTextsMedianIDInThirdMode = d3.selectAll('#myNewTextsMedianInThirdMode')
      // const myNewTextsAvgIDInThirdMode = d3.selectAll('#myNewTextsAvgInThirdMode')
      const fpIconMedian = d3.selectAll('#fpIconMedian_ConclusionRadarView')
      const fpIconAverage = d3.selectAll('#fpIconAverage_ConclusionRadarView')
      const fpIconMedianInRelativeMode = d3.selectAll('#fpIconMedianInRelativeMode_ConclusionRadarView')
      const fpIconAverageInRelativeMode = d3.selectAll('#fpIconAverageInRelativeMode_ConclusionRadarView')
      const myCircleAvg = d3.selectAll('#circleAvg_ConclusionRadarView')

      setDecreaseLevel(1)

      const zoomed = function (e) {
        try {
          const trans = d3.transition().duration(150).ease(d3.easeLinear)
          const t = e.transform
          zoomRef.current = t

          const k = t.k / z.k
          const point = center(e, this)

          // is it on an axis? is the shift key pressed?
          // const doX = point[0] > x.range()[0]
          // const doY = point[1] < y.range()[0]
          const shift = e.sourceEvent && e.sourceEvent.shiftKey

          if (k === 1) {
            // pure translation?
            gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0)
            gy.call(zoomY.translateBy, 0, (t.y - z.y) / ty().k)
          } else {
            // if not, we're zooming on a fixed point
            gx.call(zoomX.scaleBy, shift ? 1 / k : k, point)
            gy.call(zoomY.scaleBy, k, point)
            // doY && gy.call(zoomY.scaleBy, k, point)
          }

          z = t

          const xr = tx().rescaleX(x)
          const yr = ty().rescaleY(y)
          const radius = myCircleAvg.attr('r')

          gx.call(xAxis, xr)
          gy.call(yAxis, yr)

          myWhiteRect
            .attr('x', d => xr(d.x))
            .attr('y', d => yr(d.y))
            .attr('width', d => d.width * t.k)
            .attr('height', d => d.height * t.k)

          innerText
            .transition(trans)
            .attr('x', d => {
              return xr(d.x) - containerWidth / 4 + d.gutter
            })
            .attr('y', d => yr(d.y) - 22)

          innerLine
            .transition(trans)
            .attr("x1", d => xr(d.x1))
            .attr("y1", d => yr(d.y1))
            .attr("x2", d => xr(d.x2))
            .attr("y2", d => yr(d.y2))

          outer_normal_circle
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(NODE_RADIUS, Math.floor(NODE_RADIUS + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                outer_normal_circle
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          outer_special_circle
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(SPECIAL_NODE_RADIUS, Math.floor(SPECIAL_NODE_RADIUS + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                outer_special_circle
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          inner_normal_circle
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(NODE_RADIUS - 3, Math.floor(NODE_RADIUS - 3 + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                inner_normal_circle
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          inner_special_circle
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(SPECIAL_NODE_RADIUS - 3, Math.floor(SPECIAL_NODE_RADIUS - 3 + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                inner_special_circle
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          outer_normal_circle_median
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(NODE_RADIUS, Math.floor(NODE_RADIUS + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                outer_normal_circle_median
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          outer_special_circle_median
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(SPECIAL_NODE_RADIUS, Math.floor(SPECIAL_NODE_RADIUS + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                outer_special_circle_median
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))


          inner_normal_circle_median
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(NODE_RADIUS - 3, Math.floor(NODE_RADIUS - 3 + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                inner_normal_circle_median
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          inner_special_circle_median
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(SPECIAL_NODE_RADIUS - 3, Math.floor(SPECIAL_NODE_RADIUS - 3 + minScale))
                //   const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
                inner_special_circle_median
                  // .transition(tran2)
                  .attr('cx', d => xr(d.x))
                  .attr('cy', d => yr(d.y))
                  .attr('r', r * decreaseLevelRef.current)
              } catch (error) {
                // console.error(error)
              }
            })
            .attr('cx', d => xr(d.x))
            .attr('cy', d => yr(d.y))
            .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

          myForeignObjectsAvg
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(10, Math.floor(9 + minScale))
                const fonts = Math.max(10, Math.floor(9 + minScale))
                myNewTextsAvgID
                  .style('font-size', fonts * decreaseLevelRef.current)
                  .attr('x', d => xr(d.x) - maxTextWidth / 2)
                  .attr('y', d => yr(d.y) + r * decreaseLevelRef.current / 1)
              } catch (err) {
                
              }

            })
            .attr('x', d => {
              return xr(d.x) - maxTextWidth / 2
            })
            .attr('y', d => yr(d.y) + radius * decreaseLevelRef.current / 1 + 3)

          myForeignObjectsAvgInRelativeMode
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(10, Math.floor(9 + minScale))
                const fonts = Math.max(10, Math.floor(9 + minScale))
                myNewTextsAvgIDInRelativeMode
                  .style('font-size', fonts * decreaseLevelRef.current)
                  .attr('x', d => xr(d.x) - maxTextWidth / 2)
                  .attr('y', d => yr(d.y) + r * decreaseLevelRef.current / 1 + 3)
              } catch (err) {

              }

            })
            .attr('x', d => {
              return xr(d.x) - maxTextWidth / 2
            })
            .attr('y', d => yr(d.y) + radius * decreaseLevelRef.current / 1 + 3)

          myForeignObjectsMedian
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(10, Math.floor(9 + minScale))
                const fonts = Math.max(10, Math.floor(9 + minScale))
                myNewTextsMedianID
                  .style('font-size', fonts * decreaseLevelRef.current)
                  .attr('x', d => xr(d.x) - maxTextWidth / 2)
                  .attr('y', d => yr(d.y) + r * decreaseLevelRef.current / 1 + 3)
              } catch (err) {
                
              }
            })
            .attr('x', d => {
              return xr(d.x) - maxTextWidth / 2
            })
            .attr('y', d => yr(d.y) + radius * decreaseLevelRef.current / 1 + 3)

          myForeignObjectsMedianInRelativeMode
            .transition(trans)
            .on('end', () => {
              try {
                const scale = Math.min(zoomRef.current.k, 8)
                const minScale = Math.max(scale, 1)
                const r = Math.max(10, Math.floor(9 + minScale))
                const fonts = Math.max(10, Math.floor(9 + minScale))
                myNewTextsMedianIDInRelativeMode
                  .style('font-size', fonts * decreaseLevelRef.current)
                  .attr('x', d => xr(d.x) - maxTextWidth / 2)
                  .attr('y', d => yr(d.y) + r * decreaseLevelRef.current / 1 + 3)
              } catch (err) {

              }
            })
            .attr('x', d => {
              return xr(d.x) - maxTextWidth / 2
            })
            .attr('y', d => yr(d.y) + radius * decreaseLevelRef.current / 1 + 3)

          const scale = Math.min(t.k, 8 * decreaseLevelRef.current)
          const minScale = Math.max(scale, 1)
          const r = Math.max(SPECIAL_NODE_RADIUS, Math.floor(SPECIAL_NODE_RADIUS + minScale))

          fpIconMedian
            .transition(trans)
            .attr('xlink:href', (d) => {
              return !!d?.['isFP'] ? 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2' : null
            })
            .attr('height', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('width', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('x', d => xr(d.x) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)
            .attr('y', d => yr(d.y) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)

          fpIconAverage
            .transition(trans)
            .attr('xlink:href', (d) => {
              return !!d?.['isFP'] ? 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2' : null
            })
            .attr('height', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('width', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('x', d => xr(d.x) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)
            .attr('y', d => yr(d.y) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)

          fpIconMedianInRelativeMode
            .transition(trans)
            .attr('xlink:href', (d) => {
              return !!d?.['isFP'] ? 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2' : null
            })
            .attr('height', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('width', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('x', d => xr(d.x) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)
            .attr('y', d => yr(d.y) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)

          fpIconAverageInRelativeMode
            .transition(trans)
            .attr('xlink:href', (d) => {
              return !!d?.['isFP'] ? 'https://go.futuresplatform.com/sites/all/themes/AltFutures_theme/images/watermark-fp.png?v=2' : null
            })
            .attr('height', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('width', (d) => {
              return !!d?.['isFP'] ? fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) : null
            })
            .attr('x', d => xr(d.x) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)
            .attr('y', d => yr(d.y) - fpIconSize * decreaseLevelRef.current * (r / NODE_RADIUS) / 2)

        } catch (error) {
          // console.error(error)
        }
      }

      // active zooming
      const zoom = d3.zoom().scaleExtent([1, 50]).translateExtent([[0, 0], [containerWidth, containerHeight]]).on("zoom", zoomed)
      d3.selectAll('circle').on('click', d => onClickNode(d.id))
      zoomFuncRef.current = zoomed
      scatterSvg.call(zoom)
        .call(zoom.transform, d3.zoomIdentity.scale(1))
        .node()
      return () => {
        scatterSvg.selectAll("*").remove()
      }
    } catch (error) {
      // console.error(error)
    }
  }, [phenomena, scatterSvg, containerHeight, containerWidth, openFullScreenMode])


  const onClickNode = (id) => {
    setVisibleDialog(true)
  }

  const onCloseDialog = () => {
    setVisibleDialog(false)
  }

  const onToggleTitle = (event) => {
    console.log('visibleTextvisibleText', visibleText)
    setVisibleText((visibleText) => !visibleText)
  }

  const handleIncreaseNodes = () => {
    decreaseLevelRef.current = decreaseLevelRef.current + 0.1
    if (zoomFuncRef.current) {
        zoomFuncRef.current({ transform: zoomRef.current })
    }
    setDecreaseLevel(value => (value + 0.1))
  }

  const handleDecreaseNodes = () => {
    decreaseLevelRef.current = decreaseLevelRef.current - 0.1
    if (zoomFuncRef.current) {
        zoomFuncRef.current({ transform: zoomRef.current })
    }
    setDecreaseLevel(value => (value - 0.1))
  }
  function closePopupLeftfs() {
    document.getElementById('popup-left-ratings_ConclusionRadarView').style.visibility = 'hidden'
    document.getElementById('popup-left-ratings_ConclusionRadarView')
      ?.getElementsByClassName('scroll-pane-left')[0]
      ?.getElementsByClassName("jspPane")[0]
      ?.getElementsByClassName("column")[0]
      ?.remove()
  }

  function closePopupRightfs() {
    // checkIfComments('popup-left')
    document.getElementById('popup-right-ratings_ConclusionRadarView').style.visibility = 'hidden'
    document.getElementById('popup-right-ratings_ConclusionRadarView')
      ?.getElementsByClassName('scroll-pane-right')[0]
      ?.getElementsByClassName("jspPane")[0]
      ?.getElementsByClassName("column")[0]
      ?.remove()
  }

  return (
    <div style=
      {{ width: '100%',
        background: !!openFullScreenMode ? '#e8ebeb' : null, 
        // paddingTop: !!openFullScreenMode ? '32px' : 'unset',  
        paddingBottom: !!openFullScreenMode ? '32px' : 'unset'
      }}
      id='wrapper-chart-1_ConclusionRadarView'
    >
      <div class="popup popup-left popup-left-ratings_ConclusionRadarView popup-phenomenon-radar-results" id="popup-left-ratings_ConclusionRadarView">
        <a class="btn-close" id="btn-close-popup-left-fs_ConclusionRadarView" onClick={closePopupLeftfs}><span class="af-custom-close"></span></a>
        <div class="stateindicatorleft"></div>
        <div class="scroll-pane-left"></div>
        <div class="popup-contentloader">
          <img src="/sites/all/themes/AltFutures_theme/images/ajax-loader.gif" width="20" height="20" />
        </div>
      </div>
      <div class="popup popup-right popup-right-ratings_ConclusionRadarView popup-phenomenon-radar-results" id="popup-right-ratings_ConclusionRadarView">
        <a class="btn-close" id="btn-close-popup-right-fs" onClick={closePopupRightfs}><span class="af-custom-close"></span></a>
        <div class="stateindicatorright"></div>
        <div class="scroll-pane-right">
        </div>
        <div class="popup-contentloader">
        <img src="/sites/all/themes/AltFutures_theme/images/ajax-loader.gif" width="20" height="20" />
        </div>
      </div>

      <div
        id='wrapper-chart-2_ConclusionRadarView'
        style={!openFullScreenMode ?
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          } : {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '8%',
            marginRight: '2%',
          }
        }>
        <div style=
          {{ display: 'flex', 
            alignItems: 'center',
            width: '100%',
            justifyContent: !!openFullScreenMode ? 'center' : 'unset',
            marginLeft: !!openFullScreenMode ? '-60px' : 'unset'
          }}>
        </div>

      </div>

  
    <div style={{ paddingBottom: !openFullScreenMode ? '90px' : '150px', background: '#ffffff7d' }}>
      <div style={!openFullScreenMode ? { display: 'flex', alignItems: 'center', marginRight: '-12px', marginBottom: '10px', justifyContent: 'space-between', width: +containerWidth + 60 +'px' , paddingLeft: '60px', height: '90px'}
                                        : {
                                          display: 'flex', alignItems: 'center', marginRight: '-12px', marginBottom: '10px', justifyContent: 'space-between', height: '120px',
                                          // eslint-disable-next-line no-restricted-globals
                                          margin: 'auto', width: screen?.width * 80 / 100 +'px'
                                        }}>
        <div style={{position: 'absolute', display: 'flex', top: '20px', right: '124px', visibility: !!openFullScreenMode ? 'hidden': 'visible'}}>
          <p style={{ fontSize: "13px", margin: 0, fontWeight: 400, paddingTop: '10px', marginRight: '20px' }}>{(radar?.radarLanguage === "en" ? 'Show results as:' : 'Näytä tulokset:') || requestTranslation('ShowResultsAs_RatingResults')} </p>
        <CustomDropdown
            name='AvgMedian'
            options={[
              {
                labelEn: radar?.radarLanguage === "en" ? 'Average' : 'Keskiarvo',
                labelFin: "Keskiarvo",
                value: 1,
              },
              {
                labelEn: radar?.radarLanguage === "en" ? 'Median' : 'Mediaani',
                labelFin: "Mediaani",
                value: 2,
              },
            ]}
            openDropdownHandle={openMenuHandle}
            dropdownIsOpen={menuIsOpen}
            closeDropdownHandle={() => setMenuIsOpen(false)}
            defaultOptionsProps={1}
            selectedOptionsProps={keyAvgMedian}
            lang={radar?.radarLanguage}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <p style={{ fontSize: "13px", margin: 0, fontWeight: 400, paddingTop: '10px', paddingRight: '20px' }}>{(radar?.radarLanguage === "en" ? 'Mode:' : 'Sijoittelu:') || requestTranslation('ShowResultsAs_RatingResults')} </p>
          <CustomDropdown
            name='modes'
            options={[
              {
                labelEn: radar?.radarLanguage === "en" ? 'Absolute' : 'Tarkka',
                labelFin: "Tarkka",
                value: 1,
              },
              {
                labelEn: radar?.radarLanguage === "en" ? 'Dispersed' : 'Hajautettu',
                labelFin: "Hajautettu",
                value: 2,
              },
              //   {
              //     labelEn: "Relative Mode",
              //     labelFin: "Relative Mode Fin",
              //     value: 3,
              //   },
            ]}
            openDropdownHandle={openMenuModeHandle}
            dropdownIsOpen={menuModeIsOpen}
            closeDropdownHandle={() => setMenuModeIsOpen(false)}
            defaultOptionsProps={1}
            selectedOptionsProps={keyMode}
            lang={radar?.radarLanguage}
          />
          <div style={{
            display: 'flex',
            // alignItems: 'center',
            marginLeft: '32px'
            // flexDirection: 'column'
          }}>
            <div className="custom-control custom-checkbox" style={{ paddingTop: '10px'}}>
              <input type="checkbox" className="custom-control-input" id="customCheckbox_hideTitles_ratings_ConclusionRadarView" checked={!visibleText} onChange={onToggleTitle} />
              <label className="custom-control-label" for="customCheckbox_hideTitles_ratings_ConclusionRadarView" style={{ fontWeight: 400, fontSize: '13px' }}>{(radar?.radarLanguage === "en" ? 'Hide titles' : 'Piilota otsikot') || requestTranslation('HideTitles_RatingResults')}</label>
            </div>
          </div>
          <div style={{ paddingTop: '10px', display: 'flex', marginLeft: '32px', width: 'auto', justifyContent: 'space-around' }}>
            <p style={{ fontSize: "13px", margin: 0, fontWeight: 400, paddingTop: '1px', marginRight: '12px' }}>{(radar?.radarLanguage === "en" ? 'Resize:' : 'Tekstin koko:')} </p>
            <button style={{ backgroundColor: 'white', borderRadius: '16px', marginRight: '10px' }} disabled={decreaseLevel <= 0.6} onClick={handleDecreaseNodes}> <Remove /></button>
            <button style={{ backgroundColor: 'white', borderRadius: '16px' }} disabled={decreaseLevel >= 1.5} onClick={handleIncreaseNodes}> <Add /> </button>
          </div>
        </div>
        <div style={{ display: 'flex', marginRight: !!openFullScreenMode ? '-8px' : 'unset' }}>
          {!openFullScreenMode ?
            (
              (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true) && (
                <button onClick={openFullScreenModeHandle} style={{ color: '#afabab' }}>
                  <Fullscreen style={{ fontSize: '28px' }} />
                </button>
              )
            )
            :
            (
              (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true)
              && (
                <button className="btn-icon-lg" onClick={closeFullScreenModeHandle}>
                  <span className='af-custom-close' />
                </button>
              )
            )
          }
        </div>
      </div>
      <div className='rating-results-diagram'
        id='wrapper-chart-3_ConclusionRadarView'
        style={{ display: 'flex', paddingRight: '60px', justifyContent: !openFullScreenMode ? 'unset' : 'center' }}>
        <AxisY originalHeight={containerHeight} axisHeight={containerHeight} axisLabel2={axisLabel2} axisLabel2a={axisLabel2a} axisLabel2b={axisLabel2b} isFm={openFullScreenMode} />
        <div
          id="wrapper-chart-5_ConclusionRadarView"
          style={{
            // padding: '0px 0px 60px 0',
            boxSizing: 'content-box',
            // eslint-disable-next-line no-restricted-globals
            width: !openFullScreenMode ? containerWidth : screen?.width * 80 / 100,
            // eslint-disable-next-line no-restricted-globals
            height: !openFullScreenMode ? containerHeight + 70 : screen?.height * 80 / 100,
            // background: '#e0dede' 
          }}>
          <div
            id="wrapper-chart-svg-axis_ConclusionRadarView"
            style={{
              position: 'relative', width: containerWidth, height: containerHeight, background: 'white',
              // eslint-disable-next-line no-restricted-globals
              width: !openFullScreenMode ? containerWidth : screen?.width * 80 / 100,
              // eslint-disable-next-line no-restricted-globals
              height: !openFullScreenMode ? containerHeight + 70 : screen?.height * 80 / 100,
            }}>
            <svg id='svg-app_ConclusionRadarView'
              style={{
                position: 'absolute',
                // eslint-disable-next-line no-restricted-globals
                width: !openFullScreenMode ? containerWidth : screen?.width * 80 / 100,
                // eslint-disable-next-line no-restricted-globals
                height: !openFullScreenMode ? containerHeight + 70 : screen?.height * 80 / 100,
              }} />
            <canvas id='axis_ConclusionRadarView' />
          </div>
          <AxisX originalWidth={containerWidth} axisWidth={containerWidth} axisLabel1={axisLabel1} axisLabel1a={axisLabel1a} axisLabel1b={axisLabel1b} isFm={openFullScreenMode} />
        </div>
      </div>
      </div>

    </div>

  )
}

export default App