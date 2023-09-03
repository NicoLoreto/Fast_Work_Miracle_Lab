import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { ProfessionalUserRepository } from "../repositories/ProfessionalUser.repository";
import { DELETE, GET, PUT, Path, PathParam, Security } from "typescript-rest";
import { IProfessionalUser } from "../models/users/ProfessionalUser.interface";
import { Response, Tags } from "typescript-rest-swagger";
import { UserFilter } from "../filters/UserFilter";
import { ProfessionalUserService } from "../service/ProfessionalUser.service";
import { AuthService } from "../service/AuthUser.service";

@Path("/api/professional_user")
@Tags("Professional Users")
@Controller({ route: "/api/professional_user" })
export class ProfessionalUserController extends ApiController {
    constructor(
        private readonly repo: ProfessionalUserRepository,
        private readonly service: ProfessionalUserService,
        private readonly authService: AuthService
    ) {
        super();
    }

    /**
     * @param category
     * * This endpoint returns all registered professional users.
     * @returns
     */

    @GET
    @Response<IProfessionalUser[]>(200, "Success")
    @Response<string>(404, "There are no registered users")
    @Response<string>(500, "No connection to database")
    @Action({ route: "/" })
    async get(): Promise<IProfessionalUser[]> {
        const response = await this.service.getAll();
        if (!response) {
            this.httpContext.response.status(404).send("There are no registered users");
            return;
        }
        return response;
    }

    /**
     * @param id
     * * This endpoint returns an professional user by id.
     * @returns
     */

    @GET
    @Path(":id")
    @Response<IProfessionalUser>(200, "Success")
    @Response<string>(404, "User not found")
    @Response<string>(500, "No connection to database")
    @Action({ route: "/:id" })
    async getById(@PathParam("id") id: number): Promise<IProfessionalUser> {
        return await this.repo.getById(id);
    }

    /**
     * @param category
     * * This endpoint returns all registered professional users by trade category to which they belong.
     * @returns
     */

    @GET
    @Path("/category/:category_id")
    @Response<IProfessionalUser[]>(200, "Success")
    @Response<string>(404, "There are no professional users registered with that category")
    @Response<string>(500, "No connection to database")
    @Action({ route: "/category/:category_id" })
    async getByCategory(@PathParam("category_id") category: number): Promise<IProfessionalUser[]> {
        const response = await this.service.findByCategory(category);

        if (!response) this.httpContext.response.status(404).send("There are no professional users registered with that category");

        return response;
    }

    /**
     * 
     * @param professionalUser 
     * 
     * * This endpoint is for editing an account by an authenticated professional user.
     * 
     * Example: 
     * 
            "name": "Juan Pedro",
            "last_name": "Lopez",
            "dni": "34614738",
            "province": "Santa Fe",
            "city": "Franck",
            "tel": "0341434454",
            "link": "hi-world.com.ar",
            "about_me": "Experienced carpenter skilled in crafting wood into functional and artistic pieces. Dedicated to transforming ideas into tangible, quality creations.",
            "gender": "Male",
            "birth_date": "1990-01-03",
            "auth_number": "12312da134123QWw",
            "img": "photo.png",
            "category_id": "3"
        
     * @returns 
     */
    @PUT
    @Security("x-auth")
    @Response<string>(200, "Updated user")
    @Response<string>(404, "User not found")
    @Action({ route: "/", fromBody: true, method: HttpMethod.PUT, filters: [UserFilter] })
    async editUser(professionalUser: IProfessionalUser): Promise<string> {
        const response = await this.service.edit(professionalUser);

        if (response.error) {
            this.httpContext.response.status(response.code).send(response.message);
            throw new Error(response.message);
        } else {
            this.httpContext.response.send(response.message);
            return;
        }
    }

    /**
     * * This endpoint is for disable a professional user when he is authenticated. It is not removed from the database, it changes its state to false.
     * @returns
     *
     *
     */

    @DELETE
    @Security("x-auth")
    @Path("disable")
    @Action({ route: "/disable", method: HttpMethod.DELETE, filters: [UserFilter] })
    @Response<string>(200, "The account has been disabled")
    @Response<string>(500, "The user could not be disabled")
    async disableAccount(): Promise<string> {
        const response = await this.service.changeStateToFalse(this.authService.authUser);
        if (response.error) {
            this.httpContext.response.end(response.message);
            return;
        }

        this.httpContext.response.send(response.message);
        return;
    }

    /**
     * * This endpoint is for remove a professional user when he is authenticated. It is removed from the database.
     * @returns
     */

    @DELETE
    @Security("x-auth")
    @Action({ route: "/", filters: [UserFilter] })
    @Response<string>(200, "Deleted user")
    @Response<string>(500, "Server error")
    async delete(): Promise<void> {
        await this.service.remove(this.authService.authUser);
        this.httpContext.response.send("Deleted user");
        return;
    }
}
