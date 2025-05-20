import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, {useState, useEffect, useContext} from 'react';
import api from '../../config/api';
import { getToken, getUserId } from '../../config/auth';
import { ApiContext } from '../../context/contextApi';
import { Image } from 'primereact/image';

import pet_default from '../../assets/pet_default.jpg';
import img_r from '../../assets/img_r.png';
import img_n from '../../assets/img_n.png';

import {useNavigate, useLocation} from "react-router-dom";
import Informativos from '../../components/Informativos';

export default function ViewPost() {

    const navigate = useNavigate();
    const location = useLocation();
    const post_location = location.state.post
    const mode = location.state.mode

    const { logado } = useContext(ApiContext);

    const [comentarios, setComentarios] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [post, setPost] = useState(false);

    const [texto, setTexto] = useState("");

    useEffect(() => {
        carregarComentarios();
        carregarPost();
    }, []);

    function carregarPost() {
        setCarregando(true);
        api.get(`/post/${post_location.id}/`)
        .then((res) =>{
            setPost(res.data);
        }).catch((erro) =>{
            console.error(erro)
        }).finally(()=>setCarregando(false))
    }

    function carregarComentarios() {
        setCarregando(true);
        api.get(`/comentario/?post=${post_location.id}`)
        .then((res) =>{
            setComentarios(res.data);
        }).catch((erro) =>{
            console.error(erro)
        }).finally(()=>setCarregando(false))
    }

    function marcarResolvido(value) {
        api.patch(`/post/${post_location.id}/`, {resolvido: value})
        .then(() =>{
            carregarPost();
        }).catch((erro) =>{
            console.error(erro)
        })
    }

    function comentar() {
        if (texto.trim()){
            api.post(`/comentario/`, {post: post_location.id, usuario: getUserId(), texto: texto})
            .then((res) =>{
                setTexto("");
                carregarComentarios();
            }).catch((erro) =>{
                console.error(erro)
            })
        }
    }

    const bindBotaoEnter = (event) => {
        if (event.key === "Enter")
            comentar();
    }

    return (
        <div className="view">
            <div className="timeline-container">
                <div className="timeline-c1">
                    <Informativos/>
                </div>
                <div className="timeline-c4">
                    <div className="timeline-c4-post">
                        <div className='post-top-post'>
                            <div>
                                <p style={{margin: "0px", fontWeight: "bold"}}>{post?.usuario}</p>
                                <p style={{margin: "0px", fontSize: "10px", fontWeight: "bold", color: "#787e75"}}>{post?.criado_em}</p>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                                <p style={{margin: "0px", fontWeight: "bold", textTransform: "uppercase"}}>{post?.tipo}</p>
                                {
                                    mode !==2&&
                                    <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    {
                                        post?.resolvido?
                                        <img src={img_r} alt="Resolvdo" style={{height: "30px"}}/>
                                        :
                                        <img src={img_n} alt="Não Resolvdo" style={{height: "30px"}}/>
                                    }
                                    </span>
                                }
                            </div>
                            {
                                mode ===2&&
                                <div>
                                    {
                                        post?.resolvido?
                                            <Button label="Desmacar Resolvido" severity="success" icon="pi pi-check-circle" onClick={()=>marcarResolvido(false)}/>
                                        :
                                            <Button label="Marcar Resolvido" severity="danger" icon="pi pi-circle" onClick={()=>marcarResolvido(true)}/>
                                    }
                                </div>
                            }
                        </div>
                        <div className="image-container-post">
                            {
                                post?.imagem ?
                                <Image src={`${post?.imagem}`} alt={post?.titulo} preview width="500"/>
                                :
                                <Image src={pet_default} alt={post?.titulo} preview width="500"/>
                            }
                        </div>
                        <div className='post-main-post'>
                            <div className='post-main-inf-post'>
                                <div className='post-dados-post'>
                                    <label style={{fontSize:"10px"}}>nome</label> 
                                    <h4>{post?.titulo || "Desconhecido"}</h4>
                                </div>
                                <div className='post-text-post'>
                                    {post?.texto}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-c4-comentarios">
                        <div className="timeline-c4-comentarios-list">
                            <div className='comentarios-list-top'>
                                <p style={{margin: "0px"}}><b>{comentarios.length} Comentários</b></p>
                            </div>
                            <div className='comentarios-list-main'>
                                {
                                    comentarios.map((c, index)=>(
                                        <div className='post-comentario' key={index}>
                                            <p><b>{
                                                c.usuario ? 
                                                <span style={{color: "#16385B"}}>{c.usuario}</span> : 
                                                <span style={{color: "#EC7129"}}>Usuário Anônimo</span>
                                            } <span style={{fontSize: "10px", color: "#787e75"}}>{c.criado_em}</span> </b></p>
                                            <p style={{marginTop: "10px"}}>{c.texto}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="timeline-c4-comentarios-form">
                            <div style={{height: "50%"}} className="comentarios-form-input">
                                <InputText
                                    value={texto} 
                                    onChange={(e) => setTexto(e.target.value)}
                                    onKeyDownCapture={bindBotaoEnter}
                                    className="comentarios-form-input-txt"
                                    placeholder='Escreva um comentário aqui'
                                />
                            </div>
                            <div style={{height: "50%", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                <Button icon="pi pi-send" label="Comentar" className='btn-1' onClick={comentar}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}