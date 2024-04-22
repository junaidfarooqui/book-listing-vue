import { shallowMount } from '@vue/test-utils';
import BookCard from '@/components/BookCard.vue';

describe('BookCard.vue', () => {
    let wrapper: any;
    const book = {
        slug: 'test-book',
        author: 'Jane Doe',
        title: 'Test Book',
        cover: 'test-cover.jpg',
        rating: '4.5',
        synopsis: 'A long synopsis that is definitely over two hundred characters. '.repeat(5),
        upvoted: false,
        upvotes: 10
    };
    const classIndex = 1;

    beforeEach(() => {
        wrapper = shallowMount(BookCard, {
            props: { book, classIndex }
        });
    });

    it('renders book title', () => {
        expect(wrapper.text()).toContain(book.title);
    });

    it('truncates long synopsis correctly', () => {
        const expectedSynopsis = `${book.synopsis.substring(0, 200)}...`;
        expect(wrapper.vm.truncatedSynopsis).toBe(expectedSynopsis);
    });

    it('increments upvotes on upvote when not initially upvoted', async () => {
        expect(wrapper.vm.book.upvotes).toBe(10);
        await wrapper.vm.upvoteBook(book);
        expect(wrapper.vm.book.upvotes).toBe(11);
        expect(wrapper.vm.book.upvoted).toBe(true);
    });
});
