import { Table, Model, Column, DataType } from 'sequelize-typescript';

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


}