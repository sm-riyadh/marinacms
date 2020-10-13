import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import styled from 'styled-components'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController, SingleDatePicker } from 'react-dates'

import { journalAction } from '../../store/actions'

import Card from '../../component/element/card/card'

class Journal extends Component {
  componentDidMount() {}
  state = {
    date: ''
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
              <th>Destination</th>
              <th>Source</th>
              <th>Description</th>
              <th className='alignRight'>Amount</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {journal.map(({ serial, date, credit, debit, description, amount, comment }) => (
              <tr>
                <td>{serial !== 'NOT_SET' ? serial.toUpperCase() : '...'}</td>
                <td>
                  <span title={dateFormat(date, 'ddd, dS mmm, yyyy, h:MM:ss TT')}>
                    {new Date(date).getFullYear() === new Date().getFullYear() ? (
                      dateFormat(date, 'dS mmm')
                    ) : (
                      dateFormat(date, 'dS mmm, yyyy')
                    )}
                  </span>
                </td>
                <td>
                  {debit.name} <Note>{debit.note}</Note>
                </td>
                <td>
                  {credit.name} <Note>{credit.note}</Note>
                </td>
                <td>
                  {description}
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

const Note = styled.span`
  font-size: 85%;
  color: #bbb;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  font-size: 90%;

  thead {
    tr {
      th {
        background-color: #eee;
        text-align: left;
        padding: 1rem 0.4rem;
        color: #000;
        position: sticky;
        top: -4rem;

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
