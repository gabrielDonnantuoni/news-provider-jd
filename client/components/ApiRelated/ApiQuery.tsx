import * as React from 'react'
import Grid from '@mui/material/Grid'
import { BaseURLTypo, QueryPath } from './styles'
import Button from '@mui/material/Button'
import { handleChange, request } from '../../utils'
import { optMethods, optKnownPaths, optCategories, optUserTypes, reqBodies } from '../../data'
import { ApiContext } from '../../context'
import NativeSelect from '../Inputs/NativeSelect'
import JsonView from '../JsonView'


export default function ApiQuery(): JSX.Element {
  const { result, query, method, data, baseUrl } = React.useContext(ApiContext)
  const [jsonDisplay, setJsonDisplay] = React.useState('none')
  const [categoriesDisplay, setCategoriesDisplay] = React.useState('none')
  const [auth, setAuth] = React.useState('unknown')

  const handleClick = async () => {
    try {
      const response = await request(
        method.value, query.value, data.value, auth)
      result.set(response)
    } catch (err) {
      result.set(err)
    }
  }

  React.useEffect(() => {
    handleClick()
  }, [baseUrl])

  React.useEffect(() => {
    if (['post', 'put'].includes(method.value)) setJsonDisplay('block')
    else setJsonDisplay('none')
  }, [method.value])

  React.useEffect(() => {
    if (query.value.includes('category')) setCategoriesDisplay('block')
    else setCategoriesDisplay('none')
  }, [query.value])

  React.useEffect(() => {
    if (jsonDisplay === 'block') {
      const defaultData = reqBodies[`${query.value}_${method.value}`]
      if (defaultData) data.set(defaultData)
    }
  }, [query.value, method.value, jsonDisplay])

  return (
    <Grid container component="form" spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={12} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > div': {
          margin: '14px 10px 0 10px',
          minWidth: '60px',
        },
      }}>
        <NativeSelect
          name="method-options"
          label="Method"
          state={ method }
          options={ optMethods }
        />
        <NativeSelect
          name="user-options"
          label="User Type"
          state={ { value: auth, set: setAuth } }
          options={ optUserTypes }
        />
        <NativeSelect
          name="path-options"
          label="Known Paths"
          state={ query }
          options={ optKnownPaths }
        />
        <Grid item display={categoriesDisplay}>
          <NativeSelect
            name="categories-options"
            label="Known Categories"
            state={ query }
            options={ optCategories }
          />
        </Grid>
      </Grid>
      <Grid item xs={12} display={jsonDisplay}>
        <JsonView state={data} name="body" editable={true} />
      </Grid>
      <Grid item xs={12} sm={10} display="flex">
        <BaseURLTypo>{`${baseUrl}/api/`}</BaseURLTypo>
        <QueryPath
          label="Query path"
          value={ query.value }
          onChange={ handleChange(query.set) }
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          variant="contained"
          onClick={ handleClick }
          fullWidth
          sx={{ height: '100%' }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}