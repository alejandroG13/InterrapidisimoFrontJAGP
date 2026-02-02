import { isPlatformBrowser } from "@angular/common";
import { JwtPayload } from "../../shared/models/api.model";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments";
import { tap } from "rxjs";
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${environment.urlBase}${environment.apiLogin}`,
      { email, password }
    ).pipe(
      tap(res => {
        this.token = res.token;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId) && !this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserFromToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  getNombreUsuario(): string {
    return this.getUserFromToken()?.nombre ?? 'Estudiante';
  }

  logout(): void {
    this.token = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}