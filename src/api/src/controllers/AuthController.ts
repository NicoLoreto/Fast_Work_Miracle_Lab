import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { AuthService } from "../service/AuthUser.service";
import { POST, Path } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { IProfessionalUser } from "../models/users/ProfessionalUser.interface";
import { ILoginProfessionalUser } from "../models/users/LoginProfessionalUser.interface";

@Path("/api/auth")
@Tags("AuthUser")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    constructor(private readonly service: AuthService) {
        super();
    }

    /**
     * @param authUser
     * 
     *    * This is an endpoint to register as a professional user.
     * 
     *   Example:
     * 
            "email": "juan@gmail.com",
            "password": "12345678",
            "name": "Juan",
            "last_name": "Lopez",
            "dni": "34614738",
            "province": "Santa Fe",
            "city": "Rosario",
            "tel": "2477434454",
            "link": "hi-world.com.ar",
            "about_me": "Experienced carpenter skilled in crafting wood into functional and artistic pieces. Dedicated to transforming ideas into tangible, quality creations.",
            "gender": "Male",
            "birth_date": "1990-01-03",
            "auth_number": "12312da134123QWw",
            "img": "photo.png",
            "category_id": "3"
        
     * @returns
     */

    @POST
    @Path("/signup")
    @Response<string>(201, "Created user")
    @Response<string>(400, "Bad request")
    @Response<string>(500, "Server error")
    @Action({ route: "/signup", fromBody: true })
    async post(authUser: IProfessionalUser): Promise<string> {
        const user = await this.service.register(authUser);

        if (user.error) {
            this.httpContext.response.status(user.code).send(user.message);
            return;
        } else {
            this.httpContext.response.status(user.code).send(user.message);
            return;
        }
    }

    /**
     * @param authUser
     *   * This is an endpoint to login as a professional user. The user will receive an authentication
     *     token to be validated when making requests.
     * 
     *   Example:
     * 
            "email": "juan@gmail.com",
            "password": "12345678"        

     * @returns
     */

    @POST
    @Path("/login")
    @Response<string>(401, "Invalid credentials")
    @Response<string>(403, "Disabled account")
    @Response<string>(404, "The user does not exist in the database")
    @Response<string>(500, "Server error")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(authUser: ILoginProfessionalUser): Promise<string> {
        const response = await this.service.login(authUser);
        if (response.error) {
            this.httpContext.response.status(response.code).send(response.message);
            return;
        } else {
            this.httpContext.response.setHeader("x-auth", response.token).send(response.message);
            return;
        }
    }
}
