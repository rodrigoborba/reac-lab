import React, {useState, useEffect } from "react";
import { IconButton, Tooltip, TextField, Typography, ListItem, ListItemIcon, Checkbox, ListItemText, Accordion, 
    AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, FormControl, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from "date-fns/locale/pt-BR";
import { consultarOperacoesPorFiltro, downloadAudios, downloadTermo } from '../../providers/OperacoesProviders'
import OperacaoTO from '../../models/OperacaoTO' 
import { textMaskCPF, textMaskCNPJ, removerMascaraDocumento, formatarDocumento, gerarMascaraOperacao, capitalizarTexto } from '../../utils/Mascaras';
import { validarDocumentos, validarPeriodo } from '../../services/OperacoesService'
import { converterParaFormatoBrasil } from '../../utils/DateUtils'
import Info from '../../constants/info';
import List from "@material-ui/core/List/List";
import { Link } from 'react-router-dom';
import { StateListarOperacoes } from './Interfaces'
import { useStyles } from './OperacoesStyled' 

import Fieldset from '../../Components/FieldSet'
import Row from '../../Components/Row'
import Col from '../../Components/Col'
import Load from "../../Components/Load";
import Page from "../../Components/Page";

export default function ListarOperacoes(props: any) {

  const classes = useStyles();

  const [values, setValues] = React.useState<StateListarOperacoes>({
    etapaOperacao: 'TODOS', situacaoNegociacao: '', formaPagamento: '', operacaoCliente: '', documentoCliente: '', documentoEmpresa: '', nomeCliente: '', nomeEmpresa: '',
  });

  const [data, setData] = useState<OperacaoTO[]>([])
  const [documentoCliente, setDocumentoCliente] = useState('');
  const [documentoEmpresa, setDocumentoEmpresa] = useState('');
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [exibirLoad, setExibirLoad] = useState(false);
  const [exibirMensagemInfo, setExibirMensagemInfo] = useState('')
  const [exibirModalInfo, setExibirModalInfo] = useState(false)
  const [errors, setErrors] = useState({ dataInicial: '', dataFinal: '' });
  const [deleteState, setDeleteState] = useState(false);
  const [checkedStatus, setCheckedStatus] = React.useState([0]);
  const [openListStatus, setOpenListStatus] = React.useState(false);

  const handleChange = (name: keyof StateListarOperacoes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
              ...values,
              [name]: event.target.value,
      });
  };

  const handleChangeOperacao = (e: any) => {
    if(deleteState){
      setDeleteState(false)
      return
    }
    let valor = e.currentTarget.value
    valor = gerarMascaraOperacao(valor)
    setValues({
      ...values,
      operacaoCliente: valor,
    });
  };

  const handleKeyOperacao = (e: any) => {
    if (e.keyCode === 8) {
        let valorAtual = e.target.value;
        if(valorAtual.length > 0 && '.' === valorAtual[valorAtual.length-1]){
            let valorRemovido = valorAtual.substring(0, valorAtual.length - 1);
            setValues({
              ...values,
              operacaoCliente: valorRemovido,
            });
            setDeleteState(true)
        }
    }
  };

  const handleChangeDataInicial = (e: any) => {
    setDataInicial(e);
  };

  const handleChangeDataFinal = (e: any) => {
    setDataFinal(e);
  };

  const handleChangeDocumentoCliente = (e: any) => {
    setDocumentoCliente(e.currentTarget.value);
  };

  const handleChangeDocumentoEmpresa = (e: any) => {
    setDocumentoEmpresa(e.currentTarget.value);
  };

  const handleToggleStatus = (value: number) => () => {
    const currentIndex = checkedStatus.indexOf(value);
    const newChecked = [...checkedStatus];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedStatus(newChecked);
  };

  const handleChangeAccordion = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setOpenListStatus(isExpanded);
  };

  function handleChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    // console.log((event.target as HTMLInputElement).value)
    let valorAtual = event.target.value;
    if('REALIZADA' !== valorAtual && 'etapaOperacao' === event.target.name){
      setValues({
        ...values,
        [event.target.name]: valorAtual,
        situacaoNegociacao: '',
        formaPagamento: '',
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: valorAtual,
      });
    }
  }

  useEffect(() => {
  }, [])

  const validacaoCamposObrigatorios = () => {
      let temp = { dataInicial: "", dataFinal: "" }
      temp.dataInicial = dataInicial ? "" : Info.CAMPO_OBRIGATORIO 
      temp.dataFinal = dataFinal ? "" : Info.CAMPO_OBRIGATORIO
      setErrors({
          ...temp
      })
      return Object.values(temp).every(item => item === "")
  }

  function efetuarValidacoes(){
     if(!validacaoCamposObrigatorios()){
        return false;
     }
     let retornoValidacaoDocumento = validarDocumentos(documentoCliente, documentoEmpresa)
     if(!retornoValidacaoDocumento.valido){
      setExibirMensagemInfo(retornoValidacaoDocumento.mensagem)
     }
     let retornoValidacaoPeriodo = validarPeriodo(dataInicial, dataFinal);
     if(!retornoValidacaoPeriodo.valido){
       setExibirMensagemInfo(retornoValidacaoPeriodo.mensagem)
     }
     if(!retornoValidacaoDocumento.valido || !retornoValidacaoPeriodo.valido){
        setExibirModalInfo(true)
        return false;
     }
     return true;
  }

  async function handleGet() {
      if(efetuarValidacoes()){
        setOpenListStatus(false)
        setExibirLoad(true)
        try {
          await consultarOperacoesPorFiltro(
                    dataInicial, dataFinal, documentoCliente, values.operacaoCliente, values.nomeCliente, values.nomeEmpresa, documentoEmpresa, checkedStatus
                    )
            .then((response) => {
              const lista = response
              const data: any[] = [];
              
              if(lista != null){
                lista.map(
                  (
                    x: {  operacaoCliente: any; cliente: any; statusParcelamento: any; nomeEmpresaTerceirizada: string; dataParcelamento: Date;
                      codigoOperacaoLote: number; codigoParcelamento: number; }
                  ) => data.push(
                          { 
                            'operacao': x.operacaoCliente,
                            'documentoCliente': formatarDocumento(x.cliente.documento),
                            'nomeCliente': x.cliente.nomeCliente,  
                            'statusParcelamento': x.statusParcelamento, 
                            'nomeEmpresa': capitalizarTexto(x.nomeEmpresaTerceirizada), 
                            'dataParcelamento': converterParaFormatoBrasil(x.dataParcelamento),
                            'codigoOperacaoLote': x.codigoOperacaoLote, 
                            'codigoParcelamento': x.codigoParcelamento, 
                          }
                        )
                );
              }
              setData(data)
              setExibirLoad(false)
            })
        } catch (error) {
            setExibirLoad(false)
            setData([])
            console.log(error);
            tratarErro(error);
        }   
      }
      
  }

  function tratarErro(error : any){
    if(error.response && error.response.status){
      if(error.response.status !== 404){
        setExibirMensagemInfo(Info.ERRO_DESCONHECIDO)
        setExibirModalInfo(true)
      }
    }else{
      setExibirMensagemInfo(Info.ERRO_DESCONHECIDO)
      setExibirModalInfo(true)
    }
  }

  function retornarMascara(documento: any) {
      let conteudoDocumento = removerMascaraDocumento(documento);
      if(conteudoDocumento.length > 11) {
        return { inputComponent: textMaskCNPJ as any }
      }else{
        return { inputComponent: textMaskCPF as any }
      }
  }

  async function download(codigoLoteOperacao: number){
    setExibirLoad(true)
    await downloadAudios(codigoLoteOperacao);
    setExibirLoad(false)
  }

  async function downloadTermoParcelamento(codigoParcelamento: number){
    setExibirLoad(true)
    await downloadTermo(codigoParcelamento);
    setExibirLoad(false)
  }

  function linhaComParcelamento(rowIndex: number): boolean{
    return null != data[rowIndex].codigoParcelamento
  }

  // function handleChange3(event: React.ChangeEvent<HTMLInputElement>) {
  //   setValue((event.target as HTMLInputElement).value);
  // }

  const listaStatusParcelamento: any = [
    'Aguardando pagamento da amortização prévia', 'Parcelamento ativo', 'Quebra de acordo', 'Parcelamento finalizado',
  ]

  function createRow(descricao: string, valor: string) {
    return { descricao, valor};
  }

  const situacoesNegociacaoMap = [
    createRow('Aguardando pagamento da amortização prévia', '1'),
    createRow('Parcelamento ativo', '2'),
    createRow('Quebra de acordo', '3'),
    createRow('Parcelamento finalizado', '4'),
  ];

  const columns: any = [
    {
      name: "operacao",
      label: "Operação",
      options: {
        filter: false,
        align: 'right',
        customBodyRender: (value: any, tableMeta: { rowData: any, rowIndex: any }, updateValue: any) => {
          return (
             linhaComParcelamento( tableMeta.rowIndex ) ?
              <div>
                  <Link to={'/detalheNegociacao/Negociacao/' + data[tableMeta.rowIndex].codigoParcelamento }>         
                    {value}
                  </Link>
              </div>
              : <div> {value} </div>
            
          );
        }
      }
    },
    {
      name: "documentoCliente", label: "CPF/CNPJ", options: { filter: false,}
    },
    {
      name: "nomeCliente", label: "Nome", options:{ filter: false, }
    },
    {
      name: "statusParcelamento", label: "Status", options: { filter: false,}
    },
    {
      name: "nomeEmpresa", label: "Empresa", options: { filter: false, }
    },
    {
      name: "dataParcelamento", label: "Data Parcelamento", options: { filter: false,}
    },
    {
      name: "Áudio",
      options: {
        filter: false,
        customBodyRender: (value: any, tableMeta: { rowData: any,  rowIndex: any }, updateValue: any) => {
          return (
            linhaComParcelamento(tableMeta.rowIndex) ?
              
              <div>
                <Tooltip title={"Download"}>
                  <IconButton onClick={() => {
                    download(data[tableMeta.rowIndex].codigoOperacaoLote )
                    }}>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
              </div>
              :
              <div></div>         
            
            
          );
        }
      }
    },
    {
      name: "Termo",
      options: {
        filter: false,
        customBodyRender: (value: any, tableMeta: { rowIndex: any; }, updateValue: any) => {
          return (
            linhaComParcelamento(tableMeta.rowIndex) ?
            <div>
                <Tooltip title={"Download"}>
                  <IconButton onClick={() => {
                    downloadTermoParcelamento(data[tableMeta.rowIndex].codigoParcelamento)
                    }}>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
            </div>
             :
             <div></div>    
          );
        }
      }
    },
  ];

  const options: any = {
    filterType: 'none', responsive: 'scrollFullHeight', selectableRowsHeader: false, search: false, download: false, print: false, filter:false, viewColumns:false,
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado", toolTip: "Sort",
      },
      pagination: {
        next: "Próxima página", previous: "Página Anterior", rowsPerPage: "Linhas por página:",  displayRows: "de",
      },
      filter: {
        all: "Tudo", title: "FILTROS", reset: "LIMPAR",
      },
    }
  };
    
  return (
    <div>
      <div className="divLoading" style={{display: exibirLoad ? 'block': 'none'}}> <Load /> </div>
      <div >
      <Page pagetitle="Listar Operações" history={props.history}>

            <Fieldset subtitle="Empresa">

               <Grid container spacing={3} > 
                <Grid item xs>
                  <TextField
                    id="documento-empresa"
                    label="CPF/CNPJ"
                    value={documentoEmpresa}
                    onChange={handleChangeDocumentoEmpresa}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputProps={ retornarMascara(documentoEmpresa) }
                    />
                </Grid>
                <Grid item xs={1} className={classes.periodo} >
                  <Typography  variant="inherit" >
                     Período Carteira
                  </Typography>
                </Grid>  
                <Grid item xs={3} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                                <KeyboardDatePicker
                                        id="mui-pickers-date-inicial"
                                        value={dataInicial}
                                        onChange={date =>handleChangeDataInicial(date)}
                                        inputVariant='outlined'
                                        format="dd/MM/yyyy"
                                        fullWidth
                                        error={'' !== errors.dataInicial}
                                        helperText={errors.dataInicial}
                                />
                        </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={1} className={classes.periodoArtigo} >
                  <Typography  variant="inherit" >
                     à
                  </Typography>
                </Grid>  
                <Grid item xs={3}>
                  
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                                <KeyboardDatePicker
                                        id="mui-pickers-date-final"
                                        value={dataFinal}
                                        onChange={date =>handleChangeDataFinal(date)}
                                        inputVariant='outlined'
                                        format="dd/MM/yyyy"
                                        fullWidth
                                        error={'' !==  errors.dataFinal}
                                        helperText={errors.dataFinal}
                                />
                        </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Row>  
                <Col sm={12}>
                  <TextField
                    id="nome-empresa"
                    label="Nome da Empresa"
                    value={values.nomeEmpresa}
                    onChange={handleChange('nomeEmpresa')}
                    variant="outlined"
                    fullWidth
                      />
                </Col>
              </Row> 

          </Fieldset>

          <div className={classes.quadroCliente}>
          <Fieldset subtitle="Cliente" >
              <Row>
                
                <Col sm={6}>
                  <TextField
                    id="documento-cliente"
                    label="CPF/CNPJ"
                    value={documentoCliente}
                    onChange={handleChangeDocumentoCliente}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputProps={ retornarMascara(documentoCliente) }
                    />
                </Col>
                <Col sm={6}>
                  <TextField
                    id="operacao"
                    label="Operação"
                    value={values.operacaoCliente}
                    onChange={handleChangeOperacao}
                    onKeyDown={handleKeyOperacao}
                    variant="outlined"
                    fullWidth
                    />
                </Col>
              </Row>  

              <Row>  
                <Col sm={12}>
                  <TextField
                    id="nome"
                    label="Nome do Cliente"
                    value={values.nomeCliente}
                    onChange={handleChange('nomeCliente')}
                    variant="outlined"
                    fullWidth
                      />
                </Col>
              </Row>

          </Fieldset>
          </div>

          <Fieldset subtitle="Negociação" >
            <Row> 
              <Col sm={12}>
              <RadioGroup row
                  arial-label="etapaOperacao"
                  name="etapaOperacao"
                  value={values.etapaOperacao}
                  onChange={handleChangeRadio}
                    >
                    <FormControlLabel value="TODOS" control={<Radio></Radio>} label="Todos"></FormControlLabel>
                    <FormControlLabel value="NAO_REALIZADA" control={<Radio></Radio>} label="Não Realizada"></FormControlLabel>
                    <FormControlLabel value="REALIZADA" control={<Radio></Radio>} label="Realizada"></FormControlLabel>
                      
                </RadioGroup>           
              </Col>
            </Row>  
          </Fieldset>            

          {values.etapaOperacao === 'REALIZADA'?
              <Grid container spacing={3} > 
                <Grid item xs>
                  <Fieldset subtitle="Status da Negociação" >   
                    <RadioGroup row
                      arial-label="situacaoNegociacao"
                      name="situacaoNegociacao"
                      value={values.situacaoNegociacao}
                      onChange={handleChangeRadio}
                        >
                            {situacoesNegociacaoMap.map((row) => (
                                <FormControlLabel value={row.valor} control={<Radio></Radio>} label={row.descricao}></FormControlLabel>
                              ))}
                    </RadioGroup> 
                  </Fieldset>            
                </Grid>

                <Grid item xs={3} >
                <Fieldset subtitle="Forma de Negociação" >   
                  <RadioGroup row
                      arial-label="Etapa"
                      name="formaPagamento"
                      value={values.formaPagamento}
                      onChange={handleChangeRadio}
                        >
                        <FormControlLabel value="A_VISTA" control={<Radio></Radio>} label="À Vista"></FormControlLabel>
                        <FormControlLabel value="PARCELADO" control={<Radio></Radio>} label="Parcelado"></FormControlLabel> 

                  </RadioGroup> 
                  </Fieldset>
                </Grid>  
              
              </Grid>
              :''
          }
          

          <Grid container spacing={0}>
            <Grid item xs={6}>

              <Accordion expanded={openListStatus} onChange={handleChangeAccordion('panel1')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >       
                    <Typography >Status do Parcelamento</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    <List component="div" disablePadding className={classes.root2}>
                      {[0, 1, 2, 3].map((value: any) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (

                            <ListItem key={value} role={undefined} dense button onClick={handleToggleStatus(value)}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checkedStatus.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} 
                                primary={
                                  <Typography className={classes.textoStatus}>
                                    {listaStatusParcelamento[value]}
                                  </Typography>
                                  } />
                            </ListItem>

                        );
                      })}
                    </List> 

                  </AccordionDetails>
              </Accordion>  

            </Grid>
            
            <Grid item xs={4}/>

            <Grid item xs={2} className={classes.botaoPesquisa}>
              <Button variant='outlined' color='secondary' onClick={()=> handleGet()} >
                <SearchIcon />
                  Pesquisar
              </Button>
            </Grid>
          </Grid>          

        <MUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />
      </Page>
      </div>

      {/*  <Message
            exibir={exibirModalInfo}
            tipoErro
            setExibir={setExibirModalInfo}
            mensagem={exibirMensagemInfo} /> */}
    </div> 
  );
}
