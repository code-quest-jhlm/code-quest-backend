import { Role } from "../../src/common/constants";
import { User } from "../../src/core/user/entity/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class User1710718155708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = [{
            name: 'ADMIN',
            userId: '1231',
            email: 'admin@gmail.com',
            password: '1234',
        },
        {
            name: 'ADMIN2',
            userId: '1232',
            email: 'admin2@gmail.com',
            password: '1234',
        }]
        users.forEach(user => {
            const newUser = new User(); 
            newUser.name = user.name;
            newUser.userId = user.userId;
            newUser.email = user.email;
            newUser.password = user.password;
            newUser.role = Role.ADMIN;
            return queryRunner.manager.save(newUser); 
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
