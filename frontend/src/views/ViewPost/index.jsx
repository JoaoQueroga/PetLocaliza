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

import {useNavigate, useLocation} from "react-router-dom";

export default function ViewPost() {

    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state

    const { logado } = useContext(ApiContext);

    const [posts, setPosts] = useState([]);
    const [carregando, setCarregando] = useState(false);

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

    return (
        <div className="view">
            <div className="timeline-container">
                <div className="timeline-c1">

                </div>
                <div className="timeline-c4">

                </div>
            </div>
        </div>
    );
}