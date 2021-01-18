
//converter para padrão ISO 8601 (yyyy-MM-dd)
export function converterParaISO8601(data: Date): string {
    if(undefined === data){
      return 'undefined';
    }
    let mes = '' + (data.getMonth() + 1);
    let dia = '' + data.getDate();
    let ano = data.getFullYear();

    if (mes.length < 2){
      mes = '0' + mes;
    } 
    if (dia.length < 2) {
        dia = '0' + dia;
    }

    return [ano, mes, dia].join('-');
}

export function converterParaFormatoBrasil(data: Date): string {
    return converterParaFormatoBrasilDigitoAno(data, 4);
}

export function converterParaFormatoBrasilDigitoAno(data: Date, digitosAno: number): string {
    if(undefined === data){
      return 'undefined';
    }
    let validarFormatado = data.toString();
    if(validarFormatado.includes('[UTC]')){
      validarFormatado = validarFormatado.replace('[UTC]', '');
      data = new Date(validarFormatado);
      let offset = data.getTimezoneOffset();
      offset *= 60000;
      data = new Date(data.valueOf() + offset);
    }
    let mes = '' + (data.getMonth() + 1);
    let dia = '' + data.getDate();
    let ano = '' + data.getFullYear();
    if(digitosAno < 4 && digitosAno > 1){
      ano = ano.substring(digitosAno, 5);
    }

    if (mes.length < 2){
      mes = '0' + mes;
    } 
    if (dia.length < 2) {
        dia = '0' + dia;
    }

    return [dia, mes, ano].join('/');

}

export function converterDescricaoParaHoras(data: Date): string {
    if(undefined === data){
      return 'undefined';
    }
    let hora = data.getHours();
    let minuto = data.getMinutes() < 10 ? "0" + data.getMinutes(): data.getMinutes();
    let segundo = data.getSeconds() < 10 ? "0" + data.getSeconds(): data.getSeconds();

    return [hora, minuto, segundo].join(':');

}

export function descricaoDataComHorarioBrasil(data: Date): string{
    if(undefined === data){
      return 'undefined';
    }
    return converterParaFormatoBrasil(data) + " " + converterDescricaoParaHoras(data);
}

export function descricaoDataComHorarioBrasilDigitoAno(data: Date, digitosAno: number): string{
    if(undefined === data){
      return 'undefined';
    }
    return converterParaFormatoBrasilDigitoAno(data, digitosAno) + " " + converterDescricaoParaHoras(data);
}