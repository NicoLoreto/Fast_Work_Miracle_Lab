import { IProfessionalUser } from "../src/models/users/ProfessionalUser.interface";
import { Validator } from "../src/utils/validator";
import { ProfessionalUserService } from "../src/service/ProfessionalUser.service";
import { AuthService } from "../src/service/AuthUser.service";
import { ConfigurationBuilder } from "@miracledevs/paradigm-express-webapi";
import { users } from "../tests/mockData";

/**
 * SETUP
 */

// Mock Professional User Repository.
class MockProfessionalUserRepository {
    private readonly users: IProfessionalUser[] = users;

    private async getAllProfessionalUser(): Promise<IProfessionalUser[]> {
        return this.users;
    }
}

// Mock Professional User is instantiated.
const mockProfessionalUserRepository = new MockProfessionalUserRepository();

// New Validator.
const validator = new Validator();

// New Configuration Builder.
const config = new ConfigurationBuilder();

// New AuthService.
const authService = new AuthService(mockProfessionalUserRepository as any, config, validator);

/**
 * TEST
 */

describe("GET /api/professional_user", () => {
    it("should get all Professional Users", async () => {
        const professionalUserService = new ProfessionalUserService(mockProfessionalUserRepository as any, authService, config, validator);
        const response = await professionalUserService.getAll();
        expect(response).toEqual(users);
    });
});
