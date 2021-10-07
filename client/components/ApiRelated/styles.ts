import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const BaseURLTypo = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderRadius: '4px 0 0 4px',
  display: 'inline-flex',
  alignItems: 'center',
  paddingLeft: '8px',
  paddingRight: '8px',
}))

export const QueryPath = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '0 4px 4px 0',
  },
  flex: 1,
}))

export const StatusCodeTypo = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px',
}))

export const apiOptionsSx = {
  display: 'flex',
  flexWrap: 'wrap',
  '& > div': {
    margin: '10px 10px 0 10px',
    minWidth: '60px',
  },
}
