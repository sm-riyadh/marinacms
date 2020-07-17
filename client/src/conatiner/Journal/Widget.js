import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactToPrint from 'react-to-print'
import styled from 'styled-components'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController } from 'react-dates'

import { WHeader, WFooter, Widget } from '../../component/layout/widgetBar/widgetBar'
import Modal from '../../component/layout/modal/modal'
import { Button, Grid, Form, Textarea, Input, Select, Checkbox } from '../../component/element'

import { journalAction, accountAction } from '../../store/actions'

export class Activity extends Component {
  componentDidMount() {
    this.props.fetchAccount({
      branch : '5efdede059266615d82e2f24',
    })
  }

  state = {
    modal_new_journal     : false,
    modal_journal_details : false,
    journal_index         : '',

    page                  : 0,

    focused_input         : 'startDate',
    filter_type           : 'journal',
    filter_date_type      : 'voucher',
    filter_date           : '3_days',
    filter_account        : '',
    filter_voucher_id     : '',
    start_date            : moment().subtract(100, 'days'),
    end_date              : moment(),

    date                  : moment(),
    destination           : '',
    destination_note      : '',
    source                : '',
    source_note           : '',
    description           : '',
    amount                : '',
    comment               : '',
  }

  onChangeHandler = (name, action) => this.setState({ [name]: action })

  onFilterChangeHandler = (name, value) => {
    this.setState({ [name]: value }, () => {
      const shouldFetch = [ 'filter_type', 'start_date', 'end_date' ].includes(name)

      if (shouldFetch)
        this.props.fetchJournal({
          branch     : '5efdede059266615d82e2f24',
          type       : this.state.filter_type,
          size       : 12,
          page       : 0,
          start_date : this.state.start_date.toDate(),
          end_date   : this.state.end_date.toDate(),
        })
    })
  }
  onSingleDateFilterChangeHandler = (name, value) => {
    this.setState({ [name]: value, filter_date: 'custom_single' }, () =>
      this.props.fetchJournal({
        branch     : '5efdede059266615d82e2f24',
        type       : this.state.filter_type,
        start_date : this.state.end_date.toDate(),
        end_date   : this.state.end_date.toDate(),
      })
    )
  }

  onDateFilterChangeHandler = (startDate, endDate) => {
    if (!endDate) endDate = this.state.end_date

    this.setState({ start_date: startDate, end_date: endDate, filter_date: 'custom' }, () =>
      this.props.fetchJournal({
        branch     : '5efdede059266615d82e2f24',
        type       : this.state.filter_type,
        start_date : this.state.start_date.toDate(),
        end_date   : this.state.end_date.toDate(),
      })
    )
  }

  onDateFilterHandler = preset => {
    let start_date, end_date

    switch (preset) {
      case 'today': {
        start_date = moment()
        end_date = moment()
        break
      }
      case '3_days': {
        start_date = moment().subtract(2, 'days')
        end_date = moment()
        break
      }
      case 'week': {
        start_date = moment().subtract(1, 'weeks')
        end_date = moment()
        break
      }
      case 'month': {
        start_date = moment().subtract(1, 'months')
        end_date = moment()
        break
      }
      case 'month': {
        start_date = moment().subtract(2, 'months')
        end_date = moment().subtract(1, 'months')
        break
      }
      case 'year': {
        start_date = moment().subtract(1, 'years')
        end_date = moment()
        break
      }
      case 'custom_single': {
        start_date = this.state.end_date
        end_date = this.state.end_date
        this.setState({ filter_date: preset })
        break
      }
      case 'custom': {
        this.setState({ filter_date: preset })
        return
      }
      default:
        start_date = this.state.start_date
        end_date = this.state.end_date
        break
    }

    this.setState({ start_date, end_date, filter_date: preset }, () =>
      this.props.fetchJournal({
        branch     : '5efdede059266615d82e2f24',
        start_date : start_date.toDate(),
        end_date   : end_date.toDate(),
      })
    )
  }

  setJournalIndex = index => this.setState({ journal_index: index })

  appendMore = () => {
    this.setState(
      state => ({
        page : state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          branch  : '5efdede059266615d82e2f24',
          page    : this.state.page,
          account : this.state.filter_account,
        })
    )
  }

