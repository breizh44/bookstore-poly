import type { Meta, StoryObj } from '@storybook/vue3'
import BookCard from '../components/molecules/BookCard.vue'

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
export const Primary: Story = {
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
// export const Primary: Story = {
//   render: () => ({
//     components: { BookCard },
//     template: `
//       <BookCard :book="{ id: 1, author: 'Jules Verne', genre: 'Roman', title: 'Le Tour du Monde en 80 Jours', year: 1880 }" />
//     `,
//   }),
// }
