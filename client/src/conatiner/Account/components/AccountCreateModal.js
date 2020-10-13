import React, { Fragment, useEffect, useState } from 'react'

import { Button, Grid, Form, Input, Checkbox } from '../../../component/element'

import Modal from '../../../component/layout/modal/modal'

const AccountCreateModal = ({ isModalOpen, modalClose, fetchAccount, createAccount, type, path, location, selectedBranch, ...props }) => {
  const [ name, setName ] = useState('')
  const [ isFolder, setIsFolder ] = useState(false)

  useEffect(() => {
    return () => {
      setName('')
      setIsFolder(false)
    }
  }, [isModalOpen])

  const onSubmit = e => {
    e.preventDefault()


    createAccount({
      branch   : selectedBranch,
      name,
      type,
      path     : [ path ],
      location,
      isFolder,
    })
    fetchAccount({branch   : selectedBranch})
    modalClose()
  }

  return location.length !== 0 && isModalOpen ? (
    <Modal title='Transaction' noPadding modalClose={modalClose}>
      <b>Type: {type}</b>
      <br />
      <b>Path: {path}</b>
      <br />
      <br />
      <b>Location: {location}</b>
      <Form>
        <Input
          name='name'
          type='text'
          label='Name'
          icon='format_quote'
          onChange={value => setName(value)}
          value={name}
        />
        <Checkbox
          name='isFoldder'
          label='Foldder'
          icon='format_quote'
          onChange={value => setIsFolder(value)}
          value={isFolder}
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

export default AccountCreateModal
