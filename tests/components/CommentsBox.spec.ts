import { flushPromises, mount } from '@vue/test-utils';
import { nextTick, ref, Ref } from 'vue';
import CommentsBox from '@/components/CommentsBox.vue'; // Adjust path as necessary

interface Comment {
    name: string;
    email: string;
    comment: string;
}
// Define a mock for useRoute outside of jest.mock to avoid hoisting issues
const mockUseRoute = {
    params: {
        slug: 'test-slug'
    }
};

jest.mock('vue-router', () => ({
    useRoute: jest.fn(() => mockUseRoute)
}));

// Setting up local storage mocking
const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

describe('CommentsBox.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        jest.clearAllMocks();
        const expectedComments = JSON.stringify([
            { name: 'John Doe', email: 'john@example.com', comment: 'Nice article!' }
        ]);
        mockLocalStorage.getItem.mockReturnValue(expectedComments);

        wrapper = mount(CommentsBox, {
            global: {
                mocks: {
                    useRoute: () => ({ params: { slug: 'test-slug' } })
                }
            }
        });
    });

    it('loads comments from localStorage on mount', async () => {
        const expectedComments = JSON.stringify([
            { name: 'John Doe', email: 'john@example.com', comment: 'Nice article!' }
        ]);
        mockLocalStorage.getItem.mockReturnValue(expectedComments);

        await nextTick(); // Ensures Vue lifecycle methods are resolved
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('comments-test-slug');
        expect(wrapper.vm.comments).toEqual(JSON.parse(expectedComments));
    });

    it('submits a new comment and updates display and localStorage', async () => {
        const wrapper = mount(CommentsBox);
        const nameInput = wrapper.find('input[name="name"]');
        const emailInput = wrapper.find('input[name="email"]');
        const commentInput = wrapper.find('textarea[name="comment"]');
        const submitButton = wrapper.find('button[type="submit"]');

        await nameInput.setValue('John Doe');
        await emailInput.setValue('john@example.com');
        await commentInput.setValue('Nice article!');
        await submitButton.trigger('click');

        const storedComments = JSON.parse(localStorage.getItem('comments'));
        const newComment = {
            name: 'John Doe',
            email: 'john@example.com',
            comment: 'Nice article!'
        };
        expect(storedComments).toEqual([newComment]);
    });

    it('clears input fields after submitting a comment', async () => {
        wrapper.vm.name = 'Jane Doe';
        wrapper.vm.email = 'jane@example.com';
        wrapper.vm.commentText = 'Another great post!';
        await wrapper.find('form').trigger('submit.prevent');
        await nextTick();
        expect(wrapper.vm.name).toBe('');
        expect(wrapper.vm.email).toBe('');
        expect(wrapper.vm.commentText).toBe('');
    });
});
