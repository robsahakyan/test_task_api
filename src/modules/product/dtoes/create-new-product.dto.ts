import { IsString, IsUUID, Length, Matches, Validate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsPositiveNumber } from "../../../decorators/is-positive-number.decorator";
import { IsAlphanumericWithCustomLength } from "../../../decorators/Is-alphanumeric-with-custom-length.decorator";

export class CreateNewProductDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @Length(8, 8, { message: 'SKU must be exactly 8 characters long' })
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'SKU must be alphanumeric' })
    @Validate(IsAlphanumericWithCustomLength, {
      message: 'SKU must contain at least one letter and one number'
    })
    sku: string;

    @ApiProperty()
    @IsPositiveNumber()
    price: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsUUID()
    categoryId: string;
}

