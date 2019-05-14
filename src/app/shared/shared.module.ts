import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './services/api-interceptor.service';

const APIInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
};
@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [APIInterceptorProvider]
})
export class AppSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppSharedModule,
            providers: []
        };
    }
}
