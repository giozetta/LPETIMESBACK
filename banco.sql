
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

