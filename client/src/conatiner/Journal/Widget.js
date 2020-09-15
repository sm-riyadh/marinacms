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
import { Card, Button, Grid, Form, Textarea, Input, Select, Checkbox } from '../../component/element'
import ToPrint from './ToPrint'

import { journalAction, accountAction, settingsAction } from '../../store/actions'

class JournalWidget extends Component {
  componentDidMount() {}

  state = {
    modal_new_journal     : false,
    modal_journal_details : false,
    journal_index         : '',

    page                  : 0,

    focused_input         : 'startDate',

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

  onFilterChangeHandler = async (name, value) => {
    await this.props.modifySettings({ key: name, data: value })

    const shouldReFetch = [ 'filter_type', 'filter_size', 'filter_page', 'start_date', 'end_date' ].includes(name)

    if (shouldReFetch) this.reFetchJournal()
  }

  reFetchJournal = async () => {
    this.props.fetchJournal({
      branch     : this.props.settings.selected_branch,
      type       : this.props.settings.filter_type,
      size       : this.props.settings.filter_size,
      page       : this.props.settings.filter_page,
      start_date : this.props.settings.start_date.toDate(),
      end_date   : this.props.settings.end_date.toDate(),
    })
  }

  onDateFilterHandler = async preset => {
    let start_date, end_date

    switch (preset) {
      case 'today': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment() })
        await this.props.modifySettings({ key: 'end_date', data: moment() })
        break
      }
      case '3_days': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment().subtract(2, 'days') })
        await this.props.modifySettings({ key: 'end_date', data: moment() })
        break
      }
      case 'week': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment().subtract(1, 'weeks') })
        await this.props.modifySettings({ key: 'end_date', data: moment() })
        break
      }
      case 'month': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment().subtract(1, 'months') })
        await this.props.modifySettings({ key: 'end_date', data: moment() })
        break
      }
      case 'month': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment().subtract(2, 'months') })
        await this.props.modifySettings({ key: 'end_date', data: moment().subtract(1, 'months') })
        break
      }
      case 'year': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        await this.props.modifySettings({ key: 'start_date', data: moment().subtract(1, 'years') })
        await this.props.modifySettings({ key: 'end_date', data: moment() })
        break
      }
      case 'custom_single': {
        await this.props.modifySettings({ key: 'start_date', data: this.props.settings.end_date })
        this.props.modifySettings({ key: 'filter_date', data: preset })
        break
      }
      case 'custom': {
        this.props.modifySettings({ key: 'filter_date', data: preset })
        return
      }
      default:
        break
    }

    this.reFetchJournal()
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
    // this.props.fetchJournal({
    //   branch     : '5efdede059266615d82e2f24',
    //   type       : filter_type,
    //   size       : 12,
    //   page       : 0,
    //   start_date : this.state.start_date.toDate(),
    //   end_date   : this.state.end_date.toDate(),
    // })
  }
  render() {
    const { modal_new_journal, modal_print } = this.state
    const {
      filter_type,
      filter_date_type,
      filter_date,
      filter_account,
      filter_voucher_id,
      start_date,
      end_date,
    } = this.props.settings

    const { journal, account, status } = this.props

    return (
      <Fragment>
        {journal && !status.failed ? (
          <Fragment>
            <Widget padding='0.5rem'>
              <Select
                name='filter_type'
                label='Type'
                noEmpty
                white
                icon={
                  filter_type === 'journal' ? (
                    'class'
                  ) : filter_type === 'assets' ? (
                    'monetization_on'
                  ) : filter_type === 'liabilities' ? (
                    'account_balance'
                  ) : filter_type === 'equities' ? (
                    'store'
                  ) : filter_type === 'expenses' ? (
                    'account_balance_wallet'
                  ) : filter_type === 'incomes' ? (
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
                value={filter_type}
              />
            </Widget>
            <WHeader>Date Filter</WHeader>
            {/* Calander Controller */}
            <Widget padding='0.2rem'>
              <Select
                name='filter_date_type'
                label='Date type'
                icon='date_range'
                noEmpty
                // white
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
                value={filter_date_type}
              />
            </Widget>
            {/* Calander */}
            <Card padding='0' noShadow>
              <Widget>
                {filter_date === 'today' || filter_date === 'custom_single' ? (
                  <DayPickerSingleDateController
                    date={end_date}
                    focused={true}
                    onDateChange={date => {
                      this.props.modifySettings({ key: filter_date, data: 'custom_single' })
                      this.onFilterChangeHandler('end_date', date)
                    }}
                    displayFormat='D MMM'
                    numberOfMonths={1}
                    small
                    noBorder
                    isOutsideRange={() => false}
                    transitionDuration={0}
                    initialVisibleMonth={() => end_date}
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
                    startDate={start_date}
                    endDate={end_date}
                    onDatesChange={async ({ startDate, endDate }) => {
                      await this.props.modifySettings({ key: 'start_date', data: startDate })
                      endDate && (await this.props.modifySettings({ key: 'end_date', data: endDate }))

                      this.reFetchJournal()
                    }}
                    focusedInput={this.state.focused_input}
                    onFocusChange={focusedInput =>
                      this.setState({ focused_input: focusedInput ? focusedInput : 'startDate' })}
                    displayFormat='D MMM'
                    maxDate={moment()}
                    transitionDuration={0}
                    initialVisibleMonth={() => end_date}
                    isDayHighlighted={date =>
                      date.year() === moment().year() &&
                      date.month() === moment().month() &&
                      date.date() === moment().date()}
                    isDayBlocked={date =>
                      date.year() >= moment().year() &&
                      date.month() >= moment().month() &&
                      date.date() > moment().date()}
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
            </Card>
            {/* Calander Presets */}
            <Widget justify='flex-start'>
              <Button chip white small style={{ padding: '0 1rem', paddingLeft: '0' }}>
                <Checkbox
                  label='Single day'
                  name='filter_date'
                  radius='99rem'
                  white
                  style={{ marginLeft: '0' }}
                  onChange={isChecked => this.onDateFilterHandler(!isChecked ? 'custom' : 'custom_single')}
                  value={filter_date === 'today' || filter_date === 'custom_single'}
                />
              </Button>
              <Button
                chip
                small
                white
                className={`m-0${filter_date === 'today' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('today')}
              >
                Today
              </Button>
              <Button
                chip
                small
                white
                className={`m-0${filter_date === '3_days' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('3_days')}
              >
                3 Days
              </Button>
              <Button
                chip
                small
                white
                className={`m-0${filter_date === 'week' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('week')}
              >
                Week
              </Button>
              <Button
                chip
                small
                white
                className={`m-0${filter_date === 'month' ? ' activate' : ''}`}
                onClick={() => this.onDateFilterHandler('month')}
              >
                Month
              </Button>
              <Button
                chip
                small
                white
                className={`m-0${filter_date === 'year' ? ' activate' : ''}`}
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
                  content={() => this.journlToPrintRef}
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
        <HiddenPrint ref={el => (this.journlToPrintRef = el)}>
          <ToPrint />
        </HiddenPrint>

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

const HiddenPrint = styled.div`
  @media only screen {
    display: none;
  }
  @media only print {
    display: initial;
  }
`

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const FloatRight = styled.span`float: right;`

const Note = styled.span`
  font-size: 85%;
  color: #bbb;
`
const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    tr {
      background-color: #eee;

      th {
        text-align: left;
        padding: 1rem 0.4rem;
        color: #000;

        &:first-child {
          padding-left: 3rem;
        }
        &:last-child {
          padding-right: 3rem;
        }
      }
    }
  }

  tbody {
    td {
      padding: 1rem 0.4rem;

      &:first-child {
        padding-left: 3rem;
      }
      &:last-child {
        padding-right: 3rem;
      }
    }
  }

  .alignRight {
    text-align: right;
  }
`

const mapStateToProps = state => ({
  journal  : state.journal.journal,
  settings : state.settings,
  account  : state.account.account,
  status   : state.branch.status,
  // settings : state.settings,
})
const mapDispatchToProps = dispatch => ({
  fetchJournal   : payload => dispatch(journalAction.send.fetch(payload)),
  createJournal  : payload => dispatch(journalAction.send.create(payload)),
  fetchAccount   : payload => dispatch(accountAction.send.fetch(payload)),
  modifySettings : payload => dispatch(settingsAction.save.modify(payload)),
  // modifyBranch     : payload => dispatch(branchAction.send.modify(payload)),
  // activateBranch   : payload => dispatch(branchAction.send.activate(payload)),
  // deactivateBranch : payload => dispatch(branchAction.send.deactivate(payload)),
  // removeBranch     : payload => dispatch(branchAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalWidget)
