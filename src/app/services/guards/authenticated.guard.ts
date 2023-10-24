import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "@app/src/app/services/storage.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {


    if (this.storageService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
}
