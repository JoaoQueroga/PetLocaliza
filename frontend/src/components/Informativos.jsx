import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import api from "../config/api";
function Informativos() {
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        carregarMensagens();
    }, []);

    function carregarMensagens() {
        api.get('/mensagem-sistema/')
        .then((res) =>{
            setMensagens(res.data);
        }).catch((erro) =>{
            console.error(erro)
        })
    }
    return (
        <div style={{width: "100%", height: "100%", overflow: "auto"}}>
            <div style={{height: "8%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <p>Informativos PetLocaliza</p>
            </div>
            <div>
                {
                    mensagens.map((m, index)=>(
                        <p key={index} style={{fontSize: "15px", padding: "0px 10px 20px 10px", color: "#787e75"}}><i>"{m.texto}"</i></p>
                    ))
                }
            </div>
            <div style={{textAlign: "center", padding: "10px"}}>
                <Button label="Atualizar" severity="secondary" text onClick={carregarMensagens}/>
            </div>
        </div>
    );
}

export default Informativos;