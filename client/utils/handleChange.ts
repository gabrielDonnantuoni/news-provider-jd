import * as React from 'react'

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>
type StateUpdater = React.Dispatch<React.SetStateAction<any>>

export function handleChange(stateUpdater: StateUpdater) {
  return (evt: InputEvent | SelectEvent): void => {
    stateUpdater(evt.target.value)
  }
}
