--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ITEMS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ITEMS" (
    "Count" integer NOT NULL,
    "Date" timestamp with time zone NOT NULL,
    "ID" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Distance" character varying(100) NOT NULL
);


ALTER TABLE public."ITEMS" OWNER TO postgres;

--
-- Name: Items_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."ITEMS" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Items_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: ITEMS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ITEMS" ("Count", "Date", "ID", "Name", "Distance") FROM stdin;
10	2008-10-23 00:10:00+04	1	test1	500
100	2018-10-23 10:00:00+03	2	1test	345
12321	2020-10-20 15:30:00+03	3	R_test89	346
4444	2012-03-12 11:00:24+04	4	Test361	22
47	2012-12-21 09:10:00+04	5	Test99999999	10000
9	2010-10-03 10:09:09+04	6	WwwwwJJJJ9000	10001
899	2000-10-23 12:07:00+04	7	vvvvvaaaaaaa	7
12	2018-12-23 12:12:22+03	8	Zzzzz876	0
11	2018-10-23 10:37:00+03	9	Gggg_test6787	0
2326	2008-10-23 10:37:22+04	10	kkkk	88
5	2009-09-21 10:37:22+04	11	kkkk1	53
\.


--
-- Name: Items_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_ID_seq"', 11, true);


--
-- Name: ITEMS Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ITEMS"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("ID");


--
-- PostgreSQL database dump complete
--

