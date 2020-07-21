import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import socketIo from 'socket.io-client'

import NavBar from '../../component/module/navBar/navBar'
import { Select, Input, Button } from '../../component/element'
import { WidgetBar } from '../../component/layout/widgetBar/widgetBar'
import Header from '../../component/layout/header/header'

import { journalAction, accountAction, hierarchyAction, branchAction, settingsAction } from '../../store/actions'

import Journal from '../Journal/Journal'
import JournalWidget from '../Journal/Widget'
import Employee from '../Employee/Employee'
import Customer from '../Customer/Customer'
import Account from '../Account/Account'
import AccountWidget from '../Account/Widget'
import Branch from '../Branch/Branch'
import BranchWidget from '../Branch/Widget'
import UserInterface from '../UserInterface/UserInterface'
import branch from '../../store/actions/branch'

const socket = socketIo('http://localhost:8080')

class Home extends Component {
  componentDidMount() {
    this.props.fetchBranch()
  }
  state = {
    isFetched : false,
  }

  fetchData = async branch => {
    await this.props.modifySettings({
      key  : 'selected_branch',
      data : branch,
    })
    this.props.fetchHierarchy({ branch: this.props.settings.selected_branch })
    this.props.fetchAccount({ branch: this.props.settings.selected_branch })
    this.props.fetchJournal({
      branch     : this.props.settings.selected_branch,
      type       : this.props.settings.filter_type,
      size       : this.props.settings.filter_size,
      page       : this.props.settings.filter_page,
      start_date : this.props.settings.start_date.toDate(),
      end_date   : this.props.settings.end_date.toDate(),
    })
  }
  render() {
    const { branch, modifySettings } = this.props
    const { selected_branch } = this.props.settings
    if (!this.state.isFetched && this.props.branch.length !== 0) {
      this.setState({ isFetched: true }, () => this.fetchData(this.props.branch.find(e => e.isPrimary).id))
    }

    return (
      <Fragment>
        <Container>
          <NavBar
            navigations={[
              { link: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
              { isLabel: true, name: 'Accounting' },
              { link: '/journal', name: 'Journal', icon: 'book' },
              { link: '/coa', name: 'Chart of Accounts', icon: 'list_alt' },
              { link: '/branch', name: 'Branch', icon: 'account_tree' },
              { isLabel: true, name: 'Company' },
              { link: '/employee', name: 'Employee', icon: 'supervised_user_circle' },
              { link: '/customer', name: 'Customer', icon: 'contacts' },
              { isLabel: true, name: 'Others' },
              { link: '/customer', name: 'Printing Lab', icon: 'print' },
              { isLabel: true, name: 'Test' },
              { link: '/ui', name: 'UI Test', icon: 'settings' },
            ]}
          />
          <Main>
            <Header>
              <FlexL>
                <Select
                  name='branch'
                  label='Branch'
                  // noEmpty
                  icon='account_tree'
                  onChange={value => this.fetchData(value)}
                  options={branch.map(branch => ({
                    value : branch.id,
                    label : branch.name,
                  }))}
                  value={selected_branch}
                />
                <Input type='search' label='Search' icon='search' onChange={() => {}} />
              </FlexL>
              <FlexL>
                <Button icon='settings' />
                <Button icon='face' />
              </FlexL>
            </Header>
            <Flex>
              <CardHolder>
                <Card>
                  <Switch>
                    <Route path='/journal' component={Journal} key={selected_branch} />
                    <Route path='/employee' component={Employee} />
                    <Route path='/customer' component={Customer} />
                    <Route path='/branch' component={Branch} />
                    <Route path='/coa' component={Account} key={selected_branch} />
                    <Route path='/ui' component={UserInterface} />
                  </Switch>
                  {/* Journal */}
                </Card>
              </CardHolder>
              <WidgetBar backgroundColor='#fafafa' offset='4.6rem'>
                <Switch>
                  <Route path='/journal' component={JournalWidget} key={selected_branch} />
                  <Route path='/coa' component={AccountWidget} key={selected_branch} />
                  <Route path='/branch' component={BranchWidget} />
                  {/* <Route path='/employee' component={EmployeeBranchWidget} /> */}
                  {/* <Route path='/employee' component={Employee.Activity} />  */}
                  {/* <Route path='/customer' component={Customer.Activity} /> */}
                  {/* <Route path='/branch' component={Branch.Activity} /> */}
                  {/* <Route path='/coa' component={Account.Activity} /> */}
                </Switch>
              </WidgetBar>
            </Flex>
          </Main>
        </Container>
      </Fragment>
    )
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Flex = styled.div`
  width: 100%;
  display: flex;
`
const FlexL = styled.div`display: inline-flex;`
const CardHolder = styled.div`
  width: 100%;
  height: calc(100vh - 4.9rem);

  background-color: #f2f2f2;
  padding: 4rem 5rem;
  padding-bottom: 0;
  overflow-y: auto;
`
const Card = styled.div`
  padding: 2rem 0;
  background-color: #ffffff;
  border-radius: 0.8rem;
  min-height: 95%;

  box-shadow: 0 0.1rem 0.3rem #00000033;
`

const mapStateToProps = state => ({
  branch   : state.branch.branch,
  settings : state.settings,
})
const mapDispatchToProps = dispatch => ({
  fetchJournal   : payload => dispatch(journalAction.send.fetch(payload)),
  fetchHierarchy : payload => dispatch(hierarchyAction.send.fetch(payload)),
  fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
  fetchBranch    : payload => dispatch(branchAction.send.fetch(payload)),
  fetchSettings  : payload => dispatch(settingsAction.send.fetch(payload)),
  modifySettings : payload => dispatch(settingsAction.save.modify(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
