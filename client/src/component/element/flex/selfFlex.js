import React from 'react'
import styled from 'styled-components'

const SelfFlex = ({ children, column, margin, padding }) => (
  <SelfFlex column margin={margin} padding={padding}>
    {children}
  </SelfFlex>
)

const SelfFlex = styled.div``

export default SelfFlex
