import { User } from "../../src/core/user/entity/user.entity";
import { Draw } from "../../src/application/draw/entity/draw.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Sorteos1710718183831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const sorteos = [
            {
                title: 'Sorteo 1',
                description: 'Sorteo 1',
                drawDate: new Date('2024-10-10'),
                state: 'ACTIVO',
                id_user: 1
            },
            {
                title: 'Sorteo 2',
                description: 'Sorteo 2',
                drawDate: new Date('2021-10-11'),
                state: 'ACTIVO',
                id_user: 1,
            }
        ]
        const newUser = new User();
        newUser.id = '1';
            sorteos.forEach(sorteo => {
             const newSorteo = new Draw();
                newSorteo.title = sorteo.title;
                newSorteo.description = sorteo.description;
                newSorteo.drawDate = sorteo.drawDate;
                newSorteo.state = sorteo.state;
                newSorteo.user = newUser;
            return queryRunner.manager.save(newSorteo);   
            });
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
