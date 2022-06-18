import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/models/projectModel';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { url } from '../../apiUrl';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public techSelected: Array<boolean> = new Array(3).fill(false);
  public oneChecked: boolean = false;
  public fileSelected: boolean = false;
  public imageFile!: Array<any>;
  public model: project = new project('',[],'','','','');
  public message: String = '';
  public showMessage: boolean = false;
  public error: boolean = false;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    
  }
  
  ngOnInit(): void {
  }

  selectedTech(tech: number): void {
    if (this.techSelected[tech])
      this.techSelected[tech] = false;
    else this.techSelected[tech] = true;
    
    let checkFalse: number = 0;
    this.techSelected.forEach(tech => {
      if (!tech)
        checkFalse++;
        
      if (checkFalse == this.techSelected.length)
        this.oneChecked = false
      else this.oneChecked = true;
    })
  }

  isThereFile(event: any): void {
    const fileListLength = event.srcElement.files.length;
    if (fileListLength == 0) this.fileSelected = false;
    else {
      this.fileSelected = true;
      this.imageFile = <Array<File>>event.target.files;
    }
  }

  getCurrentDate(): String {
    const date = new Date();

    let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return currentDate;
  }

  newProject(uploadDate: String): void {
    const techByIndex: any = {
      0: 'html',
      1: 'css',
      2: 'javascript',
      3: 'Angular'
    }

    let newTechArray : Array<String> = [];

    this.model.technologies.forEach((technology, index) => {
      if (technology)
        newTechArray.push(techByIndex[index]);
    })

    this.model.technologies = newTechArray;
    this.model = new project(this.model.name,this.model.technologies,this.model.description,uploadDate,this.model.imageUrl,this.model.repository);    
  }
  
  onSubmit(): void {
    let currentDate: String = this.getCurrentDate();
    this.newProject(currentDate);
    this.techSelected.fill(false);
    this.oneChecked = false;
    this.createProject();
    setTimeout(() => this.showMessage = false, 3000);
  }

  //API requests

  createProject(): void {
    this.projectService.saveProject(this.model).subscribe({
      next: (v) => {
        const id = v.results._id;
        const imageUrl = url + '/upload-image/' + id;
        this.uploadService.makeFileRequest(imageUrl, this.imageFile, 'upload_image');
        this.error = false;
        this.message = 'Project saved successfully';
        this.showMessage = true;
      },
      error: (e) => {
        console.error(e);
        this.error = true;
        this.message = 'Error saving project';
        this.showMessage = true;
      },
      complete: () => {
        console.log('Complete');
      }
    })
  }

}
