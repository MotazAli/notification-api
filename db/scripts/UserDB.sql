create table dbo.user_types
(
    id          integer not null
        constraint user_types_pk
            primary key,
    type        varchar(400),
    arabic_type varchar(400),
    inserted_at timestamp,
    updated_at  timestamp
);


create table dbo.status_types
(
    id          integer not null
        constraint status_types_pk
            primary key,
    type        varchar(400),
    arabic_type varchar(400),
    inserted_at timestamp,
    updated_at  timestamp
);


create table dbo.users
(
    id           varchar(400) not null
        constraint users_pk
            primary key,
    fullname     varchar(400),
    first_name   varchar(400),
    family_name  varchar(400),
    mobile       varchar(400),
    email        varchar(400),
    password     varchar(400),
    address      varchar(400),
    gender       varchar(400),
    stc_pay      varchar(400),
    image        varchar(400),
    is_deleted   boolean,
    country_id   integer,
    city_id      integer,
    national_number  varchar(400),
    core_user_id varchar(400),
    support_user_id varchar(400),
    user_type_id integer
        constraint users_user_types_id_fk
            references dbo.user_types,
    inserted_at  timestamp,
    updated_at   timestamp
);


create table dbo.user_status
(
    id  varchar(400) not null
           constraint user_status_pk
            primary key,
    user_id     varchar(400)
        constraint user_status_users_id_fk
            references dbo.users,
    status_type_id integer 
        constraint user_status_user_types_id_fk
            references dbo.user_types,
    is_current     boolean,
    description    varchar(400),
    inserted_at timestamp,
    updated_at timestamp,
    
)


create table dbo.sessions
(
    id          varchar(400) not null
        constraint sessions_pk
            primary key,
    user_id     varchar(400)
        constraint sessions_users_id_fk
            references dbo.users,
    token       varchar(400),
    inserted_at timestamp,
    updated_at  timestamp
);


create table dbo.telegram_users
(
    id          varchar(400) not null
        constraint telegram_users_pk
            primary key,
    mobile     varchar(400),
    chat_id     varchar(400),
    user_id     varchar(400)
        constraint telegram_users_id_fk
            references dbo.users,
    user_type_id integer
        constraint telegram_users_user_types_id_fk
            references dbo.user_types,
    inserted_at timestamp,
    updated_at  timestamp
);



