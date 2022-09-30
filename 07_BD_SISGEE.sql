-- Criação da base por comando SQL
create database "SISGEE";

-- criação da tabela prédios
create table predios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

-- inserindo registros na tabela prédios
insert into predios (nome, descricao, sigla) 
values ('Predio 5', 'Predio da Computação', 'P5')
returning codigo, nome, descricao, sigla;

-- atualizando registros na tabela prédios
UPDATE predios SET  nome='Prédio 5', descricao='Prédio da computação', sigla='P5'
	WHERE codigo=1
returning codigo, nome, descricao, sigla;
	
-- removendo registros da tabela prédios
DELETE from predios where codigo = 9;

-- selecionando registros na tabela prédios
select codigo, nome, descricao, sigla from predios order by nome;

select codigo, nome, descricao, sigla 
from predios 
where codigo = 1 order by nome;

select codigo, nome, descricao, sigla 
from predios 
where nome like 'P%' order by nome;

-- criação da tabela salas
create table salas (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	predio integer not null, 
	foreign key (predio) references predios (codigo)
);

-- inserindo alguns registros na tabela salas
insert into salas (numero, descricao, capacidade, predio) 
values (511, 'Laboratório', 12, 1)
returning codigo, numero, descricao, capacidade, predio;

-- atualizando um registro na tabela salas 
UPDATE salas
	SET numero=301, descricao='Sala de aula da mecânica', capacidade=32, predio=2
	WHERE codigo=2
returning codigo, numero, descricao, capacidade, predio;
	
-- apagando registros 
delete from salas where codigo = 4;
	
-- selecionando registros na tabelas salas relacionando com o prédio
select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
order by s.numero;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.codigo = 1;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.numero = 511;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.predio = 1;
