import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService } from './services/project.service';

import { routing, AppRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { MyselfComponent } from './components/myself/myself.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { UploadService } from './services/upload.service';
import { ViewComponent } from './components/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ExperienceComponent,
    MyselfComponent,
    ContactComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectManagerComponent,
    ViewComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    routing
  ],
  providers: [AppRoutingProviders, ProjectService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
