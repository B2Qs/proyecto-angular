import { Routes } from '@angular/router';
import { AddTaskComponentComponent } from './components/add-task-component/add-task-component.component';
import { TaskItemComponentComponent } from './components/task-item-component/task-item-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { AllTaskComponent } from './components/all-task.component';


export const routes: Routes = [

    { path: '', redirectTo: 'allTask', pathMatch: 'full'},
    { path: 'addTask', component: AddTaskComponentComponent},
    { path: 'taskItem', component: TaskItemComponentComponent },
    { path: 'listTask', component: TaskListComponentComponent},
    { path: 'allTask', component: AllTaskComponent},

];
