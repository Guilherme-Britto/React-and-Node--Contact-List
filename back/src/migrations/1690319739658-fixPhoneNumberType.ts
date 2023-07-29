import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPhoneNumberType1690319739658 implements MigrationInterface {
    name = 'FixPhoneNumberType1690319739658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "phone_number" TO "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone_number" TO "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" TO "UQ_1e3d0240b49c40521aaeb953293"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" TO "UQ_17d1817f241f10a3dbafb169fd2"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phoneNumber" TO "phone_number"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "phoneNumber" TO "phone_number"`);
    }

}
