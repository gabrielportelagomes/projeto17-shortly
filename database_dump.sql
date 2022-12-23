--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 1, 'https://g1.globo.com/mg/sul-de-minas/noticia/2022/12/23/estudante-de-escola-publica-de-pedralva-ganha-bolsa-de-r-2-milhoes-em-faculdade-nos-estados-unidos.ghtml', 'byABlp', 0, '2022-12-23 17:10:20.201525');
INSERT INTO public.urls VALUES (5, 2, 'https://g1.globo.com/ce/ceara/noticia/2022/12/23/justica-bloqueia-jatinho-de-r-37-milhoes-de-wesley-safadao.ghtml', 'kU-Gql', 1, '2022-12-23 19:35:54.19782');
INSERT INTO public.urls VALUES (7, 2, 'https://g1.globo.com/saude/noticia/2022/12/23/enfiou-o-pe-na-jaca-veja-o-que-fazer-para-curar-a-ressaca.ghtml', 'cznaEN', 1, '2022-12-23 19:39:20.244875');
INSERT INTO public.urls VALUES (6, 2, 'https://g1.globo.com/ro/rondonia/rondonia-rural/noticia/2022/12/23/saiba-a-diferenca-entre-peru-chester-e-tender-e-qual-e-a-melhor-opcao-na-ceia-de-natal.ghtml', 'eg7GtM', 5, '2022-12-23 19:38:19.177016');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$12$bNGwk4Z2ITZV/iHb5qah0eTo7dMQHEwptBlCO/v6aPBDg/g4fmWzy', '2022-12-22 13:48:18.79567');
INSERT INTO public.users VALUES (2, 'Gabriel', 'gabriel@driven.com.br', '$2b$12$wgPd1xNbJhRhP8mR4XJvd./jn.Syh7wvaEY3ocMiE2NsslFwo8KHy', '2022-12-22 13:49:30.839921');
INSERT INTO public.users VALUES (3, 'Rodrigo', 'rodrigo@driven.com.br', '$2b$12$odtGxhsZHwXIMZYQknoIeuJxUD.B.GEOgMOqpzBpQENUdNTsQLOne', '2022-12-22 13:51:32.499926');
INSERT INTO public.users VALUES (4, 'Fernanda', 'fernanda@driven.com.br', '$2b$12$fmhgDuV5CQu0DbgKEC.okuYBjIjEW/ThtaZdPykZ2Q.okb.nVNN5e', '2022-12-22 13:51:51.529335');
INSERT INTO public.users VALUES (5, 'Carla', 'carla@driven.com.br', '$2b$12$JKkWFmZTBj.B.qSqtf69duzdIdbEJJNPcEyFkGR2oc.9HZS5sIWUS', '2022-12-22 13:52:09.150112');
INSERT INTO public.users VALUES (6, 'Henrique', 'henrique@driven.com.br', '$2b$12$HHNJMnTFaOGQVH4QKnxMBeKxBQFkin5XVXzAJ5nvpVgMYwk.BWneO', '2022-12-22 13:52:19.321797');
INSERT INTO public.users VALUES (7, 'Ricardo', 'ricardo@driven.com.br', '$2b$12$bPviE7d9G8jOm4sgXEw8S.7L9gmZBH1szWb.CDg4/isVPly8t1rA6', '2022-12-22 13:52:32.473258');
INSERT INTO public.users VALUES (8, 'Isabel', 'isabel@driven.com.br', '$2b$12$LM9mvc0mTITwxZfKDMoeAOoOjfNz9Kua4/OlAmcJYvK5mBOhMnBFy', '2022-12-22 13:52:45.313472');
INSERT INTO public.users VALUES (9, 'Lucas', 'lucas@driven.com.br', '$2b$12$a8jJkg5E0B/K/gea19uEEOsED9wCJ1Ub209YxnctnVj7aYHXhp9ne', '2022-12-22 13:53:17.440889');
INSERT INTO public.users VALUES (10, 'Pedro', 'pedro@driven.com.br', '$2b$12$JdjpQKdgd.jmtezvlpz2N.NF4zpMlInx60ypbxAlduDn8g67UEScS', '2022-12-22 13:53:37.13889');
INSERT INTO public.users VALUES (11, 'Marcos', 'marcos@driven.com.br', '$2b$12$3BcCHpFrkXcHtxw5LnDqAusGWOHWWwDHEe0xJqOFbkmwAdjNRbaFm', '2022-12-22 13:53:50.276325');
INSERT INTO public.users VALUES (12, 'Joana', 'joana@driven.com.br', '$2b$12$Q0VF5Iu9eKe7Qtl/F5xk9.UIrRMq3reiErgrxxk3ZbUyHhdzt0mbG', '2022-12-22 13:54:00.904159');
INSERT INTO public.users VALUES (13, 'Marcela', 'marcela@driven.com.br', '$2b$12$eE2B3gALOgzq/G0mls6Os.PZ1KsFGNbdxEYC4LE.DNVR6eGX.xcXy', '2022-12-22 13:54:11.188705');
INSERT INTO public.users VALUES (14, 'Maria', 'maria@driven.com.br', '$2b$12$UYTvGFHd8MfnmGFBt00dy.7eM2JiU3zpGKuOhcCZtTs.7jy8NwneK', '2022-12-22 20:43:05.088527');
INSERT INTO public.users VALUES (15, 'miguel', 'miguel@driven.com.br', '$2b$12$YK1aCgsB26PeqRh9C/DPB.2.bevxB3Vfskw5a9VFq.ZqICxQt9tUe', '2022-12-23 03:19:44.35692');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO gabriel;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

