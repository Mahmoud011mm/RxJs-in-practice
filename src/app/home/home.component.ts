import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap, filter, finalize} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';







@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

        

        const http$ = createHttpObservable('/api/courses');
        // Using Operators
        const course$: Observable<Course[]> = http$.pipe(
            // catchError( err => {
            //     console.log("Erro Ocured", err);
            //     return throwError(err)
            //   }),
            //   finalize(() => {
            //     console.log('finalized excuted...');
            //   }),
            map(res => Object.values(res["payload"])),
            shareReplay(),
            // retryWhen( errors => errors.pipe(
            //     delayWhen( () => timer(200))
            // ))
        );

        this.beginnerCourses$ = course$.pipe(
            map( courses => courses.filter(
                course => course.category == 'BEGINNER'
            ) )
        );

        this.advancedCourses$ = course$.pipe(
            map( courses => courses.filter(
                course => course.category == 'ADVANCED'
            ) )
        );

    }

}
