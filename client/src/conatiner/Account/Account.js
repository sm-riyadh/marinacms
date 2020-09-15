import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

import { accountAction, hierarchyAction } from '../../store/actions'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController } from 'react-dates'

import Modal from '../../component/layout/modal/modal'
import { Button, Grid, Form, Textarea, Input, Select, Checkbox } from '../../component/element'

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
    selected_type     : '',
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

  render() {
    const { modal_new_account } = this.state
    const { account, hierarchy } = this.props

    return (
      <Fragment>
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Assets</th>
                <th className='txtRight'>
                  <Button
                    small
                    chip
                    icon='add'
                    onClick={() => {
                      this.onChangeHandler('modal_new_account', true)
                      this.onChangeHandler('selected_location', 'base')
                      this.onChangeHandler('selected_type', 'assets')
                    }}
                  >
                    New
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody onMouseLeave={() => this.setState({ hover_on: '' })}>
              {account.length !== 0 &&
              hierarchy.assets.base.length !== 0 && (
                <TreeView
                  accountType='assets'
                  root={hierarchy.assets}
                  base={hierarchy.assets.base}
                  data={account}
                  location={[ 'assets' ]}
                  hoverOn={this.state.hover_on}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
                  setSelectItem={id => this.onChangeHandler('selected_item', id)}
                  toggleModalSettings={id => {
                    this.onChangeHandler('modal_settings', true)
                    this.onChangeHandler('selected_item', id)
                  }}
                  toggleModalCreate={location => {
                    this.onChangeHandler('modal_new_account', true)
                    this.onChangeHandler('selected_location', location)
                    this.onChangeHandler('selected_type', 'assets')
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
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Liabilities</th>
                <th className='txtRight'>
                  <Button
                    small
                    chip
                    icon='add'
                    onClick={() => {
                      this.onChangeHandler('modal_new_account', true)
                      this.onChangeHandler('selected_location', 'base')
                      this.onChangeHandler('selected_type', 'liabilities')
                    }}
                  >
                    New
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody onMouseLeave={() => this.setState({ hover_on: '' })}>
              {account.length !== 0 &&
              hierarchy.liabilities.base.length !== 0 && (
                <TreeView
                  accountType='liabilities'
                  root={hierarchy.liabilities}
                  base={hierarchy.liabilities.base}
                  data={account}
                  location={[ 'liabilities' ]}
                  hoverOn={this.state.hover_on}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
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
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Equities</th>
                <th className='txtRight'>
                  <Button
                    small
                    chip
                    icon='add'
                    onClick={() => {
                      this.onChangeHandler('modal_new_account', true)
                      this.onChangeHandler('selected_location', 'base')
                      this.onChangeHandler('selected_type', 'equities')
                    }}
                  >
                    New
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody onMouseLeave={() => this.setState({ hover_on: '' })}>
              {account.length !== 0 &&
              hierarchy.equities.base.length !== 0 && (
                <TreeView
                  accountType='equities'
                  root={hierarchy.equities}
                  base={hierarchy.equities.base}
                  data={account}
                  location={[ 'equities' ]}
                  hoverOn={this.state.hover_on}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
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
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Expenses</th>
                <th className='txtRight'>
                  <Button
                    small
                    chip
                    icon='add'
                    onClick={() => {
                      this.onChangeHandler('modal_new_account', true)
                      this.onChangeHandler('selected_location', 'base')
                      this.onChangeHandler('selected_type', 'expenses')
                    }}
                  >
                    New
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody onMouseLeave={() => this.setState({ hover_on: '' })}>
              {account.length !== 0 &&
              hierarchy.expenses.base.length !== 0 && (
                <TreeView
                  accountType='expenses'
                  root={hierarchy.expenses}
                  base={hierarchy.expenses.base}
                  data={account}
                  location={[ 'expenses' ]}
                  hoverOn={this.state.hover_on}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
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
        <Section>
          <Table className='table-card'>
            <thead>
              <tr>
                <th>Incomes</th>
                <th className='txtRight'>
                  <Button
                    small
                    chip
                    icon='add'
                    onClick={() => {
                      this.onChangeHandler('modal_new_account', true)
                      this.onChangeHandler('selected_location', 'base')
                      this.onChangeHandler('selected_type', 'incomes')
                    }}
                  >
                    New
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody onMouseLeave={() => this.setState({ hover_on: '' })}>
              {account.length !== 0 &&
              hierarchy.incomes.base.length !== 0 && (
                <TreeView
                  accountType='incomes'
                  root={hierarchy.incomes}
                  base={hierarchy.incomes.base}
                  data={account}
                  location={[ 'incomes' ]}
                  hoverOn={this.state.hover_on}
                  setHoverOn={id => this.onChangeHandler('hover_on', id)}
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
          location={this.state.selected_location}
          createAccount={this.props.createAccount}
          company='5ea95979dc97443198df4ddf'
          type={this.state.selected_type}
          path={this.state.selected_type}
          selectedBranch={this.props.settings.selected_branch}
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
      th {
        text-align: left;
        padding: 1rem 0.4rem;
        color: #aaa;
        background-color: #f6f6f6;
        position: sticky;
        top: -4rem;
        /* border-bottom: 0.2rem solid #eee; */

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
      &.line-indicator {
        border-left: 0.1rem solid #000;
      }

      &:nth-child(even) {
        /* background-color: #f2f2f2; */
      }

      td {
        /* padding: 1rem 0.4rem; */
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
  settings : state.settings,
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
