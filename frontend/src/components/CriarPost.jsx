import { useState, useContext } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { getUserId } from "../config/auth";
import api from "../config/api";

export default function PostForm (props) {
    const [preview, setPreview] = useState(null);
    const [painelCriar, setPainelCriar] = useState(false);

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [texto, setTexto] = useState("");

    const tipos = [
        {"id": 1, "nome": "Animal desaparecido" },
        {"id": 2, "nome": "Animal encontrado" },
        {"id": 3, "nome": "Quero doar um animal" },
        {"id": 4, "nome": "Quero adotar um animal" },
        {"id": 5, "nome": "Quero divulgar meus servirços" }
    ]

    function publicar() {
        const formData = new FormData();
        if (tipo === null){
            window.alert("erro selecione tipo");
            return;
        }

        formData.append("tipo", tipo.id);
        formData.append("usuario", getUserId());
        formData.append("titulo", nome);
        formData.append("texto", texto);
        formData.append("ativo", true);
        if (imagem) {
            formData.append("imagem", imagem);
        }

        api.post('post/', formData)
        .then(()=>{
            setPainelCriar(false);
            props.carregar();
        })
    };

    function cancelarPost() {
        setPainelCriar(false);
        setImagem(null);
        setNome("");
        setTexto("");
        setPreview(null);
        setTipo(null);
    }

    const selectedTemplate = (option) => {
        if (option) {
            return <div>{option.nome}</div>
        }
    };

    const optionTemplate = (option) => {
        return <div>{option.nome}</div>
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImagem(file);
          setPreview(URL.createObjectURL(file)); // Gera URL para a prévia
        }
    };

    return (
        <div>
            {
                painelCriar ?
                <div className="criar-post-form">
                    <div className="criar-post-inputs">
                        <div className='input-grupo'>
                            <div>Qual o motivo?</div>
                            <Dropdown 
                                value={tipo} 
                                onChange={(e) => setTipo(e.value)} 
                                options={tipos} 
                                optionLabel="nome"
                                valueTemplate={selectedTemplate}
                                itemTemplate={optionTemplate}
                            />
                        </div>
                        <div>
                            <Button icon="pi pi-image" label="Escolher uma imagem" className='btn-3' onClick={() => document.getElementById("fileInput").click()} />
                            {preview && (
                                <img 
                                    src={preview} 
                                    alt="Prévia" 
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", marginLeft: "10px" }} 
                                />
                            )}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }} // Oculta o input padrão
                            />
                        </div>
                        <div className='input-grupo'>
                            <div>Qual o nome do animal? (Opcional)</div>
                            <InputText value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className='input-grupo'>
                            <div>Escreva os detalhes aqui</div>
                            <InputTextarea value={texto} onChange={(e) => setTexto(e.target.value)}  style={{minHeight: "100px"}}/>
                        </div>
                    </div>
                    <div className="criar-post-bts">
                        <Button label="Cancelar" severity="warning" text style={{marginRight: "10px"}} onClick={cancelarPost} className='btn-txt'/>
                        <Button label="Publicar" className='btn-1' onClick={publicar}/>
                    </div>
                </div>
                // <form onSubmit={handleSubmit}>
                //     <input
                //         type="text"
                //         placeholder="Título"
                //         value={titulo}
                //         onChange={(e) => setTitulo(e.target.value)}
                //         required
                //     />
                //     <textarea
                //         placeholder="Texto"
                //         value={texto}
                //         onChange={(e) => setTexto(e.target.value)}
                //         required
                //     />
                //     <input
                //         type="file"
                //         accept="image/*"
                //         onChange={(e) => setImagem(e.target.files[0] || null)}
                //     />
                //     <button type="submit">Criar Post</button>
                // </form>
                :
                <div className="criar-post">
                    <Button label="Criar Publicação" className='btn-criar-publicacao' onClick={()=>setPainelCriar(true)}/>
                    <Button icon="pi pi-refresh" rounded severity="info" aria-label="User" className="btn-3 btn-rounded" onClick={()=>props.carregar()}/>
                </div>
            }
        </div>
        
    );
};
