import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Grid = ({ children, columns, rows, gap, gapRow, gapColumn }) => {
  return (
    <GridStyled rows={rows} gap={gap} gapRow={gapRow} gapColumn={gapColumn} columns={columns} rows={rows}>
      {children}
    </GridStyled>
  )
}

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns && columns};
  grid-template-rows: ${({ rows }) => rows && rows};
  grid-row-gap: ${({ gapRow }) => gapRow && gapRow};
  grid-column-gap: ${({ gapColumn }) => gapColumn && gapColumn};
  grid-gap: ${({ gap }) => gap && gap};
`

export default Grid
