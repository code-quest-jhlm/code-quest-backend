import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710712583757 implements MigrationInterface {
    name = 'Initial1710712583757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "draw" DROP CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw" DROP COLUMN "idUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD "idUserId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d" FOREIGN KEY ("idUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "draw" DROP CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw" DROP COLUMN "idUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD "idUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "draw"
            ADD CONSTRAINT "FK_6837c6b10927e5655d72f0b5a1d" FOREIGN KEY ("idUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
