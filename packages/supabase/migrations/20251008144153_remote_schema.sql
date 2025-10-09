


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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."digest_status_type" AS ENUM (
    'pending',
    'generated',
    'sent',
    'failed'
);


ALTER TYPE "public"."digest_status_type" OWNER TO "postgres";


CREATE TYPE "public"."subscription_status" AS ENUM (
    'free',
    'trial',
    'premium_monthly',
    'premium_yearly'
);


ALTER TYPE "public"."subscription_status" OWNER TO "postgres";


CREATE TYPE "public"."user_interaction_type" AS ENUM (
    'accepted',
    'rejected',
    'ignored'
);


ALTER TYPE "public"."user_interaction_type" OWNER TO "postgres";


CREATE TYPE "public"."writing_niche_type" AS ENUM (
    'general',
    'technical',
    'academic',
    'casual',
    'business'
);


ALTER TYPE "public"."writing_niche_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."error_logs" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "error_type" "text" NOT NULL,
    "original_text" "text" NOT NULL,
    "suggested_correction" "text" NOT NULL,
    "interaction" "public"."user_interaction_type" DEFAULT 'ignored'::"public"."user_interaction_type" NOT NULL,
    "interaction_at" timestamp with time zone,
    "model_version" "text",
    "context_metadata" "jsonb"
);


ALTER TABLE "public"."error_logs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."error_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."error_logs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."error_logs_id_seq" OWNED BY "public"."error_logs"."id";



CREATE TABLE IF NOT EXISTS "public"."user_settings" (
    "user_id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "weekly_digest_enabled" boolean DEFAULT true NOT NULL,
    "writing_niche" "public"."writing_niche_type" DEFAULT 'general'::"public"."writing_niche_type" NOT NULL
);


ALTER TABLE "public"."user_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "public"."subscription_status" DEFAULT 'free'::"public"."subscription_status" NOT NULL,
    "stripe_customer_id" "text",
    "subscription_ends_at" timestamp with time zone
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."weekly_digests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "period_start_date" "date" NOT NULL,
    "period_end_date" "date" NOT NULL,
    "status" "public"."digest_status_type" DEFAULT 'pending'::"public"."digest_status_type" NOT NULL,
    "generated_at" timestamp with time zone,
    "sent_at" timestamp with time zone,
    "digest_content" "jsonb"
);


ALTER TABLE "public"."weekly_digests" OWNER TO "postgres";


ALTER TABLE ONLY "public"."error_logs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."error_logs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."error_logs"
    ADD CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."weekly_digests"
    ADD CONSTRAINT "weekly_digests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."weekly_digests"
    ADD CONSTRAINT "weekly_digests_user_id_period_start_date_key" UNIQUE ("user_id", "period_start_date");



CREATE INDEX "idx_error_logs_created_at" ON "public"."error_logs" USING "btree" ("created_at");



CREATE INDEX "idx_error_logs_error_type" ON "public"."error_logs" USING "btree" ("error_type");



CREATE INDEX "idx_error_logs_user_id" ON "public"."error_logs" USING "btree" ("user_id");



ALTER TABLE ONLY "public"."error_logs"
    ADD CONSTRAINT "error_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."weekly_digests"
    ADD CONSTRAINT "weekly_digests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Users can view and edit their own data" ON "public"."users" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view and edit their own settings" ON "public"."user_settings" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own digests" ON "public"."weekly_digests" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own error logs" ON "public"."error_logs" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."error_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."weekly_digests" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."error_logs" TO "anon";
GRANT ALL ON TABLE "public"."error_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."error_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_settings" TO "anon";
GRANT ALL ON TABLE "public"."user_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."user_settings" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."weekly_digests" TO "anon";
GRANT ALL ON TABLE "public"."weekly_digests" TO "authenticated";
GRANT ALL ON TABLE "public"."weekly_digests" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































RESET ALL;

