import { shallowMount } from '@vue/test-utils';
import BookDetailsBox from '@/components/BookDetailsBox.vue';

describe('BookDetailsBox.vue', () => {
    const book = {
        slug: 'unique-slug',
        author: 'John Doe',
        title: 'Sample Book',
        cover: 'path/to/cover.jpg',
        rating: '8',
        synopsis: 'A brief synopsis of the book.',
        upvoted: false,
        upvotes: 0,
    };

    it('renders book details correctly', () => {
        const wrapper = shallowMount(BookDetailsBox, {
            props: { book }
        });

        expect(wrapper.text()).toContain(book.title);
        expect(wrapper.text()).toContain(book.author);
        expect(wrapper.find('img').attributes('src')).toBe(book.cover);
        expect(wrapper.text()).toContain(book.synopsis);
        expect(wrapper.text()).toContain(`Rating: (${book.rating} / 10)`);
    });

    it('upvotes the book correctly when the upvote button is clicked', async () => {
        const wrapper = shallowMount(BookDetailsBox, {
            props: { book }
        });
        await wrapper.find('a.btn-upvote').trigger('click');
        expect(book.upvotes).toBe(1);
        expect(book.upvoted).toBe(true);
        expect(wrapper.find('.btn-upvote').classes()).toContain('btn-outline-primary');
        expect(wrapper.text()).toContain('Upvoted');
    });
});