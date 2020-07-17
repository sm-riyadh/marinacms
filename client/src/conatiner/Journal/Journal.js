import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

import { journalAction } from '../../store/actions'

import Card from '../../component/element/card/card'

class Journal extends Component {
  componentDidMount() {
    this.props.fetchJournal({
      branch     : '5efdede059266615d82e2f24',
      type       : 'journal',
      size       : 100,
      page       : 0,
      start_date : moment().subtract(7, 'days').toDate(),
      end_date   : moment().toDate(),
    })
  }

  render() {
    const { journal, status } = this.props

    return (
      <Fragment>
        Journal
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

const mapStateToProps = state => ({
  journal : state.journal.journal,
  status  : state.branch.status,
  // settings : state.settings,
})
const mapDispatchToProps = dispatch => ({
  fetchJournal : payload => dispatch(journalAction.send.fetch(payload)),
  // createBranch     : payload => dispatch(branchAction.send.create(payload)),
  // modifyBranch     : payload => dispatch(branchAction.send.modify(payload)),
  // activateBranch   : payload => dispatch(branchAction.send.activate(payload)),
  // deactivateBranch : payload => dispatch(branchAction.send.deactivate(payload)),
  // removeBranch     : payload => dispatch(branchAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
