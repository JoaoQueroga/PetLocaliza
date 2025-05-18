import React, { createContext, useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import { getUserId } from '../config/auth';
//contexto
export const ApiContext = createContext();

//provedor
export default function ApiProvider({ children }) {

  const [logado, setLogado] = useState(false);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if(getUserId()){ 
      setLogado(true);
    }else{
      setLogado(false);
    }
  }, [reload]);

  function recarregar() { setReload(!reload) }

  return (
    <ApiContext.Provider
      value={{
        logado,
        recarregar
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}