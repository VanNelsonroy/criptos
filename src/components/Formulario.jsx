import { useEffect, useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover{
    background-color: #7a7bfe;
    cursor: pointer;
  }
`

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)
  const [ criptoMoneda, SelectCriptoMoneda ] = useSelectMonedas('Elige tu criptomoneda', criptos)

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=MXN`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      const arrayCriptos = resultado.Data.map( cripto => {
        //cripto.CoinInfo.Name
        //cripto.CoinInfo.FullName
        return {
          id : cripto.CoinInfo.Name,
          nombre : cripto.CoinInfo.FullName
        }
      })

      setCriptos(arrayCriptos)
    }
    consultarApi()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if([moneda, criptoMoneda].includes('')){
      setError(true)
      return;
    }

    setError(false)
    setMonedas({moneda, criptoMoneda})
  }
  
  return (
    <>
     {error && <Error>Todos los campos son requeridos</Error>}
      <form onSubmit={ handleSubmit }>
        <SelectMonedas />
        <SelectCriptoMoneda />
        <InputSubmit type='submit' value='Cotizar' />
      </form>
    </>
  )
}

export default Formulario
