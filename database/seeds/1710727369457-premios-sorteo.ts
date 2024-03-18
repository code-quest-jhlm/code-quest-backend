import { Reward } from "../../src/application/reward/entity/reward.entity";
import { DrawReward } from "../../src/application/drawReward/entity/drawReward.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { Draw } from "src/application/draw/entity/draw.entity";

export class PremiosSorteo1710727369457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            const rewards = [{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'}];
            const sorteos = [{id:'1'},{id:'2'}];

            sorteos.forEach(sorteo => {
                rewards.forEach(reward => {
                    const newReward = new DrawReward();
                    newReward.id_draw = reward as Draw;
                    newReward.id_reward = sorteo as Reward;
                    queryRunner.manager.save(newReward);
                });
            });
        }
        
        public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
