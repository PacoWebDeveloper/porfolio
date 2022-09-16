import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { url } from '../../apiUrl';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public url: String = url;
  public project!: any;

  public loading: boolean = true;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProject(this.getProjectId());    
  }

  getProjectId(): any {
    const idProject = localStorage.getItem('id');
    localStorage.removeItem('id');
    return idProject;
  }

  getProject(id: String): void {
    this.projectService.getProjectById(id).subscribe({
      next: (v) => {
        this.project = v.results[0];
        this.loading = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('Complete')
    })
  }

  cutDescription(projects: Array<any>): void {
    let shortDescription = '';
    
    projects.forEach(item => {
      if (item.description.length > 200) {        
        shortDescription = item.description.substr(0,199);
        item.description = shortDescription + ' ...';
        shortDescription = '';
      }
    })
  }

}
