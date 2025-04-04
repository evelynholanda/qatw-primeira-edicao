
export class LoginPage {
    //criar construção e recebe um argumento page edentro dele cria um objeto 
    //construtor é uma função que executada automaticamnete quando eu ativo essa classe dentro de um novo objeto
    constructor(page) {
        this.page = page    

    }

    async acessaPagina() {
        await this.page.goto('http://paybank-mf-auth:3000/')
    }

    async informarCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informarSenha(senha) {
        for (const digito of senha) {
            await this.page.getByRole('button', { name: digito }).click();
        }
        // Clicar no botão confirmar
            await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informar2FA(codigo) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    
}