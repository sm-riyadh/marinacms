import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Collapsible = ({ title, children }) => {
  const [ isCollapsed, setIsCollapsed ] = useState(true)
  return (
    <Container>
      <Header onClick={() => setIsCollapsed(!isCollapsed)}>
        {title}
        <Button>
          <i className='material-icons'>{!isCollapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</i>
        </Button>
      </Header>
      {!isCollapsed && <Collapse>{children}</Collapse>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
`
const Header = styled.div`
  width: 100%;
  padding: 2rem;
  border: 0.1rem solid #ccc;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Collapse = styled.div`
  width: 100%;
  padding: 1rem;
`
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.3rem 0.25rem;
  background-color: #eee;
  border-width: 0;
  border-radius: 10rem;
`

export default Collapsible
