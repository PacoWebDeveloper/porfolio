import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { project } from "../models/projectModel";
import { url } from "../apiUrl";


@Injectable()
export class ProjectService {
    private url: String = url;
    private headers: any = new HttpHeaders().set('Content-type','application/json');

    constructor(
        private _http: HttpClient
    ) {
        /* this.url = 'http://localhost:3700/api'; */
    }

    saveProject(projectData: project): Observable<any> {
        return this._http.post(`${this.url}/createProject`, projectData,{headers: this.headers});
    }

    getAllProjects(): Observable<any> {
        return this._http.get(`${this.url}/projects`, {headers: this.headers});
    }

    getProjectById(id: String): Observable<any> {
        return this._http.get(`${this.url}/projectbyid/${id}`, {headers: this.headers})
    }

    editProject(id:String, projectData: project): Observable<any> {
        return this._http.put(`${this.url}/edit-project`, {id,projectData}, {headers: this.headers});
    }

    deleteProject(id: String): Observable<any> {
        return this._http.delete(`${this.url}/delete/${id}`, {headers: this.headers});
    }

    deleteImage(name: String): Observable<any> {
        return this._http.delete(`${this.url}/delete-image/${name}`, {headers: this.headers});
    }
}