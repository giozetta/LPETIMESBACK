
-- criação da tabela prédios
create table times (
	codigo serial primary key, 
	nome varchar(40) not null, 
	cidade varchar(40) not null 
);

-- inserindo registros na tabela prédios
insert into times (nome, cidade) 
values ('Gremio', 'Porto Alegre');


-- criação da tabela salas
create table jogadores (
	codigo serial primary key, 
	nome varchar(40) not null, 
	idade integer not null, 
	altura integer not null,
	time integer not null, 
	foreign key (time) references times (codigo)
);

-- inserindo alguns registros na tabela salas
insert into jogadores (nome, idade, altura, time) 
values ('Diego Souza', 37, 186, 1);

-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao'),
('giovanipinzetta23@gmail.com', '96557800', 'A', '(54)99984-0066', 'gipox');