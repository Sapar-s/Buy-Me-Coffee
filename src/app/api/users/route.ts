import { checkUser } from "../../../../back_end/controllers/user.controller";
 import { getUsers } from "../../../../back_end/users";
 
 export async function GET() {
   const users = await getUsers();
 
   return new Response(JSON.stringify({ data: users }));
 }
 
 export async function POST(req: Request, res: Response) {
   const body = await req.json();
   console.log({ body });
   return await checkUser({ email: body.email, password: body.password });
 }