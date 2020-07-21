import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, Password, Select } from '../../component/element'
import Modal from '../../component/layout/modal/modal'

class UserInterface extends Component {
  state = {
    select : '',
    val    : '',
    val2   : '',
  }
  onChangeHandler = (name, action) => this.setState({ [name]: action })

  render() {
    return (
      <Fragment>
        <Button icon='people'>Hello</Button>
        <Form>
          <Input label='hello' icon='list_alt' onChange={() => {}} />
          <Input
            label='hello'
            icon='list_alt'
            onChange={() => {}}
            value={this.state.val}
            onChange={val => this.setState({ val })}
          />
          <Password
            label='hello'
            onChange={() => {}}
            value={this.state.val2}
            onChange={val2 => this.setState({ val2 })}
          />
          <Password
            label='hello'
            peek
            onChange={() => {}}
            value={this.state.val2}
            onChange={val2 => this.setState({ val2 })}
          />
          <Select
            label='hello'
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
