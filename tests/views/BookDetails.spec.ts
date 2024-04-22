import { shallowMount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import BookDetails from '@/views/BookDetails.vue';
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe('BookDetails.vue', () => {
    let axiosMock;
    let routerMock;

    beforeEach(() => {
        routerMock = createRouterMock(); // Create a new router mock for each test to ensure isolation
        injectRouterMock(routerMock);   // Inject it here only
        axiosMock = new AxiosMockAdapter(axios);

        jest.spyOn(routerMock, 'back');

        // Setup default mock for all tests
        routerMock.push({ name: 'book-details', params: { slug: 'in-search-of-lost-time' }});
        axiosMock.onAny().reply(404); // Catch-all to avoid accidental network calls

    });

    afterEach(() => {
        axiosMock.restore();  // Correctly restore axiosMock after each test
        jest.clearAllMocks();  // Clear all mocks to avoid leakage between tests
    });

    it.skip('displays book details when data fetch is successful', async () => {
        axiosMock.onGet("http://localhost:3000/books/in-search-of-lost-time").reply(200, {
            title: "Example Book", author: "Jane Doe"
        });

        const wrapper = shallowMount(BookDetails, {
            global: {
                plugins: [routerMock]  // Make sure this is the only place router is provided
            }
        });

        await flushPromises();
        console.log('Rendered Text: ', wrapper.text());
        expect(wrapper.text()).toContain("Example Book");
        expect(wrapper.text()).toContain("Jane Doe");
    });

    it('shows error message when book is not found (404 error)', async () => {
        axiosMock.onGet("http://localhost:3000/books/nonexistent-book").reply(404);
        routerMock.push({ name: 'book-details', params: { slug: 'nonexistent-book' }});

        const wrapper = shallowMount(BookDetails);

        await flushPromises();
        expect(wrapper.text()).toContain('Book not found');
    });

    it('goes back to the previous page when the back button is clicked', async () => {
        const wrapper = shallowMount(BookDetails, {});

        await wrapper.find('.btn-back').trigger('click');
        await flushPromises();
        expect(routerMock.back).toHaveBeenCalledTimes(1);
    });
});