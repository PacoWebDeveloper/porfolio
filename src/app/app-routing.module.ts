import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { MyselfComponent } from './components/myself/myself.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: "about-me", component: AboutMeComponent },
  { path: "experience", component: ExperienceComponent },
  { path: "myself", component: MyselfComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "contact", component: ContactComponent },
  { path: "add-project", component: AddProjectComponent },
  { path: "project-manager", component: ProjectManagerComponent },
  { path: "viewProject", component: ViewComponent },
  { path: "viewProjectUser", component: ViewUserComponent}
];

export const AppRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
