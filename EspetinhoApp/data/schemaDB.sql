CREATE TABLE MESAS (
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE PRODUTOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image BLOB,
    valor DECIMAL(20,2),
    nome TEXT
);

CREATE TABLE PEDIDOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATETIME,
    situacao TEXT CHECK(situacao IN ('ABERTO', 'PAGO', 'CANCELADO'))
);

CREATE TABLE PEDIDOITEM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produto INTEGER,
    id_pedido INTEGER,
    quantidade INTEGER,
    valor DECIMAL(20,2),--tem que tirar esse valor
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id)
);

--mesa
INSERT INTO MESA DEFAULT VALUES;
DELETE FROM MESA
    WHERE id = (SELECT MAX(id) FROM MESA);
SELECT COUNT(*) AS total_mesas FROM MESA;

--Produtos
INSERT INTO PRODUTO (image, valor, nome)
    VALUES (?, ?, ?);
SELECT * FROM PRODUTO WHERE id = 1;
UPDATE PRODUTO
    SET nome = 'Pepsi 2L', valor = 27.90
    WHERE id = 1;
DELETE FROM PRODUTO WHERE id = 1;

---pedidoItem
INSERT INTO PEDIDO (data, situacao)
    VALUES (CURRENT_TIMESTAMP, 'ABERTO');
--pega o id do pedidomais recente
SELECT last_insert_rowid();

INSERT INTO PEDIDOITEM (id_produto, id_pedido, quantidade, preco)
    VALUES (?, ?, ?, ?);

