// import type { CanActivate, ExecutionContext } from '@nestjs/common';
// import { Injectable } from '@nestjs/common';
// import type { Observable } from 'rxjs';
// import {StripeService} from "../shared/services/stripe.service";


// @Injectable()
// export class StripeGuard implements CanActivate {
//   constructor(private readonly stripeService: StripeService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const payload = (request.rawBody || undefined) as Buffer;
//     const signature = (request.headers['stripe-signature'] || '') as string;

//     return this.stripeService.validateWebhook(payload, signature);
//   }
// }
