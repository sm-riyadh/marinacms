import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactToPrint from 'react-to-print'
import styled from 'styled-components'

import { accountAction, hierarchyAction } from '../../store/actions'
import { WFooter } from '../../component/layout/widgetBar/widgetBar'

import { Button } from '../../component/element'

import Modal from '../../component/layout/modal/modal'
import TreeView from '../Account/components/TreeView'
import AccountCreateModal from '../Account/components/AccountCreateModal'

export class BankWidget extends Component {
  componentDidMount() {}

  state = {
    modal_new_branch : true,
  }

  onChangeHandler = (name, action) => this.setState({ [name]: action })

  onSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { modal_new_account } = this.state
    const { account, hierarchy, status_account, status_hierarchy } = this.props

    return (
      <Fragment>
        {this.state.modal_new_branch && (
          <Modal noPadding modalClose={() => this.onChangeHandler('modal_new_branch', false)}>
            <WFooter>
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
                    {status_account.success && status_hierarchy.success && account.length !== 0 &&
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
                <Flex>
                  <Button
                    icon='post_add'
                    className='btn primary'
                    onClick={() => this.onChangeHandler('modal_new_branch', true)}
                  >
                    New Bank
                  </Button>
                </Flex>
              </WFooter>
            </Modal>
        )}
          {/* <BranchCreateModal
            isModalOpen={modal_new_branch}
            modalClose={() => this.onChangeHandler('modal_new_branch', false)}
            createBranch={createBranch}
          /> */}
        </Fragment>)
  }
}

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

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
  status_account   : state.account.status,
  status_hierarchy   : state.hierarchy.status,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
  fetchHierarchy : payload => dispatch(hierarchyAction.send.fetch(payload)),
  createAccount  : payload => dispatch(accountAction.send.create(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BankWidget)
