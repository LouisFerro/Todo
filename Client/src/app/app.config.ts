import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { todoReducer } from './stores/todo/todo.reducers';
import {TodoEffects} from './stores/todo/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideStore(),
    provideState({ name:'todos', reducer: todoReducer }),
    provideEffects(TodoEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode()})
  ]
};
