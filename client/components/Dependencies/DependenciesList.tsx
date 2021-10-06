import * as React from 'react'
import Grid from '@mui/material/Grid'
import DependencyItem from './DependencyItem'
import { dependencies } from '../../data'

export default function DependenciesList(): JSX.Element {
  return (
    <Grid container spacing={3}>
      { dependencies.map(({ href, name }) => (
        <DependencyItem key={ name } name={ name } href={ href } />
      )) }
    </Grid>
  )
}