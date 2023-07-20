import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Contacts } from './contacts.ts';

@Table({
    timestamps: true,
    tableName: 'user'
})
export class User extends Model{

    @Column({
        unique: true,
        allowNull: false,
        type: DataType.STRING
    })
    email!:string

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    userName!: string

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    password!: string

    @Column({
        allowNull: true,
        type: DataType.TINYINT
    })
    age!: number

    @HasMany(() => Contacts)
    contacts!: Contacts[];
}