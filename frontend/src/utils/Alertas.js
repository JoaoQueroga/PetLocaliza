import Swal from "sweetalert2";

class Alertas{

    static sucesso(msg) {
        Swal.fire({
            icon:'success',
            title:"Sucesso",
            text: msg,
            confirmButtonText: 'Fechar',
        });
    }

    static erro(msg) {
        Swal.fire({
            icon:'error',
            title:"Erro",
            text: msg,
            allowOutsideClick: false,
            confirmButtonText: 'Fechar',
        });
    }

    static erroHTML(msg) {
        Swal.fire({
            icon:'error',
            title:"Erro",
            html: msg,
            allowOutsideClick: false,
            confirmButtonText: 'Fechar',
        });
    }

    static cuidado(msg) {
        Swal.fire({
            icon:'warning',
            title:"Cuidado",
            text: msg,
            allowOutsideClick: false,
            confirmButtonText: 'Fechar',
        });
    }

    static atencao(msg) {
        Swal.fire({
            icon:'warning',
            title:"Atenção",
            text: msg,
            allowOutsideClick: false,
            confirmButtonText: 'Fechar',
        });
    }

    static informacao(msg) {
        Swal.fire({
            icon:'info',
            title:"Informação",
            text: msg,
            allowOutsideClick: false,
            confirmButtonText: 'Fechar',
        });
    }

    static confirmacao(msg, funcao) {
        Swal.fire({
            icon:'question',
            text: msg,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            reverseButtons: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                funcao();
            }
        })
    }

    static sucesso_acao(msg, funcao) {
        Swal.fire({
            icon:'success',
            title:"Sucesso",
            text: msg,
            confirmButtonText: 'Ok',
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                funcao();
            }
        })
    }

    static atencao_logout(msg, funcao) {
        Swal.fire({
            icon:'warning',
            title:"Atenção",
            text: msg,
            confirmButtonText: 'Fazer login novamente',
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                funcao();
            }
        })
    }

    static toast_sucesso(msg){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
        icon: 'success',
        text: msg
        })
    }

    static toast_erro(msg){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
        icon: 'error',
        text: msg
        })
    }

    static toast_cuidado(msg){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
        icon: 'warning',
        text: msg
        })
    }

    static toast_informacao(msg){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
        icon: 'info',
        text: msg
        })
    }
}

export default Alertas;