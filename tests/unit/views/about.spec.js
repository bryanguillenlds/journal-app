import { shallowMount } from "@vue/test-utils"
import About from '@/views/AboutView';

describe('AboutView.vue', () => {
  it('Renders the component correctly', () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  })
})