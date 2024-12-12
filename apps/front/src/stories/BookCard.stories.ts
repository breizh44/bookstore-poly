import type { Meta, StoryObj } from '@storybook/vue3'
import BookCard from '../components/molecules/BookCard.vue'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof BookCard> = {
  title: 'Components/Molecules/BookCard',
  component: BookCard,
  tags: ['autodocs'], // Optionnel, utile pour les addons comme Docs
  argTypes: {
    book: {
      description: 'Les informations du livre à afficher',
      control: { type: 'object' },
    },
  },
}

//👇 This default export determines where your story goes in the story list
export default meta
type Story = StoryObj<typeof BookCard>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Standard: Story = {
  render: (args) => ({
    components: { BookCard },
    setup() {
      return { args }
    },
    template: '<BookCard :book="args.book" />',
  }),
  args: {
    book: {
      id: 1,
      author: 'Jules Verne',
      genre: 'Roman',
      title: 'Le Tour du Monde en 80 Jours',
      year: 1880,
    },
  },
}

export const WellFilled: Story = {
  render: (args) => ({
    components: { BookCard },
    setup() {
      return { args }
    },
    template: '<BookCard :book="args.book" />',
  }),
  args: {
    book: {
      id: 1,
      author: 'Jules Verne',
      genre: 'Roman',
      title: 'Le Tour du Monde en 80 Jours',
      year: 1880,
    },
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)
    const title = await canvas.getByText('Le Tour du Monde en 80 Jours')
    expect(title).toBeInTheDocument()
    // Trouver spécifiquement le <p> contenant le titre
    const titleElement = await canvas.getByText('Le Tour du Monde en 80 Jours', { selector: 'h2' })
    expect(titleElement).toBeInTheDocument()

    expect(titleElement.tagName).toBe('H2') // Vérifie que c'est bien un <p>
    expect(titleElement).toHaveClass('poly-LgTextBold') // Exemple si vous avez des classes spécifiques
    // Trouver spécifiquement le <p> contenant "1880"
    const yearElement = await canvas.getByText('1880', { selector: 'p' })
    expect(yearElement).toBeInTheDocument()

    const genreElement = await canvas.getByText('Roman', { selector: 'p' })
    expect(genreElement).toBeInTheDocument()
    expect(genreElement).toHaveClass('rounded-full')
  },
}
// export const Primary: Story = {
//   render: () => ({
//     components: { BookCard },
//     template: `
//       <BookCard :book="{ id: 1, author: 'Jules Verne', genre: 'Roman', title: 'Le Tour du Monde en 80 Jours', year: 1880 }" />
//     `,
//   }),
// }
