import BaseApi from '../services/BaseApi'
import { removerMascaraDocumento } from '../utils/Mascaras'
import { converterParaISO8601 } from '../utils/DateUtils'

export async function consultarOperacoesPorFiltro(
                          dataInicial: any,
                          dataFinal: any,
                          documentoCliente: string,
                          operacao: string,
                          nomeCliente: string,
                          nomeEmpresa: string, 
                          documentoEmpresa: string,
                          statusList: number[]) {

    documentoEmpresa = removerMascaraDocumento(documentoEmpresa);
    documentoCliente = removerMascaraDocumento(documentoCliente);
    
    operacao = operacao.replace(/\s/g,"");
    operacao = operacao === "..." ? '': operacao;

    dataInicial = converterParaISO8601(dataInicial)
    dataFinal = converterParaISO8601(dataFinal)

    let status = ''
    let contador = 0                        
    statusList.forEach(function(element) {
      if(0 !== contador){
        status = status + ',' 
      } 
      contador ++;
      status = status + (element + 1)
    });

    return BaseApi.get(
      '/operacoes/administrativo', { params: { 
        dataInicial, 
        dataFinal, 
        documentoEmpresa, 
        nomeEmpresa, 
        operacao, 
        documentoCliente,
        nomeCliente,
        status} })
    .then((response) => {
      return response.data
    })
    .catch(erro => {
       throw erro
    })
}

export async function downloadAudios(codigoOperacaoLote: number): Promise<any> {
  return BaseApi.get('/termo-acordo/parcelamento/download', 
  { 
    responseType: 'blob'})
    .then(response => {
        let contentHeader = response.headers['content-disposition'];
        let contentHeaderFileName = contentHeader.split(';')[1];
        contentHeaderFileName = contentHeaderFileName.replace('filename=', '').trim();

        const blob = new Blob([response.data], {
          type: 'application/pdf',
        });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = contentHeaderFileName;
        a.click();
    })
    .catch(erro => {
      return erro.response.data
    })
}

export async function downloadTermo(codigoParcelamento: number): Promise<any> {
 
  return BaseApi.get('/termo-acordo/parcelamento/download', 
    { params: { codigoParcelamento }, 
      responseType: 'blob'})
      .then(response => {
          let contentHeader = response.headers['content-disposition'];
          let contentHeaderFileName = contentHeader.split(';')[1];
          contentHeaderFileName = contentHeaderFileName.replace('filename=', '').trim();

          const blob = new Blob([response.data], {
            type: 'application/pdf',
          });
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = contentHeaderFileName;
          a.click();
      })
      .catch(erro => {
        return erro.response.data
      })
}