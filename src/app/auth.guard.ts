import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.apiService.loggedIn()) {
      return true;
    } else {
      alert('You are not logged in');
      this.router.navigate(['']);
      return false;
    }
  }
}
