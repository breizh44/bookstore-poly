import type { Meta, StoryObj } from '@storybook/vue3'
import GenreFilter from '../components/molecules/GenreFilter.vue'

const meta: Meta<typeof GenreFilter> = {
    title: 'Components/Molecules/GenreFilter',
    component: GenreFilter,
    tags: ['autodocs', 'Polysoude'], // Optionnel, utile pour les addons comme Docs
    argTypes: {
        genre: { control: 'text', description: 'Selected genre (v-model)' },
        genreList: { control: 'object', description: 'List of genres available for selection' },
    },
}

export default meta
type Story = StoryObj<typeof GenreFilter>

export const Primary: Story = {
    render: (args, { updateArgs }) => ({
        components: { GenreFilter },
        setup() {
            // Handle the v-model for `genre`
            const updateGenre = (newValue: string) => {
                updateArgs({ genre: newValue })
            }

            return { args, updateGenre }
        },
        template: `
      <GenreFilter
        v-bind="args"
        v-model="args.genre"
        @update:modelValue="updateGenre"
      />
    `,
    }),
    args: {
        genreList: ['Fiction', 'Non-Fiction', 'Romance', 'Sci-Fi', 'Biography'],
        genre: 'Fiction', // Default selected genre
    },
}