  onSubmit = e => {
    e.preventDefault()

    this.props.createJournal({
      date        : this.state.date,
      branch      : '5efdede059266615d82e2f24',
      credit      : this.state.source,
      credit_note : this.state.source_note,
      debit       : this.state.destination,
      debit_note  : this.state.destination_note,
      description : this.state.description,
      amount      : this.state.amount,
      comment     : this.state.comment,
    })
    this.onChangeHandler('modal_new_journal', false)
    this.props.fetchJournal({
      branch     : '5efdede059266615d82e2f24',
      type       : this.state.filter_type,
      size       : 12,
      page       : 0,
      start_date : this.state.start_date.toDate(),
      end_date   : this.state.end_date.toDate(),
    })
  }
  render() {
    const { modal_new_journal } = this.state
    const { journal, account, status } = this.props

    return (
      <Fragment>
        {journal && !status.failed ? (
          <Fragment>
            <Widget>
              <Select
                name='filter_type'
                label='Type'
                noEmpty
                icon={
                  this.state.filter_type === 'journal' ? (
                    'class'
                  ) : this.state.filter_type === 'assets' ? (
                    'monetization_on'
                  ) : this.state.filter_type === 'liabilities' ? (
                    'account_balance'
                  ) : this.state.filter_type === 'equities' ? (
                    'store'
                  ) : this.state.filter_type === 'expenses' ? (
                    'account_balance_wallet'
                  ) : this.state.filter_type === 'incomes' ? (
                    'attach_money'
                  ) : (
                    'filter_alt'
                  )
                }
                onChange={value => this.onFilterChangeHandler('filter_type', value)}
                options={[
                  {
                    value : 'journal',
                    label : 'Journal',
                  },
                  {
                    value : 'assets',
                    label : 'Assets',
                  },
                  {
                    value : 'liabilities',
                    label : 'Liabilities',
                  },
                  {
                    value : 'equities',
                    label : 'Equities',
                  },
                  {
                    value : 'expenses',
                    label : 'Expenses',
                  },
                  {
                    value : 'incomes',
                    label : 'Incomes',
                  },
                ]}
                value={this.state.filter_type}
              />
              {/* <Flex>
                <div
                  className={`option${this.state.filter_type === 'journal' ? ' activate' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'journal')}
                >
                  <i className='material-icons p-right-1'>collections_bookmark</i>
                  Journal
                </div>
                <div
                  className={`option${this.state.filter_type === 'expenses' ? ' activate' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'expenses')}
                >
                  <i className='material-icons p-right-1'>local_grocery_store</i>
                  Expresses
                </div>
                <div
                  className={`option${this.state.filter_type === 'assets' ? ' activate' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'assets')}
                >
                  <i className='material-icons p-right-1'>money</i>
                  Cash n Bank
                </div>
                <div
                  className={`option${this.state.filter_type === 'liabilities' ? ' activate' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'liabilities')}
                >
                  <i className='material-icons p-right-1'>receipt</i>
                  Payrolls
                </div>
                <div
                  className={`option${this.state.filter_type === 'incomes' ? ' activate' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'incomes')}
                >
                  <i className='material-icons p-right-1'>score</i>
                  Incomes
                </div>
              </Flex> */}
              {/* <div className='widget-header'><i className='material-icons p-right'>filter</i> Filter</div> */}
            </Widget>
            <WHeader>Date Filter</WHeader>
            {/* Calander Controller */}
            <Widget>
              <Select
                name='filter_date_type'
                label='Date type'
                icon='date_range'
                noEmpty
                onChange={e => this.onFilterChangeHandler('filter_date_type', e.target.value)}
                options={[
                  {
                    value : 'voucher',
                    label : 'Voucher Date',
                  },
                  {
                    value : 'entry',
                    label : 'Entry Date',
                  },
                ]}
                value={this.state.filter_date_type}
              />
            </Widget>
            {/* Calander */}
            <Widget>
              {this.state.filter_date === 'today' || this.state.filter_date === 'custom_single' ? (
                <DayPickerSingleDateController
                  date={this.state.end_date}
                  focused={true}
                  onDateChange={date => this.onSingleDateFilterChangeHandler('end_date', date)}
                  displayFormat='D MMM'
                  numberOfMonths={1}
                  small
                  noBorder
                  isOutsideRange={() => false}
                  transitionDuration={0}
                  initialVisibleMonth={() => this.state.end_date}
                  isDayHighlighted={date =>
                    date.year() === moment().year() &&
                    date.month() === moment().month() &&
                    date.date() === moment().date()}
                  isDayBlocked={date =>
                    date.year() > moment().year() ||
                    (date.year() >= moment().year() && date.month() > moment().month()) ||
                    (date.year() >= moment().year() &&
                      date.month() >= moment().month() &&
                      date.date() > moment().date())}
                  daySize={30}
                  firstDayOfWeek={6}
                  reopenPickerOnClearDates
                  hideKeyboardShortcutsPanel
                />
              ) : (
                <DayPickerRangeController
                  startDate={this.state.start_date}
                  endDate={this.state.end_date}
                  onDatesChange={({ startDate, endDate }) => this.onDateFilterChangeHandler(startDate, endDate)}
                  focusedInput={this.state.focused_input}
                  onFocusChange={focusedInput =>
                    this.setState({ focused_input: focusedInput ? focusedInput : 'startDate' })}
                  displayFormat='D MMM'
                  maxDate={moment()}
                  transitionDuration={0}
                  initialVisibleMonth={() => this.state.end_date}
                  isDayHighlighted={date =>
                    date.year() === moment().year() &&
                    date.month() === moment().month() &&
                    date.date() === moment().date()}
                  isDayBlocked={date =>
                    date.year() >= moment().year() && date.month() >= moment().month() && date.date() > moment().date()}
                  numberOfMonths={1}
                  small
                  noBorder
                  isOutsideRange={() => false}
                  daySize={30}
                  firstDayOfWeek={6}
                  reopenPickerOnClearDates
                  hideKeyboardShortcutsPanel
                />
              )}
            </Widget>
            {/* Calander Presets */}
            <Widget justify='flex-start'>
              <Button chip small style={{ padding: '0 1rem', paddingLeft: '0' }}>
                <Checkbox
                  label='Single day'
                  name='filter_date'
                  radius='99rem'
                  style={{ marginLeft: '0' }}
                  onChange={({ target }) => this.onDateFilterHandler(!target.checked ? 'custom' : 'custom_single')}
                  checked={this.state.filter_date === 'today' || this.state.filter_date === 'custom_single'}
                />
              </Button>
              <Button
                chip
                small
                className={`m-0${this.state.filter_date === 'today' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('today')}
              >
                Today
              </Button>
              <Button
                chip
                small
                className={`m-0${this.state.filter_date === '3_days' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('3_days')}
              >
                3 Days
              </Button>
              <Button
                chip
                small
                className={`m-0${this.state.filter_date === 'week' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('week')}
              >
                Week
              </Button>
              <Button
                chip
                small
                className={`m-0${this.state.filter_date === 'month' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('month')}
              >
                Month
              </Button>
              <Button
                chip
                small
                className={`m-0${this.state.filter_date === 'year' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('year')}
              >
                Year
              </Button>
            </Widget>

            <WFooter>
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
                  onClick={() => this.onChangeHandler('modal_new_journal', true)}
                >
                  New Voucher
                </Button>
              </Flex>
            </WFooter>
          </Fragment>
        ) : !this.props.status.failed ? (
          <div type='table' />
        ) : (
          <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
        )}

        {modal_new_journal && (
          <Modal noPadding modalClose={() => this.onChangeHandler('modal_new_journal', false)}>
            <Form>
              <Input
                type='text'
                label='Date'
                icon='date_range'
                onChange={value => this.onChangeHandler('date', value)}
                value={this.state.date}
              />
              <Grid gap='1rem' columns='1.8fr 1.2fr'>
                <Select
                  label='Source'
                  icon='keyboard_tab'
                  onChange={value => this.onChangeHandler('source', value)}
                  options={account.map(account => ({ value: account.id, label: account.name }))}
                  value={this.state.source}
                />
                <Input
                  type='text'
                  label='Note'
                  icon='assignment'
                  onChange={value => this.onChangeHandler('source_note', value)}
                  value={this.state.source_note}
                />
              </Grid>
              <Grid gap='1rem' columns='1.8fr 1.2fr'>
                <Select
                  label='Destination'
                  icon='play_for_work'
                  onChange={value => this.onChangeHandler('destination', value)}
                  options={account.map(account => ({ value: account.id, label: account.name }))}
                  value={this.state.destination}
                />
                <Input
                  type='text'
                  label='Note'
                  icon='assignment'
                  onChange={value => this.onChangeHandler('destination_note', value)}
                  value={this.state.destination_note}
                />
              </Grid>
              <Input
                type='text'
                label='Description'
                icon='notes'
                onChange={value => this.onChangeHandler('description', value)}
                value={this.state.description}
              />
              <Input
                type='number'
                label='Amount'
                icon='local_atm'
                onChange={value => this.onChangeHandler('amount', value)}
                value={this.state.amount}
              />
              <Textarea
                type='text'
                label='Comment'
                icon='sms'
                onChange={value => this.onChangeHandler('comment', value)}
                value={this.state.comment}
              />
              <Grid gap='1rem' columns='1fr 1fr'>
                <Button icon='clear'>Clear</Button>
                <Button icon='done' onClick={this.onSubmit}>
                  Create
                </Button>
              </Grid>
            </Form>
          </Modal>
        )}
      </Fragment>
    )
  }
}

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const mapStateToProps = state => ({
  journal : state.journal.journal,
  account : state.account.account,
  status  : state.branch.status,
  // settings : state.settings,
})
const mapDispatchToProps = dispatch => ({
  fetchJournal  : payload => dispatch(journalAction.send.fetch(payload)),
  createJournal : payload => dispatch(journalAction.send.create(payload)),
  fetchAccount  : payload => dispatch(accountAction.send.fetch(payload)),
  // modifyBranch     : payload => dispatch(branchAction.send.modify(payload)),
  // activateBranch   : payload => dispatch(branchAction.send.activate(payload)),
  // deactivateBranch : payload => dispatch(branchAction.send.deactivate(payload)),
  // removeBranch     : payload => dispatch(branchAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
