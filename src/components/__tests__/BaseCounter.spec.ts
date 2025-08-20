import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCounter from '../BaseCounter.vue'

describe('BaseCounter', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(BaseCounter)
      expect(wrapper.find('h2').text()).toBe('Counter Component')
      expect(wrapper.find('p').text()).toBe('Count: 0')
    })

    it('renders with custom props', () => {
      const wrapper = mount(BaseCounter, {
        props: {
          title: 'My Counter',
          initialValue: 10
        }
      })
      expect(wrapper.find('h2').text()).toBe('My Counter')
      expect(wrapper.find('p').text()).toBe('Count: 10')
    })

    it('has all required buttons', () => {
      const wrapper = mount(BaseCounter)
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(3)
      expect(buttons[0].text()).toBe('Increment')
      expect(buttons[1].text()).toBe('Decrement')
      expect(buttons[2].text()).toBe('Reset')
    })
  })

  describe('Interactions', () => {
    it('increments count when increment button is clicked', async () => {
      const wrapper = mount(BaseCounter, {
        props: { initialValue: 5 }
      })
      
      const incrementBtn = wrapper.find('button:first-of-type')
      await incrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 6')
      
      await incrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 7')
    })

    it('decrements count when decrement button is clicked', async () => {
      const wrapper = mount(BaseCounter, {
        props: { initialValue: 5 }
      })
      
      const decrementBtn = wrapper.findAll('button')[1]
      await decrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 4')
      
      await decrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 3')
    })

    it('resets count to initial value when reset button is clicked', async () => {
      const wrapper = mount(BaseCounter, {
        props: { initialValue: 10 }
      })
      
      const incrementBtn = wrapper.find('button:first-of-type')
      const resetBtn = wrapper.findAll('button')[2]
      
      await incrementBtn.trigger('click')
      await incrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 12')
      
      await resetBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 10')
    })

    it('can handle negative numbers', async () => {
      const wrapper = mount(BaseCounter, {
        props: { initialValue: 0 }
      })
      
      const decrementBtn = wrapper.findAll('button')[1]
      await decrementBtn.trigger('click')
      await decrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: -2')
    })
  })

  describe('Edge cases', () => {
    it('resets to 0 when no initial value provided', async () => {
      const wrapper = mount(BaseCounter)
      
      const incrementBtn = wrapper.find('button:first-of-type')
      const resetBtn = wrapper.findAll('button')[2]
      
      await incrementBtn.trigger('click')
      await incrementBtn.trigger('click')
      await incrementBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 3')
      
      await resetBtn.trigger('click')
      expect(wrapper.find('p').text()).toBe('Count: 0')
    })
  })
})