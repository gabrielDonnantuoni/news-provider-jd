/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react'
import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

export interface InteractionProps {
  updated_src: object
  existing_src: object
  name: string | null;
  namespace: Array<string | null>;
  existing_value: object | string | number | boolean | null;
  new_value?: object | string | number | boolean | null
}

interface Props {
  state: {
    value: { data: any, status: number } | any,
    set: React.Dispatch<React.SetStateAction<any>>
  }
  name: string
  editable?: boolean
}

type SrcChangeFunc = (params: InteractionProps) => void

export default function JsonView(props: Props): JSX.Element {
  const { state, name, editable } = props

  let handleSrcChange: boolean | SrcChangeFunc = ({ updated_src }) => {
    if (state.value?.data) {
      state.set({ ...state.value, data: updated_src })
    } else {
      state.set(updated_src)
    }
  }

  handleSrcChange = editable ? handleSrcChange : false

  return (
    <DynamicReactJson
      src={state.value?.data || state.value}
      name={name}
      theme="harmonic"
      iconStyle="triangle"
      collapseStringsAfterLength={ 50 }
      onAdd={ handleSrcChange }
      onEdit={ handleSrcChange }
      onDelete={ handleSrcChange }
    />
  )
}
