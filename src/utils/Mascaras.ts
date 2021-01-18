import React from "react";
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}


export function gerarMascaraOperacao(valor: string){
        if(undefined === valor || '' === valor || '.' === valor){
                return '';
        }
        let separacaoValores = valor.split(".")

        let retorno = '';
        
        let quantidadeParametros = separacaoValores.length;
        let area = quantidadeParametros > 0 ? separacaoValores[0]: null;
        let agencia = quantidadeParametros > 1 ? separacaoValores[1]: null;
        let contrato = quantidadeParametros > 2 ? separacaoValores[2]: null;
        let ficha = quantidadeParametros > 3 ? separacaoValores[3]: null;

        if(null !== area){
                retorno = gerarPadraoCodigoAreaOperacao(area);
        }
        if(null !== agencia){
                retorno = gerarPadraoCodigoAgenciaOperacao(agencia, retorno); 
        }
        if(null != contrato){
                retorno = gerarPadraoCodigoContratoOperacao(retorno, contrato); 
        }
        if(null !== ficha){
                retorno = gerarPadraoNumeroFichaOperacao(retorno, ficha);
        }
        
        return retorno;
}

function gerarPadraoNumeroFichaOperacao(retornoParam: string, ficha: string) {
        let retorno = retornoParam
        if ('.' !== retorno[retorno.length - 1]) {
                retorno = retorno + '.'
        }
        const regexFicha = /[^(\d{1,2})]/g;
        ficha = ficha.trim().replace(regexFicha, '')
        if (ficha.length > 2) {
                ficha = ficha.substring(0, 2)
        }
        retorno = retorno + ficha;
        return retorno
}

function gerarPadraoCodigoContratoOperacao(retornoParam: string, contrato: string) {
        let retorno = retornoParam
        if ('.' !== retorno[retorno.length - 1]) {
                retorno = retorno + '.'
        }

        let prefixoContrato = contrato.trim().substring(0, 1)
        let contratoSemPrefixo = contrato.trim().substring(1, contrato.length)

        const regexPrefixoContrato = /[^[a-zA-Z]{1}]/g
        const regexContrato = /[^\d{9}]/g

        prefixoContrato = prefixoContrato.replace(regexPrefixoContrato, '')
        contratoSemPrefixo = contratoSemPrefixo.replace(regexContrato, '')

        contrato = prefixoContrato + contratoSemPrefixo

        if (contrato.length > 10) {
                contrato = contrato.substring(0, 10)
        }
        retorno = retorno + contrato
        if (contrato.length === 10) {
                retorno = retorno + '.';
        }
        return retorno
}

function gerarPadraoCodigoAgenciaOperacao(agencia: string, retornoParam: string) {
        const regexAgencia = /[^(\d{2,3})]/g
        agencia = agencia.trim().replace(regexAgencia, '')
        if (agencia.length > 3) {
                agencia = agencia.substring(0, 3)
        }
        let retorno = retornoParam
        retorno = retorno + agencia;
        if (agencia.length >= 2) {
                retorno = retorno + '.'
        }
        return retorno
}

function gerarPadraoCodigoAreaOperacao(area: string) {
        const regexArea = /[^(\d{1})]/g
        area = area.trim().replace(regexArea, '')
        if (area.length > 1) {
                area = area.substring(0, 1)
        }
        let retorno = area
        retorno = retorno + '.'
        return retorno
}

export function textMaskCPF(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (null
        //   <MaskedInput
        //           {...other}
        //           ref={(ref: any) => {
        //                 inputRef(ref ? ref.inputElement : null);
        //           }}
        //           mask={[/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
        //           placeholderChar={'\u2000'}
        //           showMask
        //   />
  );
}

export function textMaskCNPJ(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;
  
    return (null
        //     <MaskedInput
        //             {...other}
        //             ref={(ref: any) => {
        //                 if(ref){
        //                         let valorAtual = ref.inputElement.value;
        //                         valorAtual = removerMascaraDocumento(valorAtual);
        //                         if(valorAtual.length === 12){
        //                                 ref.inputElement.setSelectionRange(15,15);    
        //                         }
        //                         inputRef(ref.inputElement); 
        //                 }else{
        //                         inputRef(null)
        //                 }
        //            }}
        //             mask={[/\d/, /\d/,'.',/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/, '-',/\d/, /\d/]}
        //             placeholderChar={'\u2000'}
        //             showMask
        //     />
    );
}


export function removerMascaraDocumento(documento: string) {
        if(null !== documento){
                documento = documento
                                .replace(/\./g,'')
                                .replace(/\//g,'')
                                .replace(/-/g,'')
                                .trim();
        }
    return (
        documento
    );    
}


export function formatarDocumento(value: string) {
        value = value.toString();
        if(value.length > 11){
                if(value.length === 13){
                        value = "0" + value;        
                }
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{2})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1/$2")
        
        }else{
                if(value.length === 10){
                        value = "0" + value;        
                }
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        }
        
        return (
                value
        );    
}


export function formatarValorMoedaReal (valor: number): string {
        if(undefined === valor || null === valor){
                return "";       
        }
        if (valor < 0) {
                return `(${Math.abs(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})`
        }
        return `${valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
}

export function removerMascaraMonetaria(valor: any) {
    
        if(undefined ===valor){
                return undefined;       
        }
        
        valor = valor.replace(/[^0-9,]+/g, '');
        valor = valor.replace(/[,]+/g, '.');
        return Number(valor);
}

export function mascaraMonetaria(valor: string) {
    
        if(undefined === valor || null === valor){
                return undefined;       
        }
        valor = valor.toString(); 

        if(valor.slice(-1) === ',' || valor.slice(-1) === '.'){
                return valor;        
        }
        
        valor = valor.replace(/[^0-9,]+/g, '');
        valor = valor.replace(/[,]+/g, '.');
        let valorExtraido = Number(valor);
        let valorFormatado = undefined;
        try {
                valorFormatado = `${Math.abs(valorExtraido).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`        
        } catch (error) {
                return valor;
        }
        return valorFormatado; 
}
    
export function capitalizarTexto(valor: string){
        if(undefined === valor){
                return valor;        
        }
        let quebra = valor.toLowerCase().split(' ')
        return quebra.map(x=> x[0].toUpperCase()+ x.slice(1)).join(' ');
}



