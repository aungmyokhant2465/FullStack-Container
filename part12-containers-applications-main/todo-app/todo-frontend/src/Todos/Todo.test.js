import { render } from '@testing-library/react';
import Todo from './Todo'

const todo = {
    text: 'do exercise',
    done: false
}

test('renders single todo', () => {
  const component = render(<Todo todo={todo} />);
  const text = component.container.querySelector('.text')
  expect(text).toHaveTextContent('do exercise')
});
