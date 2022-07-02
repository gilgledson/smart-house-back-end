import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Company1650672755276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'company',
            columns: [
                {
                    'name':'id',
                    'type': 'uuid',
                    'isPrimary': true,
                    'generationStrategy': 'uuid',
                    'default': 'uuid_generate_v4()'
                },
                {
                    'name':'name',
                    'type': 'varchar'
                },
                {
                    'name':'document_number',
                    'type': 'varchar'
                },
                {
                    'name':'status',
                    'type': 'integer',
                    'default': 0
                },
                {
                    'name':'domain',
                    'type': 'varchar'
                },
                {
                    'name':'street',
                    'type': 'varchar'
                },
                {
                    'name':'city',
                    'type': 'varchar'
                },
                {
                    'name':'state',
                    'type': 'varchar'
                },
                {
                    'name':'created_at',
                    'type': 'timestamp',
                    'default': 'now()'
                },
                {
                    'name':'updated_at',
                    'type': 'timestamp',
                    'default': 'now()'
                },
                {
                    'name':'deleted_at',
                    'type': 'timestamp',
                    'default': null,
                    'isNullable': true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
