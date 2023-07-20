import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.ts';

@Table({
    timestamps: false,
    tableName: 'contact'
})
export class Contacts extends Model{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!:String

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: String

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phone!: String

    @ForeignKey(() => User)
    @Column({allowNull: false})
    userID!: number;
  
    @BelongsTo(() => User)
    user!: User;
}