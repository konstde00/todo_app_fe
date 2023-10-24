import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from "@app/src/app/services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this.storageService.getUser();

        if (user != null && !!user.token) {
            req = req.clone({
                setHeaders: {
                    "Authorization": "Bearer " + user.token
                },
                withCredentials: true,
            });
        }

        return next.handle(req);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
