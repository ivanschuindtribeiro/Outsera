import { test, expect } from '@playwright/test';
import { UserClient } from '../../src/api/clients/userClient';

test.describe('API - Gestão de Usuários (CRUD Serverest)', () => {
  let userClient: UserClient;
  let createdUserId: string;
  const uniqueEmail = `qa.${Date.now()}@teste.com`;

  test.beforeEach(async ({ request }) => {
    userClient = new UserClient(request);
  });

  test('[POST] Criar usuário com sucesso - Positivo', async () => {
    const res = await userClient.createUser({
      nome: 'QA Engineer',
      email: uniqueEmail,
      password: 'teste@password123',
      administrador: 'true'
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeDefined();
    createdUserId = body._id;
  });

  test('[POST] Falhar ao cadastrar email duplicado - Negativo', async () => {
    const res = await userClient.createUser({
      nome: 'QA Duplicado',
      email: uniqueEmail,
      password: 'password123',
      administrador: 'false'
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe('Este email já está sendo usado');
  });

  test('[POST] Falhar ao enviar dados incompletos - Negativo', async () => {
    const res = await userClient.createUser({ nome: 'QA Sem Senha' });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.email).toBe('email é obrigatório');
    expect(body.password).toBe('password é obrigatório');
  });

  test('[GET] Buscar usuário existente por ID - Positivo', async () => {
    const res = await userClient.getUserById(createdUserId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(createdUserId);
  });

  test('[GET] Buscar usuário por ID inexistente - Negativo', async () => {
    const res = await userClient.getUserById('idInexistente123');
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe('Usuário não encontrado');
  });

  test('[PUT] Atualizar dados de usuário - Positivo', async () => {
    const res = await userClient.updateUser(createdUserId, {
      nome: 'QA Engineer Atualizado',
      email: uniqueEmail,
      password: 'novasenha@123',
      administrador: 'true'
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  test('[DELETE] Excluir usuário existente - Positivo', async () => {
    const res = await userClient.deleteUser(createdUserId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});