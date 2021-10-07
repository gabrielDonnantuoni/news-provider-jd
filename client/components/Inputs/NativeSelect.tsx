import * as React from 'react'
import NativeSelect from '@mui/material/NativeSelect'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { handleChange } from '../../utils'

interface Props {
  name: string
  label: string
  options: { optLabel: string, value: any }[]
  state: {
    value: any,
    set: React.Dispatch<React.SetStateAction<any>>
  }
}

export default function NatSelect(props: Props): JSX.Element {
  const { name, label, options, state } = props

  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor={ name }>
        { label }
      </InputLabel>
      <NativeSelect
        value={ state.value }
        onChange={ handleChange(state.set) }
        inputProps={{
          name,
          id: name,
        }}
      >
        { options.map(({ optLabel, value }) => (
          <option key={value} value={value}>{optLabel}</option>
        )) }
      </NativeSelect>
    </FormControl>
  )
}