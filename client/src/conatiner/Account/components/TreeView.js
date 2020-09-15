import React, { Fragment } from 'react'
import styled from 'styled-components'
import _times from 'lodash.times'

import { Button } from '../../../component/element'

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

    return (
      <Fragment key={id}>
        <tr onMouseEnter={() => setHoverOn(id)}>
          <td>
            <Container>
              {indicator &&
                _times(spacing, () => (
                  <Fragment>
                    <LineIndicator />
                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                  </Fragment>
                ))}
              {!isFolder ? (
                <AccountName>{name} {isSystem && " 🔐"}</AccountName>
              ) : (
                <FolderName>
                  <i className='material-icons'>folder</i>
                  {name} {isSystem && " 🔐"}
                </FolderName>
              )}
            </Container>
          </td>
          <td style={{ maxWidth: '3rem' }} className='txtRight'>
            0
            {true && isFolder &&
            id === hoverOn && (
              <Button
                small
                chip
                style={{
                  margin : '0',
                }}
                icon='add'
                onClick={() => toggleModalCreate(id)}
              >
                New
              </Button>
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
          </td>
        </tr>
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
      </Fragment>
    )
  })

const Container = styled.span`
  display: flex;
  align-items: center;
`
const LineIndicator = styled.span`
  border-left: 0.1rem dashed #aaa;
  margin-left: 0.2rem;
  padding: 1.4rem 0;
`
const AccountName = styled.span`
  display: inline-flex;
  align-items: center;

  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.8rem 0;
`
const FolderName = styled.span`
  display: inline-flex;
  align-items: center;

  font-size: 1.2rem;
  color: #666;
  padding: 0.8rem 0;

  .material-icons {
    font-size: 1.4rem;
    margin-right: 0.5rem;
  }
`

export default TreeView
