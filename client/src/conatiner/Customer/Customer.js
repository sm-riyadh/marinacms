import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Card from '../../component/layout/card/card'

class Customer extends Component {
  state = {
    customer : {
      role : [ 'OOP' ],
      OOP  : [
        {
          name : 'A',
        },
        {
          name : 'B',
        },
        {
          name : 'C',
        },
      ],
    },
  }

  render() {
    const { customer } = this.state

    return (
      <Fragment>
        {customer.role.map(role => (
          <Section>
            <Title>{role}</Title>
            {customer[role].map(customer => (
              <Card column margin='0.8rem 1rem' padding='1.3rem 1.6rem'>
                {customer.name}, phone, last salary being paidd
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

export default Customer
