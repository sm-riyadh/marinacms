import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { branchAction } from '../../store/actions'

import { Card, Container } from '../../component/element'

export class Branch extends Component {
  componentDidMount() {
    this.props.fetchBranch()
  }

  state = {
    modal_new_branch : false,
  }

  onChangeHandler = (name, action) => this.setState({ [name]: action })

  render() {
    const { modal_new_branch } = this.state
    const { branch, createBranch } = this.props

    return (
      <Fragment>
        <Title>Main</Title>
        <Container>
          {branch.map(({ name }) => (
            <Section>
              <Card column isHoverible>
                {name},
              </Card>
            </Section>
          ))}
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  branch : state.branch.branch,
  // settings : state.settings,
  // status   : state.branch.status,
})
const mapDispatchToProps = dispatch => ({
  fetchBranch  : payload => dispatch(branchAction.send.fetch(payload)),
  createBranch : payload => dispatch(branchAction.send.create(payload)),
  // modifyBranch     : payload => dispatch(branchAction.send.modify(payload)),
  // activateBranch   : payload => dispatch(branchAction.send.activate(payload)),
  // deactivateBranch : payload => dispatch(branchAction.send.deactivate(payload)),
  // removeBranch     : payload => dispatch(branchAction.send.remove(payload)),
})

const Section = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  background-color: #e0e0e0;
  padding: 0.6rem 1.8rem;
`

export default connect(mapStateToProps, mapDispatchToProps)(Branch)
