import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPhoneNumberNotUnique1690333449146 implements MigrationInterface {
    name = 'FixPhoneNumberNotUnique1690333449146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber")`);
    }

}
