import React from 'react'
import ReactDOM  from 'react-dom'

import {Text, Margin} from '@ds.e/react'

import '@ds.e/scss/lib/Utilities.css'
import '@ds.e/scss/lib/Margin.css'
import '@ds.e/scss/lib/Text.css'
import '@ds.e/scss/lib/global.css'

ReactDOM.render(
    // <Color hexCode='#000' width={'sm'} height={'sm'}/>,
    <Margin space='xl'><Text size='xl'>this is some text</Text></Margin>,
    document.querySelector('#root')
)