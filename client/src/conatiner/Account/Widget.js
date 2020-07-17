import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactToPrint from 'react-to-print'
import styled from 'styled-components'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController } from 'react-dates'

import { WMiddle } from '../../component/layout/widgetBar/widgetBar'
import Modal from '../../component/layout/modal/modal'
import { Button, Grid, Form, Textarea, Input, Select, Checkbox } from '../../component/element'

import { accountAction, hierarchyAction } from '../../store/actions'

export class AccountWidget extends Component {
  componentDidMount() {}

  state = {}

  onChangeHandler = (name, action) => this.setState({ [name]: action })

  onSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { modal_new_account } = this.state
    const { account, status } = this.props

    return account && !status.failed ? (
      <Fragment>
        <WMiddle>Coming Soon</WMiddle>
        {/* <WFooter>
          <Flex>
            <ReactToPrint
              trigger={() => (
                <Button icon='print' className='m-bottom-2'>
                  Print This
                </Button>
              )}
              content={() => this.testRef}
            />
            <Button
              icon='post_add'
              className='btn primary'
              onClick={() => this.onChangeHandler('modal_new_account', true)}
            >
              New Account
            </Button>
          </Flex>
        </WFooter> */}
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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  // fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget)
