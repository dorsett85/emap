--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE clayton;
ALTER ROLE clayton WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5d046a94192c91b83da9554f4415cf0c8';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md59b4dde30c9db577d9ac991aa46add11d';






\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: emap; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE emap WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE emap OWNER TO postgres;

\connect emap

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: api_city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_city (
    id integer NOT NULL,
    name character varying NOT NULL,
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    country character varying NOT NULL,
    population integer NOT NULL
);


ALTER TABLE public.api_city OWNER TO postgres;

--
-- Name: api_city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_city_id_seq OWNER TO postgres;

--
-- Name: api_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_city_id_seq OWNED BY public.api_city.id;


--
-- Name: api_game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_game (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    num_questions integer,
    difficulty character varying,
    CONSTRAINT api_game_difficulty_check CHECK (((difficulty)::text = ANY ((ARRAY['easy'::character varying, 'medium'::character varying, 'hard'::character varying])::text[])))
);


ALTER TABLE public.api_game OWNER TO postgres;

--
-- Name: api_game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_game_id_seq OWNER TO postgres;

--
-- Name: api_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_game_id_seq OWNED BY public.api_game.id;


--
-- Name: api_place; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.api_place (
    id integer NOT NULL,
    city character varying(100) NOT NULL,
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    country character varying(100) NOT NULL,
    population integer NOT NULL
);


ALTER TABLE public.api_place OWNER TO clayton;

--
-- Name: api_place_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.api_place_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_place_id_seq OWNER TO clayton;

--
-- Name: api_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.api_place_id_seq OWNED BY public.api_place.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO clayton;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO clayton;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO clayton;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO clayton;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO clayton;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO clayton;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO clayton;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO clayton;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO clayton;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO clayton;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO clayton;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO clayton;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO clayton;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO clayton;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO clayton;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO clayton;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO clayton;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: clayton
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO clayton;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clayton
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: clayton
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO clayton;

--
-- Name: api_city id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_city ALTER COLUMN id SET DEFAULT nextval('public.api_city_id_seq'::regclass);


--
-- Name: api_game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_game ALTER COLUMN id SET DEFAULT nextval('public.api_game_id_seq'::regclass);


