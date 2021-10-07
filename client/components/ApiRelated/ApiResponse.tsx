import * as React from 'react'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import JsonView from '../JsonView'
import { ApiContext } from '../../context'
import { StatusCodeTypo } from './styles'

export default function ApiResponse(): JSX.Element {
  const { result, baseUrl } = React.useContext(ApiContext)
  const theme = useTheme()

  const success = theme.palette.success.main
  const error = theme.palette.error.main

  const statusBg = result.value.status >= 300 ? error : success

  const { method, url } = result.value.config
  const query = url.split(`${baseUrl}/api`)[1]

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      <Grid item xs={12} display="flex" justifyContent="space-around">
        <Typography variant="h5">
          {`Response - ${method} - ${query}`}
        </Typography>
        <StatusCodeTypo sx={{ bgcolor: statusBg }}>
          {`STATUS: ${result.value.status}`}
        </StatusCodeTypo>
      </Grid>
      <Grid item xs={12}>
        <JsonView state={ result } name="response" />
      </Grid>
    </Grid>
  )
}