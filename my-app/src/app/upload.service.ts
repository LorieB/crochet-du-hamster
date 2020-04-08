import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class UploadService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public upload(data) {
    return this.httpClient.post<any>(environment.serverUrl + '/uploadImg', data);
  }

}
 