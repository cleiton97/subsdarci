
import { sql } from "@vercel/postgres";
import { useSearchParams } from "next/navigation";

export const revalidate =0

export default function NewCourse({
    searchParams,
  }: {
    searchParams?: {
      url?: string;  
    };
  }){
    
    const urlImage = searchParams?.url || '';

    async function saveTutor(formData: FormData){
        "use server"
        const nome = formData.get("nome") as string;
        const email = formData.get("email") as string;
        await sql`INSERT INTO tutor (nome, email) VALUES(${nome}, ${email})`
        console.log("Acessou a função")
    }
    return (
        <div>
            <h1 className="text-white text-center text-4xl">Cadastrar Cursos</h1>
            <form>
                <input type="text" name="nome" placeholder="Digite o Título do Curso"/><br/><br/>
                <input type="text" name="email" placeholder="Digite a Descriçao do curso"/> <br/><br/>
                <br/>
                
                <button formAction={saveTutor} className="">Salvar</button>
            </form>
        </div>

    )
}