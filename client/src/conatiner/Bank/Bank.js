import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { accountAction, hierarchyAction } from '../../store/actions'

import Card from '../../component/element/card/card'
import { Button } from '../../component/element'


const TreeView = ({
  root,
  base,
  data,
  hoverOn,
  setHoverOn,
  toggleModalSettings,
  toggleModalCreate,
  indicator = false,
  spacing = 0,
}) =>
base.map(item => {
    const account = data.find(e => e.id === item)

    const id = account.id
    const name = account.name
    const isFolder = account.isFolder
    const isSystem = account.isSystem

    return(
      <Fragment key={"s"}>
        <Section>
        {isFolder ? (
          <Title>{name}</Title>
        ) : (
          <Card column margin='0.8rem 1rem' padding='1.3rem 1.6rem'>
            {name}
          </Card>
        )}
        {!isSystem && id === hoverOn && (
          <Button
            small
            chip
            style={{
              margin : '0',
            }}
            icon='edit'
            onClick={() => toggleModalSettings(id)}
          >
            Edit
          </Button>
        )}
      </Section>
      {root[item] ? (
        <TreeView
          root={root}
          base={root[item]}
          data={data}
          spacing={spacing + 1}
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          indicator={true}
          toggleModalSettings={toggleModalSettings}
          toggleModalCreate={toggleModalCreate}
        />
      ) : (
        () => (spacing = 0)
      )}
    </Fragment>)
  })



  // <Fragment key={"s"}>
  //   <Section>
  //   {isFolder ? (
  //     <Title>{name}</Title>
  //   ) : (
  //     <Card column margin='0.8rem 1rem' padding='1.3rem 1.6rem'>
  //       {name}
  //     </Card>
  //   )}
  //   {!isSystem && id === hoverOn && (
  //     <Button
  //       small
  //       chip
  //       style={{
  //         margin : '0',
  //       }}
  //       icon='edit'
  //       onClick={() => toggleModalSettings(id)}
  //     >
  //       Edit
  //     </Button>
  //   )}
  // </Section>
  // {root[item] ? (
  //   <TreeView
  //     root={root}
  //     base={root[item]}
  //     data={data}
  //     spacing={spacing + 1}
  //     hoverOn={hoverOn}
  //     setHoverOn={setHoverOn}
  //     indicator={true}
  //     toggleModalSettings={toggleModalSettings}
  //     toggleModalCreate={toggleModalCreate}
  //   />
  // ) : (
  //   () => (spacing = 0)
  // )}
  // </Fragment>



class Bank extends Component {
  state = {
    customer : {
      role : [ 'OOP' ],
      OOP  : [
        {
          name : 'A',
        },
        {
          name : 'B',
        },
        {
          name : 'C',
        },
      ],
    },
  }

  render() {
    const { customer, modal_new_account } = this.state
    let { account, hierarchy } = this.props

    let bankAccount, hierarchyBankAccount

    if(account.length !== 0 && hierarchy.length !== 0) {
      bankAccount = account.find(e => e.name === 'Bank')
      hierarchyBankAccount = hierarchy.assets[bankAccount.id]
    }

    return (
      <Fragment>
        <Title> Banks </Title>

        {account && hierarchy && hierarchyBankAccount && account.length !== 0  &&
          hierarchy.length !== 0 && (
            <TreeView
              accountType='assets'
              root={hierarchy.assets}
              base={hierarchyBankAccount}
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
const Title = styled.div`
  font-weight: bold;
  text-align: left;
  padding: 1.2rem 2.2rem;
  color: #999;
  background-color: #f6f6f6;
  position: sticky;
  top: -4rem;
`
const mapStateToProps = state => ({
  account   : state.account.account,
  hierarchy : state.hierarchy.hierarchy,
})

const mapDispatchToProps = dispatch => ({
  fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
  fetchHierarchy : payload => dispatch(hierarchyAction.send.fetch(payload)),
  createAccount  : payload => dispatch(accountAction.send.create(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bank)
