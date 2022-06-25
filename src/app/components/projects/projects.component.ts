import { Component, OnInit } from '@angular/core';
import { url } from 'src/app/apiUrl';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projectsList!: Array<any>;
  public url: String = url;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
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
        /* this.errorDB = true;
        this.errorMsg = e.error.message; */
      },
      complete: () => {
        console.log('Complete');
        /* this.errorDB = false;
        this.errorMsg = ''; */
      }
    })
  }

  cutDescription(projects: Array<any>): void {
    let shortDescription = '';
    
    projects.forEach(item => {
      if (item.description.length > 200) {        
        shortDescription = item.description.substr(0,149);
        item.description = shortDescription + ' ...';
        shortDescription = '';
      }
    })
  }

  saveId(e: any): void {
    const id = e.target.id;
    localStorage.setItem('id', id);
  }

}