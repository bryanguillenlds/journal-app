import { shallowMount } from "@vue/test-utils"
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Fab.vue', () => {
  it('should display default icon', () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-plus')).toBeTruthy();
  })
  it('should display circle icon', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    });
    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-circle')).toBeTruthy();
  })
  it('should emit event on click', () => {
    const wrapper = shallowMount(Fab);
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('onClick')).toHaveLength(1);
  })
})