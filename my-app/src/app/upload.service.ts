import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
}) 
export class UploadService {

  // serverUrl: string = "http://localhost:8000";
  serverUrl: string = "https://crochet-du-hamster.fr";
  constructor(
    private httpClient: HttpClient
  ) { }

  public upload(data) {
    return this.httpClient.post<any>(this.serverUrl + '/uploadImg', data);
  }

}
 