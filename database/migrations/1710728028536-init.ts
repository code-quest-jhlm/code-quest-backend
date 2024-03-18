import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1710728028536 implements MigrationInterface {
    name = 'Init1710728028536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d72ea127f30e21753c9e229891e" UNIQUE ("userId"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id")); COMMENT ON COLUMN "rewards"."name" IS 'Nombre del premio'`);
        await queryRunner.query(`CREATE TYPE "public"."draw_state_enum" AS ENUM('ACTIVO', 'INACTIVO')`);
        await queryRunner.query(`CREATE TABLE "draw" ("id" BIGSERIAL NOT NULL, "title" character varying(150) NOT NULL, "description" character varying(350) NOT NULL, "creation_date" date NOT NULL DEFAULT '"2024-03-18T02:13:50.611Z"', "draw_date" date NOT NULL, "state" "public"."draw_state_enum" NOT NULL DEFAULT 'ACTIVO', "id_user" integer NOT NULL, CONSTRAINT "PK_93d305b8405e4b975c54d609dc8" PRIMARY KEY ("id")); COMMENT ON COLUMN "draw"."id" IS 'Clave primaria de la tabla Usuario'; COMMENT ON COLUMN "draw"."title" IS 'Titulo del sorteo'; COMMENT ON COLUMN "draw"."description" IS 'Descripción del sorteo'`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "id_discord" bigint NOT NULL, "idDrawId" bigint, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id")); COMMENT ON COLUMN "participants"."full_name" IS 'Nombre del participante'; COMMENT ON COLUMN "participants"."idDrawId" IS 'Clave primaria de la tabla Usuario'`);
        await queryRunner.query(`CREATE TABLE "draw_reward" ("id" SERIAL NOT NULL, "idDrawId" bigint, "idRewardId" integer, CONSTRAINT "PK_b00fbca94a4b14cd5d4c8358e60" PRIMARY KEY ("id")); COMMENT ON COLUMN "draw_reward"."idDrawId" IS 'Clave primaria de la tabla Usuario'`);
        await queryRunner.query(`CREATE TABLE "winners" ("id" SERIAL NOT NULL, "id_discord" bigint NOT NULL, "idDrawId" bigint, "idRewardId" integer, CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8" PRIMARY KEY ("id")); COMMENT ON COLUMN "winners"."id_discord" IS 'Id de discord del participante ganador'; COMMENT ON COLUMN "winners"."idDrawId" IS 'Clave primaria de la tabla Usuario'`);
        await queryRunner.query(`ALTER TABLE "draw" ADD CONSTRAINT "FK_5e132c3fc28ea836b4b0a05c6a9" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5f1fb97fb4334e6f34dfc535c37" FOREIGN KEY ("idDrawId") REFERENCES "draw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draw_reward" ADD CONSTRAINT "FK_8be70f3371dcff32f25b4ca0be0" FOREIGN KEY ("idDrawId") REFERENCES "draw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draw_reward" ADD CONSTRAINT "FK_fb07c722dbc0c3994f18ab0860c" FOREIGN KEY ("idRewardId") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "winners" ADD CONSTRAINT "FK_ad9e293e0be50310398cdde801f" FOREIGN KEY ("idDrawId") REFERENCES "draw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "winners" ADD CONSTRAINT "FK_1c498b506207cda46633c3d86e8" FOREIGN KEY ("idRewardId") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "winners" DROP CONSTRAINT "FK_1c498b506207cda46633c3d86e8"`);
        await queryRunner.query(`ALTER TABLE "winners" DROP CONSTRAINT "FK_ad9e293e0be50310398cdde801f"`);
        await queryRunner.query(`ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_fb07c722dbc0c3994f18ab0860c"`);
        await queryRunner.query(`ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_8be70f3371dcff32f25b4ca0be0"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5f1fb97fb4334e6f34dfc535c37"`);
        await queryRunner.query(`ALTER TABLE "draw" DROP CONSTRAINT "FK_5e132c3fc28ea836b4b0a05c6a9"`);
        await queryRunner.query(`DROP TABLE "winners"`);
        await queryRunner.query(`DROP TABLE "draw_reward"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "draw"`);
        await queryRunner.query(`DROP TYPE "public"."draw_state_enum"`);
        await queryRunner.query(`DROP TABLE "rewards"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
