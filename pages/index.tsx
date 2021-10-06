import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Header, ScrollTop, DependenciesList } from '../client/components'

export default function Index(): JSX.Element {
  return (
    <Container>
      <Header />
      <Grid container sx={{ mt: 3 }}>
        <Typography variant="h5" align="center">
          A RESTful news provider API built with:
        </Typography>
        <DependenciesList />
      </Grid>
      <ScrollTop />
    </Container>
  )
}