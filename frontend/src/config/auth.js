export var autenticado = () => {
    if(localStorage.getItem("token")){
        return true
    }else{
        return false
    }
};

export const getToken = () =>{
    return localStorage.getItem("token");
};

export const getUserId = () =>{
    let token =  localStorage.getItem("token");
    if (token){
        const [ headerEncoded, payloadEncoded, signature] = token.split('.');
        const payload = JSON.parse(atob(payloadEncoded));
        return payload.id;
    }
    return null
};

export const getPayloadToken = () =>{
    let token =  localStorage.getItem("token");
    if (token){
        const [ headerEncoded, payloadEncoded, signature] = token.split('.');
        const payload = JSON.parse(atob(payloadEncoded));
        return payload;
    }
    return{"nome": "", "email": ""}
};

export const login = (token) => {
    const [ headerEncoded, payloadEncoded, signature] = token.split('.');
    const payload = JSON.parse(atob(payloadEncoded));
    
    if (payload.id) {
        localStorage.setItem("token", token);
        return true
    }
    return false
};

export const logout = () => { 
    localStorage.removeItem("token");
};