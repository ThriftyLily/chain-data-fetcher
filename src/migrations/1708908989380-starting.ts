import { MigrationInterface, QueryRunner } from 'typeorm';

export class Starting1708908989380 implements MigrationInterface {
  name = 'Starting1708908989380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "address" character varying(42) NOT NULL, "currentPoints" integer NOT NULL, CONSTRAINT "UQ_3122b4b8709577da50e89b68983" UNIQUE ("address"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "from" character varying(42) NOT NULL, "to" character varying(42) NOT NULL, "value" bigint NOT NULL, "txHash" character varying NOT NULL, "block" integer NOT NULL, "eventId" character varying NOT NULL, "actionType" character varying NOT NULL, "isCalculated" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0ab9e781c6cad60daf9811e543f" UNIQUE ("eventId"), CONSTRAINT "PK_68c97a5f44c8d6a9280db65de17" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "block_tracker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "block" integer NOT NULL, CONSTRAINT "PK_150dffca22f4805d6c3ff511b79" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "block_tracker"`);
    await queryRunner.query(`DROP TABLE "token_event"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