--
-- Name: api_place id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.api_place ALTER COLUMN id SET DEFAULT nextval('public.api_place_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: api_city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_city (id, name, lat, lon, country, population) FROM stdin;
1	Tokyo	35.685000000000002	139.75139999999999	Japan	35676000
2	New York	40.694299999999998	-73.924899999999994	United States	19164071
3	Mexico City	19.442399999999999	-99.131	Mexico	19028000
4	Mumbai	19.016999999999999	72.856999999999999	India	18978000
5	Sao Paulo	-23.558700000000002	-46.625	Brazil	18845000
6	Delhi	28.670000000000002	77.230000000000004	India	15926000
7	Shanghai	31.2165	121.4365	China	14987000
8	Kolkata	22.495000000000001	88.324700000000007	India	14787000
9	Dhaka	23.723099999999999	90.408600000000007	Bangladesh	12797394
10	Buenos Aires	-34.602499999999999	-58.397500000000001	Argentina	12795000
11	Los Angeles	34.113999999999997	-118.4068	United States	12740381
12	Karachi	24.870000000000001	66.989999999999995	Pakistan	12130000
13	Cairo	30.050000000000001	31.25	Egypt	11893000
14	Rio de Janeiro	-22.925000000000001	-43.225000000000001	Brazil	11748000
15	Osaka	34.75	135.46010000000001	Japan	11294000
16	Beijing	39.928899999999999	116.3883	China	11106000
17	Manila	14.604200000000001	120.98220000000001	Philippines	11100000
18	Moscow	55.752200000000002	37.615499999999997	Russia	10452000
19	Istanbul	41.104999999999997	29.010000000000002	Turkey	10061000
20	Paris	48.866700000000002	2.3332999999999999	France	9904000
21	Seoul	37.566299999999998	126.9997	Korea, South	9796000
22	Lagos	6.4432999999999998	3.3915000000000002	Nigeria	9466000
23	Jakarta	-6.1744000000000003	106.82940000000001	Indonesia	9125000
24	Guangzhou	23.145	113.325	China	8829000
25	Chicago	41.837299999999999	-87.686099999999996	United States	8639278
26	London	51.5	-0.1167	United Kingdom	8567000
27	Lima	-12.048	-77.0501	Peru	8012000
28	Tehran	35.671900000000001	51.424300000000002	Iran	7873000
29	Kinshasa	-4.3296999999999999	15.315	Congo (Kinshasa)	7843000
30	Bogota	4.5964	-74.083299999999994	Colombia	7772000
31	Shenzhen	22.552399999999999	114.1221	China	7581000
32	Wuhan	30.579999999999998	114.27	China	7243000
33	Hong Kong	22.305	114.185	Hong Kong	7206000
34	Tianjin	39.130000000000003	117.2	China	7180000
35	Chennai	13.09	80.280000000000001	India	7163000
36	Taipei	25.035799999999998	121.56829999999999	Taiwan	6900273
37	Bangalore	12.970000000000001	77.560000000000002	India	6787000
38	Bangkok	13.75	100.5166	Thailand	6704000
39	Lahore	31.559999999999999	74.349999999999994	Pakistan	6577000
40	Chongqing	29.565000000000001	106.595	China	6461000
41	Hyderabad	17.399999999999999	78.480000000000004	India	6376000
42	Miami	25.783999999999999	-80.2102	United States	6247425
43	Santiago	-33.450000000000003	-70.667000000000002	Chile	5720000
44	Dallas	32.793799999999997	-96.765900000000002	United States	5634307
45	Philadelphia	40.007599999999996	-75.134	United States	5591554
46	Belo Horizonte	-19.914999999999999	-43.914999999999999	Brazil	5575000
47	Madrid	40.399999999999999	-3.6833999999999998	Spain	5567000
48	Houston	29.787099999999999	-95.393600000000006	United States	5424720
49	Ahmedabad	23.030100000000001	72.579999999999998	India	5375000
50	Ho Chi Minh City	10.779999999999999	106.69499999999999	Vietnam	5314000
51	Toronto	43.700000000000003	-79.420000000000002	Canada	5213000
52	Washington	38.904699999999998	-77.016300000000001	United States	5191844
53	Singapore	1.2929999999999999	103.8558	Singapore	5183700
54	Luanda	-8.8383000000000003	13.234400000000001	Angola	5172900
55	Atlanta	33.762700000000002	-84.423100000000005	United States	5080712
56	Baghdad	33.3386	44.393900000000002	Iraq	5054000
57	Barcelona	41.383299999999998	2.1833999999999998	Spain	4920000
58	Haora	22.580400000000001	88.329899999999995	India	4841638
59	Shenyeng	41.805	123.45	China	4787000
60	Khartoum	15.588100000000001	32.534199999999998	Sudan	4754000
61	Pune	18.530000000000001	73.849999999999994	India	4672000
62	Sydney	-33.920000000000002	151.18520000000001	Australia	4630000
63	Boston	42.318899999999999	-71.083799999999997	United States	4556916
64	St. Petersburg	59.939	30.315999999999999	Russia	4553000
65	Chittagong	22.329999999999998	91.799999999999997	Bangladesh	4529000
66	Dongguan	23.0489	113.74469999999999	China	4528000
67	Riyadh	24.640799999999999	46.7727	Saudi Arabia	4465000
68	Hanoi	21.033300000000001	105.84999999999999	Vietnam	4378000
69	Guadalajara	20.670000000000002	-103.33	Mexico	4198000
70	Melbourne	-37.82	144.97499999999999	Australia	4170000
71	Alexandria	31.199999999999999	29.949999999999999	Egypt	4165000
72	Chengdu	30.670000000000002	104.06999999999999	China	4123000
73	Rangoon	16.7834	96.166700000000006	Burma	4088000
74	Phoenix	33.572200000000002	-112.0891	United States	4054083
75	Xian	34.274999999999999	108.895	China	4009000
76	Porto Alegre	-30.050000000000001	-51.200000000000003	Brazil	3917000
77	Surat	21.199999999999999	72.840000000000003	India	3842000
78	Hechi	23.096499999999999	109.6091	China	3830000
79	Abidjan	5.3200000000000003	-4.04	Cð´¥ DÓ‰voire	3802000
80	Brasilia	-15.783300000000001	-47.9161	Brazil	3716996
81	Ankara	39.927199999999999	32.864400000000003	Turkey	3716000
82	Monterrey	25.670000000000002	-100.33	Mexico	3712000
83	Yokohama	35.32	139.58000000000001	Japan	3697894
84	Nanjing	32.049999999999997	118.78	China	3679000
85	Montreal	45.5	-73.583299999999994	Canada	3678000
86	Guiyang	26.579999999999998	106.72	China	3662000
87	Recife	-8.0755999999999997	-34.915599999999998	Brazil	3651000
88	Harbin	45.75	126.65000000000001	China	3621000
89	Fortaleza	-3.75	-38.579999999999998	Brazil	3602319
90	San Francisco	37.756100000000004	-122.44289999999999	United States	3548847
91	Seattle	47.621699999999997	-122.32380000000001	United States	3541236
92	Zhangzhou	24.520399999999999	117.67	China	3531147
93	Detroit	42.383400000000002	-83.102400000000003	United States	3520589
94	Salvador	-12.970000000000001	-38.479999999999997	Brazil	3484000
95	Busan	35.095100000000002	129.00999999999999	Korea, South	3480000
96	Johannesburg	-26.170000000000002	28.030000000000001	South Africa	3435000
97	Berlin	52.521799999999999	13.4015	Germany	3406000
98	Algiers	36.763100000000001	3.0506000000000002	Algeria	3354000
99	Rome	41.896000000000001	12.4833	Italy	3339000
100	Pyongyang	39.019399999999997	125.7547	Korea, North	3300000
\.


--
-- Data for Name: api_game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_game (id, name, description, num_questions, difficulty) FROM stdin;
1	Cities - Top 10 Population	pop	5	easy
2	Cities - Top 10 Area	Area	5	hard
3	Cities - Top 10 Education	Education	5	medium
4	Cities - Top 10 Income	Income	5	medium
\.


--
-- Data for Name: api_place; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.api_place (id, city, lat, lon, country, population) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add place	7	add_place
26	Can change place	7	change_place
27	Can delete place	7	delete_place
28	Can view place	7	view_place
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$120000$KCSK4Fe69o4V$qU49iwZLuBf0KrV1qpPm78GlJrYARjNJXje1J8TMlM8=	\N	t	clayton				t	t	2018-11-17 13:26:37.16585-05
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	api	place
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2018-11-17 13:26:27.183691-05
2	auth	0001_initial	2018-11-17 13:26:28.451595-05
3	admin	0001_initial	2018-11-17 13:26:28.717159-05
4	admin	0002_logentry_remove_auto_add	2018-11-17 13:26:28.717159-05
5	admin	0003_logentry_add_action_flag_choices	2018-11-17 13:26:28.732697-05
6	api	0001_initial	2018-11-17 13:26:28.79525-05
7	contenttypes	0002_remove_content_type_name	2018-11-17 13:26:28.826451-05
8	auth	0002_alter_permission_name_max_length	2018-11-17 13:26:28.826451-05
9	auth	0003_alter_user_email_max_length	2018-11-17 13:26:28.842046-05
10	auth	0004_alter_user_username_opts	2018-11-17 13:26:28.842046-05
11	auth	0005_alter_user_last_login_null	2018-11-17 13:26:28.857666-05
12	auth	0006_require_contenttypes_0002	2018-11-17 13:26:28.857666-05
13	auth	0007_alter_validators_add_error_messages	2018-11-17 13:26:28.873289-05
14	auth	0008_alter_user_username_max_length	2018-11-17 13:26:28.920245-05
15	auth	0009_alter_user_last_name_max_length	2018-11-17 13:26:28.935775-05
16	sessions	0001_initial	2018-11-17 13:26:29.10761-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: clayton
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Name: api_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_city_id_seq', 100, true);


--
-- Name: api_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_game_id_seq', 4, true);


--
-- Name: api_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.api_place_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 28, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 7, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clayton
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 16, true);


--
-- Name: api_city api_city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_city
    ADD CONSTRAINT api_city_pkey PRIMARY KEY (id);


--
-- Name: api_game api_game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_game
    ADD CONSTRAINT api_game_pkey PRIMARY KEY (id);


--
-- Name: api_place api_place_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.api_place
    ADD CONSTRAINT api_place_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: clayton
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: clayton
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: DATABASE emap; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE emap TO clayton;


--
-- Name: TABLE api_city; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.api_city TO clayton;


--
-- Name: TABLE api_game; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.api_game TO clayton;


--
-- PostgreSQL database dump complete
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    num_questions integer,
    difficulty character varying,
    CONSTRAINT game_difficulty_check CHECK (((difficulty)::text = ANY ((ARRAY['easy'::character varying, 'medium'::character varying, 'hard'::character varying])::text[])))
);


ALTER TABLE public.game OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_id_seq OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- Name: game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game (id, name, description, num_questions, difficulty) FROM stdin;
\.


--
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_id_seq', 1, false);


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

