import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminUser1690331416313 implements MigrationInterface {
    name = 'CreateAdminUser1690331416313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
