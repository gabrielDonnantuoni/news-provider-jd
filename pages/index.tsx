import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Header, ScrollTop, DependenciesList, ApiQuery, ApiResponse } from '../client/components'
import { ApiContextProvider } from '../client/context'

export default function Index(): JSX.Element {
  return (
    <Container sx={{ pb: 6 }}>
      <Header />
      <Grid container sx={{ mt: 3, maxWidth: '1600px' }}>
        <Grid item xs={12} sm={6} alignItems="center" display="flex">
          <Typography variant="h3" gutterBottom>
            A RESTful API built with:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DependenciesList />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 4 }}>
            Try it now!
          </Typography>
        </Grid>
      </Grid>
      <ApiContextProvider>
          <ApiQuery />
          <ApiResponse />
      </ApiContextProvider>
      <ScrollTop />
    </Container>
  )
}