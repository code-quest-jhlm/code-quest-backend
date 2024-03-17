import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710677669642 implements MigrationInterface {
    name = 'Initial1710677669642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_18a0c72cbc37c374eadac809ea0"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_f64c864ef066360a2b20be1bb77"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_18a0c72cbc37c374eadac809ea"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f64c864ef066360a2b20be1bb7"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_f64c864ef066360a2b20be1bb77" PRIMARY KEY ("reward_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "draw_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_f64c864ef066360a2b20be1bb77"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "reward_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_b00fbca94a4b14cd5d4c8358e60" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "idDrawId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "idRewardId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_8be70f3371dcff32f25b4ca0be0" FOREIGN KEY ("idDrawId") REFERENCES "draw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_fb07c722dbc0c3994f18ab0860c" FOREIGN KEY ("idRewardId") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_fb07c722dbc0c3994f18ab0860c"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "FK_8be70f3371dcff32f25b4ca0be0"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "idRewardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "idDrawId"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_b00fbca94a4b14cd5d4c8358e60"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "reward_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_f64c864ef066360a2b20be1bb77" PRIMARY KEY ("reward_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD "draw_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward" DROP CONSTRAINT "PK_f64c864ef066360a2b20be1bb77"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "PK_ada4b69c3cfc41ef5dba83ba233" PRIMARY KEY ("draw_id", "reward_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f64c864ef066360a2b20be1bb7" ON "draw_reward" ("reward_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_18a0c72cbc37c374eadac809ea" ON "draw_reward" ("draw_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_f64c864ef066360a2b20be1bb77" FOREIGN KEY ("reward_id") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "draw_reward"
            ADD CONSTRAINT "FK_18a0c72cbc37c374eadac809ea0" FOREIGN KEY ("draw_id") REFERENCES "draw"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
