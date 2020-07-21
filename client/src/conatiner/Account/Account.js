import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

// import { ActivityBar } from '../../component/layout'
// import { Modal, Container, Card, Text, Placeholder } from '../../component'
import { accountAction, hierarchyAction } from '../../store/actions'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController } from 'react-dates'

import Modal from '../../component/layout/modal/modal'
import { Button, Grid, Form, Textarea, Input, Select, Checkbox } from '../../component/element'

// import BranchEntry from './components/BranchCreate'
// import BranchSettings from './components/BranchSettings'
import TreeView from './components/TreeView'
import AccountCreateModal from './components/AccountCreateModal'

export class Account extends Component {
  componentDidMount() {}

  state = {
    modal_new_account : false,

    hover_on          : '',
    parent            : '',
    children          : '',
    selected_item     : '',
    selected_location : [],

    hierarchy         : {
      assets      : {
        base : [],
      },
      liabilities : {
        base : [],
      },
      equities    : {
        base : [],
      },
      expenses    : {
        base : [],
      },
      incomes     : {
        base : [],
      },
    },

    name              : '',
    type              : '',
    path              : '',
    isFolder          : '',
  }

  onChangeHandler = (name, action) => this.setState({ [name]: action })
  // toggleModal = (name, action) => this.setState({ [name]: action })
  // setJournalIndex = index => this.setState({ journal_index: index })

  render() {
    const { modal_new_account } = this.state
    const { account, hierarchy } = this.props

    return (
      <Fragment>
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody
              onMouseLeave={() => {
                this.setState({ hover_on: '' })
                // this.setState({ parent: '' })
                // this.setState({ children: '' })
              }}
            >
              {this.props.account.length !== 0 &&
              this.props.hierarchy.assets.base.length !== 0 && (
                <TreeView
                  accountType='assets'
                  root={this.props.hierarchy.assets}
                  base={this.props.hierarchy.assets.base}
                  data={this.props.account}
                  location={[ 'assets' ]}
                  hoverOn={this.state.hover_on}
                  // parent={this.state.parent}
                  // children={this.state.children}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
                  // setParent={id => this.onChangeHandler('parent', id)}
                  // setChildren={id => this.onChangeHandler('children', id)}
                  setSelectItem={id => this.onChangeHandler('selected_item', id)}
                  toggleModalSettings={id => {
                    this.onChangeHandler('modal_settings', true)
                    this.onChangeHandler('selected_item', id)
                  }}
                  toggleModalCreate={location => {
                    this.onChangeHandler('modal_new_account', true)
                    this.onChangeHandler('selected_location', location)
                  }}
                />
              )}
              <tr>
                <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                  <b>Total</b>
                </td>
                <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                  <span>৳</span> 0
                </td>
              </tr>
            </tbody>
          </Table>
        </Section>
        <AccountCreateModal
          isModalOpen={modal_new_account}
          modalClose={() => this.onChangeHandler('modal_new_account', false)}
          // selectedAccount={this.props.account.find(e => e.id === this.state.selected_location)}
          location={this.state.selected_location}
          createAccount={this.props.createAccount}
          company='5ea95979dc97443198df4ddf'
          type='assets'
          path='assets'
        />
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
    tr {
      &:nth-child(even) {
        background-color: #f2f2f2;
      }

      td {
        padding: 1rem 0.4rem;
        /* border: 0.1rem solid #ccc; */
        /* border-width: 0.1rem 0; */

        &:first-child {
          padding-left: 3rem;
        }
        &:last-child {
          padding-right: 3rem;
        }
      }
    }
  }

  .alignRight {
    text-align: right;
  }
`

const mapStateToProps = state => ({
  account   : state.account.account,
  hierarchy : state.hierarchy.hierarchy,
  // settings : state.settings,
  // status   : state.branch.status,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
  fetchHierarchy : payload => dispatch(hierarchyAction.send.fetch(payload)),
  createAccount  : payload => dispatch(accountAction.send.create(payload)),
  // createBranch     : payload => dispatch(branchAction.send.create(payload)),
  // modifyBranch     : payload => dispatch(branchAction.send.modify(payload)),
  // activateBranch   : payload => dispatch(branchAction.send.activate(payload)),
  // deactivateBranch : payload => dispatch(branchAction.send.deactivate(payload)),
  // removeBranch     : payload => dispatch(branchAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
