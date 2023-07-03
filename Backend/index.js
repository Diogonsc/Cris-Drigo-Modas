const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const porta = 8080;

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

(async () => {
  const database = require("./db");
  const Produto = require("./produto");
  const Usuario = require("./usuario");
  const Cliente = require("./cliente");
  const { Op } = require("sequelize");
  await database.sync();

  //ROTA USUARIOS

  // Buscar todos usuarios
  app.use(express.json());
  app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.send(usuarios);
  });

  // Verificar as credenciais do usuário para efetuar login
  app.use(express.json());
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findAll({
      where: {
        email: email,
        password: password,
      },
      attributes: ["id", "name"],
    });

    if (usuario) {
      res.send(usuario);
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  });

  // Rota para criar um novo usuário
  app.use(express.json());
  app.post("/novousuario", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const novoUsuario = await Usuario.create({
        name: name,
        email: email,
        password: password,
      });

      res.send(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar novo usuário:", error);
      res.status(500).send("Erro ao criar novo usuário");
    }
  });

  // ROTA CLIENTES

  app.use(express.json());
  app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.send(clientes);
  });

  // Rota para criar um novo cliente
  app.use(express.json());
  app.post("/novocliente", async (req, res) => {
    try {
      const {
        name,
        email,
        telefone,
        cep,
        endereco,
        numero,
        bairro,
        valordevido,
      } = req.body;
      const novoCliente = await Cliente.create({
        name: name,
        email: email,
        telefone: telefone,
        cep: cep,
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        valordevido: valordevido,
      });

      res.send(novoCliente);
    } catch (error) {
      console.error("Erro ao criar novo cliente:", error);
      res.status(500).send("Erro ao criar novo cliente");
    }
  });


  // Rota para atualizar um cliente existente
  app.put("/cliente/:id", async (req, res) => {
    try {
      const clienteId = req.params.id;
      const {
        name,
        email,
        telefone,
        cep,
        endereco,
        numero,
        bairro,
        valordevido,
      } = req.body;

      const clienteAtualizado = await Cliente.update(
        {
          name: name,
          email: email,
          telefone: telefone,
          cep: cep,
          endereco: endereco,
          numero: numero,
          bairro: bairro,
          valordevido: valordevido,
        },
        {
          where: { id: clienteId },
        }
      );

      if (clienteAtualizado[0] === 0) {
        // Nenhum cliente foi encontrado com o ID fornecido
        return res.status(404).send("Cliente não encontrado");
      }

      res.send("Cliente atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      res.status(500).send("Erro ao atualizar cliente");
    }
  });


  // Rota para atualizar o valor devido de um cliente
  app.put("/cliente/:id/valordevido", async (req, res) => {
    try {
      const { id } = req.params;
      const { valordevido } = req.body;

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).send("Cliente não encontrado");
      }

      cliente.valordevido = valordevido;
      await cliente.save();

      res.send(cliente);
    } catch (error) {
      console.error("Erro ao atualizar valor devido do cliente:", error);
      res.status(500).send("Erro ao atualizar valor devido do cliente");
    }
  });

  // Rota para deletar um cliente
  app.use(express.json());
  app.delete("/deletecliente/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await Cliente.destroy({
        where: {
          id: id,
        },
      });

      res.send("Cliente deletado com sucesso.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro ao deletar o cliente.");
    }
  });

  

  // ROTA PRODUTOS

  app.use(express.json());
  app.get("/produtos", async (req, res) => {
    const produtos = await Produto.findAll();
    res.send(produtos);
  });

  // Rota para criar um novo produto
  app.use(express.json());
  app.post("/novoproduto", async (req, res) => {
    try {
      const { name, price, total, description } = req.body;
      const novoProduto = await Produto.create({
        name: name,
        price: price,
        total: total,
        description: description,
      });

      res.send(novoProduto);
    } catch (error) {
      console.error("Erro ao criar novo produto:", error);
      res.status(500).send("Erro ao criar novo produto");
    }
  });

  // Rota para deletar um produto
  app.use(express.json());
  app.delete("deleteproduto", async (req, res) => {
    await Produto.destroy({
      where: {
        id: id,
      },
    });
  });
})();
