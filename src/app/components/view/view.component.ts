import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { project } from 'src/app/models/projectModel';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { url } from '../../apiUrl';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public projectModel: project = new project('', [], '', '', '', '');

  public id!: String;
  public project!: any;
  public url: String = url;
  public availableTechs: Array<String> = ['html','css','javascript','Angular'];

  public saveBtn: boolean = false;
  public editTech: boolean = true;
  public content!: String;
  public contentLength: number = 0;
  public contentToCompare!: String;
  public contentToCompareLength: number = 0;

  public imageFile: Array<any> = [];
  public showUploadImageBox: boolean = false;

  @ViewChild('name') name!: any;
  @ViewChild('description') description!: any;
  @ViewChild('repository') repository!: any;
  @ViewChild('technologiesContainer') technologiesContainer!: ElementRef;
  @ViewChild('html') html!: any;
  @ViewChild('css') css!: ElementRef;
  @ViewChild('javascript') javascript!: ElementRef;
  @ViewChild('Angular') Angular!: ElementRef;

  constructor(
    private ProjectService: ProjectService,
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.getProjectId();
    this.getProject(this.id);
  }

  getProjectId(): any {
    /* return ProjectManagerComponent.idProject; */
    const idProject = localStorage.getItem('id');
    return idProject;
  }

  getProject(id: String): void {
    this.ProjectService.getProjectById(id).subscribe({
      next: (v) => {
        this.project = v.results[0];
      },
      error: (e) => console.error(e),
      complete: () => console.info('Complete')
    })
  }

  onChanges(event: any): void {
    this.contentToCompare = event.target.innerText.trim();

    this.saveBtn = true;
  }

  changeImage(event: any): void {
    this.showUploadImageBox = true;
    this.id = event.target.id;
  }

  isThereFile(event: any): void {
    const fileListLength = event.srcElement.files.length;
    if (fileListLength > 0)
      this.imageFile = <Array<File>>event.target.files;
    this.saveBtn = true;
  }
  /* Gets the existing techonologies in projectModel.technologies and then calls to AddRemoveTechInModel method */
  setTechSelected(): void {
    this.technologiesContainer.nativeElement.classList.remove('hide');

    this.project.technologies.forEach((element: String) => {
      switch (element) {
        case 'html':
          this.html.nativeElement.checked = true;
          break;
        case 'css':
          this.css.nativeElement.checked = true;
          break;
        case 'javascript':
          this.javascript.nativeElement.checked = true;
          break;
        case 'Angular':
          this.Angular.nativeElement.checked = true;
          break;
      }      
    });
  }
  /* Gets the HTML element data from the selected item by the user and add it in projectModel.technologies */
  getElementDataToBeAddedOrRemoved(e: any): void {
    let itemName: String = e.target.name;
    let isSelected: boolean = e.target.checked;
    let indexToRemove: number = this.project.technologies.indexOf(itemName);

    if (isSelected)
      this.project.technologies.push(itemName);
    else
      this.project.technologies.splice(indexToRemove, 1);

    this.saveBtn = true;
  }
  /* Uses ProjectService to send changes done by the user to the API */
  saveChanges(): void {
    const projectName = this.name.nativeElement.textContent;
    const projectDescription = this.description.nativeElement.textContent;
    const projectRepository = this.repository.nativeElement.textContent;

    this.projectModel = new project(
      projectName, this.project.technologies, projectDescription,
      this.project.uploadDate, this.project.imageUrl, projectRepository
    )

    this.ProjectService.editProject(this.id, this.projectModel).subscribe({
      next: (v) => {
        if (this.imageFile.length > 0) {
          const id = v.results._id;
          const imageUrl = this.url + '/upload-image/' + id;
          this.uploadService.makeFileRequest(imageUrl, this.imageFile, 'upload_image');
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('Update completed')
    })
    /* Restores the initial values in variables and elements */
    this.saveBtn = false;
    this.editTech = false;
    this.technologiesContainer.nativeElement.classList.add('hide');
    /* Reloads the project with its changes */
    this.getProject(this.project._id);
  }
  /* Uses ProjectService to send project data to the API to be deleted */
  deleteProject(event: any): void {
    const id = event.target.id;
    const response = confirm('Are you sure to delete the project?');

    if (response) {
      this.ProjectService.deleteImage(this.project.imageUrl).subscribe({
        next: (v) => this.ProjectService.deleteProject(id).subscribe({
          error: (e) => console.log(e),
          complete: () => console.log('Project deleted')
        }),
        error: (e) => console.log(e),
        complete: () => console.log('Image deleted')
      })

    }

    localStorage.removeItem('id');
    this.goToProjectManager();
  }
  /* Navigates to project-manager component */
  goToProjectManager(): void {
    this.router.navigate(['../project-manager']);
  }

}
