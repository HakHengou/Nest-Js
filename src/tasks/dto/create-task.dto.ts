import { from } from "rxjs";

import {IsNotEmpty} from 'class-validator'
export class CreatTaskDto{
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}