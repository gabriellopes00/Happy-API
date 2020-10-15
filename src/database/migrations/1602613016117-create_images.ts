import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602613016117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ // Images table
            name: "images",//Table name.
            columns: [
                //Id
                {
                    name: 'id',
                    type: 'integer', 
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                //Path
                {
                    name: 'path',
                    type: 'varchar'
                },
                //Relation
                {
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    };
    //Migration Down
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
