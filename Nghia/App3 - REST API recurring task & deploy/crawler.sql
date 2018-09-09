create database crawler

create table articles (
	id int auto_increment primary key,
	title varchar(255) not null,
	summary text not null,
	url varchar(255) not null,
	imageurl varchar(255) not null,
	category varchar(255) not null,
	pubdate date
)

insert into articles (title, summary, url, imageurl, category) values ('abc','abc','abc','abc','abc')
delete from articles where id = 1