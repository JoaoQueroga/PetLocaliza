import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, {useState, useEffect, useContext} from 'react';
import api from '../../config/api';
import { urlFiles } from '../../config/api';
import { getToken, getUserId } from '../../config/auth';
import { ApiContext } from '../../context/contextApi';
import { Image } from 'primereact/image';

import pet_default from '../../assets/pet_default.jpg';

import PostForm from '../../components/CriarPost';

import img_r from '../../assets/img_r.png';
import img_n from '../../assets/img_n.png';

import { useNavigate } from 'react-router-dom';

export default function Timeline() {

    const { logado } = useContext(ApiContext);

    const [posts, setPosts] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        carregarPosts();
    }, []);

    function carregarPosts() {
        setCarregando(true);
        api.get('/post/')
        .then((res) =>{
            setPosts(res.data);
        }).catch((erro) =>{
            console.error(erro)
        }).finally(()=>setCarregando(false))
    }

    function ir_post(post) {
        navigate('/post', {state: post})
    }

    return (
        <div className="view">
            <div className="timeline-container">
                <div className="timeline-c1">

                </div>
                <div className="timeline-c2">
                {
                    logado ?
                    <div>
                        <PostForm carregar={carregarPosts}/>
                    </div>
                    :
                    <div className="criar-post">
                        <div>
                            <Button label="Criar Publicação" className='btn-criar-publicacao' disabled/>
                            <div className='text-info'>Faça o login para criar publicações</div>
                        </div>
                        <Button icon="pi pi-refresh" rounded severity="info" aria-label="User" className="btn-3 btn-rounded"/>
                    </div>
                }
                <div>
                    {posts.map((post) => (
                        <div key={post.id}  className="post" >
                            <div className='post-top'>
                                <div>
                                    <p style={{margin: "0px", fontWeight: "bold"}}>{post.usuario}</p>
                                    <p style={{margin: "0px", fontSize: "10px", fontWeight: "bold", color: "#787e75"}}>{post.criado_em}</p>
                                </div>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                                    <p style={{margin: "0px", fontWeight: "bold", textTransform: "uppercase"}}>{post.tipo}</p>
                                    {
                                        post.resolvido?
                                        <img src={img_r} alt="Resolvdo" style={{height: "30px"}}/>
                                        :
                                        <img src={img_n} alt="Não Resolvdo" style={{height: "30px"}}/>
                                    }
                                    
                                </div>
                            </div>
                            <div className='post-main'>
                                <div className='post-main-inf'>
                                    <div className='post-dados'>
                                        <label>nome</label> 
                                        <h4>{post.titulo || "Desconhecido"}</h4>
                                    </div>
                                    <div className='post-text'>
                                        {post.texto}
                                    </div>
                                </div>
                                <div className="image-container">
                                    {
                                        post.imagem ?
                                        <Image src={`${post.imagem}`} alt={post.titulo} preview width="300"/>
                                        :
                                        <Image src={pet_default} alt={post.titulo} preview width="300"/>
                                    }
                                </div>
                            </div>
                            <div className='post-footer'>
                                <Button 
                                    type="button" 
                                    label="Comentários" 
                                    icon="pi pi-comment" 
                                    outlined 
                                    badge="2"
                                    badgeClassName="p-badge-danger" 
                                    onClick={()=>ir_post(post)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                </div>
                <div className="timeline-c3">

                </div>
            </div>
        </div>
    );
}