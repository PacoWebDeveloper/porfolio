import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { url } from '../../apiUrl';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})

export class ProjectManagerComponent implements OnInit {

  public projectsList: Array<any> = [];
  public errorDB: boolean = false;
  public errorMsg: String = '';
  public url: String = url;
  public static idProject: String;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
    /* Deletes id from localstorage, is necesary to do this because when you come back from project view component, id is stored in localstorage */
    localStorage.removeItem('id');
  }

  getAllProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (v) => {
        this.projectsList = v.results.map((item: Object) => {
          return item;
        });

        this.cutDescription(this.projectsList);
      },
      error: (e) => {
        console.error(e);
        this.errorDB = true;
        this.errorMsg = e.error.message;
      },
      complete: () => {
        console.log('Complete');
        this.errorDB = false;
        this.errorMsg = '';
      }
    })
  }

  openProject(event: any): void {
    const project_id = event.srcElement.id;
    /* ProjectManagerComponent.idProject = project_id; */
    localStorage.setItem('id',project_id);
  }

  deleteProject(event: any): void {
    const id = event.srcElement.id;
    const name = event.srcElement.name;

    this.projectService.deleteImage(name).subscribe({
      error: (e) => console.error(e),
      complete: () => console.log('Complete')
    })

    this.projectService.deleteProject(id).subscribe({
      next: (v) => this.getAllProjects(),
      error: (e) => console.error(e),
      complete: () => console.log('Complete')
    })
  }

  cutDescription(projects: Array<any>): void {
    let shortDescription = '';
    
    projects.forEach(item => {
      if (item.description.length > 150) {        
        shortDescription = item.description.substr(0,149);
        item.description = shortDescription + ' ...';
        shortDescription = '';
      }
    })
  }
}
