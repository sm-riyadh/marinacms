import React, { Fragment, useState } from 'react'

import { Button, Grid, Form, Input, Checkbox } from '../../../component/element'

import Modal from '../../../component/layout/modal/modal'

const BranchCreateModal = ({ isModalOpen, modalClose, createBranch, ...props }) => {
  const [ name, setName ] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    console.log('object')
    createBranch({
      branch : '5efdede059266615d82e2f24',
      name,
    })
    modalClose()
  }

  return isModalOpen ? (
    <Modal title='Transaction' modalClose={modalClose} noPadding>
      <Form>
        <Input
          name='name'
          type='text'
          label='Name'
          icon='format_quote'
          onChange={value => setName(value)}
          value={name}
        />
        <Grid gap='1rem' columns='1fr 1fr'>
          <Button icon='clear'>Clear</Button>
          <Button icon='done' onClick={onSubmit}>
            Create
          </Button>
        </Grid>
      </Form>
    </Modal>
  ) : (
    <Fragment />
  )
}

export default BranchCreateModal
