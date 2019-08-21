import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASEURL: any = 'http://api.trovasys.com';
  constructor(private http: HttpClient) { }

  getActivity(cattleId: any): any {
    return this.http.get(this.BASEURL + '/cowtrac/getactivity/' + cattleId );
  }
}
