import { shallowMount } from "@vue/test-utils"
import Home from '@/views/HomeView';

describe('HomeView.vue', () => {
  it('Renders the component correctly', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Click should redirect to no-entry route', () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry'});
  })
})