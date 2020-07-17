import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, Select } from '../../component/element'
import Modal from '../../component/layout/modal/modal'

class UserInterface extends Component {
  state = {
    select : '',
  }
  onChangeHandler = (name, action) => this.setState({ [name]: action })

  render() {
    return (
      <Fragment>
        <Button icon='people'>Hello</Button>
        <Form>
          <Input type='text' label='hello' onChange={() => {}} />
          <Input type='text' label='hello' onChange={() => {}} />
          <Select
            label='hello'
            icon='people'
            onChange={value => this.onChangeHandler('select', value)}
            options={[
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
              { value: 'c', label: 'C' },
              { value: 'd', label: 'D' },
            ]}
            value={this.state.select}
          />
        </Form>
      </Fragment>
    )
  }
}

export default UserInterface
