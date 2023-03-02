import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", () => {
    test("deve renderizar com título", () => {

        render(<TodoList />)

        // screen.debug()

        // const title = screen.getByText("Todo List")  // muito criterioso, fixo

        const title = screen.getByText(/todo list/i) // regex, recomendado

        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () => {

        render(<TodoList />)

        // screen.debug()

        const input = screen.getByPlaceholderText(/enter a todo/i)

        expect(input).toHaveValue("")
    })

    test("deve atualizar valor do input ao ser digitado", async () => {

        const user = userEvent.setup()

        render(<TodoList />)

        // screen.debug()

        const input = screen.getByPlaceholderText(/enter a todo/i)

        // interagir
        await user.type(input, "Revisar React")

        // assertiva acerca do valor do input
        expect(input).toHaveValue("Revisar React")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar o enter", async () => {

        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        // interagir
        await user.type(input, "Revisar React{enter}") // só colocar enter entre {}

        // screen.debug() // Verificar valor "value" que volta vazio

        // screen.logTestingPlaygroundURL()

        const item = screen.getByText("Revisar React")

        // assertiva acerca do valor do input
        expect(input).toHaveValue("")
        expect(item).toBeInTheDocument
    })

    test("deve alterar o status da tarefa quando o botão de alterar status", async () => {

        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}") 

        // screen.logTestingPlaygroundURL()

        const toggleBtn = screen.getByRole('button', { name: /toggle/i }) // seleciona o botão

        const item = screen.getByText("Revisar React") // verificar texto digitado

        await user.click(toggleBtn) // espera o clique no botão
        expect(item).toHaveStyle("text-decoration: line-through") // verificar se está sendo riscado no css

        await user.click(toggleBtn) // espera o segundo clique no botão
        expect(item).toHaveStyle("text-decoration: none") // verificar se está sendo desrriscado o risco no css


        // expect(item).toBeInTheDocument
    })

    test("deve remover a tarefa quando o botão de deletar for clicado", async () => {

        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}") 

        // screen.logTestingPlaygroundURL()

        const deleteBtn = screen.getByRole('button', { name: /delete/i }) 

        const item = screen.queryByText("Revisar React") 

        await user.click(deleteBtn) 
        expect(item).not.toBeInTheDocument
    })


})