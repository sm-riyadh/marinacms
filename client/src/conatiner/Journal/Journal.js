import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Card from '../../component/layout/card/card'

class Journal extends Component {
  state = {
    journal : [
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
      {
        id          : 'OX32043',
        date        : '12 June, 2020',
        credit      : 'Bank',
        credit_note : 'b',
        debit       : 'Cash in Hand',
        debit_note  : 'a',
        amount      : 20000,
        comment     : 'c',
      },
    ],
  }

  render() {
    const { journal } = this.state

    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Destination (Source)</th>
              <th className='alignRight'>Amount</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {journal.map(({ id, date, credit, credit_note, debit, debit_note, amount, comment }) => (
              <tr>
                <td>{id}</td>
                <td>{date}</td>
                <td>
                  {credit} <i className='material-icons'>double_arrow</i> <FloatRight>({debit})</FloatRight> <br />
                  <Note>{credit_note}</Note>{' '}
                  <FloatRight>
                    <Note>{debit_note}</Note>
                  </FloatRight>
                </td>
                <td className='alignRight'>{amount}</td>
                <td>{comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

const FloatRight = styled.span`float: right;`

const Note = styled.span`
  font-size: 85%;
  color: #bbb;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    tr {
      background-color: #eee;

      th {
        text-align: left;
        padding: 1rem 0.4rem;
        color: #000;

        &:first-child {
          padding-left: 3rem;
        }
        &:last-child {
          padding-right: 3rem;
        }
      }
    }
  }

  tbody {
    td {
      padding: 1rem 0.4rem;

      &:first-child {
        padding-left: 3rem;
      }
      &:last-child {
        padding-right: 3rem;
      }
    }
  }

  .alignRight {
    text-align: right;
  }
`

export default Journal
