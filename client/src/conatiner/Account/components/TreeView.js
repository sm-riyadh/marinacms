import React, { Fragment } from 'react'

const TreeView = ({
  root,
  base,
  data,
  // parentId,
  hoverOn,
  setHoverOn,
  // parent,
  // children,
  // setChildren,
  // setParent,
  toggleModalSettings,
  toggleModalCreate,
  spacing = 0,
}) =>
  base.map(item => {
    const id = data.find(e => e.id === item).id
    const name = data.find(e => e.id === item).name
    const isFolder = data.find(e => e.id === item).isFolder

    return (
      <Fragment key={id}>
        <tr
          onMouseEnter={() => {
            setHoverOn(id)
            // if (isFolder) {
            //   setParent(id)
            //   setChildren('')
            // } else {
            //   setParent(parentId)
            //   setChildren(id)
            // }
          }}
        >
          <td>
            <span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(spacing)}</span>
            {!isFolder ? <b>{name}</b> : <span>{name}</span>}
          </td>
          <td style={{ maxWidth: '3rem' }} className='txtRight'>
            0
            {/* {isFolder &&
          id === parent && (
            <Fragment>
              <button style={{ paddingTop: '0', paddingBottom: '0' }} className='btn btn-small btn-rounded grey'>
                <b> + New </b>
              </button>
              <button
                style={{ paddingTop: '0', paddingBottom: '0' }}
                className='btn btn-small btn-rounded grey'
                onClick={() => toggleModalSettings(id)}
              >
                <b> Edit </b>
              </button>
            </Fragment>
          )} */}
            {isFolder &&
            id === hoverOn && (
              <Fragment>
                <button
                  style={{ paddingTop: '0', paddingBottom: '0' }}
                  className='btn btn-small btn-rounded grey'
                  onClick={() => toggleModalCreate(id)}
                >
                  <b> + New </b>
                </button>
              </Fragment>
            )}
            {id === hoverOn && (
              <button
                style={{ paddingTop: '0', paddingBottom: '0' }}
                className='btn btn-small btn-rounded grey'
                onClick={() => toggleModalSettings(id)}
              >
                <b> Edit </b>
              </button>
            )}
            {/* {id === children && (
            <button
              style={{ paddingTop: '0', paddingBottom: '0' }}
              className='btn btn-small btn-rounded grey'
              onClick={() => toggleModalSettings(id)}
            >
              <b> Edit </b>
            </button>
          )} */}
          </td>
        </tr>
        {root[item] ? (
          <TreeView
            root={root}
            base={root[item]}
            data={data}
            spacing={spacing + 1}
            // parentId={isFolder ? id : parentId}
            hoverOn={hoverOn}
            setHoverOn={setHoverOn}
            // parent={parent}
            // children={children}
            // setParent={setParent}
            // setChildren={setChildren}
            toggleModalSettings={toggleModalSettings}
            toggleModalCreate={toggleModalCreate}
          />
        ) : (
          () => (spacing = 0)
        )}
      </Fragment>
    )
  })

export default TreeView
