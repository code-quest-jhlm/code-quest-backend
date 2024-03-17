import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710633284592 implements MigrationInterface {
    name = 'Initial1710633284592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "winners" DROP CONSTRAINT "FK_1c498b506207cda46633c3d86e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_f64c864ef066360a2b20be1bb77"
        `);
        await queryRunner.query(`
            CREATE TABLE "rewards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "description" character varying(255) NOT NULL,
                CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "rewards"."name" IS 'Nombre del premio';
            COMMENT ON COLUMN "rewards"."description" IS 'Descripción del premio'
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "full_name" character varying(255) NOT NULL,
                "id_discord" character varying(255) NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "users"."full_name" IS 'Nombre del usuario';
            COMMENT ON COLUMN "users"."id_discord" IS 'Id de usuario de discord'
        `);
        await queryRunner.query(`
            CREATE TABLE "participants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "full_name" character varying(255) NOT NULL,
                "id_discord" character varying(255) NOT NULL,
                "idDrawId" uuid,
                CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "participants"."full_name" IS 'Nombre del participante';
            COMMENT ON COLUMN "participants"."id_discord" IS 'Id de participante de discord'
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD "idUserId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP COLUMN "idRewardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD "idRewardId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_18a0c72cbc37c374eadac809ea0" PRIMARY KEY ("draw_id")
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f64c864ef066360a2b20be1bb7"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "reward_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "reward_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_18a0c72cbc37c374eadac809ea0"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233" PRIMARY KEY ("draw_id", "reward_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f64c864ef066360a2b20be1bb7" ON "draw_reward" ("reward_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d" FOREIGN KEY ("idUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "participants"
            ADD CONSTRAINT "FK_5f1fb97fb4334e6f34dfc535c37" FOREIGN KEY ("idDrawId") REFERENCES "draw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD CONSTRAINT "FK_1c498b506207cda46633c3d86e8" FOREIGN KEY ("idRewardId") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_f64c864ef066360a2b20be1bb77" FOREIGN KEY ("reward_id") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_f64c864ef066360a2b20be1bb77"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP CONSTRAINT "FK_1c498b506207cda46633c3d86e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "participants" DROP CONSTRAINT "FK_5f1fb97fb4334e6f34dfc535c37"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw" DROP CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f64c864ef066360a2b20be1bb7"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_18a0c72cbc37c374eadac809ea0" PRIMARY KEY ("draw_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "reward_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "reward_id" bigint NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f64c864ef066360a2b20be1bb7" ON "draw_reward" ("reward_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_18a0c72cbc37c374eadac809ea0"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233" PRIMARY KEY ("draw_id", "reward_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP COLUMN "idRewardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD "idRewardId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw" DROP COLUMN "idUserId"
        `);
        await queryRunner.query(`
            DROP TABLE "participants"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "rewards"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_f64c864ef066360a2b20be1bb77" FOREIGN KEY ("reward_id") REFERENCES "premios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "winners"
            ADD CONSTRAINT "FK_1c498b506207cda46633c3d86e8" FOREIGN KEY ("idRewardId") REFERENCES "premios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
