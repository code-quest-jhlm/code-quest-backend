import { Reward } from "../../src/application/reward/entity/reward.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Sorteos1710718179156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    const rewards = [
        {
            name: 'Premio 1'
        },
        {
            name: 'Premio 2'
        },
        {
            name: 'Premio 3'
        },
        {
            name: 'Premio 4'
        },
        {
            name: 'Premio 5'
        }
    ]
    rewards.forEach(reward => {
        const newReward = new Reward();
        newReward.name = reward.name;
        return queryRunner.manager.save(newReward);
    });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
