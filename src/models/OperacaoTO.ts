import ClienteTO from './ClienteTO'

type OperacaoTO = {
    id: number,
    cliente: ClienteTO,
    operacaoCliente: string,
    nome: string,
    statusParcelamento: string, 
    nomeEmpresaTerceirizada: string, 
    dataParcelamento: Date, 
    codigoOperacaoLote: number,
    codigoParcelamento: any
}

export default OperacaoTO;