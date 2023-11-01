import { Endpoint } from './endpoints';
import { ApiService, apiServiceInstance } from './ApiService';
import { HttpResponse } from '@miracledevs/paradigm-web-fetch';
import { IProfessionalUser } from '../interfaces/ProfessionalUser.interface';

export class ProfessionalUserService {
  constructor(private readonly apiService: ApiService) {}

  async getProfessionalUserByCategory(category_id: string) {
    const response = await this.apiService.getById(
      category_id,
      Endpoint.professionalUserByCategory
    );
    return response;
  }

  async updateProfessionalUser(
    professionalUSer: IProfessionalUser
  ): Promise<HttpResponse | undefined> {
    const response = await this.apiService.put(
      Endpoint.professionalUser,
      undefined,
      JSON.stringify(professionalUSer)
    );

    if (response.status === 200) {
      const token = response.headers.get('x-auth') as string;
      localStorage.setItem('token', token);
    }
    return response;
  }

  /**
   *
   * @param user
   * Method to disable to professional user logged in.
   * @returns
   */

  protected async disableProfessionalUser(
    user: IProfessionalUser
  ): Promise<HttpResponse | undefined> {
    const response = await this.apiService.delete(
      Endpoint.professionalUserDisable,
      undefined,
      JSON.stringify(user)
    );

    if (response) return response;
    return undefined;
  }

  async deleteProfessionalUser(
    user: IProfessionalUser
  ): Promise<HttpResponse | undefined> {
    const response = await this.apiService.delete(
      Endpoint.professionalUser,
      undefined,
      JSON.stringify(user)
    );

    if (response) return response;
    return undefined;
  }
}

export const professionalUserServiceInstance = new ProfessionalUserService(
  apiServiceInstance
);
