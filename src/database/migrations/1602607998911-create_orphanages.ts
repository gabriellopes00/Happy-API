//imports
    import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602607998911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( //Orphanages table
            new Table({
                name: 'orphanages',//table name
                columns: [ //columns
                    //Id
                    {
                        name: 'id',
                        type: 'integer', 
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    //Name
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    //Latitude
                    {
                        name: 'latitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2
                    },
                    //Longitude
                    {
                        name: 'longitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2
                    },
                    //About
                    {
                        name: 'about',
                        type: 'text' 
                    },
                    //Instructions
                    {
                        name: 'instructions',
                        type: 'text'
                    },
                    //Opening Hours
                    {
                        name: 'opening_hours',
                        type: 'varchar'
                    },
                    //Open on weekends
                    {
                        name: 'open_on_weekends',
                        type: 'Boolean',
                        default: false
                    }

                ]
            })
        );
    };

    //Migration Down
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages')
    };

}
