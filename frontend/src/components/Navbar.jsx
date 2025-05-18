import React, {useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { getPayloadToken } from '../config/auth';

import { ApiContext } from '../context/contextApi';

import api from '../config/api';
import { login, logout } from '../config/auth';

import logo from '../assets/logo1.png'

import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

    const { logado, recarregar } = useContext(ApiContext);

    const [visibleRight, setVisibleRight] = useState(false);

    const [naoTemConta, setNaoTemConta] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [regiao, setRegiao] = useState(null);

    const [regioes, setRegioes] = useState([]);

    const [erro, setErro] = useState(null);

    const [painelPerfil, setPainelPerfil] = useState(false);

    useEffect(() => {
        getRegioes();
    }, []);

    
    function getRegioes() {
        api.get('/regiao/').then((res)=>{
            setRegioes(res.data);
        }).catch((error)=>{
            console.error(error)
        })
    }

    const selectedTemplate = (option) => {
        if (option) {
            return <div>{option.nome}</div>
        }
    };

    const optionTemplate = (option) => {
        return <div>{option.nome}</div>
    };

    function cadastrar() {
        setErro(null);
        let data = {
            "nome": nome,
            "email": email,
            "senha": senha,
            "regiao": regiao.id
        }
        api.post('/criar-usuario/', data).then((res)=>{
            if(res.data.token){
                login(res.data.token);
                setVisibleRight(false);
                recarregar();
            }
        }).catch((error)=>{
            setErro(error.response?.data?.message ?? "Ocorreu um erro ao criar a sua conta")
        }).finally(()=>{
            recarregar();
        })
    }

    function entrar() {
        setErro(null);
        let data = {
            "email": email,
            "senha": senha
        }
        api.post('/login/', data).then((res)=>{
            if(res.data.token){
                login(res.data.token);
                setVisibleRight(false);
                recarregar();
            }
        }).catch((error)=>{
            setErro(error.response?.data?.message ?? "Ocorreu um erro ao entrar")
        }).finally(()=>{
            recarregar();
        })
    }

    function desabilitaCadastro() {
        if(nome && regiao && email && senha) return false
        return true
    }

    function sair() {
        logout();
        recarregar();
        setPainelPerfil(false);
    }

    return (
        <div className="navbar">
            <div className="navbar-c1">
                <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                   <img src={logo} alt="Localiza Pet Logo" style={{height: "80%", cursor: "pointer"}} onClick={()=>navigate("/")}/>
                </div>
                <div>
                    {
                        logado ?
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "15px"}}>
                                <p>{getPayloadToken().nome}</p>
                                <Button icon="pi pi-user" rounded severity="info" aria-label="User" className="btn-1 btn-rounded" onClick={()=>setPainelPerfil(true)}/>
                            </div>
                        : 
                            <Button label="Fazer o Login" size="small" className="btn-1" onClick={() => setVisibleRight(true)}/>
                    }
                </div>
            </div>
            <div className="navbar-c2">
            </div>
            <Sidebar visible={painelPerfil} position="right" onHide={() => setPainelPerfil(false)} style={{width: "400px"}}>
                <div className="slide-perfil">
                    <p><b>{getPayloadToken().nome}</b></p>
                    <p>{getPayloadToken().email}</p>
                    <Button label="Sair" size="small" className="btn-2" onClick={sair} style={{marginTop: "30px"}}/>
                </div>
            </Sidebar>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} style={{width: "400px"}}>
                <div className="login-main">
                    {
                        naoTemConta ?
                        <div>
                            <h2>Crie a sua conta</h2>
                            <div className='input-grupo'>
                                <div>Nome</div>
                                <InputText value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div className='input-grupo'>
                                <div>Região</div>
                                <Dropdown 
                                    value={regiao} 
                                    onChange={(e) => setRegiao(e.value)} 
                                    options={regioes} 
                                    optionLabel="nome"
                                    filter
                                    valueTemplate={selectedTemplate}
                                    itemTemplate={optionTemplate}
                                />
                            </div>
                            <div className='input-grupo'>
                                <div>E-mail</div>
                                <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='input-grupo'>
                                <div>Senha</div>
                                <Password value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask feedback={false}/>
                            </div>
                            <div className='button-grupo'>
                                <Button label="Cadastrar" className='btn-1' disabled={desabilitaCadastro()} onClick={cadastrar}/>
                            </div>
                        </div>
                        :
                        <div>
                            <h2>Faça o login</h2>
                            <div className='input-grupo'>
                                <div>E-mail</div>
                                <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='input-grupo'>
                                <div>Senha</div>
                                <Password value={senha} onChange={(e) => setSenha(e.target.value)} toggleMask feedback={false}/>
                            </div>
                            <div className='button-grupo'>
                                <Button label="Entrar" className='btn-1' onClick={entrar}/>
                            </div>
                        </div>
                    }
                    
                    <div className='button-grupo' style={{marginTop: "40px"}}>
                            <Button 
                                label={ naoTemConta ? "Já tenho uma conta" : "Criar uma conta" } 
                                severity="secondary" 
                                text 
                                onClick={()=>setNaoTemConta(!naoTemConta)}
                                className='btn-txt'
                            />
                    </div>

                    {
                        erro ?
                            <div className='div-error'>
                                {erro}
                            </div>
                        :null
                    }
                </div>
            </Sidebar>
        </div>
    );
}