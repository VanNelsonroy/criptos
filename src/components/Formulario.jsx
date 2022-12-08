import { useEffect } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'
import { monedas } from '../data/monedas'

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

const Formulario = () => {
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=MXN`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      console.log(resultado.Data)
    }
    consultarApi()
  }, [])
  
  return (
    <form>
      <SelectMonedas />
      {moneda}
      <InputSubmit type='submit' value='Cotizar' />
    </form>
  )
}

export default Formulario
