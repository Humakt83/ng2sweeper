import {Component} from 'angular2/core';
import {BoardDirective} from './board.directive';

@Component({
    selector: 'ng2sweeper',
    templateUrl: './app/components/app.component.html',
    directives: [BoardDirective]
})
export class AppComponent {}