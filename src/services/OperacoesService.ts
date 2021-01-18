
import { validarCpf, validarCnpj, RetornoValidacao } from '../utils/ValidacaoUtils'

import { removerMascaraDocumento } from '../utils/Mascaras'

export function validarDocumentos(documentoCliente: string, documentoEmpresa: string): RetornoValidacao{
    let retornoValidacao = {
      valido: true,
      mensagem: ''
    };  
    let retornoValidacaoDocumentoCliente = validarDocumento(documentoCliente);
    if(!retornoValidacaoDocumentoCliente){
      retornoValidacao.valido = false;
      retornoValidacao.mensagem = 'O CPF/CNPJ informado do Cliente é inválido.';
      return retornoValidacao;
    }
    let retornoValidacaoDocumentoEmpresa = validarDocumento(documentoEmpresa);
    if(!retornoValidacaoDocumentoEmpresa){
      retornoValidacao.valido = false;
      retornoValidacao.mensagem = 'O CPF/CNPJ informado da Empresa de Cobrança é inválido.';
      return retornoValidacao;
    }
    return retornoValidacao;
}

function validarDocumento(doc: string): boolean{
    let documento = removerMascaraDocumento(doc);
    let documentoValido = true;
    if(null != documento && documento !== ""){
      if(documento.length <= 11){
        documentoValido = validarCpf(documento);
      }else{
        documentoValido = validarCnpj(documento);
      }
    }
    return documentoValido;
}

export function validarPeriodo(dataInicial: Date, dataFinal: Date): RetornoValidacao{
    let retornoValidacao = {
      valido: true,
      mensagem: ''
    };
    if(dataInicial === undefined || dataFinal === undefined){
      retornoValidacao.valido = false;
      return retornoValidacao;
    }
    if(dataInicial > dataFinal){
      retornoValidacao.mensagem = 'Data inicial é maior que a data final selecionada.';
      retornoValidacao.valido = false;
      return retornoValidacao;
    }

    if(dataFinal < dataInicial){
      retornoValidacao.mensagem = 'Data final menor que a data inicial.';
      retornoValidacao.valido = false;
      return retornoValidacao;
    }
    return retornoValidacao;
}