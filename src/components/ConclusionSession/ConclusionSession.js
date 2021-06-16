import React, {useContext} from 'react'
import parse from 'html-react-parser';
import {DataContext} from '../../store/GlobalState'

const ConclusionSession = () => {
    const { state: { radar }} = useContext(DataContext)
    
    return (
        <div>
            {parse(radar?.mapIntro || '')}
        </div>
    )
}

export default ConclusionSession
