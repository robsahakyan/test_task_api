import {  IsOptional, IsString, IsUUID, Length, Matches, Min, Validate, ValidateNested } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsPositiveNumber } from "../../../decorators/is-positive-number.decorator";
import { IsAlphanumericWithCustomLength } from "../../../decorators/Is-alphanumeric-with-custom-length.decorator";


export class UpdateProductDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Length(8, 8, { message: 'SKU must be exactly 8 characters long' })
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'SKU must be alphanumeric' })
    @Validate(IsAlphanumericWithCustomLength, {
      message: 'SKU must contain at least one letter and one number'
    })
    sku: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsPositiveNumber()
    price: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    categoryId: string;
}

