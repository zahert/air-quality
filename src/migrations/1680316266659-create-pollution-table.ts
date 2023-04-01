import {MigrationInterface, QueryRunner} from "typeorm";

export class createPollutionTable1680316266659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE pollution (
                id int NOT NULL AUTO_INCREMENT,
                aqius int default null,
                mainus varchar(20) default null,
                aqicn int default null,
                maincn varchar(20) default null,
                date datetime default null,
                PRIMARY KEY (id)
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE pollution`);
    }

}
