import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Card from '../../component/element/card/card'

class Employee extends Component {
  state = {
    employee : {
      role    : [ 'Manager' ],
      Manager : [
        {
          name : 'A',
        },
        {
          name : 'A',
        },
        {
          name : 'A',
        },
      ],
    },
  }

  render() {
    const { employee } = this.state

    return (
      <Fragment>
        {employee.role.map(role => (
          <Section>
            <Title>{role}</Title>
            {employee[role].map(employee => (
              <Card column margin='0.8rem 1rem' padding='1.3rem 1.6rem'>
                {employee.name}, phone, last salary being paidd
              </Card>
            ))}
          </Section>
        ))}
      </Fragment>
    )
  }
}

const Section = styled.div`
  display: flex;
  flex-direction: column;

  Card {
    margin: 2rem;
  }
`
const Title = styled.div`
  background-color: #e0e0e0;
  padding: 0.6rem 1.8rem;
`

export default Employee
