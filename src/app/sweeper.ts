import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [provide(Window, {useValue: window})]);