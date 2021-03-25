import { Table, message, Button } from "antd";
import Column from "antd/lib/table/Column";
import { Component } from "react";
import PessoaDataService from "../Services/PessoaDataService";

export default class ListaPessoas extends Component{

    constructor(props){
      super(props)
      this.state={
        pessoas:[],
        message:null

      }
    }
    componentDidMount(){
      this.refreshPessoas();
      
    }
    refreshPessoas(){
      PessoaDataService.retriveAllPessas()
      .then(
        response =>{
          console.log(response);
          this.setState({pessoas: response.data})
        }
      )
      
    }
   
    success = (record)=>{
      if(record.isVacinada){
        record.isVacinada=false;
      }else record.isVacinada=true;
        PessoaDataService.updatePessoa(record, record.codigo)
        message.success('Status alterado com sucesso!')
        this.setState(record)
      }
    render(){
      return(
        <div className="container">
          <br/>
          <h2>PESSOAS CADASTRADAS</h2>
          <br/>
          <div className="container">
            <Table  dataSource={this.state.pessoas} bordered>
              <Column title="Nome" dataIndex ="nome" key="nome"/>
              <Column title="IDADE" dataIndex ="idade" key="idade"/>
              <Column title="CPF" dataIndex ="cpf" key="cpf"/>
              <Column title="TELEFONE" dataIndex ="telefone" key="telefone"/>
              <Column title="EMAIL" dataIndex ="email" key="email"/>
              <Column title="VACINADA" dataIndex ="isVacinada" key="isVacinada" 
              render={(text,record)=>(<p>{String(record.isVacinada == 0 ? "Não": "Sim" )}</p>)}/>
              <Column title="ATUALIZAR" key="atualizar" 
              render={(text,record)=>(<Button onClick={()=>this.success(record)} type="primary">Alterar Status</Button>)}/>
            </Table>

          </div>
        </div>
      )
    }

 }
 