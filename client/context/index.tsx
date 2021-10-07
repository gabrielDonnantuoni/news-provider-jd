import * as React from 'react'
import { Method } from 'axios'

interface Response {
  config: {
    method: string,
    url: string
  }
  data: any
  status: number
}

interface IApiContext {
  result: { value: Response,
    set: React.Dispatch<React.SetStateAction<Response>> }
  query: { value: string, set: React.Dispatch<React.SetStateAction<string>> }
  method: { value: Method, set: React.Dispatch<React.SetStateAction<Method>> }
  data: { value: any, set: React.Dispatch<React.SetStateAction<any>> }
  baseUrl: string
}

export const ApiContext = React.createContext<Partial<IApiContext>>({})

interface Props {
  children: React.ReactChild | React.ReactChild[]
}

export function ApiContextProvider({ children }: Props): JSX.Element {
  const [reqResult, setReqResult] = React.useState({
    data: {}, status: 200, config: { url: '', method: 'get' } })
  const [reqQuery, setReqQuery] = React.useState('articles?category=Technology')
  const [reqMethod, setReqMethod] = React.useState('get' as Method)
  const [reqData, setReqData] = React.useState(undefined)
  const [appBaseUrl, setAppBaseUrl] = React.useState('')

  React.useEffect(() => {
    setAppBaseUrl(document.location.origin)
  }, [])

  const appContext = {
    result: { value: reqResult, set: setReqResult },
    query: { value: reqQuery, set: setReqQuery },
    method: { value: reqMethod, set: setReqMethod },
    data: { value: reqData, set: setReqData },
    baseUrl: appBaseUrl,
  }

  return (
    <ApiContext.Provider value={ appContext }>
      { children }
    </ApiContext.Provider>
  )
}
