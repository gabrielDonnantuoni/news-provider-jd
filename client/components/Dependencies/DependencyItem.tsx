import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

interface Props {
  href: string
  name: string
}

export default function DependencyItem({ href, name }: Props): JSX.Element {
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Button
        fullWidth
        variant="outlined"
        href={ href }
        target="_blank"
      >
        { name }
      </Button>
    </Grid>
  )
}