import { test, expect } from '@playwright/test';

import { obterCodigo2FA } from '../support/db';

import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';



test('Não deverá logar ao digitar um código de autenticação inválido', async ({ page }) => {
  const user = {
    cpf: '00000014141',
    senha: '147258'
  };
  
  

  await page.goto('http://paybank-mf-auth:3000/');

  // Entrar com CPF
  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(user.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  // Preencher teclado virtual
  for (const digito of user.senha) {
    await page.getByRole('button', { name: digito }).click();
  }

  // Clicar no botão confirmar
  await page.getByRole('button', { name: 'Continuar' }).click();

  // Digitar código de autenticação inválido
  await page.getByRole('textbox', { name: '000000' }).fill('200276');
  await page.getByRole('button', { name: 'Verificar' }).click();

  // Verificar mensagem de erro
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});


test('Deverá logar na conta do usuário ao digitar um código de autenticação válido', async ({ page }) => {

  const loginPage = new LoginPage(page);//nova instancia da classe LoginPage
  const dashPage = new DashPage(page);
  
  const user = {
    cpf: '00000014141',
    senha: '147258'
  };
  
  //Acessar pagina
  await loginPage.acessaPagina();

  // Entrar com CPF
 await loginPage.informarCPF(user.cpf);

  // Preencher teclado virtual senha
  await loginPage.informarSenha(user.senha);

  //ESTRATEGIA DE CHECKPOINT
  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
    .waitFor({ timeout: 3000 });
 
  //await page.waitForTimeout(5000);//RETIRADO PARA OCODIGO ACIMA

   // Digitar código de autenticação inválido
  const codigo = await obterCodigo2FA(user.cpf);

  //Informar 2FA
  await loginPage.informar2FA(codigo);

await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');

});

