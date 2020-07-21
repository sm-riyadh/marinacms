import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

class ToPrint extends Component {
  render() {
    const { journal } = this.props

    return (
      <PrintContainer>
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
            {journal.map(({ serial, date, credit, debit, amount, comment }) => (
              <tr>
                <td>{serial !== 'NOT_SET' ? serial.toUpperCase() : '...'}</td>
                <td>{date}</td>
                <td>
                  {credit.name} <i className='material-icons'>double_arrow</i> <FloatRight>({debit.name})</FloatRight>{' '}
                  <br />
                  <Note>{credit.note}</Note>{' '}
                  <FloatRight>
                    <Note>{debit.note}</Note>
                  </FloatRight>
                </td>
                <td className='alignRight'>{amount}</td>
                <td>{comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </PrintContainer>
    )
  }
}

const FloatRight = styled.span`float: right;`

const Note = styled.span`
  font-size: 85%;
  color: #bbb;
`

const PrintContainer = styled.div`@media only print {padding: 10px;}`

const Table = styled.table`
  @media only print {
    font-size: 10px;
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;

    thead {
      tr {
        background-color: #ccc;

        th {
          text-align: left;
          padding: 8px 4px;
          color: #000;

          &:first-child {
            padding-left: 30px;
          }
          &:last-child {
            padding-right: 30px;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          border: 0 solid #ccc;
          border-right-width: 1px;
          border-bottom-width: 1px;
          padding: 5px 4px;

          &:first-child {
            padding-left: 30px;
          }
          &:last-child {
            padding-right: 30px;
            border-right-width: 0;
          }
        }

        &:last-child {
          td {
            border-bottom-width: 0;
          }
        }
      }
    }

    .alignRight {
      text-align: right;
    }
  }
`

const mapStateToProps = state => ({
  journal : state.journal.journal,
})

export default connect(mapStateToProps)(ToPrint)
