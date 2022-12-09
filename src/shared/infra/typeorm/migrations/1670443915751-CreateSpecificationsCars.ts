import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1670443915751
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "car_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "specifications_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKSpecificationCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specifications_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKCarSpecification",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKSpecificationCar"
    );
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKCarSpecification"
    );
    await queryRunner.dropTable("specifications_cars");
  }
}
