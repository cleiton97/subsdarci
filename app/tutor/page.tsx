import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const revalidate =0

export default async function ListTutor() {
    async function deleteTutor(formData: FormData){
        "use server"
        const id = formData.get("id") as string;
        await sql`DELETE from tutor where id=${id}`
        revalidatePath("/tutor/tutor")
    }
    const { rows } = await sql`SELECT * from tutor`;
    return (
        <div>
            <h1 className="text-center text-white">Lista de Cursos</h1>

            <table>
                <thead>
                    <tr> <td>Título do Curso</td> <td>Descrição</td></tr>
                </thead>
                <tbody>
                    {
                        rows.map((tutor) => {
                            return (
                                <tr key={tutor.id}><td>{tutor.nome}</td> <td>{tutor.email}</td> 
                                <td>
                                    <form >
                                     <input type="text" hidden name="id" value={tutor.id}/>   
                                    <button formAction={deleteTutor}>Excluir</button>
                                    </form>
                                
                                </td> 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}