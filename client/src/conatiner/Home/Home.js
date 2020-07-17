import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../../component/module/navBar/navBar'
import { WidgetBar } from '../../component/layout/widgetBar/widgetBar'

import Journal from '../Journal/Journal'
import JournalWidget from '../Journal/Widget'
import Employee from '../Employee/Employee'
import Customer from '../Customer/Customer'
import Account from '../Account/Account'
import AccountWidget from '../Account/Widget'
import Branch from '../Branch/Branch'
import BranchWidget from '../Branch/Widget'
import UserInterface from '../UserInterface/UserInterface'

class Home extends Component {
  render() {
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
              { isLabel: true, name: 'Branch' },
              { link: '/employee', name: 'Employee', icon: 'supervised_user_circle' },
              { link: '/customer', name: 'Customer', icon: 'contacts' },
              { isLabel: true, name: 'Test' },
              { link: '/ui', name: 'UI Test', icon: 'settings' },
            ]}
          />
          <Main>
            <Header>search, btn</Header>
            <Flex>
              <CardHolder>
                <Card>
                  <Switch>
                    <Route path='/journal' component={Journal} />
                    <Route path='/employee' component={Employee} />
                    <Route path='/customer' component={Customer} />
                    <Route path='/branch' component={Branch} />
                    <Route path='/coa' component={Account} />
                    <Route path='/ui' component={UserInterface} />
                  </Switch>
                  {/* Journal */}
                </Card>
              </CardHolder>
              <WidgetBar backgroundColor='#fafafa' offset='4.6rem'>
                <Switch>
                  <Route path='/journal' component={JournalWidget} />
                  <Route path='/coa' component={AccountWidget} />
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
const Header = styled.div`
  position: sticky;
  top: 0;

  width: 100%;
  padding: 1.6rem 2rem;

  background: #e0e0e0;
  border-bottom: 0.1rem solid #ccc;
`
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

export default Home
