import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactToPrint from 'react-to-print'
import styled from 'styled-components'

import { WFooter } from '../../component/layout/widgetBar/widgetBar'

import { Button } from '../../component/element'

import BranchCreateModal from './components/BranchCreateModal'
import { branchAction } from '../../store/actions'

export class BranchWidget extends Component {
  componentDidMount() {}

  state = {
    modal_new_branch : false,
  }

  onChangeHandler = (name, action) => this.setState({ [name]: action })

  onSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { modal_new_branch } = this.state
    const { branch, status, createBranch } = this.props

    return branch && !status.failed ? (
      <Fragment>
        <WFooter>
          <Flex>
            {/* <ReactToPrint
              trigger={() => (
                <Button icon='print' className='m-bottom-2'>
                  Print This
                </Button>
              )}
              content={() => this.testRef}
            /> */}
            <Button
              icon='post_add'
              className='btn primary'
              onClick={() => this.onChangeHandler('modal_new_branch', true)}
            >
              New Branch
            </Button>
          </Flex>
        </WFooter>

        <BranchCreateModal
          isModalOpen={modal_new_branch}
          modalClose={() => this.onChangeHandler('modal_new_branch', false)}
          createBranch={createBranch}
        />
      </Fragment>
    ) : (
      <Fragment />
    )
  }
}

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const mapStateToProps = state => ({
  branch : state.branch.branch,
  status : state.branch.status,
})

const mapDispatchToProps = dispatch => ({
  createBranch : payload => dispatch(branchAction.send.create(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchWidget)
